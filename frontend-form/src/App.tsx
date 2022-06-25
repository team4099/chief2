import type { Component } from "solid-js";
import { Info } from "./sections/Info";
import { Misc } from "./sections/Misc";

const App: Component = () => {
  return (
    <div>
      <Info />
      <Misc />
    </div>
  );
};

export default App;
