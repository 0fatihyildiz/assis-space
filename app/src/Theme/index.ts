export { default as themes } from './themes'
export { default as Fonts } from './Fonts'
export { default as Gutters } from './Gutters'
export { default as Images } from './Images'
export { default as Layout } from './Layout'
export { default as DefaultVariables } from './Variables'

import Variables from './Variables'

export type ThemeVariables = {
  Colors: typeof Variables.Colors
  FontSize: typeof Variables.FontSize
  MetricsSizes: typeof Variables.MetricsSizes
}

export type Theme<F, G, I, L> = ThemeVariables & {
  Fonts: F
  Gutters: G
  Images: I
  Layout: L
  Variables?: Partial<ThemeVariables>
}
