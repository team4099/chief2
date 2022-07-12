import { Component } from "solid-js";
import { modalState, scoutIDState } from "../util/globalstate";
const { modalVisible, showModal } = modalState;
const { scoutID } = scoutIDState;

export const NavBar: Component = () => {
  // const [scoutID] = useScoutID();
  console.log(`scoutID: ${scoutID()}`);
  return (
    <div class="fixed top-0 left-0 right-0 bg-[#21262e] w-full flex flex-row items-center py-2 px-4 z-10 shadow-xl">
      <h2 class="text-white font-bold text-2xl flex-1">Chief2</h2>
      <button
        onClick={() => {
          showModal();
        }}
        class={`text-black font-bold text-m ${
          scoutID() === "none"
            ? "bg-red-600 hover:bg-red-500"
            : "bg-[#efae04] hover:bg-[#efae04]"
        } p-2 transition-all rounded-xl`}
      >
        {scoutID()}
      </button>
    </div>
  );
};
