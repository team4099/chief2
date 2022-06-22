import { Component } from "solid-js";
import { ToggleButton, ShotWidget } from "../components";

export const Auto: Component = () => {
  return (
    <div class="items-middle justify-center align-center">
      <div class="justify-center align-middle items-center shadow-2xl p-8 m-2 rounded-xl">
        <p class="font-bold text-center text-3xl">Auto</p>
        <div class="m-4">
          <ToggleButton text="Preloaded Cargo" id="preloadToggle" />
        </div>ch

        <div class="m-4">
          <p class="font-bold">Auto Upper Hub</p>
          <ShotWidget />
        </div>

        <div class="m-4">
          <p class="font-bold">Auto Lower Hub</p>
          <ShotWidget />
        </div>

        <div class="m-4">
          <p class="font-bold">Auto Missed</p>
          <ShotWidget />
        </div>

        <div class="m-4">
          <p class="font-bold">Auto Scored HP</p>
          <ShotWidget />
        </div>

        <div class="m-4">
          <ToggleButton text="Taxied?" id="taxiToggle" />
        </div>
      </div>
    </div>
  );
};
