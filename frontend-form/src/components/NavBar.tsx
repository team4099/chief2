import { Component } from "solid-js";
import { useScoutID } from "../util/scoutid";
import { modalState, scoutIDState } from "../util/globalstate";
const { visible, show } = modalState;
const { scoutID } = scoutIDState;

export const NavBar: Component = () => {
  // const [scoutID] = useScoutID();
  console.log(`scoutID: ${scoutID()}`);
  return (
    <div class="fixed top-0 left-0 right-0 bg-team-black w-full flex flex-row items-center py-2 px-4 z-10 shadow-xl">
      <p class="text-white font-bold text-xl flex-1 ">Chief2</p>
      <button
        onClick={() => {
          show();
        }}
        class={`text-white font-bold text-m ${
          scoutID() === "none"
            ? "bg-red-600 hover:bg-red-500"
            : "bg-team-gold hover:bg-team-gold-hover"
        } p-2 transition-all rounded-xl`}
      >
        {scoutID()}
      </button>
    </div>
  );
};
