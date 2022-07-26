/* eslint-disable @typescript-eslint/no-unused-vars */
import { useColorScheme } from 'react-native'
import { useSelector } from 'react-redux'
import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import {
  Fonts,
  Gutters,
  Images,
  Layout,
  themes,
  DefaultVariables,
} from '@/Theme'
import { ThemeState } from '@/Store/Theme'

export default function () {
  // Get the scheme device
  const colorScheme = useColorScheme()

  // Get current theme from the store
  const currentTheme = useSelector(
    (state: { theme: ThemeState }) => state.theme.theme,
  )
  const isDark = useSelector(
    (state: { theme: ThemeState }) => state.theme.darkMode,
  )
  const darkMode = isDark === null ? colorScheme === 'dark' : isDark

  let variables = {}
  let partialTheme = {}
  let darkVariables = {}
  let partialDarkTheme = {}

  if (currentTheme !== 'default') {
    const {
      Variables,
      // @ts-ignore to prevent multiple themes handling
      ...themeConfig
    } = themes[currentTheme] || {}

    variables = Variables
    partialTheme = themeConfig || {}
  }

  if (darkMode) {
    const { Variables, ...darkThemeConfig } =
      themes[`${currentTheme}_dark` as keyof typeof themes] || {}

    darkVariables = Variables
    partialDarkTheme = darkThemeConfig
  }

  console.log(currentTheme, darkMode, partialTheme, partialDarkTheme)

  return {}
}
