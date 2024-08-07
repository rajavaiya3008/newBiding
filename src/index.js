import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContextProvider } from "./context/AppContextProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { allRouter } from "./routing/router";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter(allRouter);

root.render(
  <>
    <AppContextProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AppContextProvider>
  </>
);
