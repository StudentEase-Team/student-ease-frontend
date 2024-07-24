import * as React from 'react';
import {
  MD2LightTheme as LightTheme,
  MD2DarkTheme as DarkTheme,
  PaperProvider,
} from 'react-native-paper';

export const themeLight = {
  ...LightTheme,
  myOwnProperty: true,
  colors: {
    ...LightTheme.colors,
    primary: '#4dabf7',
    icon: '#4dabf7'
  },
};

export const themeDark = {
    ...DarkTheme,
    myOwnProperty: true,
    colors: {
        ...DarkTheme.colors,
        primary: '#9775fa',
        icon: '#9775fa'
      },
  };
