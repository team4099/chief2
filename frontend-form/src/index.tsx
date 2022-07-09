/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import App from "./App";
// import { registerSW } from "virtual:pwa-register";

// const updateSW = registerSW({
//   onRegisterError(error) {
//     console.log(error)
//   },
// });

render(() => <App />, document.getElementById("root") as HTMLElement);
