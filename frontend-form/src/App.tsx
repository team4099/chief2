import { Component, createContext } from "solid-js";
import { ChangeScoutModal, NavBar, QRCodeExportModal } from "./components";
import { Info, Auto, Teleop, Misc, Endgame } from "./sections";
import { modalState, scoutIDState, qrModalState } from "./util/globalstate";
const { modalVisible } = modalState;
const { loggedIn, scoutID } = scoutIDState;
const { qrModal, showQRModal } = qrModalState;

const App: Component = () => {
  return (
    <div>
      {(!loggedIn() || modalVisible()) && <ChangeScoutModal />}
      {qrModal() && <QRCodeExportModal />}
      <NavBar />
      {/* <div class="relative mb"> */}
      <div class="relative z-0 my-20" />
      <Info />
      <Auto />
      <Teleop />
      <Endgame />
      <Misc />
      <div class="px-2">
        <button
          class="text-white  font-bold text-m bg-team-gold hover:bg-team-gold-hover p-4 transition-all rounded-xl my-2 w-full"
          onClick={() => {
            showQRModal();
          }}
        >
          Generate QR Code for {scoutID}
        </button>
      </div>
    </div>
  );
};

export default App;
