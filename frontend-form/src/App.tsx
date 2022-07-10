import {
  Component,
  createContext,
  createSignal,
  createEffect,
  Accessor,
} from "solid-js";
import { ChangeScoutModal, NavBar, QRCodeExportModal } from "./components";
import { Info, Auto, Teleop, Misc, Endgame } from "./sections";
import {
  modalState,
  scoutIDState,
  qrModalState,
  infoState,
  autoState,
  matchKeyState,
  autoShootingZones,
  teleopState,
  teleopShootingZones,
  endgameState,
  miscState
} from "./util/globalstate";
const { modalVisible } = modalState;
const { matchKey, setMatchKey, alliance, setAlliance, driverStation, setDriverStation, teamNumber, setTeamNumber } = infoState;
const { setCargoPreload, setAutoLower, setAutoUpper, setAutoMissed, setTaxied, setAutoNotes } = autoState;
const { setAutoFender, setAutoLaunchpad, setAutoElsewhere, setAutoTarmac, setAutoOpposingFender, setAutoTerminal, setAutoOpposingTarmac } = autoShootingZones
const { setTeleopLower, setTeleopUpper, setTeleopMissed, setTeleopNotes } = teleopState;
const { setTeleopFender, setTeleopLaunchpad, setTeleopElsewhere, setTeleopTarmac, setTeleopOpposingFender, setTeleopTerminal, setTeleopOpposingTarmac } = teleopShootingZones
const { setAttemptedLow, setAttemptedMedium, setAttemptedHigh, setAttemptedTraversal, setFinalClimb, setFinalClimbTime } = endgameState
const { setDefendedTime, setDefenseTime, setDefenseCounter, setDefensePlay, setDriverRating, setMiscNotes } = miscState
const { loggedIn, scoutID } = scoutIDState;
const { qrModal, showQRModal } = qrModalState;
const {
  matchType,
  setMatchType,
  isFinals,
  setIsFinals,
  matchNumber,
  setMatchNumber,
  matchFinalNumber,
  setMatchFinalNumber,
} = matchKeyState;

const App: Component = () => {
  var defaultCheck;
  // = [
  //   [matchKey(), "", "Match Key"],
  //   [alliance(), "", "Alliance"],
  //   [driverStation(), undefined, "Driver Station"],
  //   [teamNumber(), undefined, "Team Number"],
  // ];

  type SubmitCondition = {
    condition: boolean; // ONLY check if this condition is true
    getter: any; // The value to be checked
    restrict: Array<any>; // The values to restrict
    label: string; //
  };

  type SubmitConditions = Array<SubmitCondition>;
  var submitConditions: SubmitConditions;

  createEffect(() => {
    defaultCheck = [
      [matchKey(), "", "Match Key"],
      [alliance(), "", "Alliance"],
      [driverStation(), undefined, "Driver Station"],
      [teamNumber(), undefined, "Team Number"],
      [],
    ];

    let defaultRestrict = [undefined, ""];

    submitConditions = [
      {
        condition: true,
        getter: matchKey(),
        restrict: defaultRestrict,
        label: "match key",
      },
      {
        condition: true,
        getter: alliance(),
        restrict: defaultRestrict,
        label: "alliance",
      },
      {
        condition: true,
        getter: driverStation(),
        restrict: defaultRestrict,
        label: "driver station",
      },
      {
        condition: true,
        getter: teamNumber(),
        restrict: defaultRestrict,
        label: "team number",
      },
      {
        condition: isFinals(),
        getter: matchFinalNumber(),
        restrict: defaultRestrict,
        label: "finals match number",
      },
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
        <h1 class="mx-auto font-bold text-red-500 text-center">
          {missingStatement()}
        </h1>
        <button
          class="text-white font-bold text-m bg-team-gold hover:bg-team-gold-hover p-4 transition-all rounded-xl my-2 w-full"
          onClick={() => {
            toggleQRCodeModal = true;

            for (let item of submitConditions) {
              if (!item.condition) {
                console.log(
                  `${item.label} condition to check not met. Skipping.`
                );
                continue;
              }
              if (item.restrict.includes(item.getter)) {
                console.log(`${item.label} condition to check met.`);
                setMissingStatement(
                  `Please fill in the ${item.label} to submit.`
                );
                toggleQRCodeModal = false;
                break;
              }
            }

            if (toggleQRCodeModal) {
              setMissingStatement("");
              showQRModal();
            }
          }}
        >
          Generate QR Code for {scoutID()}
        </button>
        {/*
        <button
          class="text-white font-bold text-m bg-red-500 hover:bg-red-300 p-4 transition-all rounded-xl my-2 w-full"
          onClick={() => {
            console.log(alliance())
            setMatchKey("");
            setAlliance("Red");
            setDriverStation();
            setTeamNumber();

            setCargoPreload();
            setAutoLower(0);
            setAutoUpper(0);
            setAutoMissed(0);
            setTaxied();
          }}
            
        >
          Clear Form
        </button>
        */}
      </div>
      {/* {showImageExport() && <ImageExportComponent />} */}
    </div>
  );
};

export default App;
