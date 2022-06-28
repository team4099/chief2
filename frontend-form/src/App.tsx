import { Component, createContext } from "solid-js";
import { ChangeScoutModal, NavBar } from "./components";
import { Info, Auto, Teleop, Misc, Endgame } from "./sections";
import { modalState, scoutIDState } from "./util/globalstate";
const { modalVisible } = modalState;
const { loggedIn } = scoutIDState;

const App: Component = () => {
  return (
    <div>
      {(!loggedIn() || modalVisible()) && <ChangeScoutModal />}
      <NavBar />
      {/* <div class="relative mb"> */}
      <div class="relative z-0 my-20" />
      <Info />
      <Auto />
      <Teleop />
      <Endgame />
      <Misc />
      {/* <Button>Submit</Button> */}
    </div>
  );
};

export default App;
