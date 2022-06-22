import type { Component } from "solid-js";
import { Endgame } from "./sections/Endgame";
import { Info } from "./sections/Info";

const App: Component = () => {
  return (
    <div>
      <Info />
      <Endgame />
    </div>
  );
};

export default App;
