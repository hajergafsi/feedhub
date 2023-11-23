import React, {useCallback, useState} from 'react';
import {ReactNode, FC, useContext, createContext, useMemo} from 'react';
import {useColorScheme} from 'react-native';
import {colors} from '../static/colors';

export enum ETheme {
  AUTO = 'auto',
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ITheme {
  theme: {
    current: ETheme;
    colors: (typeof colors)[ETheme.DARK];
  };

  toggleDark(): void;
  toggleLight(): void;
  toggleAuto(): void;
}

const ThemeContext = createContext<ITheme>({} as ITheme);
const useTheme = (): ITheme => useContext(ThemeContext);

interface IProps {
  children: ReactNode;
}

const ThemeProvider: FC<IProps> = ({children}) => {
  const [mode, setMode] = useState(ETheme.AUTO);
  const auto = useColorScheme();

  const theme = useMemo(() => {
    switch (mode) {
      case ETheme.AUTO:
        return {colors: colors[auto || ETheme.DARK], current: mode};
      default:
        return {colors: colors[mode], current: mode};
    }
  }, [mode, auto]);

  const toggleDark = useCallback(() => {
    setMode(ETheme.DARK);
  }, []);

  const toggleLight = useCallback(() => {
    setMode(ETheme.LIGHT);
  }, []);

  const toggleAuto = useCallback(() => {
    setMode(ETheme.AUTO);
  }, []);

  return (
    <ThemeContext.Provider value={{theme, toggleDark, toggleLight, toggleAuto}}>
      {children}
    </ThemeContext.Provider>
  );
};

export {ThemeProvider, useTheme};
