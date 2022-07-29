import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GolbalStyle";
import themes from "./shared/themes/themes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { QueryClient, QueryClientProvider } from "react-query";

import "./react-query-types.d.ts";
const root = ReactDOM.createRoot(
     document.getElementById("root") as HTMLElement
);

const client = new QueryClient();
console.log(client);
root.render(
     <React.StrictMode>
          <QueryClientProvider client={client}>
               <Provider store={store as any}>
                    <BrowserRouter>
                         <ThemeProvider theme={themes}>
                              <GlobalStyle />
                              <App />
                         </ThemeProvider>
                    </BrowserRouter>
               </Provider>
          </QueryClientProvider>
     </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
