import { experimental_extendTheme as extendTheme } from "@mui/material";
const Header = "120px";
const Footer = "285px";
const Body = `calc(100vh - ${Header} - ${Footer})`;

export const theme = extendTheme({
  customHeight: {
    Header: Header,
    Footer: Footer,
    Body: Body,
  },
  commonColors: "#fa5130",
  bgColor: "#f5f5f5",
  whiteColor: "white",
  colorSchemes: {
    light: {
      palette: {
        // primary: teal, //primary.main,primary.light
        // secondary: deepOrange,
      },
      spacing: (factor) => `${0.25 * factor}rem`,
    },
    dark: {
      palette: {
        // primary: "#fa5130",
        // secondary: "#fa5130",
      },
      spacing: (factor) => `${0.25 * factor}rem`,
    },
  },

  component: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "#fa5130",
        },
        head: {
          backgroundColor: "#1976d2",
          color: "#fff",
          fontWeight: "bold",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.mode === "dark" ? "#90caf9" : "black",
          "&.Mui-focused": {
            color: theme.palette.mode === "dark" ? "red" : "black",
          },
        }),
      },
    },
  },
});
