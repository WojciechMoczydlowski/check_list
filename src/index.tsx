import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import App from "./App";

let render = () => ReactDOM.render(<App />, document.getElementById("root"));

render();

declare var module: { hot: any };
if (module.hot) {
    module.hot.accept("./App", () => {
        render();
    });
}
