/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  primary: '#2C2C2C',
  background: '#FFFFFF',
  textPrimary: '#1E1E1E',
  textSecondary: '#B3B3B3',
  border: '#D9D9D9',
  buttonText: '#F5F5F5',
  buttonBorder: '#000000',
  error: '#FF4D4F',
  success: '#52C41A',
  warning: '#FAAD14',
  disabled: '#E0E0E0',
};
