/**
 * rehype-table-scope
 * 
 * Markdownテーブルのth要素にscope属性を自動付与するプラグイン
 * - thead th には scope="col" を付与
 * - tbody th には scope="row" を付与（行ヘッダがある場合）
 * 
 * これにより、スクリーンリーダーや支援技術でのテーブル読み上げが改善されます。
 */

import { visit } from 'unist-util-visit';

/**
 * テーブル要素にscope属性を付与
 */
export function rehypeTableScope() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      // thead内のth要素にscope="col"を付与
      if (node.tagName === 'th' && parent?.tagName === 'thead') {
        if (!node.properties) {
          node.properties = {};
        }
        node.properties.scope = 'col';
      }

      // tbody内のth要素にscope="row"を付与（行ヘッダがある場合）
      if (node.tagName === 'th' && parent?.tagName === 'tbody') {
        if (!node.properties) {
          node.properties = {};
        }
        node.properties.scope = 'row';
      }
    });
  };
}
