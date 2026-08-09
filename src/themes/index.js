import { restaurant } from './restaurant'

// Only this repo's theme ships here - cafe.js/bar.js live in the
// hospitality-templates workspace if you need them.
export const themes = { restaurant }

export const ACTIVE_THEME = 'restaurant'

export function applyTheme(themeName = ACTIVE_THEME) {
  const theme = themes[themeName]
  if (!theme) throw new Error(`Unknown theme: ${themeName}`)
  const root = document.documentElement
  Object.entries(theme.colors).forEach(([key, value]) => root.style.setProperty(key, value))
  Object.entries(theme.fonts).forEach(([key, value]) => root.style.setProperty(key, value))
  root.dataset.theme = theme.name
  return theme
}
