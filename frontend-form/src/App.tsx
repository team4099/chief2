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
  miscState,
  resetState
} from "./util/globalstate";
const { modalVisible } = modalState;
const { matchKey, alliance, driverStation, teamNumber, setMatchKey, setAlliance, setDriverStation, setTeamNumber } = infoState;
const { 
  setMatchKeyReset, 
  setAllianceReset, 
  setAllianceRadioReset,
  setDriverstationReset,
  setDriverstationRadioReset,
  setTeamNumberReset,
  setAutoNotesReset,
  autoNotesReset,
  setTeleopNotesReset,
  teleopNotesReset,
  setClimbTimeReset,
  setTotalClimbReset,
  setFinalClimbRadioReset,
  setPctDefenseReset,
  setDefenseRatingReset,
  setPctCounterDefenseReset,
  setCounterDefenseRatingReset,
  setDriverRatingReset,
  setMiscNotesReset,
  counterDefenseRatingReset,
  miscNotesReset
} = resetState
const { setCargoPreload, setAutoUpper, setAutoLower, setAutoMissed, setTaxied, setAutoNotes } = autoState
const { setAutoFender, setAutoTarmac, setAutoLaunchpad, setAutoOpposingFender, setAutoOpposingTarmac, setAutoTerminal, setAutoElsewhere } = autoShootingZones
const { setTeleopUpper, setTeleopLower, setTeleopMissed, setTeleopNotes } = teleopState
const { setTeleopFender, setTeleopTarmac, setTeleopLaunchpad, setTeleopOpposingFender, setTeleopOpposingTarmac, setTeleopTerminal, setTeleopElsewhere } = teleopShootingZones
const { setAttemptedLow, setAttemptedMedium, setAttemptedHigh, setAttemptedTraversal, setFinalClimbTime, setFinalClimb } = endgameState
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
const {
  setDefenseTime,
  setDefensePlay,
  setDefendedTime,
  setDefenseCounter,
  setDriverRating,
  setMiscNotes,
  miscNotes
} = miscState

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

        <button
          class="text-white font-bold text-m bg-red-500 hover:bg-red-300 p-4 transition-all rounded-xl my-2 w-full"
          onClick={() => {

            // Info
            setMatchKeyReset(NaN)
            setMatchKey()
            setMatchNumber()
            setMatchFinalNumber()

            setAllianceReset("")
            setAllianceRadioReset(false)
            setAllianceRadioReset()
            setAlliance("")

            setDriverstationReset(NaN)
            setDriverstationRadioReset(false)
            setDriverstationRadioReset()
            setDriverStation(NaN)

            setTeamNumber()
            setTeamNumberReset(NaN)

            // Auto
            setCargoPreload(false)

            setAutoUpper(0)
            setAutoLower(0)
            setAutoMissed(0)

            setTaxied(false)

            setAutoFender(false)
            setAutoTarmac(false)
            setAutoLaunchpad(false)
            setAutoOpposingFender(false)
            setAutoOpposingTarmac(false)
            setAutoTerminal(false)
            setAutoElsewhere(false)

            setAutoNotes(" ")
            setAutoNotesReset(" ")
            setAutoNotesReset("")

            // Teleop
            setTeleopUpper(0)
            setTeleopLower(0)
            setTeleopMissed(0)

            setTeleopFender(false)
            setTeleopTarmac(false)
            setTeleopLaunchpad(false)
            setTeleopOpposingFender(false)
            setTeleopOpposingTarmac(false)
            setTeleopTerminal(false)
            setTeleopElsewhere(false)

            setTeleopNotes(" ")
            setTeleopNotesReset(" ")
            setTeleopNotesReset("")

            //Endgame
            setClimbTimeReset(true)

            setAttemptedLow(false)
            setAttemptedMedium(false)
            setAttemptedHigh(false)
            setAttemptedTraversal(false)

            setFinalClimbTime(0)
            setTotalClimbReset(NaN)

            setFinalClimbRadioReset(false)
            setFinalClimbRadioReset()
            setFinalClimb("No Climb")

            //Misc
            setPctDefenseReset(false)
            setPctDefenseReset()
            setDefenseTime(0.0)

            setDefenseRatingReset(false)
            setDefenseRatingReset()
            setDefensePlay(0)

            setPctCounterDefenseReset(false)
            setPctCounterDefenseReset()
            setDefendedTime(0.0)

            setCounterDefenseRatingReset(true)
            console.log(counterDefenseRatingReset())
            setCounterDefenseRatingReset()
            setDefenseCounter(0)

            setDriverRatingReset(false)
            setDriverRatingReset()
            setDriverRating(1)

            setMiscNotes(" ")
            setMiscNotesReset(" ")
            setMiscNotesReset("")
            console.log(miscNotesReset())

          }}
            
        >
          Clear Form
        </button>
        
      </div>
      {/* {showImageExport() && <ImageExportComponent />} */}
    </div>
  );
};

export default App;
