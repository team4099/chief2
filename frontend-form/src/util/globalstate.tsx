import { createSignal, createMemo, createRoot } from "solid-js";

function createModalState() {
  const [modalVisible, setmodalVisible] = createSignal(true);
  const showModal = () => setmodalVisible(true);
  const hideModal = () => setmodalVisible(false);
  return { modalVisible, showModal, hideModal };
}
export const modalState = createRoot(createModalState);

function createScoutIDState() {
  const [scoutID, setScoutID] = createSignal("none");
  const loggedIn = () => scoutID() !== "none";
  return { scoutID, loggedIn, setScoutID };
}
export const scoutIDState = createRoot(createScoutIDState);

function createInfoState() {
  const [matchKey, setMatchKey] = createSignal("");
  const [alliance, setAlliance] = createSignal("");
  const [driverStation, setDriverStation] = createSignal("");
  const [teamNumber, setTeamNumber] = createSignal("");
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