import { ThemeProvider } from "@liquify/theme";
import * as React from "react";
import * as ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";
import chatReducer from "./store/reducers";
import "bootstrap/dist/css/bootstrap.min.css";
import { config } from "dotenv";
import { resolve } from "path";
import { Provider } from "react-redux";
import { compose, createStore } from "redux";

import "./index.css";
import { logPerformance } from "./logPerformance";
import ChatBot from "./components/ChatBot/ChatBot";

config({ path: resolve(__dirname, ".env") });

const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(chatReducer, composeEnhancers());

logPerformance("blotter-detail-render-started");

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider>
            <ChatBot />
        </ThemeProvider>
    </Provider>,

    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister(); // keep this unregister until we think performance is an issue
