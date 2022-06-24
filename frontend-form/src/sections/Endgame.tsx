import { Component, createSignal, For } from "solid-js";
import { ToggleButton } from "./ToggleButton";


export const Endgame: Component = () => {

  const [time, setTime] = createSignal(0);
  var cleared = false;
  var timer = setInterval(() => {setTime(time() + 1)}, 1000);
  

  const [rungs, setRungs] = createSignal([
    { text: "Low", id: "LowToggle"},
    { text: "Medium", id: "MediumToggle"},
    { text: "High", id: "HighToggle"},
    { text: "Traversal", id: "TraversalToggle"}
  ])

  return (
    <div class="items-middle justify-center align-center">
      <div class="justify-center align-middle items-center shadow-2xl p-8 m-8 rounded-xl">
        <p class="font text-center text-3xl ">Endgame</p>
        <div class="m-4" style="text-align:center">

        <p class="font-bold">Timer</p>
          <p class="inline">{Math.floor(time() / 60)}:{(time() % 60).toString().padStart(2, "0")}</p>

        </div>

        <div class="grid grid-cols-2 mb-4">
          <button id="reset-timer" class="inline col-span-1 h-12 bg-[#d9d9d9] mr-2" onClick={() => {
            setTime(0)
            clearInterval(timer)
            cleared = true
          }}>
            Reset Timer
          </button>
          <button id="reset-timer" class="inline col-span-1 h-12 bg-[#d9d9d9] mr-2" onClick={() => {
            if (!cleared){
              cleared = true
              clearInterval(timer)
            }
            else {
              cleared = false
              timer = setInterval(() => {setTime(time() + 1)}, 1000);
            }
          }}>
            Toggle Timer
          </button>
        </div>

        <div class="text-center mt-4">
          <p class="font-bold">Attempted Climb</p>
          <For each={rungs()}>{(rung, i) => 
              <ToggleButton text={rung.text} id={rung.id} />
          }</For>
        </div>

        <div style="text-align:center" class="mt-4">
          <p class="font-bold">Final Stats</p>
          <div class="grid grid-cols-5 my-4">
            <p class="col-span-2 float-left">Final Time:</p>
            <input
              type="number"
              id="final-time"
              class="col-span-3 inline border-2 border-[#7b7b7b] rounded-md"
              placeholder="Enter number of seconds"
            />
          </div>
          <div class="grid grid-cols-5 my-4">
            <p class="col-span-2 float-left">Final Climb:</p>
            <fieldset class="col-span-3 flex flex-col">
              <label class="w-full flex-1 bg-gray-200 mx-1 rounded-lg py-1 mb-1">
                <input class="float-left ml-2" type="radio" id="low" name="climb" value="low"/>
                <label for="low" class="float-left ml-4 mt-1 inline">Low</label>
              </label>
              <label class="w-full flex-1 bg-gray-200 mx-1 rounded-lg py-1 mb-1">
                <input class="float-left ml-2" type="radio" id="low" name="climb" value="medium"/>
                <label for="medium" class="float-left ml-4 mt-1 inline">Medium</label>
              </label>
              <label class="w-full flex-1 bg-gray-200 mx-1 rounded-lg py-1 mb-1">
                <input class="float-left ml-2" type="radio" id="low" name="climb" value="high"/>
                <label for="high" class="float-left ml-4 mt-1 inline">High</label>
              </label>
              <label class="w-full flex-1 bg-gray-200 mx-1 rounded-lg py-1 mb-1">
                <input class="float-left ml-2" type="radio" id="low" name="climb" value="traversal"/>
                <label for="traversal" class="float-left ml-4 mt-1 inline">Traversal</label>
              </label>
            </fieldset>
          </div>
        </div>
      </div>
    </div>

  );
};