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
