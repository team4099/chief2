import { Component } from "solid-js";
import { SliderWidget } from "./SliderWidget";
import { RadioWidget } from "./RadioWidget";

export const Misc: Component = () => {
  return (
    <div class="items-middle justify-center align-center">
      <div class="justify-center align-middle items-center shadow-2xl p-8 m-2 rounded-xl">
        <p class="font text-center text-3xl ">Misc</p>

        {/* <div class="mb-10">
          <div class="m-4"> */}
        {/* <p class="font-bold">How much do they play defense?</p> */}
        {/* <SliderWidget />
         */}
        <RadioWidget
          legend="How much do they play defense?"
          group="defenseTime"
          options={[".25", ".5", ".75", "1.0"]}
        />
        {/* </div>
          <div class="m-4"> */}
        {/* <p class="font-bold">Defense Rating</p>  */}
        <RadioWidget
          legend="Defense Rating"
          group="defensePlay"
          options={["1", "2", "3", "4", "5"]}
        />
        {/* </div>
        </div>

        <div class="mb-10">
          <div class="m-4"> */}
        {/* <p class="font-bold">How much were they defended?</p> */}
        {/* <SliderWidget /> */}
        <RadioWidget
          legend="How much were they defended?"
          group="defendedTime"
          options={[".25", ".5", ".75", "1.0"]}
        />
        {/* </div>

          <div class="m-4"> */}
        <RadioWidget
          legend="Counter Defense Rating"
          group="defenseCounter"
          options={["1", "2", "3", "4", "5"]}
        />
        {/* </div>
        </div>

        <div class="mb-10">
          <div class="m-4"> */}
        <p class="font-bold mb-2">How well do they drive?</p>
        <select
          id="alliance"
          class="border-solid border rounded-l mr-1 w-full focus:border-neutral-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-amber-400"
        >
          <option value="Very Poor" class="bg-amber-400">
            Very Poor
          </option>
          <option value="Poor">Poor</option>
          <option value="Average">Average</option>
          <option value="">Poor</option>
          <option value="Very Poor">Very Poor</option>
          <option value="Good">Good</option>
          <option value="Very Good">Very Good</option>
        </select>
        {/* </div>
        </div>

        <div class="m-4"> */}
        <p class="font-bold mb-2">Miscellaneous Notes</p>
        <textarea
          id=""
          rows="5"
          cols="20"
          class="w-full rounded-md border-[#7b7b7b] focus:round-neutral-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-amber-400"
        ></textarea>
        {/* </div> */}
      </div>
    </div>
  );
};
