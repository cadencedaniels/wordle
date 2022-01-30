import * as React from "react";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Navigation from "./components/Navigation";
import Game from "./components/Game";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App: React.FC = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Grid
      container
      sx={{
        display: "flex",
        maxWidth: "md",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
      }}
    >
      <Navigation
        colorMode={theme.palette.mode}
        onToggleColorMode={colorMode.toggleColorMode}
      />

      <Game />
    </Grid>
  );
};

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
