import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import ReactDOM from "react-dom/client";
import "./assests/styles/bootstrap.custom.css";
import "./assests/styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<HomeScreen />} />
            <Route path="/products/:id" element={<ProductScreen />} />
        </Route>
    )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
