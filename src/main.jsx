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

//preview image
import "yet-another-react-lightbox/styles.css";

//swiper
import "swiper/css";

//redux store
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

import { ConfirmProvider } from "material-ui-confirm";

//redux-persist
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
const persistor = persistStore(store);
import { io } from "socket.io-client";
import { apiRoot } from "./utils/constants.js";
export const socketIoInstance = io(apiRoot);

import { injectStore } from "./utils/authorizeAxios.js";
injectStore(store);

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/">
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CssVarsProvider theme={theme}>
          <ConfirmProvider
            defaultOptions={{
              allowClose: false,
            }}
          >
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
          </ConfirmProvider>
        </CssVarsProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
