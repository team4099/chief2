import { Accessor, Component, createSignal, Setter } from "solid-js";
import { scoutIDState, infoState } from "../util/globalstate";
const { scoutID } = scoutIDState;
const { matchKey, setMatchKey, setAlliance, setDriverStation, setTeamNumber } =
  infoState;

type MatchKeyFieldProps = {
  matchKeyGetter: Accessor<string>;
  matchKeySetter: Setter<string>;
};

const MatchKeyField: Component = ({
  matchKeyGetter,
  matchKeySetter,
}: MatchKeyFieldProps) => {
  const [matchType, setMatchType] = createSignal<"qm" | "qf" | "sf" | "f">(
    "qm"
  );
  const [isFinals, setIsFinals] = createSignal<boolean>(false);
  const [matchNumber, setMatchNumber] = createSignal<number>();
  const [matchFinalNumber, setMatchFinalNumber] = createSignal<number>();

  function updateMatchKey() {
    let k: string = `${matchType()}${matchNumber()}`;
    if (isFinals()) k += `m${matchFinalNumber()}`;
    matchKeySetter(k);
    console.log(k);
    console.log("State var match key", matchKey());
  }

  return (
    <div class="flex flex-row">
      <select
        id="matchType"
        class="border-solid border-[#7b7b7b] border rounded-l-xl mr-1 p-1"
        onChange={(e) => {
          setMatchType(e.target.value);
          if (matchType().includes("f")) setIsFinals(true);
          else setIsFinals(false);
          updateMatchKey();
        }}
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
          setMatchNumber(e.target.value);
          updateMatchKey();
        }}
        class="w-full border-solid border-[#7b7b7b] border rounded-r-xl ml-1 p-1"
      />
      {isFinals() && (
        <input
          type="number"
          id="finalMatchNumber"
          onInput={(e) => {
            setMatchFinalNumber(e.target.value);
            updateMatchKey();
          }}
          class="w-full border-solid border-[#7b7b7b] border rounded-r-xl ml-1 p-1"
        />
      )}
    </div>
  );
};

export const Info: Component = () => {
  // const [matchType, setMatchType] = createSignal<MatchType>();
  // const [matchRound, setMatchRound] = createSignal<number>();
  // const [matchFinalsRound, setMatchFinalsRound] = createSignal<number>();

  // const [showFinalMatch, setShowFinalMatch] = createSignal<boolean>(false);
  return (
    <div class="items-middle justify-center align-center">
      <div class="justify-center align-middle items-center shadow-2xl p-4 m-2 rounded-xl">
        <p class="text-center text-2xl font-bold ">Info</p>
        <div class="m-4">
          <p class="font-bold">
            Match Key <span class="text-red-500">*</span>
          </p>
          <MatchKeyField matchKeySetter={setMatchKey} />
        </div>

        <div class="m-4">
          <fieldset
            class="flex flex-row"
            onChange={(e) => setAlliance(e.target.value)}
          >
            <legend class="font-bold">
              Alliance <span class="text-red-500">*</span>
            </legend>
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
          <fieldset
            class="flex flex-row"
            onChange={(e) => setDriverStation(e.target.value)}
          >
            <legend class="font-bold">
              Driver Station <span class="text-red-500">*</span>
            </legend>
            <label class="flex-1 bg-gray-200 mx-1 rounded-xl px-2 py-1">
              <input type="radio" id="station-1" name="station" value={1} />
              <label for="station-1">1</label>
            </label>
            <label class="flex-1 bg-gray-200 mx-1 rounded-xl px-2 py-1">
              <input type="radio" id="station-2" name="station" value={2} />
              <label for="station-2">2</label>
            </label>
            <label class="flex-1 bg-gray-200 mx-1 rounded-xl px-2 py-1">
              <input type="radio" id="station-3" name="station" value={3} />
              <label for="station-3">3</label>
            </label>
          </fieldset>
        </div>

        <div class="m-4">
          <p class="font-bold">
            Team Number <span class="text-red-500">*</span>
          </p>
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
