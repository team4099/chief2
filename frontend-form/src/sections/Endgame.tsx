import { Component, createSignal, For } from "solid-js";
import { RadioWidget, ToggleButton } from "../components";
import { endgameState } from "../util/globalstate";
const {
  attemptedLow,
  setAttemptedLow,
  attemptedMedium,
  setAttemptedMedium,
  attemptedHigh,
  setAttemptedHigh,
  attemptedTraversal,
  setAttemptedTraversal,
  finalClimb,
  setFinalClimb,
  finalClimbTime,
  setFinalClimbTime
} = endgameState;

export const Endgame: Component = () => {
  const [time, setTime] = createSignal(0);
  var cleared = false;
  var needToStartTimer = true;
  var timer = 0

  const [rungs, setRungs] = createSignal([
    {
      text: "Low",
      id: "LowToggle",
      getter: attemptedLow,
      setter: setAttemptedLow,
    },
    {
      text: "Medium",
      id: "MediumToggle",
      getter: attemptedMedium,
      setter: setAttemptedMedium,
    },
    {
      text: "High",
      id: "HighToggle",
      getter: attemptedHigh,
      setter: setAttemptedHigh,
    },
    {
      text: "Traversal",
      id: "TraversalToggle",
      getter: attemptedTraversal,
      setter: setAttemptedTraversal,
    },
  ]);

  return (
    <div class="items-middle justify-center align-center">
      <div class="justify-center align-middle items-center shadow-2xl p-4 m-2 rounded-xl">
        <p class="font-bold text-center text-3xl ">Endgame</p>
        <div class="m-4" style="text-align:center">
          <p class="font-bold">Timer</p>
          <p class="inline">
            {Math.floor(time() / 60)}:
            {(time() % 60).toString().padStart(2, "0")}
          </p>
        </div>

        <div class="grid grid-cols-2 m-4">
          <button
            id="reset-timer"
            class="inline col-span-1 h-12 bg-[#d9d9d9] mr-1"
            onClick={() => {
              setTime(0);
              clearInterval(timer);
              cleared = true;
            }}
          >
            Reset Timer
          </button>
          <button
            id="toggle-timer"
            class="inline col-span-1 h-12 bg-[#d9d9d9] ml-1"
            onClick={() => {
              if (needToStartTimer){
                cleared = false;
                changeText("toggle-timer", "Stop Timer");
                timer = setInterval(() => {
                  setTime(time() + 1);
                }, 1000);
                needToStartTimer = false;
              } else {
                if (!cleared) {
                  cleared = true;
                  clearInterval(timer);
                  changeText("toggle-timer", "Start Timer");
                } else {
                  cleared = false;
                  changeText("toggle-timer", "Stop Timer");
                  timer = setInterval(() => {
                    setTime(time() + 1);
                  }, 1000);
                  
                }
              }
            }}
          >
            Start Timer
          </button>
        </div>

        <div class="m-4">
          <p class="font-bold">Attempted Climb</p>
          <For each={rungs()}>
            {(rung, i) => (
              <ToggleButton
                text={rung.text}
                id={rung.id}
                getter={rung.getter}
                setter={rung.setter}
                stage="AttemptedClimb"
              />
            )}
          </For>
        </div>

        {/* <div style="text-align:center" class="mt-4">
          <p class="font-bold">Final Stats</p>
          <div class="grid grid-cols-5 my-4">
            <p class="col-span-2 float-left">Final Time:</p>
            <input
              type="number"
              id="final-time"
              class="col-span-3 inline border-2 border-[#7b7b7b] rounded-md"
              placeholder="Enter number of seconds"
            />
          </div> */}
        <div class="m-4">
          <p class="font-bold">Final Climb Time</p>
          <input
            type="number"
            id="finalClimbTime"
            class="w-full border-solid border-[#7b7b7b] border rounded-xl p-1"
            onInput={(e) => setFinalClimbTime(e.target.value)}
          />
        </div>
        {/* <div class="grid grid-cols-5 my-4"> */}
        {/* <p class="col-span-2 float-left">Final Climb:</p> */}
        <div class="m-4">
          <RadioWidget
            legend="Final Climb"
            group="finalClimb"
            options={["No Climb", "Low", "Mid", "High", "Traversal"]}
            getter={finalClimb}
            setter={setFinalClimb}
          />
        </div>
        {/* <fieldset class="col-span-3 flex flex-col">
              <label class="w-full flex-1 bg-gray-200 mx-1 rounded-lg py-1 mb-1">
                <input
                  class="float-left ml-2"
                  type="radio"
                  id="low"
                  name="climb"
                  value="low"
                />
                <label for="low" class="float-left ml-4 mt-1 inline">
                  Low
                </label>
              </label>
              <label class="w-full flex-1 bg-gray-200 mx-1 rounded-lg py-1 mb-1">
                <input
                  class="float-left ml-2"
                  type="radio"
                  id="low"
                  name="climb"
                  value="medium"
                />
                <label for="medium" class="float-left ml-4 mt-1 inline">
                  Medium
                </label>
              </label>
              <label class="w-full flex-1 bg-gray-200 mx-1 rounded-lg py-1 mb-1">
                <input
                  class="float-left ml-2"
                  type="radio"
                  id="low"
                  name="climb"
                  value="high"
                />
                <label for="high" class="float-left ml-4 mt-1 inline">
                  High
                </label>
              </label>
              <label class="w-full flex-1 bg-gray-200 mx-1 rounded-lg py-1 mb-1">
                <input
                  class="float-left ml-2"
                  type="radio"
                  id="low"
                  name="climb"
                  value="traversal"
                />
                <label for="traversal" class="float-left ml-4 mt-1 inline">
                  Traversal
                </label>
              </label>
            </fieldset> */}
        {/* </div> */}
      </div>
    </div>
  );
};

function changeText(id, text){
  document.getElementById(id).innerHTML = text;
}
