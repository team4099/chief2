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
  const [driverStation, setDriverStation] = createSignal<string>();
  const [teamNumber, setTeamNumber] = createSignal<string>();
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
  const [taxied, setTaxied] = createSignal<boolean>();
  const [autoUpper, setAutoUpper] = createSignal<Number>(0);
  const [autoLower, setAutoLower] = createSignal<Number>(0);
  const [autoMissed, setAutoMissed] = createSignal<Number>(0);
  const [autoHuman, setAutoHuman] = createSignal<Number>(0);
  return {
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
  const [autoOpposingFender, setAutoOpposingFender] = createSignal<boolean>(false);
  const [autoTarmac, setAutoTarmac] = createSignal<boolean>(false);
  const [autoOpposingTarmac, setAutoOpposingTarmac] = createSignal<boolean>(false);
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
