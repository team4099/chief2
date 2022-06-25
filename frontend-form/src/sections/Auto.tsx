import { Component } from "solid-js";
import { ToggleButton, ShotWidget, ZoneWidget } from "../components";
import { autoState } from "../util/globalstate";
const {
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
} = autoState;

export const Auto: Component = () => {
  return (
    <div class="items-middle justify-center align-center">
      <div class="justify-center align-middle items-center shadow-2xl p-8 m-2 rounded-xl">
        <p class="font-bold text-center text-3xl">Auto</p>
        <div class="m-4">
          <ToggleButton text="Preloaded Cargo?" id="preloadToggle" />
        </div>
        <div class="m-4">
          <p class="font-bold">Auto Upper Hub</p>
          <ShotWidget getter={autoUpper} setter={setAutoUpper} />
        </div>
        <div class="m-4">
          <p class="font-bold">Auto Lower Hub</p>
          <ShotWidget getter={autoLower} setter={setAutoLower} />
        </div>
        <div class="m-4">
          <p class="font-bold">Auto Missed</p>
          <ShotWidget getter={autoMissed} setter={setAutoMissed} />
        </div>
        <div class="m-4">
          <p class="font-bold">Auto Scored HP</p>
          <ShotWidget getter={autoHuman} setter={setAutoHuman} />
        </div>
        <div class="m-4">
          <ToggleButton text="Taxied?" id="taxiToggle" />
        </div>

        <div class="m-4">
          <p class="font-bold">Auto Shooting Zones</p>
          <ZoneWidget stage="auto" />
        </div>

        <div class="m-4">
          <p class="font-bold">Auto Notes</p>
          <textarea
            id=""
            rows="5"
            cols="20"
            class="w-full border border-[#7b7b7b] rounded-lg"
          ></textarea>
        </div>
      </div>
    </div>
  );
};
