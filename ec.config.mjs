import { defineEcConfig } from 'astro-expressive-code';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';

export default defineEcConfig({
  plugins: [
    pluginCollapsibleSections({
      // デフォルトの折りたたみスタイル
      // 'github': 展開後は再折りたたみ不可（デフォルト）
      // 'collapsible-start': 折りたたみ可能（開始位置にサマリー）
      // 'collapsible-end': 折りたたみ可能（終了位置にサマリー）
      // 'collapsible-auto': 自動選択
    }),
  ],
  defaultProps: {
    // デフォルトで折りたたみ可能なスタイルを使用
    collapseStyle: 'collapsible-auto',
  },
});
