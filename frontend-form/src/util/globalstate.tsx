import { createSignal, createMemo, createRoot } from "solid-js";

function createModalState() {
  const [modalVisible, setmodalVisible] = createSignal<boolean>(false);
  const showModal = () => setmodalVisible(true);
  const hideModal = () => setmodalVisible(false);
  return { modalVisible, showModal, hideModal };
}
export const modalState = createRoot(createModalState);

function createScoutIDState() {
  const [scoutID, setScoutID] = createSignal<string>("sd");
  const loggedIn = () => scoutID() !== "none";
  return { scoutID, loggedIn, setScoutID };
}
export const scoutIDState = createRoot(createScoutIDState);

function createInfoState() {
  const [matchKey, setMatchKey] = createSignal<string>("");
  const [alliance, setAlliance] = createSignal<string>("");
  const [driverStation, setDriverStation] = createSignal<number>();
  const [teamNumber, setTeamNumber] = createSignal<number>();
  return {
    matchKey,
    alliance,
    driverStation,
    teamNumber,
    setMatchKey,
    setAlliance,
    setDriverStation,
    setTeamNumber,
  };
}
export const infoState = createRoot(createInfoState);

function createAutoState() {
  const [cargoPreload, setCargoPreload] = createSignal<boolean>();
  const [taxied, setTaxied] = createSignal<boolean>();
  const [autoUpper, setAutoUpper] = createSignal<Number>(0);
  const [autoLower, setAutoLower] = createSignal<Number>(0);
  const [autoMissed, setAutoMissed] = createSignal<Number>(0);
  const [autoHuman, setAutoHuman] = createSignal<Number>(0);
  const [autoNotes, setAutoNotes] = createSignal<string>("");
  return {
    cargoPreload,
    setCargoPreload,
    taxied,
    setTaxied,
    autoUpper,
    setAutoUpper,
    autoLower,
    setAutoLower,
    autoMissed,
    setAutoMissed,
    autoHuman,
    setAutoHuman,
    autoNotes,
    setAutoNotes
  };
}
export const autoState = createRoot(createAutoState);

function createAutoShootingZones() {
  // Fender, Opposing Fender, Tarmac, Opposing Tarmac, Launchpad, Terminal, Elsewhere
  // prefix each of these with "auto"
  const [autoFender, setAutoFender] = createSignal<boolean>();
  const [autoOpposingFender, setAutoOpposingFender] = createSignal<boolean>();
  const [autoTarmac, setAutoTarmac] = createSignal<boolean>();
  const [autoOpposingTarmac, setAutoOpposingTarmac] = createSignal<boolean>();
  const [autoLaunchpad, setAutoLaunchpad] = createSignal<boolean>();
  const [autoTerminal, setAutoTerminal] = createSignal<boolean>();
  const [autoElsewhere, setAutoElsewhere] = createSignal<boolean>();
  return {
    autoFender,
    setAutoFender,
    autoOpposingFender,
    setAutoOpposingFender,
    autoTarmac,
    setAutoTarmac,
    autoOpposingTarmac,
    setAutoOpposingTarmac,
    autoLaunchpad,
    setAutoLaunchpad,
    autoTerminal,
    setAutoTerminal,
    autoElsewhere,
    setAutoElsewhere,
  };
}
export const autoShootingZones = createRoot(createAutoShootingZones);

function createTeleopState() {
  const [teleopUpper, setTeleopUpper] = createSignal<Number>(0);
  const [teleopLower, setTeleopLower] = createSignal<Number>(0);
  const [teleopMissed, setTeleopMissed] = createSignal<Number>(0);
  const [teleopNotes, setTeleopNotes] = createSignal<string>("");

  return {
    teleopUpper,
    setTeleopUpper,
    teleopLower,
    setTeleopLower,
    teleopMissed,
    setTeleopMissed,
    teleopNotes,
    setTeleopNotes
  };
}
export const teleopState = createRoot(createTeleopState);

function createTeleopShootingZones() {
  // Fender, Opposing Fender, Tarmac, Opposing Tarmac, Launchpad, Terminal, Elsewhere
  // prefix each of these with "teleop"
  const [teleopFender, setTeleopFender] = createSignal<boolean>();
  const [teleopOpposingFender, setTeleopOpposingFender] =
    createSignal<boolean>();
  const [teleopTarmac, setTeleopTarmac] = createSignal<boolean>();
  const [teleopOpposingTarmac, setTeleopOpposingTarmac] =
    createSignal<boolean>();
  const [teleopLaunchpad, setTeleopLaunchpad] = createSignal<boolean>();
  const [teleopTerminal, setTeleopTerminal] = createSignal<boolean>();
  const [teleopElsewhere, setTeleopElsewhere] = createSignal<boolean>();
  return {
    teleopFender,
    setTeleopFender,
    teleopOpposingFender,
    setTeleopOpposingFender,
    teleopTarmac,
    setTeleopTarmac,
    teleopOpposingTarmac,
    setTeleopOpposingTarmac,
    teleopLaunchpad,
    setTeleopLaunchpad,
    teleopTerminal,
    setTeleopTerminal,
    teleopElsewhere,
    setTeleopElsewhere,
  };
}
export const teleopShootingZones = createRoot(createTeleopShootingZones);

function createEndgameState() {
  type FinalClimbType = "No Climb" | "Low" | "Mid" | "High" | "Traversal";
  // boolean state for attemptedLow, attemptedMedium, attemptedHigh, attemptedTraversal
  const [attemptedLow, setAttemptedLow] = createSignal<boolean>();
  const [attemptedMedium, setAttemptedMedium] = createSignal<boolean>();
  const [attemptedHigh, setAttemptedHigh] = createSignal<boolean>();
  const [attemptedTraversal, setAttemptedTraversal] = createSignal<boolean>();
  const [finalClimb, setFinalClimb] = createSignal<FinalClimbType>();
  const [finalClimbTime, setFinalClimbTime] = createSignal<number>();
  return {
    attemptedLow,
    setAttemptedLow,
    attemptedMedium,
    setAttemptedMedium,
    attemptedHigh,
    setAttemptedHigh,
    attemptedTraversal,
    setAttemptedTraversal,
    finalClimb,
    setFinalClimb,
    finalClimbTime,
    setFinalClimbTime,
  };
}
export const endgameState = createRoot(createEndgameState);

function createMiscState() {
  // States for defenseTime, defensePlay, defendedTime, and defenseCounter
  const [defenseTime, setDefenseTime] = createSignal<Number>();
  const [defensePlay, setDefensePlay] = createSignal<Number>();
  const [defendedTime, setDefendedTime] = createSignal<Number>();
  const [defenseCounter, setDefenseCounter] = createSignal<Number>();
  const [driverRating, setDriverRating] = createSignal<Number>(3);
  const [miscNotes, setMiscNotes] = createSignal<string>("")
  return {
    defenseTime,
    setDefenseTime,
    defensePlay,
    setDefensePlay,
    defendedTime,
    setDefendedTime,
    defenseCounter,
    setDefenseCounter,
    driverRating,
    setDriverRating,
    miscNotes,
    setMiscNotes
  };
}
export const miscState = createRoot(createMiscState);

function createQRModalState() {
  const [qrModal, setQRModal] = createSignal<boolean>();
  const [qrData, setQRData] = createSignal<string>(
    // Placeholder image
    "data:image/png;base64,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"
  );
  const showQRModal = () => setQRModal(true);
  const hideQRModal = () => setQRModal(false);
  return {
    qrModal,
    qrData,
    setQRData,
    showQRModal,
    hideQRModal,
  };
}
export const qrModalState = createRoot(createQRModalState);
