/*
// hooks/useThemedStyles.ts
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme, ThemeColors } from '../contexts/ThemeContext';

export const useThemedStyles = <T extends StyleSheet.NamedStyles<T>>(
  createStyles: (colors: ThemeColors) => T
) => {
  const { colors } = useTheme();
  
  return useMemo(() => createStyles(colors), [colors]);
};

// Alternative helper for creating themed styles
export const createThemedStyles = <T extends StyleSheet.NamedStyles<T>>(
  createStyles: (colors: ThemeColors) => T
) => {
  return (colors: ThemeColors) => StyleSheet.create(createStyles(colors));
};
*/