#!/usr/bin/env node
/**
 * ドキュメントインデックスを自動生成するスクリプト
 * 
 * 実行方法:
 *   node scripts/generate-docs-index.js
 * 
 * または package.json から:
 *   npm run docs:index
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// フロントマターをパース
function parseFrontMatter(content) {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);
  
  if (!match) {
    return { metadata: {}, content };
  }
  
  const metadataText = match[1];
  const contentText = match[2];
  const metadata = {};
  
  // 簡単なYAMLパース（完全な実装ではない）
  metadataText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // 配列の処理
      if (value.startsWith('[')) {
        value = value.slice(1, -1).split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
      } else {
        // 文字列のクォートを除去
        value = value.replace(/^["']|["']$/g, '');
      }
      
      metadata[key] = value;
    }
  });
  
  return { metadata, content: contentText };
}

// ディレクトリを再帰的に探索
function findMarkdownFiles(dir, baseDir = dir) {
  const files = [];
  const entries = readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath, baseDir));
    } else if (entry.endsWith('.md') && entry !== 'README.md' && entry !== 'SEARCH_INDEX.md') {
      const relativePath = join(dir, entry).replace(baseDir + '/', '');
      files.push(relativePath);
    }
  }
  
  return files;
}

// ドキュメントを読み込んでメタデータを抽出
function loadDocuments() {
  const docsDir = join(projectRoot, 'docs');
  const files = findMarkdownFiles(docsDir);
  const documents = [];
  
  for (const file of files) {
    const fullPath = join(docsDir, file);
    try {
      const content = readFileSync(fullPath, 'utf-8');
      const { metadata, content: body } = parseFrontMatter(content);
      
      // タイトルを抽出（メタデータまたは最初の見出しから）
      const title = metadata.title || body.match(/^#\s+(.+)$/m)?.[1] || file;
      
      documents.push({
        path: file,
        fullPath,
        title,
        category: metadata.category || file.split('/')[0],
        type: metadata.type || 'document',
        version: metadata.version || '1.0.0',
        lastUpdated: metadata.last_updated || 'Unknown',
        immutable: metadata.immutable === 'true' || metadata.immutable === true,
        tags: Array.isArray(metadata.tags) ? metadata.tags : (metadata.tags ? [metadata.tags] : []),
        relatedDocs: Array.isArray(metadata.related_docs) ? metadata.related_docs : [],
        lineCount: body.split('\n').length
      });
    } catch (error) {
      console.warn(`Warning: Could not read ${file}: ${error.message}`);
    }
  }
  
  return documents;
}

// インデックスを生成
function generateIndex(documents) {
  const categories = {};
  
  // カテゴリごとに分類
  documents.forEach(doc => {
    if (!categories[doc.category]) {
      categories[doc.category] = [];
    }
    categories[doc.category].push(doc);
  });
  
  // Markdown形式でインデックスを生成
  let index = `# ドキュメントインデックス

このファイルは自動生成されます。手動で編集しないでください。

最終更新: ${new Date().toISOString()}

## 概要

- 総ドキュメント数: ${documents.length}
- カテゴリ数: ${Object.keys(categories).length}

`;

  // カテゴリごとにセクションを生成
  Object.keys(categories).sort().forEach(category => {
    const docs = categories[category];
    index += `\n## ${category.charAt(0).toUpperCase() + category.slice(1)}\n\n`;
    
    docs.forEach(doc => {
      const immutableBadge = doc.immutable ? ' 🔒' : '';
      const tagsBadge = doc.tags.length > 0 ? ` [${doc.tags.join(', ')}]` : '';
      const sizeWarning = doc.lineCount > 100 ? ' ⚠️ (100行超過)' : '';
      
      index += `- [${doc.title}](${doc.path})${immutableBadge}${tagsBadge}${sizeWarning}\n`;
      index += `  - バージョン: ${doc.version} | 最終更新: ${doc.lastUpdated}\n`;
      if (doc.relatedDocs.length > 0) {
        index += `  - 関連ドキュメント: ${doc.relatedDocs.map(d => `[${d}](${d})`).join(', ')}\n`;
      }
    });
  });
  
  // ADR一覧
  const adrs = documents.filter(d => d.category === 'adr' && d.path.match(/^\d{4}-/));
  if (adrs.length > 0) {
    index += `\n## ADR一覧\n\n`;
    adrs.sort((a, b) => a.path.localeCompare(b.path)).forEach(adr => {
      index += `- [${adr.title}](${adr.path}) - ${adr.lastUpdated}\n`;
    });
  }
  
  // タグ一覧
  const allTags = new Set();
  documents.forEach(doc => {
    doc.tags.forEach(tag => allTags.add(tag));
  });
  
  if (allTags.size > 0) {
    index += `\n## タグ一覧\n\n`;
    Array.from(allTags).sort().forEach(tag => {
      const taggedDocs = documents.filter(d => d.tags.includes(tag));
      index += `- **${tag}**: ${taggedDocs.map(d => `[${d.title}](${d.path})`).join(', ')}\n`;
    });
  }
  
  return index;
}

// メイン処理
function main() {
  console.log('Generating documentation index...');
  
  const documents = loadDocuments();
  const index = generateIndex(documents);
  
  const indexPath = join(projectRoot, 'docs', 'README.md');
  writeFileSync(indexPath, index, 'utf-8');
  
  console.log(`✓ Index generated: ${indexPath}`);
  console.log(`  Total documents: ${documents.length}`);
  console.log(`  Categories: ${Object.keys(new Set(documents.map(d => d.category))).length}`);
}

main();
