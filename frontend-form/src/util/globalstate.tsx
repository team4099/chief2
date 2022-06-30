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
  const [matchKey, setMatchKey] = createSignal<string>();
  const [alliance, setAlliance] = createSignal<string>();
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
  };
}
export const autoState = createRoot(createAutoState);

function createAutoShootingZones() {
  // Fender, Opposing Fender, Tarmac, Opposing Tarmac, Launchpad, Terminal, Elsewhere
  // prefix each of these with "auto"
  const [autoFender, setAutoFender] = createSignal<boolean>(false);
  const [autoOpposingFender, setAutoOpposingFender] =
    createSignal<boolean>(false);
  const [autoTarmac, setAutoTarmac] = createSignal<boolean>(false);
  const [autoOpposingTarmac, setAutoOpposingTarmac] =
    createSignal<boolean>(false);
  const [autoLaunchpad, setAutoLaunchpad] = createSignal<boolean>(false);
  const [autoTerminal, setAutoTerminal] = createSignal<boolean>(false);
  const [autoElsewhere, setAutoElsewhere] = createSignal<boolean>(false);
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
  return {
    teleopUpper,
    setTeleopUpper,
    teleopLower,
    setTeleopLower,
    teleopMissed,
    setTeleopMissed,
  };
}
export const teleopState = createRoot(createTeleopState);

function createTeleopShootingZones() {
  // Fender, Opposing Fender, Tarmac, Opposing Tarmac, Launchpad, Terminal, Elsewhere
  // prefix each of these with "teleop"
  const [teleopFender, setTeleopFender] = createSignal<boolean>(false);
  const [teleopOpposingFender, setTeleopOpposingFender] =
    createSignal<boolean>();
  const [teleopTarmac, setTeleopTarmac] = createSignal<boolean>(false);
  const [teleopOpposingTarmac, setTeleopOpposingTarmac] =
    createSignal<boolean>();
  const [teleopLaunchpad, setTeleopLaunchpad] = createSignal<boolean>(false);
  const [teleopTerminal, setTeleopTerminal] = createSignal<boolean>(false);
  const [teleopElsewhere, setTeleopElsewhere] = createSignal<boolean>(false);
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
  const [attemptedLow, setAttemptedLow] = createSignal<boolean>(false);
  const [attemptedMedium, setAttemptedMedium] = createSignal<boolean>(false);
  const [attemptedHigh, setAttemptedHigh] = createSignal<boolean>(false);
  const [attemptedTraversal, setAttemptedTraversal] =
    createSignal<boolean>(false);
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
  const [defenseTime, setDefenseTime] = createSignal<Number>(0);
  const [defensePlay, setDefensePlay] = createSignal<Number>(0);
  const [defendedTime, setDefendedTime] = createSignal<Number>(0);
  const [defenseCounter, setDefenseCounter] = createSignal<Number>(0);
  const [driverRating, setDriverRating] = createSignal<Number>(3);
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
  };
}
export const miscState = createRoot(createMiscState);
