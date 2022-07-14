import localforage from "localforage";
import { Component, createSignal } from "solid-js";
import { modalState, scoutIDState } from "../util/globalstate";
const { modalVisible, showModal, hideModal } = modalState;
const { scoutID, setScoutID } = scoutIDState;

export const ChangeScoutModal: Component = () => {
  // const [scoutID] = useScoutID();
  const [input, setInput] = createSignal("");

  const names = [
    "aran",
    "aarav",
    "chris",
    "shashwat",
    "rachel",
    "crystal",
    "shayaan",
    "jay",
    "sydney",
    "trevor",
    "arav",
    "matthew",
    "neel",
    "julia",
    "brandon",
    "saraansh",
    "sarah",
    "ryan",
    "pranav",
    "aman",
    "parth",
    "helix",
    "other",
    "parent"
  ]

  return (
    <div class="text-white fixed pin z-50 w-full h-full overflow-auto bg-neutral-700/75 flex px-2">
      <div class="mx-auto relative p-4 bg-black w-full max-w-md my-auto flex flex-col rounded-xl">
        <div class="flex flex-row my-2">
          <p class="font-bold text-xl my-2 flex-1">Set Scout</p>
          <button
            onClick={() => {
              hideModal();
              console.log(modalVisible());
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

            if (input() === "") {
              alert("Please enter a scout ID");
              e.preventDefault();
              return;
            }
            else if (!names.includes(input())) {
              alert("scout ID not found");
              e.preventDefault();
              return;
            }

            setScoutID(input());
            localforage.setItem("scoutID", scoutID());
            hideModal();
          }}
        >
          <input
            type="text"
            placeholder="New scout ID"
            pattern="^[A-Za-z]+$"
            onChange={(e) => setInput(e.target.value)}
            class="border-primary rounded-xl p-2 my-2 bg-black text-white"
          />
          <input
            id="scout-submit"
            type="submit"
            value="Set new Scout ID"
            class="text-black font-bold text-m bg-[#efae04] hover:bg-[#efae04] p-4 transition-all rounded-xl my-2"
          />
        </form>
      </div>
    </div>
  );
};
