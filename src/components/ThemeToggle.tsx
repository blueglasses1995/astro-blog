import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';

type Theme = 'light' | 'dark';

export function ThemeToggle() {
  // システム設定を取得する関数
  const getSystemTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light';
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'light';
  };

  // 初期状態をlocalStorageから読み取る（SSRを考慮してnullを許容）
  // 保存されたテーマがない場合、システム設定をデフォルトとして使用
  const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light';
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    // 保存されたテーマがない場合、システム設定を使用
    return getSystemTheme();
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [mounted, setMounted] = useState(false);
  const [isUsingSystemDefault, setIsUsingSystemDefault] = useState(() => {
    if (typeof window === 'undefined') return true;
    const storedTheme = localStorage.getItem('theme');
    return !storedTheme || (storedTheme !== 'light' && storedTheme !== 'dark');
  });

  const applyTheme = (selectedTheme: Theme) => {
    const root = document.documentElement;
    if (selectedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  useEffect(() => {
    setMounted(true);
    
    // 初期テーマを適用
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);

    // システム設定の変更を監視（システムデフォルトを使用している場合のみ）
    if (isUsingSystemDefault) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = () => {
        const systemTheme = getSystemTheme();
        setTheme(systemTheme);
        applyTheme(systemTheme);
      };

      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }
  }, [isUsingSystemDefault]);

  const toggleTheme = () => {
    // 現在のテーマを取得（システムデフォルトの場合は現在のシステム設定を参照）
    const currentTheme = isUsingSystemDefault ? getSystemTheme() : theme;
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
    
    setTheme(newTheme);
    setIsUsingSystemDefault(false); // ユーザーが明示的に選択したので、システムデフォルトを無効化
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const getIcon = () => {
    if (!mounted) {
      return <Sun className="w-5 h-5" />;
    }
    // システムデフォルトを使用している場合は、現在のシステム設定を参照
    const currentTheme = isUsingSystemDefault ? getSystemTheme() : theme;
    return currentTheme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />;
  };

  const getAriaLabel = () => {
    if (!mounted) return 'Toggle theme';
    return theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        className="w-10 h-10"
      >
        <Sun className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={getAriaLabel()}
      className="w-10 h-10"
    >
      {getIcon()}
    </Button>
  );
}
