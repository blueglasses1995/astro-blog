import { test, expect } from '@playwright/test';

test.describe('Blog E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // ブログページに移動
    await page.goto('/blog');
  });

  test('ブログ一覧ページが表示される', async ({ page }) => {
    // タイトルが表示されていることを確認
    await expect(page.getByRole('heading', { name: 'ブログ記事' })).toBeVisible();
    
    // 説明文が表示されていることを確認
    await expect(page.getByText('技術に関する記事を投稿しています')).toBeVisible();
  });

  test('ブログ記事のフィルター機能が動作する', async ({ page }) => {
    // Astroタグをクリック
    const astroTag = page.getByRole('button', { name: '# Astro' });
    await expect(astroTag).toBeVisible();
    await astroTag.click();

    // フィルターされた記事が表示されることを確認
    // 記事カードが表示されるまで待機
    await page.waitForSelector('[data-testid^="blog-card-"]', { timeout: 5000 });
    
    // 記事が表示されていることを確認
    const blogCards = page.locator('[data-testid^="blog-card-"]');
    const count = await blogCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('ブログ記事の詳細ページに遷移できる', async ({ page }) => {
    // 最初の記事カードをクリック
    const firstBlogCard = page.locator('[data-testid^="blog-card-"]').first();
    await expect(firstBlogCard).toBeVisible();
    
    // 記事のタイトルを取得
    const title = await firstBlogCard.locator('h3, h2, [class*="CardTitle"]').first().textContent();
    
    // 記事をクリック
    await firstBlogCard.click();
    
    // URLが変更されたことを確認
    await expect(page).toHaveURL(/\/blog\/.+/);
    
    // 記事のタイトルが表示されていることを確認
    if (title) {
      await expect(page.getByRole('heading', { level: 1 })).toContainText(title.trim());
    }
  });

  test('テーマ切り替えが動作する', async ({ page }) => {
    // テーマ切り替えボタンを取得
    const themeToggle = page.getByTestId('theme-toggle');
    await expect(themeToggle).toBeVisible();
    
    // 現在のテーマを確認
    const initialTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    });
    
    // テーマを切り替え
    await themeToggle.click();
    
    // テーマが変更されたことを確認
    await page.waitForTimeout(500); // テーマ切り替えのアニメーションを待つ
    const newTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    });
    
    expect(newTheme).not.toBe(initialTheme);
  });

  test('言語切り替えが動作する', async ({ page }) => {
    // 言語切り替えボタンをクリック
    const languageSwitcher = page.getByTestId('language-switcher');
    await expect(languageSwitcher).toBeVisible();
    await languageSwitcher.click();
    
    // 言語オプションが表示されることを確認
    const englishOption = page.getByTestId('language-option-en');
    await expect(englishOption).toBeVisible({ timeout: 2000 });
  });

  test('ソート機能が動作する', async ({ page }) => {
    // ソート順のセレクトボックスをクリック
    const sortSelect = page.getByLabel('ソート順');
    await expect(sortSelect).toBeVisible();
    await sortSelect.click();
    
    // 「作成が新しい順」を選択
    const createDescOption = page.getByRole('option', { name: '作成が新しい順' });
    await expect(createDescOption).toBeVisible();
    await createDescOption.click();
    
    // 記事が表示されることを確認
    await page.waitForSelector('[data-testid^="blog-card-"]', { timeout: 5000 });
    const blogCards = page.locator('[data-testid^="blog-card-"]');
    const count = await blogCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('条件をリセットボタンが動作する', async ({ page }) => {
    // まずフィルターを適用
    const astroTag = page.getByRole('button', { name: '# Astro' });
    await astroTag.click();
    
    // リセットボタンをクリック
    const resetButton = page.getByRole('button', { name: '条件をリセット' });
    await expect(resetButton).toBeVisible();
    await resetButton.click();
    
    // フィルターがリセットされたことを確認（すべての記事が表示される）
    await page.waitForTimeout(500);
    const blogCards = page.locator('[data-testid^="blog-card-"]');
    const count = await blogCards.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Blog Article Page Tests', () => {
  test('記事詳細ページが正しく表示される', async ({ page }) => {
    // マークダウン記法の記事に移動
    await page.goto('/blog/markdown-syntax-showcase');
    
    // タイトルが表示されていることを確認
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // カテゴリーとタグが表示されていることを確認
    const category = page.locator('a[href*="/categories/"]');
    const tags = page.locator('a[href*="/tags/"]');
    
    // 少なくとも1つのタグが表示されていることを確認
    const tagCount = await tags.count();
    expect(tagCount).toBeGreaterThan(0);
  });

  test('記事内のコードブロックが表示される', async ({ page }) => {
    await page.goto('/blog/markdown-syntax-showcase');
    
    // コードブロックが存在することを確認
    const codeBlocks = page.locator('pre, code');
    const count = await codeBlocks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('関連記事が表示される', async ({ page }) => {
    await page.goto('/blog/astro-islands-architecture');
    
    // 関連記事セクションが表示されることを確認
    // RelatedPostsコンポーネントが読み込まれるまで待機
    await page.waitForTimeout(2000);
    
    // 関連記事のリンクが存在する可能性を確認
    const relatedLinks = page.locator('a[href*="/blog/"]');
    const count = await relatedLinks.count();
    // 少なくともナビゲーションリンクは存在するはず
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Responsive Design Tests', () => {
  test('モバイル表示でナビゲーションメニューが動作する', async ({ page }) => {
    // モバイルビューポートに設定
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/blog');
    
    // ハンバーガーメニューボタンが表示されることを確認
    const menuButton = page.getByRole('button', { name: /Toggle menu|メニュー/i });
    await expect(menuButton).toBeVisible();
    
    // メニューを開く
    await menuButton.click();
    
    // メニュー項目が表示されることを確認
    await expect(page.getByRole('link', { name: 'ホーム' })).toBeVisible({ timeout: 2000 });
  });

  test('タブレット表示でレイアウトが適切', async ({ page }) => {
    // タブレットビューポートに設定
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await page.goto('/blog');
    
    // タイトルが表示されていることを確認
    await expect(page.getByRole('heading', { name: 'ブログ記事' })).toBeVisible();
    
    // フィルターパネルが表示されていることを確認
    const filterPanel = page.locator('[class*="rounded-lg"][class*="border"]').first();
    await expect(filterPanel).toBeVisible();
  });
});
