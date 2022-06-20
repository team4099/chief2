import { Component } from "solid-js";

export const Info: Component = () => {
  return (
    <div class="items-middle justify-center align-center">
      <div class="justify-center align-middle items-center shadow-2xl p-8  rounded-xl">
        <p class="font text-center text-3xl ">Info</p>
        <div class="m-4">
          <p class="font-bold">Scout ID</p>
          <input
            type="text"
            id="scoutId"
            onInput={(e) => console.log(e.target.value)}
            class="w-full border-solid border-[#7b7b7b] border rounded-l"
          />
        </div>

        <div class="m-4">
          <p class="font-bold">Match Key</p>
          <div class="flex flex-row">
            <select
              id="matchType"
              class="border-solid border-[#7b7b7b] border rounded-l mr-1"
            >
              <option value="qm">qm</option>
              <option value="qf">qf</option>
              <option value="sf">sf</option>
              <option value="f">f</option>
            </select>
            <input
              type="number"
              id="matchNumber"
              class="w-full border-solid border-[#7b7b7b] border rounded-l ml-1"
            />
          </div>
        </div>

        <div class="m-4">
          <p class="font-bold">Alliance</p>
          <select
            id="alliance"
            class="border-solid border-[#7b7b7b] border rounded-l mr-1 w-full"
            onChange={(e) => console.log(e)}
          >
            <option value="blue">Blue</option>
            <option value="red">Red</option>
          </select>
          <fieldset class="flex flex-row">
            <legend class="font-bold">Alliance</legend>
            <div class="flex-1">
              <input type="radio" id="blue" name="alliance" />
              <label for="blue">Blue</label>
            </div>
            <div>
              <input type="radio" id="red" name="alliance" />
              <label for="red">Red</label>
            </div>
          </fieldset>
        </div>

        <div class="m-4">
          <p class="font-bold">Driver Station</p>
          <select
            id="driverStation"
            class="border-solid border-[#7b7b7b] border rounded-l mr-1 w-full"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <div class="m-4">
          <p class="font-bold">Team Number</p>
          <input
            type="number"
            id="teamNumber"
            class="w-full border-solid border-[#7b7b7b] border rounded-l"
          />
        </div>
      </div>
    </div>
  );
};
