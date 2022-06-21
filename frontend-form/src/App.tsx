import type { Component } from "solid-js";
import { Info } from "./sections/Info";
import { Auto } from "./sections/Auto";
import { Teleop } from "./sections/Teleop";


const App: Component = () => {
  return (
    <div>
      <Info />
      <Auto />
      <Teleop />
    </div>
  );
};

export default App;
