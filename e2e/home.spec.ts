import { test, expect } from '@playwright/test';

test.describe('Home Page E2E Tests', () => {
  test('ホームページが正しく表示される', async ({ page }) => {
    await page.goto('/');
    
    // メインタイトルが表示されていることを確認
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    
    // ナビゲーションバーが表示されていることを確認
    const nav = page.getByRole('banner');
    await expect(nav).toBeVisible();
    
    // Portfolioロゴが表示されていることを確認
    await expect(page.getByRole('link', { name: /Portfolio/i })).toBeVisible();
  });

  test('ナビゲーションリンクが動作する', async ({ page }) => {
    await page.goto('/');
    
    // ブログリンクをクリック
    const blogLink = page.getByRole('link', { name: 'ブログ' });
    await expect(blogLink).toBeVisible();
    await blogLink.click();
    
    // ブログページに遷移したことを確認
    await expect(page).toHaveURL(/\/blog/);
  });

  test('ポートフォリオセクションが表示される', async ({ page }) => {
    await page.goto('/');
    
    // ポートフォリオセクションが存在することを確認
    const portfolioSection = page.locator('section').filter({ hasText: /プロジェクト|Portfolio/i });
    await expect(portfolioSection.first()).toBeVisible();
  });

  test('最新記事セクションが表示される', async ({ page }) => {
    await page.goto('/');
    
    // 最新記事セクションが存在することを確認
    const blogSection = page.locator('section').filter({ hasText: /記事|Blog/i });
    await expect(blogSection.first()).toBeVisible();
    
    // 記事カードが表示されていることを確認
    const blogCards = page.locator('[data-testid^="blog-card-"]');
    const count = await blogCards.count();
    expect(count).toBeGreaterThan(0);
  });
});
