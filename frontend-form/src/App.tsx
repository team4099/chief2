import { Component, createContext } from "solid-js";
import { ChangeScoutModal } from "./components/ChangeScoutModal";
import { NavBar } from "./components/NavBar";
import { Info } from "./sections/Info";
import { modalState, scoutIDState } from "./util/globalstate";
const { modalVisible } = modalState;
const { loggedIn } = scoutIDState;

const App: Component = () => {
  return (
    <div>
      <NavBar />
      {(!loggedIn() || modalVisible()) && <ChangeScoutModal />}
      {/* <div class="relative mb"> */}
      <div class="relative z-0 mb-10" />
      <Info />
      {/* </div> */}
    </div>
  );
};

export default App;
