/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import { Component } from "solid-js";
import App from "./App";

const Index: Component = () => {
  return (
    <div class="">
      <App />
    </div>
  );
};

render(() => <Index />, document.getElementById("root") as HTMLElement);
