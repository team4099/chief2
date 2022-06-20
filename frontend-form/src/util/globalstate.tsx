import { createSignal, createMemo, createRoot } from "solid-js";

function createModalState() {
  const [visible, setVisible] = createSignal(true);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  return { visible, show, hide };
}

export const modalState = createRoot(createModalState);

function createScoutIDState() {
  const [scoutID, setScoutID] = createSignal("none");
  const loggedIn = () => scoutID() !== "none";
  return { scoutID, loggedIn, setScoutID };
}
export const scoutIDState = createRoot(createScoutIDState);
