import { cyan, red } from "@mui/material/colors";
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
        // primary: red,
        // secondary: orange,
      },
      spacing: (factor) => `${0.25 * factor}rem`,
    },
  },
});
