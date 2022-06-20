import { Component, createSignal } from "solid-js";
import { modalState, scoutIDState } from "../util/globalstate";
const { visible, show, hide } = modalState;
const { scoutID, setScoutID } = scoutIDState;

export const ChangeScoutModal: Component = () => {
  // const [scoutID] = useScoutID();
  const [input, setInput] = createSignal("");

  return (
    <div class="fixed pin z-50 w-full h-full overflow-auto bg-neutral-700/75 flex">
      <div class="relative p-4 bg-white w-full max-w-md my-auto mx-4 flex flex-col rounded-xl">
        <div class="flex flex-row my-2">
          <p class="font-bold text-xl my-2 flex-1">Set Scout</p>
          <button
            onClick={() => {
              hide();
              console.log(visible());
            }}
            class="text-white font-bold text-m bg-red-500 hover:bg-red-400 p-2 transition-all rounded-xl"
          >
            Close
          </button>
        </div>
        <form
          class="flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            setScoutID(input());
            hide();
          }}
        >
          <input
            type="text"
            placeholder="New scout ID"
            pattern="^[A-Za-z]+$"
            onChange={(e) => setInput(e.target.value)}
            class="border-solid border-[#7b7b7b] border rounded-xl p-2 my-2"
          />
          <input
            type="submit"
            value="Set new Scout ID"
            class="text-white font-bold text-m bg-team-gold hover:bg-team-gold-hover p-4 transition-all rounded-xl my-2"
          />
        </form>
      </div>
    </div>
  );
};
