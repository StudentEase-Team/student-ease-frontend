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
  },
};

export const themeDark = {
    ...DarkTheme,
    myOwnProperty: true,
    colors: {
        ...DarkTheme.colors,
      },
  };
