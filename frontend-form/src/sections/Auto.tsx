import { Component } from "solid-js";
import { ToggleButton, ShotWidget, ZoneWidget } from "../components";
import { autoState } from "../util/globalstate";
const {
  cargoPreload,
  setCargoPreload,
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
  autoNotes,
  setAutoNotes
} = autoState;

export const Auto: Component = () => {
  return (
    <div class="items-middle justify-center align-center">
      <div class="justify-center align-middle items-center shadow-2xl p-4 m-2 rounded-xl">
        <p class="mx-4 text-3xl font-bold">Auto</p>
        <div class="m-4">
          <ToggleButton
            text="Preloaded Cargo?"
            id="preloadToggle"
            getter={cargoPreload}
            setter={setCargoPreload}
          />
        </div>
        <div class="m-4">
          <p class="font-bold pb-1">Auto Upper Hub</p>
          <ShotWidget getter={autoUpper} setter={setAutoUpper} />
        </div>
        <div class="m-4">
          <p class="font-bold pb-1">Auto Lower Hub</p>
          <ShotWidget getter={autoLower} setter={setAutoLower} />
        </div>
        <div class="m-4">
          <p class="font-bold pb-1">Auto Missed</p>
          <ShotWidget getter={autoMissed} setter={setAutoMissed} />
        </div>
        {/* <div class="m-4">
          <p class="font-bold">Auto Scored HP</p>
          <ShotWidget getter={autoHuman} setter={setAutoHuman} />
        </div> */}
        <div class="m-4">
          <ToggleButton
            text="Taxied?"
            id="taxiToggle"
            getter={taxied}
            setter={setTaxied}
          />
        </div>

        <div class="m-4">
          <p class="font-bold pb-1">Auto Shooting Zones</p>
          <ZoneWidget stage="auto" />
        </div>

        <div class="m-4">
          <p class="font-bold">Auto Notes</p>
          <textarea
            id=""
            rows="5"
            cols="20"
            class="w-full border-primary bg-black rounded-lg "
            onInput={(e) => setAutoNotes(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
