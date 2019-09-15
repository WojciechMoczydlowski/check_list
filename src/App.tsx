import Main from "$pages/Main";
import { MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./styles/global-styles.scss";
import { theme } from "./theme";

const App: React.FunctionComponent = () => (
    <BrowserRouter>
        <MuiThemeProvider theme={theme}>
            <Main />
        </MuiThemeProvider>
    </BrowserRouter>
);

export default React.memo(App);
