import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme.js";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  GlobalStyles,
} from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { ConfirmProvider } from "material-ui-confirm";

//redux store
import store from "./redux/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <CssVarsProvider theme={theme}>
        {/* <ConfirmProvider
          defaultOptions={{
            allowClose: false,
          }}
        > */}
        <GlobalStyles
          styles={{
            a: {
              textDecoration: "none",
            },
          }}
        />
        <CssBaseline />
        <App />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* </ConfirmProvider> */}
      </CssVarsProvider>
    </BrowserRouter>
  </Provider>
);
