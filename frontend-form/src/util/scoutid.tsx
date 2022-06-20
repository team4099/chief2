import { createContext, createSignal, useContext } from "solid-js";

const ScoutIDContext = createContext();

export function ScoutIDContextProvider(props) {
  const [scoutID, setScoutID] = createSignal(props.id || "none"),
    store = [
      scoutID,
      {
        setScoutID
      },
    ];

  return (
    <ScoutIDContext.Provider value={store}>
      {props.children}
    </ScoutIDContext.Provider>
  );
}

export function useScoutID() {
  return useContext(ScoutIDContext);
}
