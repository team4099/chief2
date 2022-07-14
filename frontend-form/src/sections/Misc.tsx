import { Component } from "solid-js";
import { SliderWidget } from "../components/SliderWidget";
import { RadioWidget } from "../components";
import { miscState, resetState } from "../util/globalstate";

const {
  defenseTime,
  setDefenseTime,
  defensePlay,
  setDefensePlay,
  defendedTime,
  setDefendedTime,
  defenseCounter,
  setDefenseCounter,
  driverRating,
  setDriverRating,
  miscNotes,
  setMiscNotes
} = miscState;

const {
  pctDefenseReset,
  defenseRatingReset,
  pctCounterDefenseReset,
  counterDefenseRatingReset,
  driverRatingReset,
  miscNotesReset
} = resetState

export const Misc: Component = () => {
  return (
    <div class="items-middle justify-center align-center">
      <div class="justify-center align-middle items-center shadow-2xl p-4 m-2 rounded-xl">
        <p class="font-bold text-center text-3xl">Miscellaneous</p>

        {/* <div class="mb-10">
          <div class="m-4"> */}
        {/* <p class="font-bold">How much do they play defense?</p> */}
        {/* <SliderWidget />
         */}

        <div class="m-4">
          <RadioWidget
            legend="How much do they play defense?"
            group="defenseTime"
            options={["0.0", ".25", ".5", ".75", "1.0"]}
            getter={defenseTime}
            setter={setDefenseTime}
            checked={pctDefenseReset()}
          />
        </div>
        {/* </div>
          <div class="m-4"> */}
        {/* <p class="font-bold">Defense Rating</p>  */}
        <div class="m-4">
          <RadioWidget
            legend="Defense Rating"
            group="defensePlay"
            options={["0", "1", "2", "3", "4", "5"]}
            getter={defensePlay}
            setter={setDefensePlay}
            checked={defenseRatingReset()}
          />
        </div>
        {/* </div>
        </div>

        <div class="mb-10">
          <div class="m-4"> */}
        {/* <p class="font-bold">How much were they defended?</p> */}
        {/* <SliderWidget /> */}
        <div class="m-4">
          <RadioWidget
            legend="How much were they defended?"
            group="defendedTime"
            options={["0.0", ".25", ".5", ".75", "1.0"]}
            getter={defendedTime}
            setter={setDefendedTime}
            checked={pctCounterDefenseReset()}
          />
        </div>
        <div class="m-4">
          <RadioWidget
            legend="Counter Defense Rating"
            group="defenseRating"
            options={["0", "1", "2", "3", "4", "5"]}
            getter={defenseCounter}
            setter={setDefenseCounter}
            checked={counterDefenseRatingReset()}
          />
        </div>
        {/* </div>
        </div>

        <div class="mb-10"> */}
        <div class="m-4">
        <RadioWidget
            legend="How well do they drive?"
            group="driveCounter"
            options={["1", "2", "3", "4", "5"]}
            getter={driverRating}
            setter={setDriverRating}
            checked={driverRatingReset()}
          />
        </div>

        <div class="m-4">
          <p class="font-bold mb-2">Miscellaneous Notes</p>
          <textarea
            class="text-white bg-black rounded-lg border-primary"
            id=""
            rows="5"
            cols="20"
            class="w-full rounded-md border-[#7b7b7b] focus:round-neutral-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-amber-400"
            onInput={(e) => setMiscNotes(e.target.value)}
            value={miscNotesReset()}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
