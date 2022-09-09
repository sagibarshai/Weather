import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyle";
import themes from "./shared/themes/themes";
import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store, { StoreState } from "./redux/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./react-query-types.d.ts";
const root = ReactDOM.createRoot(
     document.getElementById("root") as HTMLElement
);

const client = new QueryClient();
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID_AUTH || "";
root.render(
     <QueryClientProvider client={client}>
          <GoogleOAuthProvider clientId="296961613534-v9q17t3j0mejcfhtrj6c07movtmqcvgu.apps.googleusercontent.com">
               <Provider store={store as any}>
                    <BrowserRouter>
                         <ThemeProvider theme={themes}>
                              <GlobalStyle />
                              <App />
                         </ThemeProvider>
                    </BrowserRouter>
               </Provider>
          </GoogleOAuthProvider>
     </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
