import { Component } from "solid-js";
import { ShotWidget } from "../components";
import { teleopState } from "../util/globalstate";
const {
  teleopUpper,
  setTeleopUpper,
  teleopLower,
  setTeleopLower,
  teleopMissed,
  setTeleopMissed,
} = teleopState;
import { Stage, ZoneWidget } from "./ZoneWidget";

export const Teleop: Component = () => {
  return (
    <div class="items-middle justify-center align-center">
      <div class="justify-center align-middle items-center shadow-2xl p-8 m-2 rounded-xl">
        <p class="font-bold text-center text-3xl">Teleop</p>

        <div class="m-4">
          <p class="font-bold">Teleop Upper Hub</p>
          <ShotWidget getter={teleopUpper} setter={setTeleopUpper} />
        </div>

        <div class="m-4">
          <p class="font-bold">Teleop Lower Hub</p>
          <ShotWidget getter={teleopLower} setter={setTeleopLower} />
        </div>

        <div class="m-4">
          <p class="font-bold">Teleop Missed</p>
          <ShotWidget getter={teleopMissed} setter={setTeleopMissed} />
        </div>

        <div class="m-4">
          <p class="font-bold">Teleop Shooting Zones</p>
          <ZoneWidget stage="teleop" />
        </div>

        <div class="m-4">
          <p class="font-bold">Teleop Notes</p>
          <textarea id="" rows="5" cols="20" class="w-full border border-[#7b7b7b] rounded-lg">
          </textarea>
        </div>

      </div>
    </div>
  );
};
