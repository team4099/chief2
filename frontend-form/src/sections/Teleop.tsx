import { Component } from "solid-js";
import { ShotWidget, ZoneWidget } from "../components";
import { teleopState } from "../util/globalstate";
const {
  teleopUpper,
  setTeleopUpper,
  teleopLower,
  setTeleopLower,
  teleopMissed,
  setTeleopMissed,
  teleopNotes,
  setTeleopNotes
} = teleopState;

export const Teleop: Component = () => {
  return (
    <div class="items-middle justify-center align-center">
      <div class="justify-center align-middle items-center shadow-2xl p-4 m-2 rounded-xl">
        <p class="mx-4 text-3xl font-bold text-center">Teleop</p>

        <div class="m-4">
          <p class="font-bold pb-1">Teleop Upper Hub</p>
          <ShotWidget getter={teleopUpper} setter={setTeleopUpper} />
        </div>

        <div class="m-4">
          <p class="font-bold pb-1">Teleop Lower Hub</p>
          <ShotWidget getter={teleopLower} setter={setTeleopLower} />
        </div>

        <div class="m-4">
          <p class="font-bold pb-1">Teleop Missed</p>
          <ShotWidget getter={teleopMissed} setter={setTeleopMissed} />
        </div>

        <div class="m-4">
          <p class="font-bold pb-1">Teleop Shooting Zones</p>
          <ZoneWidget stage="teleop" />
        </div>

        <div class="m-4">
          <p class="font-bold pb-1">Teleop Notes</p>
          <textarea
            id=""
            rows="5"
            cols="20"
            class="w-full border-primary bg-black rounded-lg"
            onInput={(e) => setTeleopNotes(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
