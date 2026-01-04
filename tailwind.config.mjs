/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      lineHeight: {
        'xs': '1.75rem',      // text-xs用: より広い行間
        'sm': '1.75rem',       // text-sm用: より広い行間
        'base': '1.875rem',    // text-base用: より広い行間
        'lg': '2rem',          // text-lg用: より広い行間
        'xl': '2.125rem',      // text-xl用: より広い行間
        '2xl': '2.5rem',       // text-2xl用
        '3xl': '2.75rem',      // text-3xl用
        '4xl': '3rem',         // text-4xl用
        '5xl': '3.5rem',       // text-5xl用
      },
      // Typography プラグインのカスタマイズ
      typography: {
        DEFAULT: {
          css: {
            // 見出し1 (H1) - セクションタイトル（ページタイトルより小さく）
            h1: {
              fontSize: '1.875rem', // 30px（ページタイトルより小さく）
              lineHeight: '1.3',
              marginTop: '2rem',
              marginBottom: '1.25em',
              paddingBottom: '0.4em',
              borderBottom: '1px solid hsl(var(--muted-foreground) / 0.08)',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            },
            // 見出し2 (H2) - 大きな区切り
            h2: {
              fontSize: '1.5rem', // 24px（h1より小さく）
              lineHeight: '1.3',
              marginTop: '3em',
              marginBottom: '1em',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            },
            // 見出し3 (H3) - 小さな区切り
            h3: {
              fontSize: '1.25rem', // 20px（h2より小さく）
              lineHeight: '1.4',
              marginTop: '2em',
              marginBottom: '0.75em',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            },
            // 見出し4 (H4)
            h4: {
              fontSize: '1.125rem', // 18px
              lineHeight: '1.5',
              marginTop: '1.25rem',
              marginBottom: '0.75rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            },
            // 見出し5 (H5)
            h5: {
              fontSize: '1rem', // 16px
              lineHeight: '1.6',
              marginTop: '1rem',
              marginBottom: '0.5rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            },
            // 見出し6 (H6)
            h6: {
              fontSize: '0.875rem', // 14px
              lineHeight: '1.7',
              marginTop: '0.875rem',
              marginBottom: '0.5rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            },
            // 段落
            p: {
              fontSize: '1rem',
              lineHeight: '1.75',
              marginBottom: '1rem',
              maxWidth: '68ch',
            },
            // リスト
            ul: {
              margin: '1em 0',
              paddingLeft: '1.4em',
              fontSize: '1rem',
              listStyleType: 'disc',
            },
            ol: {
              margin: '1em 0',
              paddingLeft: '1.4em',
              fontSize: '1rem',
              listStyleType: 'decimal',
            },
            li: {
              margin: '0.4em 0',
              fontSize: '1rem',
              lineHeight: '1.6',
            },
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
}
