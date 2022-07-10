import { Component, createContext, createSignal, createEffect } from "solid-js";
import { ChangeScoutModal, NavBar, QRCodeExportModal } from "./components";
import { Info, Auto, Teleop, Misc, Endgame } from "./sections";
import {
  modalState,
  scoutIDState,
  qrModalState,
  infoState,
} from "./util/globalstate";
const { modalVisible } = modalState;
const { matchKey, alliance, driverStation, teamNumber } = infoState;
const { loggedIn, scoutID } = scoutIDState;
const { qrModal, showQRModal } = qrModalState;

const App: Component = () => {
  var defaultCheck;
  // = [
  //   [matchKey(), "", "Match Key"],
  //   [alliance(), "", "Alliance"],
  //   [driverStation(), undefined, "Driver Station"],
  //   [teamNumber(), undefined, "Team Number"],
  // ];

  createEffect(() => {
    defaultCheck = [
      [matchKey(), "", "Match Key"],
      [alliance(), "", "Alliance"],
      [driverStation(), undefined, "Driver Station"],
      [teamNumber(), undefined, "Team Number"],
    ];
  });

  const [missingStatement, setMissingStatement] = createSignal<string>("");

  var toggleQRCodeModal = true;

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
        <h1 class="mx-auto text-red-500 text-center">{missingStatement()}</h1>
        <button
          class="text-white  font-bold text-m bg-team-gold hover:bg-team-gold-hover p-4 transition-all rounded-xl my-2 w-full"
          onClick={() => {
            toggleQRCodeModal = true;
            defaultCheck.forEach(function (item, index) {
              console.log(item[0], item[1], item[0] == item[1]);
              if (item[0] == item[1]) {
                setMissingStatement(`Please fill in the ${item[2]} to submit.`);
                toggleQRCodeModal = false;
              }
            });

            if (toggleQRCodeModal) {
              setMissingStatement("");
              showQRModal();
            }
          }}
        >
          Generate QR Code for {scoutID()}
        </button>
      </div>
      {/* {showImageExport() && <ImageExportComponent />} */}
    </div>
  );
};

export default App;
