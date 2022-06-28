import { Component } from "solid-js";
import { modalState, scoutIDState } from "../util/globalstate";
const { modalVisible, showModal } = modalState;
const { scoutID } = scoutIDState;

export const NavBar: Component = () => {
  // const [scoutID] = useScoutID();
  console.log(`scoutID: ${scoutID()}`);
  return (
    <div class="fixed top-0 left-0 right-0 bg-team-black w-full flex flex-row items-center py-2 px-4 z-10 shadow-xl">
      <p class="text-white font-bold text-xl flex-1 ">Chief2</p>
      <button
        onClick={() => {
          showModal();
        }}
        class={`text-white font-bold text-m ${
          scoutID() === "none"
            ? "bg-red-600 hover:bg-red-500"
            : "bg-team-gold hover:bg-team-gold-hover"
        } p-2 transition-all rounded-xl`}
        style={{
          "text-shadow": "4px 4px 12px rgba(0, 0, 0, 0.5)",
        }}
      >
        {scoutID()}
      </button>
    </div>
  );
};
