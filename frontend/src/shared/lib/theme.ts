export type Theme = 'light' | 'dark' | 'system'

const THEME_KEY = 'careerflow_theme'

export function getStoredTheme(): Theme {
    return (localStorage.getItem(THEME_KEY) as Theme) || 'system'
}

export function setStoredTheme(theme: Theme) {
    localStorage.setItem(THEME_KEY, theme)
}

export function applyTheme(theme: Theme) {
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList.toggle('dark', isDark)
}