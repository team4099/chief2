import { Accessor, Component, createSignal, Setter } from "solid-js";
import { scoutIDState, matchKeyState, infoState, resetState } from "../util/globalstate";
const { scoutID } = scoutIDState;
const {
  matchType,
  setMatchType,
  isFinals,
  setIsFinals,
  matchNumber,
  setMatchNumber,
  matchFinalNumber,
  setMatchFinalNumber,
} = matchKeyState;

const {
  matchKeyReset,
  allianceReset,
  allianceRadioReset,
  driverstationReset,
  driverstationRadioReset,
  teamNumberReset
} = resetState

const { matchKey, setMatchKey, setAlliance, setDriverStation, setTeamNumber } = infoState;

type MatchKeyFieldProps = {
  matchKeyGetter: Accessor<string>;
  matchKeySetter: Setter<string>;
};

const MatchKeyField: Component = ({
  matchKeyGetter,
  matchKeySetter,
}: MatchKeyFieldProps) => {
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
        class="rounded-l-lg text-white border-primary pl-1 h-10 w-20 bg-black"
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
        value={matchKeyReset()}
        class="w-full rounded-r-md ml-1 p-1 h-10 border-primary pl-1 bg-black"
      />
      {isFinals() && (
        <input
          type="number"
          id="finalMatchNumber"
          onInput={(e) => {
            setMatchFinalNumber(e.target.value);
            updateMatchKey();
          }}
          value={matchKeyReset()}
          class="w-full rounded-md ml-1 p-1 h-10 border-primary pl-1 bg-black"
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
    <div class="items-middle justify-center align-center pt-16">
      <div class="justify-center align-middle items-center shadow-2xl p-4 m-2 rounded-xl">
        <p class="mx-4 text-3xl font-bold text-center">Info</p>
        <div class="m-4">
          <p class="font-bold pb-1">
            Match Key <span class="text-red-500">*</span>
          </p>
          <MatchKeyField matchKeySetter={setMatchKey} />
        </div>

        <div class="m-4">
          <fieldset
            class="flex flex-row"
            onChange={(e) => setAlliance(e.target.value)}
            value={allianceReset()}
          >
            <legend class="font-bold pb-1">
              Alliance <span class="text-red-500">*</span>
            </legend>
            <label class="flex-1 bg-[#529bf5] mr-1 rounded-xl px-2 py-1 font-semibold transition-colors checked:bg-blue-500 h-10">
              <div class="inline-block align-middle pt-1">
                <input type="radio" id="blue" name="alliance" value="Blue" checked={allianceRadioReset()}/>
                <label for="blue" class="pl-2">Blue</label>
              </div>
            </label>
            <label class="flex-1 bg-[#e5534b] ml-1 rounded-xl px-2 py-1 font-semibold transition-colors checked:bg-red-500 h-10">
              <div class="inline-block align-middle pt-1">
                <input type="radio" id="red" name="alliance" value="Red" checked={allianceRadioReset()}/>
                <label for="red" class="pl-2">Red </label>
              </div>
            </label>
          </fieldset>
        </div>

        <div class="m-4">
          <fieldset
            class="flex flex-row"
            onChange={(e) => setDriverStation(e.target.value)}
            value={driverstationReset()}
          >
            <legend class="font-bold pb-1">
              Driver Station <span class="text-red-500">*</span>
            </legend>
            <label class="flex-1 bg-black border-primary mx-1 rounded-xl px-2 py-1 h-9">
              <input type="radio" id="station-1" name="station" value={1} checked={driverstationRadioReset()}/>
              <label for="station-1">1</label>
            </label>
            <label class="flex-1 bg-black border-primary mx-1 rounded-xl px-2 py-1 h-9">
              <input type="radio" id="station-2" name="station" value={2} checked={driverstationRadioReset()}/>
              <label for="station-2">2</label>
            </label>
            <label class="flex-1 bg-black border-primary mx-1 rounded-xl px-2 py-1 h-9">
              <input type="radio" id="station-3" name="station" value={3} checked={driverstationRadioReset()}/>
              <label for="station-3">3</label>
            </label>
          </fieldset>
        </div>

        <div class="m-4">
          <p class="font-bold pb-1">
            Team Number <span class="text-red-500">*</span>
          </p>
          <input
            type="number"
            id="teamNumber"
            class="w-full border-primary bg-black rounded-xl p-1 h-10"
            onInput={(e) => setTeamNumber(e.target.value)}
            value={teamNumberReset()}
          />
        </div>
      </div>
    </div>
  );
};
