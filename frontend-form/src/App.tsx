import { Component, createContext } from "solid-js";
import { ChangeScoutModal } from "./components/ChangeScoutModal";
import { NavBar } from "./components/NavBar";
import { Info } from "./sections/Info";
import { modalState, scoutIDState } from "./util/globalstate";
const { visible } = modalState;
const { loggedIn } = scoutIDState;

const App: Component = () => {
  return (
    <div>
      <NavBar />
      {(!loggedIn() || visible()) && <ChangeScoutModal />}
      <div class="relative my-100">
        <Info />
        <Info />
        <Info />
        <Info />
      </div>
    </div>
  );
};

export default App;
