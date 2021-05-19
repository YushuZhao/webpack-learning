import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from "react-router-dom";
import Router from './router';

renderWithHotReload(Router);

// HMR js
if (module.hot) {
    module.hot.accept("./router/index.js", () => {
        const Router = require("./router/index.js").default;
        renderWithHotReload(Router);
    });
}

function renderWithHotReload(Router) {
    ReactDOM.render(
        // <AppContainer>
        <BrowserRouter > {/* basename="/ys" */}
            <Router />
        </BrowserRouter>,
        // </AppContainer>,
        document.getElementById("root")
    );
}