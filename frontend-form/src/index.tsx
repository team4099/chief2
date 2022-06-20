/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import { Component } from "solid-js";
import App from "./App";
import { ScoutIDContextProvider } from "./util/scoutid";

const Index: Component = () => {
  return (
    <ScoutIDContextProvider >
      <App />
    </ScoutIDContextProvider>
  );
};

render(() => <Index />, document.getElementById("root") as HTMLElement);
