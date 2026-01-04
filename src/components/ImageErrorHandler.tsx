/**
 * 画像の読み込みエラーを処理するコンポーネント
 * 外部画像が読み込めない場合に、altテキストを表示する
 */

import { useEffect } from 'react';

export function ImageErrorHandler() {
  useEffect(() => {
    const handleImageError = (event: Event) => {
      const img = event.target as HTMLImageElement;
      if (img && img.src && (img.src.startsWith('http://') || img.src.startsWith('https://'))) {
        // 外部画像の読み込みエラーを処理
        console.warn('[ImageErrorHandler] Failed to load external image:', img.src);
        
        // altテキストが表示されるように、エラー時のスタイルを適用
        img.style.display = 'none';
        
        // 代替テキストを表示する要素を作成
        const fallback = document.createElement('div');
        fallback.className = 'image-error-fallback';
        fallback.textContent = img.alt || '画像を読み込めませんでした';
        fallback.style.cssText = `
          padding: 2rem;
          text-align: center;
          color: hsl(var(--muted-foreground));
          background-color: hsl(var(--muted) / 0.3);
          border: 1px dashed hsl(var(--muted-foreground) / 0.3);
          border-radius: 0.5rem;
          margin: 1rem 0;
        `;
        
        // 画像の親要素に挿入
        if (img.parentNode) {
          img.parentNode.insertBefore(fallback, img);
        }
      }
    };

    // すべての画像にエラーハンドラーを追加
    const images = document.querySelectorAll('img[src^="http://"], img[src^="https://"]');
    images.forEach((img) => {
      img.addEventListener('error', handleImageError);
    });

    // クリーンアップ
    return () => {
      images.forEach((img) => {
        img.removeEventListener('error', handleImageError);
      });
    };
  }, []);

  return null;
}
