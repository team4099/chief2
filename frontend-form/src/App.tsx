import type { Component } from "solid-js";
import { NavBar } from "./components";
import { ChangeScoutModal } from "./components/ChangeScoutModal";
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