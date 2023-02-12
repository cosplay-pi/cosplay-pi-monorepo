import {
  NextUIProvider,
  createTheme,
} from "@nextui-org/react";
import { useLocalStorageState } from "ahooks";
import {
  ReactNode,
  createContext,
  useContext,
} from "react";

export enum ThemeType {
  Light = `light`,
  Dark = `dark`,
};

type UseLightTheme = () => void;
type UseDarkTheme = () => void;

const ThemeContext = createContext<{
  currentThemeType: ThemeType;
  useLightTheme: UseLightTheme;
  useDarkTheme: UseDarkTheme;
}>({
  currentThemeType: ThemeType.Light,
  useLightTheme: () => {},
  useDarkTheme: () => {},
});

export function useThemeContext() {

  return useContext(ThemeContext);
}

const lightTheme = createTheme({
  type: `light`,
});


const darkTheme = createTheme({
  type: `dark`,
});

export function ThemeProvider(
  {
    children,
  }:
    {
      children: ReactNode;
    }
) {

  const [
    currentThemeType,
    setCurrentThemeType,
  ] = useLocalStorageState<ThemeType>(
    `currentThemeType`,
    {
      defaultValue: ThemeType.Light,
    },
  );

  const theme = currentThemeType === ThemeType.Dark
    ? darkTheme
    : lightTheme;

  return (
    <ThemeContext.Provider
      value={{
        currentThemeType,
        useLightTheme: () => setCurrentThemeType(ThemeType.Light),
        useDarkTheme: () => setCurrentThemeType(ThemeType.Dark),
      }}
    >
      <NextUIProvider
        children={children}
        theme={theme}
      />
    </ThemeContext.Provider>
  );
}
