# Wiki機能 詳細実装仕様

このドキュメントは、すぐに実装を開始できるレベルの詳細仕様を提供します。

## 目次

1. [事前準備](#事前準備)
2. [ファイル構成](#ファイル構成)
3. [Step 1: 依存関係のインストール](#step-1-依存関係のインストール)
4. [Step 2: 型定義](#step-2-型定義)
5. [Step 3: ビルドスクリプト](#step-3-ビルドスクリプト)
6. [Step 4: リンク自動化ロジック](#step-4-リンク自動化ロジック)
7. [Step 5: LinkableTextコンポーネント](#step-5-linkabletextコンポーネント)
8. [Step 6: WikiModalコンポーネント](#step-6-wikimodalコンポーネント)
9. [Step 7: Wikiコンテンツ作成](#step-7-wikiコンテンツ作成)
10. [Step 8: 既存コンポーネントへの統合](#step-8-既存コンポーネントへの統合)
11. [テスト](#テスト)

---

## 事前準備

### ディレクトリ作成

```bash
mkdir -p assets/wiki
mkdir -p scripts
mkdir -p src/domain/wiki
mkdir -p src/components/wiki
```

---

## ファイル構成

```
learning-bookkeeping-app/
├── assets/
│   └── wiki/                           # Wikiコンテンツ（markdown）
│       ├── cash.md                     # 現金
│       ├── deposit.md                  # 預金
│       ├── accounts-receivable.md      # 売掛金
│       ├── accounts-payable.md         # 買掛金
│       ├── sales.md                    # 売上
│       └── purchases.md                # 仕入
├── scripts/
│   └── build-wiki.ts                   # ビルドスクリプト
├── src/
│   ├── components/
│   │   └── wiki/
│   │       ├── WikiModal.tsx           # Wikiモーダル
│   │       └── LinkableText.tsx        # リンク可能テキスト
│   └── domain/
│       └── wiki/
│           ├── types.ts                # 型定義
│           ├── wikiData.ts             # 生成されるWikiデータ（自動生成・Git無視）
│           └── linkify.ts              # リンク自動化ロジック
└── package.json
```

---

## Step 1: 依存関係のインストール

### 必要なパッケージ

```bash
pnpm add gray-matter
pnpm add -D tsx @types/node
```

**Note**: Markdownレンダリングは外部ライブラリを使わず、自前で実装します。

### package.json の更新

`package.json` に以下のスクリプトを追加：

```json
{
  "scripts": {
    "build:wiki": "tsx scripts/build-wiki.ts",
    "prebuild": "pnpm build:wiki",
    "prestart": "pnpm build:wiki"
  }
}
```

### .gitignore の更新

```
# Wiki自動生成ファイル
src/domain/wiki/wikiData.ts
```

---

## Step 2: 型定義

### src/domain/wiki/types.ts

```typescript
/**
 * Wiki用語エントリ
 */
export type WikiEntry = {
  /** スラッグ（一意識別子、ファイル名に対応） */
  slug: string;
  /** 表示タイトル */
  title: string;
  /** 別名・表記ゆれ */
  aliases: string[];
  /** タグ（分類用） */
  tags: string[];
  /** カテゴリ（資産/負債/純資産/収益/費用など） */
  category?: string;
  /** Markdown本文（frontmatterを除く） */
  content: string;
};

/**
 * 用語辞書（リンク自動化用）
 * key: 用語（title or alias）
 * value: slug
 */
export type TermDictionary = Map<string, string>;

/**
 * リンク化されたテキストのトークン
 */
export type TextToken =
  | { type: 'text'; text: string }
  | { type: 'link'; text: string; slug: string };
```

---

## Step 3: ビルドスクリプト

### scripts/build-wiki.ts

```typescript
import * as fs from 'node:fs';
import * as path from 'node:path';
import matter from 'gray-matter';

// パス設定
const WIKI_DIR = path.join(process.cwd(), 'assets/wiki');
const OUTPUT_FILE = path.join(process.cwd(), 'src/domain/wiki/wikiData.ts');

// Frontmatterの型定義
type WikiFrontmatter = {
  title: string;
  slug: string;
  aliases?: string[];
  tags?: string[];
  category?: string;
};

// WikiEntryの型定義（型定義ファイルと同じ）
type WikiEntry = {
  slug: string;
  title: string;
  aliases: string[];
  tags: string[];
  category?: string;
  content: string;
};

/**
 * Wikiコンテンツをビルド
 */
function buildWiki() {
  console.log('🔨 Building Wiki...');

  // Wikiディレクトリが存在しない場合は作成
  if (!fs.existsSync(WIKI_DIR)) {
    fs.mkdirSync(WIKI_DIR, { recursive: true });
    console.log(`📁 Created wiki directory: ${WIKI_DIR}`);
    console.log('⚠️  No wiki files found. Creating empty wikiData.ts');
    generateEmptyOutput();
    return;
  }

  // Markdownファイルを取得
  const files = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));

  if (files.length === 0) {
    console.log('⚠️  No wiki files found. Creating empty wikiData.ts');
    generateEmptyOutput();
    return;
  }

  console.log(`📝 Found ${files.length} wiki files`);

  // 各ファイルをパース
  const entries: WikiEntry[] = [];
  const termDictionary = new Map<string, string>();

  for (const file of files) {
    const filePath = path.join(WIKI_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    try {
      const { data, content } = matter(fileContent);
      const frontmatter = data as WikiFrontmatter;

      // 必須フィールドのバリデーション
      if (!frontmatter.title || !frontmatter.slug) {
        console.error(`❌ Error in ${file}: title and slug are required`);
        continue;
      }

      const entry: WikiEntry = {
        slug: frontmatter.slug,
        title: frontmatter.title,
        aliases: frontmatter.aliases || [],
        tags: frontmatter.tags || [],
        category: frontmatter.category,
        content: content.trim(),
      };

      entries.push(entry);

      // 用語辞書に登録
      // title -> slug
      termDictionary.set(entry.title, entry.slug);

      // aliases -> slug
      for (const alias of entry.aliases) {
        termDictionary.set(alias, entry.slug);
      }

      console.log(`  ✓ ${file} -> ${entry.title} (${entry.aliases.length} aliases)`);
    } catch (error) {
      console.error(`❌ Error parsing ${file}:`, error);
    }
  }

  // TypeScriptファイルを生成
  generateOutput(entries, termDictionary);

  console.log(`✅ Wiki build complete! Generated ${entries.length} entries with ${termDictionary.size} terms`);
}

/**
 * 空のwikiData.tsを生成
 */
function generateEmptyOutput() {
  const output = `// このファイルは自動生成されます（scripts/build-wiki.ts）
// 手動で編集しないでください

import type { WikiEntry, TermDictionary } from './types';

export const WIKI_ENTRIES: WikiEntry[] = [];

export const TERM_DICTIONARY: TermDictionary = new Map();
`;

  // 出力ディレクトリが存在しない場合は作成
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
}

/**
 * wikiData.tsを生成
 */
function generateOutput(entries: WikiEntry[], termDictionary: Map<string, string>) {
  // 出力ディレクトリが存在しない場合は作成
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // エントリをJSON化（content内の改行やクォートをエスケープ）
  const entriesCode = entries.map(entry => {
    return `  {
    slug: ${JSON.stringify(entry.slug)},
    title: ${JSON.stringify(entry.title)},
    aliases: ${JSON.stringify(entry.aliases)},
    tags: ${JSON.stringify(entry.tags)},
    category: ${entry.category ? JSON.stringify(entry.category) : 'undefined'},
    content: ${JSON.stringify(entry.content)},
  }`;
  }).join(',\n');

  // 用語辞書をコード化
  const dictionaryEntries = Array.from(termDictionary.entries())
    .sort((a, b) => b[0].length - a[0].length); // 最長一致のため文字列長降順でソート

  const dictionaryCode = dictionaryEntries.map(([term, slug]) => {
    return `  [${JSON.stringify(term)}, ${JSON.stringify(slug)}]`;
  }).join(',\n');

  // TypeScriptコードを生成
  const output = `// このファイルは自動生成されます（scripts/build-wiki.ts）
// 手動で編集しないでください

import type { WikiEntry, TermDictionary } from './types';

export const WIKI_ENTRIES: WikiEntry[] = [
${entriesCode}
];

export const TERM_DICTIONARY: TermDictionary = new Map([
${dictionaryCode}
]);
`;

  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
}

// ビルド実行
buildWiki();
```

---

## Step 4: リンク自動化ロジック

### src/domain/wiki/linkify.ts

```typescript
import { TERM_DICTIONARY } from './wikiData';
import type { TextToken } from './types';

/**
 * テキスト内の用語を検出し、リンク用のトークンに変換
 *
 * アルゴリズム: 最長一致による貪欲法
 * - TERM_DICTIONARY は文字列長降順でソート済み
 * - テキストを前から走査し、最初にマッチした用語をリンク化
 *
 * @param text - リンク化対象のテキスト
 * @returns トークン配列
 */
export function linkifyText(text: string): TextToken[] {
  if (!text || text.length === 0) {
    return [{ type: 'text', text: '' }];
  }

  const tokens: TextToken[] = [];
  let currentIndex = 0;

  // 辞書を配列に変換（ビルド時に文字列長降順でソート済み）
  const dictionary = Array.from(TERM_DICTIONARY.entries());

  while (currentIndex < text.length) {
    let matched = false;

    // 辞書から最長一致を探す
    for (const [term, slug] of dictionary) {
      const endIndex = currentIndex + term.length;

      if (endIndex <= text.length) {
        const substring = text.substring(currentIndex, endIndex);

        if (substring === term) {
          // マッチした
          tokens.push({ type: 'link', text: term, slug });
          currentIndex = endIndex;
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      // マッチしなかった場合、1文字進める
      // 直前のトークンがtextなら結合、そうでなければ新規作成
      const lastToken = tokens[tokens.length - 1];
      const char = text[currentIndex];

      if (lastToken && lastToken.type === 'text') {
        lastToken.text += char;
      } else {
        tokens.push({ type: 'text', text: char });
      }

      currentIndex++;
    }
  }

  // 空のtextトークンを除去
  return tokens.filter(token => token.type === 'link' || token.text.length > 0);
}

/**
 * 同一slugのリンクを初回のみにする（オプション機能）
 *
 * @param tokens - リンク化済みトークン配列
 * @returns 初回のみリンク化されたトークン配列
 */
export function linkifyFirstOccurrenceOnly(tokens: TextToken[]): TextToken[] {
  const seenSlugs = new Set<string>();

  return tokens.map(token => {
    if (token.type === 'link') {
      if (seenSlugs.has(token.slug)) {
        // 2回目以降は通常テキストに変換
        return { type: 'text', text: token.text };
      }
      seenSlugs.add(token.slug);
    }
    return token;
  });
}
```

---

## Step 5: LinkableTextコンポーネント

### src/components/wiki/LinkableText.tsx

```typescript
import React, { useMemo } from 'react';
import { Text, StyleSheet, type TextStyle } from 'react-native';
import { linkifyText } from '../../domain/wiki/linkify';
import { useAppTheme } from '../../../components/Provider';
import { themeColors } from '../../../tamagui.config';

type Props = {
  /** リンク化対象のテキスト */
  text: string;
  /** リンクタップ時のハンドラ */
  onLinkPress: (slug: string) => void;
  /** テキスト全体のスタイル */
  style?: TextStyle;
  /** リンク部分のスタイル（省略時はデフォルト） */
  linkStyle?: TextStyle;
  /** リンクを無効化（テキストのみ表示） */
  disableLinks?: boolean;
};

/**
 * テキスト内の用語を自動でリンク化して表示するコンポーネント
 *
 * 使用例:
 * ```tsx
 * <LinkableText
 *   text="現金が増えた"
 *   onLinkPress={(slug) => openWiki(slug)}
 *   style={{ fontSize: 16 }}
 * />
 * ```
 */
export function LinkableText({
  text,
  onLinkPress,
  style,
  linkStyle,
  disableLinks = false,
}: Props) {
  const { tamaguiTheme } = useAppTheme();
  const colors = themeColors[tamaguiTheme];

  // リンク化処理（メモ化）
  const tokens = useMemo(() => {
    if (disableLinks) {
      return [{ type: 'text' as const, text }];
    }
    return linkifyText(text);
  }, [text, disableLinks]);

  // デフォルトのリンクスタイル
  const defaultLinkStyle: TextStyle = {
    color: colors.primary,
    textDecorationLine: 'underline',
    textDecorationColor: colors.primary,
    fontWeight: '500',
  };

  const finalLinkStyle = linkStyle || defaultLinkStyle;

  return (
    <Text style={style}>
      {tokens.map((token, index) =>
        token.type === 'link' ? (
          <Text
            key={`${token.slug}-${index}`}
            style={finalLinkStyle}
            onPress={() => onLinkPress(token.slug)}
          >
            {token.text}
          </Text>
        ) : (
          <Text key={`text-${index}`}>{token.text}</Text>
        )
      )}
    </Text>
  );
}
```

---

## Step 6: WikiModalコンポーネント

### src/components/wiki/WikiModal.tsx

```typescript
import React, { useState, useEffect, useMemo } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { WIKI_ENTRIES } from '../../domain/wiki/wikiData';
import { LinkableText } from './LinkableText';
import { useAppTheme } from '../../../components/Provider';
import { themeColors } from '../../../tamagui.config';

type Props = {
  /** モーダルの表示状態 */
  visible: boolean;
  /** 初期表示するslug（省略時はnull） */
  initialSlug?: string | null;
  /** 閉じるボタンのハンドラ */
  onClose: () => void;
};

/**
 * Wiki表示用モーダル
 *
 * 特徴:
 * - 単一モーダル内でコンテンツを切り替え
 * - 履歴スタックで複数用語の遷移を管理
 * - 戻るボタンで前の用語に戻る
 * - コンテンツ内のリンクも自動化
 */
export function WikiModal({ visible, initialSlug, onClose }: Props) {
  const { tamaguiTheme } = useAppTheme();
  const colors = themeColors[tamaguiTheme];
  const isDark = tamaguiTheme === 'dark';

  // 履歴スタック（slug配列）
  const [historyStack, setHistoryStack] = useState<string[]>([]);

  // 現在表示中のslug
  const currentSlug = historyStack[historyStack.length - 1];

  // 現在のエントリ
  const currentEntry = useMemo(() => {
    return WIKI_ENTRIES.find(e => e.slug === currentSlug);
  }, [currentSlug]);

  // initialSlugが変更されたら履歴をリセット
  useEffect(() => {
    if (visible && initialSlug) {
      setHistoryStack([initialSlug]);
    }
  }, [visible, initialSlug]);

  // リンクタップ時のハンドラ
  const handleLinkPress = (slug: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // 同じslugの場合は何もしない
    if (slug === currentSlug) {
      return;
    }

    // 履歴に追加
    setHistoryStack(prev => [...prev, slug]);
  };

  // 戻るボタンのハンドラ
  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (historyStack.length > 1) {
      // 履歴があれば1つ戻る
      setHistoryStack(prev => prev.slice(0, -1));
    } else {
      // 履歴がない場合はモーダルを閉じる
      onClose();
    }
  };

  // 閉じるボタンのハンドラ
  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setHistoryStack([]);
    onClose();
  };

  // エントリが見つからない場合
  if (visible && !currentEntry) {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleClose}
      >
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose}>
              <Text style={[styles.closeButton, { color: colors.primary }]}>閉じる</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, { color: colors.text }]}>
              用語が見つかりませんでした
            </Text>
            <Text style={[styles.errorSlug, { color: '#94A3B8' }]}>
              slug: {currentSlug}
            </Text>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }

  if (!visible || !currentEntry) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        {/* ヘッダー */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          {/* 戻るボタン（履歴がある場合のみ表示） */}
          {historyStack.length > 1 ? (
            <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
              <Text style={[styles.backButton, { color: colors.primary }]}>← 戻る</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.headerButton} />
          )}

          {/* タイトル */}
          <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>
            {currentEntry.title}
          </Text>

          {/* 閉じるボタン */}
          <TouchableOpacity onPress={handleClose} style={styles.headerButton}>
            <Text style={[styles.closeButton, { color: colors.primary }]}>閉じる</Text>
          </TouchableOpacity>
        </View>

        {/* コンテンツ */}
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* カテゴリバッジ */}
          {currentEntry.category && (
            <View style={styles.categoryContainer}>
              <View style={[styles.categoryBadge, { backgroundColor: isDark ? '#1E293B' : '#F1F5F9' }]}>
                <Text style={[styles.categoryText, { color: colors.text }]}>
                  {currentEntry.category}
                </Text>
              </View>
            </View>
          )}

          {/* Markdown本文（簡易レンダリング） */}
          <View style={styles.contentContainer}>
            <MarkdownRenderer
              content={currentEntry.content}
              onLinkPress={handleLinkPress}
              colors={colors}
              isDark={isDark}
            />
          </View>

          {/* タグ表示 */}
          {currentEntry.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              <Text style={[styles.tagsLabel, { color: '#94A3B8' }]}>タグ:</Text>
              <View style={styles.tags}>
                {currentEntry.tags.map((tag, index) => (
                  <View
                    key={index}
                    style={[styles.tag, { backgroundColor: isDark ? '#1E293B' : '#F1F5F9' }]}
                  >
                    <Text style={[styles.tagText, { color: '#94A3B8' }]}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

/**
 * Markdownパーサー
 * gray-matterで取得したcontentを段落・見出し・太字に分解
 */
type MarkdownBlock =
  | { type: 'heading1'; text: string }
  | { type: 'heading2'; text: string }
  | { type: 'heading3'; text: string }
  | { type: 'paragraph'; segments: TextSegment[] };

type TextSegment =
  | { type: 'text'; text: string }
  | { type: 'bold'; text: string };

function parseMarkdown(content: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);

  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();

    // 見出し
    if (trimmed.startsWith('### ')) {
      blocks.push({ type: 'heading3', text: trimmed.substring(4) });
    } else if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'heading2', text: trimmed.substring(3) });
    } else if (trimmed.startsWith('# ')) {
      blocks.push({ type: 'heading1', text: trimmed.substring(2) });
    } else {
      // 通常の段落（太字パース）
      const segments = parseBoldText(trimmed);
      blocks.push({ type: 'paragraph', segments });
    }
  }

  return blocks;
}

/**
 * 太字記法 (**text**) をパース
 */
function parseBoldText(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // マッチ前のテキスト
    if (match.index > lastIndex) {
      segments.push({ type: 'text', text: text.substring(lastIndex, match.index) });
    }

    // 太字部分
    segments.push({ type: 'bold', text: match[1] });
    lastIndex = regex.lastIndex;
  }

  // 残りのテキスト
  if (lastIndex < text.length) {
    segments.push({ type: 'text', text: text.substring(lastIndex) });
  }

  return segments.length > 0 ? segments : [{ type: 'text', text }];
}

/**
 * Markdownレンダラー
 * パース結果をReact Nativeコンポーネントに変換
 */
function MarkdownRenderer({
  content,
  onLinkPress,
  colors,
  isDark,
}: {
  content: string;
  onLinkPress: (slug: string) => void;
  colors: any;
  isDark: boolean;
}) {
  const blocks = useMemo(() => parseMarkdown(content), [content]);

  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === 'heading1') {
          return (
            <LinkableText
              key={index}
              text={block.text}
              onLinkPress={onLinkPress}
              style={[styles.heading1, { color: colors.text }]}
            />
          );
        }

        if (block.type === 'heading2') {
          return (
            <LinkableText
              key={index}
              text={block.text}
              onLinkPress={onLinkPress}
              style={[styles.heading2, { color: colors.text }]}
            />
          );
        }

        if (block.type === 'heading3') {
          return (
            <LinkableText
              key={index}
              text={block.text}
              onLinkPress={onLinkPress}
              style={[styles.heading3, { color: colors.text }]}
            />
          );
        }

        // paragraph
        return (
          <Text key={index} style={[styles.paragraph, { color: colors.text }]}>
            {block.segments.map((seg, segIndex) => {
              if (seg.type === 'bold') {
                return (
                  <LinkableText
                    key={segIndex}
                    text={seg.text}
                    onLinkPress={onLinkPress}
                    style={{ fontWeight: '600' }}
                  />
                );
              }
              // 通常テキスト
              return (
                <LinkableText
                  key={segIndex}
                  text={seg.text}
                  onLinkPress={onLinkPress}
                  style={{}}
                />
              );
            })}
          </Text>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerButton: {
    minWidth: 60,
  },
  backButton: {
    fontSize: 16,
    fontWeight: '500',
  },
  closeButton: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'right',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
  },
  contentContainer: {
    marginBottom: 24,
  },
  heading1: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    lineHeight: 32,
  },
  heading2: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 12,
    lineHeight: 28,
  },
  heading3: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
    lineHeight: 26,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  tagsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tagsLabel: {
    fontSize: 13,
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 8,
  },
  errorSlug: {
    fontSize: 12,
  },
});
```

---

## Step 7: Wikiコンテンツ作成

### assets/wiki/cash.md

```markdown
---
title: 現金
slug: cash
aliases: ["キャッシュ", "げんきん"]
tags: ["勘定科目", "資産"]
category: 資産
---

# 現金

会社が持っているお金のこと。

財布の中のお金、レジの中のお金など、すぐに使えるお金を指す。
```

### assets/wiki/deposit.md

```markdown
---
title: 預金
slug: deposit
aliases: ["よきん", "銀行預金"]
tags: ["勘定科目", "資産"]
category: 資産
---

# 預金

銀行に預けたお金のこと。

現金と違って、引き出すまで実際には手元にない。でも会社のお金であることに変わりはない。
```

### assets/wiki/accounts-receivable.md

```markdown
---
title: 売掛金
slug: accounts-receivable
aliases: ["うりかけきん", "売掛", "掛売り"]
tags: ["勘定科目", "資産"]
category: 資産
---

# 売掛金

後でもらえるお金のこと。

商品を売ったけど、お金はまだもらっていない状態。「ツケ」で売った、みたいなイメージ。
```

### assets/wiki/accounts-payable.md

```markdown
---
title: 買掛金
slug: accounts-payable
aliases: ["かいかけきん", "買掛", "掛買い"]
tags: ["勘定科目", "負債"]
category: 負債
---

# 買掛金

後で払うお金のこと。

商品を仕入れたけど、お金はまだ払っていない状態。「ツケ」で買った、みたいなイメージ。
```

### assets/wiki/sales.md

```markdown
---
title: 売上
slug: sales
aliases: ["うりあげ", "売上高"]
tags: ["勘定科目", "収益"]
category: 収益
---

# 売上

商品やサービスを売って得たお金のこと。

会社の主な収入源。売上が増えれば、会社は儲かる。
```

### assets/wiki/purchases.md

```markdown
---
title: 仕入
slug: purchases
aliases: ["しいれ", "仕入高"]
tags: ["勘定科目", "費用"]
category: 費用
---

# 仕入

商品を買うためにかかったお金のこと。

売るための商品を仕入れる。仕入が多ければ、その分お金がかかる。
```

---

## Step 8: 既存コンポーネントへの統合

### QuestionA.tsx の修正

```typescript
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Account, AccountCategory } from '../domain/accounting/types/account';
import { checkAnswerA } from '../domain/accounting/validation/questionA';
import { BSPLDiagram } from './BSPLDiagram';
import { useAppTheme } from '../../components/Provider';
import { themeColors } from '../../tamagui.config';
import { LinkableText } from './wiki/LinkableText'; // 追加
import { WikiModal } from './wiki/WikiModal'; // 追加

type Props = {
  account: Account;
  onAnswer: (isCorrect: boolean, selectedCategory: AccountCategory) => void;
};

export function QuestionA({ account, onAnswer }: Props) {
  const { tamaguiTheme } = useAppTheme();
  const colors = themeColors[tamaguiTheme];
  const [selectedCategory, setSelectedCategory] = useState<AccountCategory | undefined>();
  const [isAnswered, setIsAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(0.9));
  const [opacityAnim] = useState(new Animated.Value(0));

  // Wiki機能の状態
  const [showWiki, setShowWiki] = useState(false);
  const [wikiSlug, setWikiSlug] = useState<string | null>(null);

  const handleSelect = (category: AccountCategory) => {
    if (isAnswered) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const correct = checkAnswerA(account, category);
    setSelectedCategory(category);
    setIsCorrect(correct);
    setIsAnswered(true);
    setShowFeedback(true);

    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      setShowFeedback(false);
      onAnswer(correct, category);
    }, 500);
  };

  // Wikiリンクタップ時のハンドラ
  const handleOpenWiki = (slug: string) => {
    setWikiSlug(slug);
    setShowWiki(true);
  };

  useEffect(() => {
    setSelectedCategory(undefined);
    setIsAnswered(false);
    setShowFeedback(false);
    scaleAnim.setValue(0.9);
    opacityAnim.setValue(0);
  }, [account.id]);

  return (
    <View style={styles.container}>
      {/* 勘定科目表示（主役） - LinkableText に変更 */}
      <View style={styles.accountContainer}>
        <LinkableText
          text={account.name}
          onLinkPress={handleOpenWiki}
          style={[styles.accountName, { color: colors.text }]}
        />
        <Text style={[styles.questionText, { color: colors.text, opacity: 0.7 }]}>はどれか？</Text>
      </View>

      {/* BS/PL図 */}
      <BSPLDiagram
        onSelect={handleSelect}
        selectedCategory={selectedCategory}
        disabled={isAnswered}
      />

      {/* 正誤フィードバックアニメーション */}
      {showFeedback && (
        <Animated.View
          style={[
            styles.feedbackContainer,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <Text style={[styles.feedbackText, isCorrect ? styles.correctText : styles.incorrectText]}>
            {isCorrect ? '◯' : '×'}
          </Text>
        </Animated.View>
      )}

      {/* Wikiモーダル */}
      <WikiModal
        visible={showWiki}
        initialSlug={wikiSlug}
        onClose={() => setShowWiki(false)}
      />
    </View>
  );
}

// styles は既存のまま
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
    paddingTop: 24,
    gap: 16,
  },
  accountContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  accountName: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '400',
  },
  feedbackContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  feedbackText: {
    fontSize: 140,
    fontWeight: 'bold',
  },
  correctText: {
    color: '#EF4444',
  },
  incorrectText: {
    color: '#3B82F6',
  },
});
```

### Explanation.tsx の修正

```typescript
// 既存のimportに追加
import { LinkableText } from './wiki/LinkableText';
import { WikiModal } from './wiki/WikiModal';

export function Explanation({ mode, isCorrect, explanation, onNext, onBack, userAnswerLogId }: Props) {
  const { tamaguiTheme } = useAppTheme();
  const colors = themeColors[tamaguiTheme];
  const isDark = tamaguiTheme === 'dark';

  const [hasNote, setHasNote] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);

  // Wiki機能の状態
  const [showWiki, setShowWiki] = useState(false);
  const [wikiSlug, setWikiSlug] = useState<string | null>(null);

  // ... 既存のコード ...

  // Wikiリンクタップ時のハンドラ
  const handleOpenWiki = (slug: string) => {
    setWikiSlug(slug);
    setShowWiki(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentArea}>
        <View style={styles.resultArea}>
          {isCorrect ? (
            <Text style={[styles.correctText, { color: colors.secondary }]}>✓ 正解です</Text>
          ) : (
            <Text style={[styles.incorrectText, { color: colors.text }]}>✗ 選択した仕訳は異なります</Text>
          )}
        </View>

        {/* 解説文 - LinkableText に変更 */}
        <View style={[styles.explanationArea, { backgroundColor: isDark ? '#1A2332' : '#F8FAFC' }]}>
          <LinkableText
            text={explanation}
            onLinkPress={handleOpenWiki}
            style={[styles.explanationText, { color: colors.text }]}
          />
        </View>
      </View>

      {/* ボタンエリアは既存のまま */}
      <View style={styles.buttonContainer}>
        {/* ... 既存のボタン ... */}
      </View>

      {/* Wikiモーダル */}
      <WikiModal
        visible={showWiki}
        initialSlug={wikiSlug}
        onClose={() => setShowWiki(false)}
      />

      {/* ノートモーダル（既存） */}
      {userAnswerLogId && (
        <NoteModal
          visible={showNoteModal}
          mode={hasNote ? 'edit' : 'create'}
          noteId={userAnswerLogId}
          displayType="bottomSheet"
          onClose={() => setShowNoteModal(false)}
          onSave={handleNoteSaved}
        />
      )}
    </View>
  );
}

// styles は既存のまま
```

---

## テスト

### 1. ビルドスクリプトのテスト

```bash
# Wikiコンテンツを作成後、ビルドスクリプトを実行
pnpm build:wiki

# 生成されたファイルを確認
cat src/domain/wiki/wikiData.ts
```

期待される出力:
- `WIKI_ENTRIES` に6つのエントリ
- `TERM_DICTIONARY` に用語とaliasesが登録されている

### 2. リンク化ロジックのテスト

`src/domain/wiki/__tests__/linkify.test.ts` を作成:

```typescript
import { linkifyText } from '../linkify';

// Note: このテストは TERM_DICTIONARY がビルド済みであることが前提

describe('linkifyText', () => {
  it('should linkify a single term', () => {
    const tokens = linkifyText('現金が増えた');
    expect(tokens).toHaveLength(2);
    expect(tokens[0]).toEqual({ type: 'link', text: '現金', slug: 'cash' });
    expect(tokens[1]).toEqual({ type: 'text', text: 'が増えた' });
  });

  it('should linkify multiple terms', () => {
    const tokens = linkifyText('現金が減って預金が増えた');
    expect(tokens).toContainEqual({ type: 'link', text: '現金', slug: 'cash' });
    expect(tokens).toContainEqual({ type: 'link', text: '預金', slug: 'deposit' });
  });

  it('should prefer longer match', () => {
    // 辞書に "売上" と "売上高" がある場合
    const tokens = linkifyText('売上高が増えた');
    const linkTokens = tokens.filter(t => t.type === 'link');
    // "売上高" が優先されるべき
    expect(linkTokens[0].text).toBe('売上高');
  });

  it('should handle text with no matches', () => {
    const tokens = linkifyText('これはテストです');
    expect(tokens).toHaveLength(1);
    expect(tokens[0]).toEqual({ type: 'text', text: 'これはテストです' });
  });

  it('should handle empty string', () => {
    const tokens = linkifyText('');
    expect(tokens).toEqual([{ type: 'text', text: '' }]);
  });
});
```

### 3. 手動テスト

#### QuestionA画面でのリンク確認

1. アプリを起動: `pnpm start`
2. QuestionA画面で勘定科目（例: 「現金」）が表示されることを確認
3. 「現金」をタップしてWikiモーダルが開くことを確認
4. モーダル内のコンテンツが正しく表示されることを確認
5. モーダル内のリンク（例: 「預金」）をタップして別の用語に遷移することを確認
6. 戻るボタンで前の用語に戻ることを確認
7. 閉じるボタンでモーダルが閉じることを確認

#### Explanation画面でのリンク確認

1. 解説テキスト内の用語がリンク化されていることを確認
2. リンクをタップしてWikiモーダルが開くことを確認

---

## トラブルシューティング

### 1. ビルドスクリプトが動かない

**症状**: `pnpm build:wiki` を実行しても `wikiData.ts` が生成されない

**対処法**:
- `gray-matter` と `tsx` がインストールされているか確認
- `scripts/build-wiki.ts` の実行権限を確認
- `assets/wiki/` ディレクトリが存在するか確認

### 2. リンクが反応しない

**症状**: リンクをタップしても何も起こらない

**対処法**:
- `TERM_DICTIONARY` が正しく生成されているか確認
- `linkifyText()` が正しくトークンを返しているか確認
- `onLinkPress` ハンドラが正しく渡されているか確認

### 3. 用語が見つからない

**症状**: Wikiモーダルで「用語が見つかりませんでした」と表示される

**対処法**:
- `WIKI_ENTRIES` にエントリが存在するか確認
- `slug` が正しいか確認
- ビルドスクリプトを再実行: `pnpm build:wiki`

### 4. リンクの色が表示されない

**症状**: リンクが通常のテキストと同じ色で表示される

**対処法**:
- `LinkableText` の `linkStyle` が正しく適用されているか確認
- `colors.primary` が正しく取得できているか確認

---

## パフォーマンス最適化

### 1. リンク化処理のメモ化

`LinkableText` では `useMemo` を使用してリンク化処理をメモ化しています。

```typescript
const tokens = useMemo(() => {
  return linkifyText(text);
}, [text]);
```

### 2. 辞書の事前ソート

`TERM_DICTIONARY` はビルド時に文字列長降順でソートされています。これにより、ランタイムでのソート処理が不要になります。

### 3. 大量のテキストの処理

将来的に解説文が長くなる場合、以下の最適化を検討:

- チャンク分割処理
- Virtualized List の使用
- Web Worker による非同期処理（React Native では不可）

---

## 次のステップ（v1.1以降）

- [ ] Wiki内検索機能
- [ ] タグによる用語一覧表示
- [ ] 関連用語の自動提案
- [ ] 用語の閲覧履歴
- [ ] お気に入り用語の保存
- [ ] ユーザーが追加できるメモ機能
- [ ] より高度なMarkdownレンダリング（リスト、引用、コードブロックなど）

---

## まとめ

この仕様書に従って実装することで、以下が実現できます:

1. ✅ Markdownでのwikiコンテンツ管理
2. ✅ ビルド時の自動リンク辞書生成
3. ✅ ランタイムでの自動リンク化
4. ✅ 履歴管理付きWikiモーダル
5. ✅ 既存コンポーネントへのシームレスな統合

すべてのコードサンプルは実装可能な状態で記載されています。不明点があれば、該当セクションを参照して実装を進めてください。
