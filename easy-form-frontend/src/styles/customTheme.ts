import type { GlobalThemeOverrides } from 'naive-ui'

const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    // primaryColor: '',
    // textColorBase: 'var(--color-foreground)',
  },
}

const darkThemeOverrides : GlobalThemeOverrides = {
  common: {
    // primaryColor: 'var(--color-primary)',
    // textColorBase: 'var(--color-foreground)',
  },
}

export default {
  light: lightThemeOverrides,
  dark: darkThemeOverrides,
}
