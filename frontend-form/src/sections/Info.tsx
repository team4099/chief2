import { Component, createSignal } from "solid-js";
import { scoutIDState, infoState } from "../util/globalstate";
const { scoutID } = scoutIDState;
const {
  setMatchKey,
  setAlliance,
  setDriverStation,
  setTeamNumber,
} = infoState;

export const Info: Component = () => {
  const [matchType, setMatchType] = createSignal("");
  return (
    <div class="items-middle justify-center align-center">
      <div class="justify-center align-middle items-center shadow-2xl p-8 m-2 rounded-xl">
        <p class="font text-center text-3xl font-bold ">Info</p>
        {/* <div class="m-4">
          <p class="font-bold">Scout ID</p>
          <input
            type="text"
            id="scoutId"
            value={scoutID()}
            onInput={(e) => console.log(e.target.value)}
            class="w-full border-solid border-[#7b7b7b] border rounded-xl p-1"
            required
          />
        </div> */}

        <div class="m-4">
          <p class="font-bold">Match Key</p>
          <div class="flex flex-row">
            <select
              id="matchType"
              class="border-solid border-[#7b7b7b] border rounded-l-xl mr-1 p-1"
            >
              <option value="qm">qm</option>
              <option value="qf">qf</option>
              <option value="sf">sf</option>
              <option value="f">f</option>
            </select>
            <input
              type="number"
              id="matchNumber"
              onInput={(e) => {
                setMatchKey(
                  `${document.getElementById("matchType").value}${
                    e.target.value
                  }`
                );
              }}
              class="w-full border-solid border-[#7b7b7b] border rounded-r-xl ml-1 p-1"
            />
          </div>
        </div>

        <div class="m-4">
          {/* <p class="font-bold">Alliance</p> */}
          {/* <select
            id="alliance"
            class="border-solid border-[#7b7b7b] border rounded-xl mr-1 w-full p-1"
            onChange={(e) => console.log(e)}
          >
            <option value="blue">Blue</option>
            <option value="red">Red</option>
          </select> */}
          <fieldset
            class="flex flex-row"
            onChange={(e) => setAlliance(e.target.value)}
          >
            <legend class="font-bold">Alliance</legend>
            <label class="flex-1 bg-blue-300 mr-1 rounded-xl px-2 py-1 transition-colors checked:bg-blue-500">
              <input type="radio" id="blue" name="alliance" value="Blue" />
              <label for="blue">Blue</label>
            </label>
            <label class="flex-1 bg-red-300 ml-1 rounded-xl px-2 py-1 transition-colors checked:bg-red-500">
              <input type="radio" id="red" name="alliance" value="Red" />
              <label for="red">Red</label>
            </label>
          </fieldset>
        </div>

        <div class="m-4">
          {/* <p class="font-bold">Driver Station</p> */}
          {/* <select
            id="driverStation"
            class="border-solid border-[#7b7b7b] border rounded-l mr-1 w-full"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select> */}
          <fieldset
            class="flex flex-row"
            onChange={(e) => setDriverStation(e.target.value)}
          >
            <legend class="font-bold">Driver Station</legend>
            <label class="flex-1 bg-gray-200 mx-1 rounded-xl px-2 py-1">
              <input type="radio" id="station-1" name="station" value={1} />
              <label for="station-1">1</label>
            </label>
            <label class="flex-1 bg-gray-200 mx-1 rounded-xl px-2 py-1">
              <input type="radio" id="station-2" name="station" />
              <label for="station-2">2</label>
            </label>
            <label class="flex-1 bg-gray-200 mx-1 rounded-xl px-2 py-1">
              <input type="radio" id="station-3" name="station" />
              <label for="station-3">3</label>
            </label>
          </fieldset>
        </div>

        <div class="m-4">
          <p class="font-bold">Team Number</p>
          <input
            type="number"
            id="teamNumber"
            class="w-full border-solid border-[#7b7b7b] border rounded-xl p-1"
            onInput={(e) => setTeamNumber(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
