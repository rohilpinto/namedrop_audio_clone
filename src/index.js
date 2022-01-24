import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";

import ShowDrop from "./ShowDrop";

import "./style.css";

ReactDOM.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path=":id" element={<ShowDrop />} />
      </Routes>
    </BrowserRouter>
  </>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
