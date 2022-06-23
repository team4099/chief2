import { Component } from "solid-js";
import { ToggleButton } from "./ToggleButton"
import { ShotWidget } from "./ShotWidget";
import { ZoneWidget } from "./ZoneWidget";

export const Auto: Component = () => {

  return (
    <div class="items-middle justify-center align-center">
      <div class="justify-center align-middle items-center shadow-2xl p-8 m-8 rounded-xl">
        <p class="font text-center text-3xl ">Auto</p>
        <div class="m-4">
          <ToggleButton text="Preloaded Cargo?" id="preloadToggle" />
        </div>

        <div class="m-4">
          <p class="font-bold">Auto Upper Hub</p>
          <ShotWidget/>
        </div>

        <div class="m-4">
          <p class="font-bold">Auto Lower Hub</p>
          <ShotWidget/>
        </div>

        <div class="m-4">
          <p class="font-bold">Auto Missed</p>
          <ShotWidget/>
        </div>

        <div class="m-4">
          <p class="font-bold">Auto Scored HP</p>
          <ShotWidget/>
        </div>

        <div class="m-4">
          <ToggleButton text="Taxied?" id="taxiToggle" />
        </div>

        <div class="m-4">
          <p class="font-bold">Auto Shooting Zones</p>
          <ZoneWidget />
        </div>

        <div class="m-4">
          <p class="font-bold">Auto Notes</p>
          <textarea id="" rows="5" cols="20" class="w-full border border-[#7b7b7b] rounded-lg">
          </textarea>
        </div>
      </div>
    </div>
  );
};
