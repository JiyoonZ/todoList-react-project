import React from "react";
import ReactDOM from "react-dom/client";
import {RecoilRoot} from "recoil";
import {ThemeProvider} from "styled-components";
import App from "./App";
import {darktheme} from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <ThemeProvider theme={darktheme}>
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
