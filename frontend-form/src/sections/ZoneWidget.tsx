import {
  Component,
  createEffect,
  createSignal,
  splitProps,
  For,
} from "solid-js";
import { ToggleButton } from "../components/ToggleButton";
import { autoShootingZones, teleopShootingZones } from "../util/globalstate";
const {
  autoFender,
  setAutoFender,
  autoOpposingFender,
  setAutoOpposingFender,
  autoTarmac,
  setAutoTarmac,
  autoOpposingTarmac,
  setAutoOpposingTarmac,
  autoLaunchpad,
  setAutoLaunchpad,
  autoTerminal,
  setAutoTerminal,
  autoElsewhere,
  setAutoElsewhere,
} = autoShootingZones;
const {
  teleopFender,
  setTeleopFender,
  teleopOpposingFender,
  setTeleopOpposingFender,
  teleopTarmac,
  setTeleopTarmac,
  teleopOpposingTarmac,
  setTeleopOpposingTarmac,
  teleopLaunchpad,
  setTeleopLaunchpad,
  teleopTerminal,
  setTeleopTerminal,
  teleopElsewhere,
  setTeleopElsewhere,
} = teleopShootingZones;

type ZoneWidgetProps = {
  stage: string;
};

export const ZoneWidget: Component = ({ stage }: ZoneWidgetProps) => {
  const [zones, setZones] = createSignal([
    {
      text: "Fender",
      id: "FenderToggle",
      autoGetter: autoFender,
      autoSetter: setAutoFender,
      teleopGetter: teleopFender,
      teleopSetter: setTeleopFender,
    },
    {
      text: "Opp. Fender",
      id: "OppFenderToggle",
      autoGetter: autoOpposingFender,
      autoSetter: setAutoOpposingFender,
      teleopGetter: teleopOpposingFender,
      teleopSetter: setTeleopOpposingFender,
    },
    {
      text: "Tarmac",
      id: "TarmacToggle",
      autoGetter: autoTarmac,
      autoSetter: setAutoTarmac,
      teleopGetter: teleopTarmac,
      teleopSetter: setTeleopTarmac,
    },
    {
      text: "Opp. Tarmac",
      id: "OppTarmacToggle",
      autoGetter: autoOpposingTarmac,
      autoSetter: setAutoOpposingTarmac,
      teleopGetter: teleopOpposingTarmac,
      teleopSetter: setTeleopOpposingTarmac,
    },
    {
      text: "Launchpad",
      id: "LaunchpadToggle",
      autoGetter: autoLaunchpad,
      autoSetter: setAutoLaunchpad,
      teleopGetter: teleopLaunchpad,
      teleopSetter: setTeleopLaunchpad,
    },
    {
      text: "Terminal",
      id: "TerminalToggle",
      autoGetter: autoTerminal,
      autoSetter: setAutoTerminal,
      teleopGetter: teleopTerminal,
      teleopSetter: setTeleopTerminal,
    },
    {
      text: "Elsewhere",
      id: "ElsewhereToggle",
      autoGetter: autoElsewhere,
      autoSetter: setAutoElsewhere,
      teleopGetter: teleopElsewhere,
      teleopSetter: setTeleopElsewhere,
    },
  ]);

  return (
    <div class="flex flex-wrap gap-4">
      <For each={zones()}>
        {(zone, i) => (
          <div class="w-24 mx-auto">
            <ToggleButton
              text={zone.text}
              id={zone.id}
              stage={stage}
              getter={stage === "auto" ? zone.autoGetter : zone.teleopGetter}
              setter={stage === "auto" ? zone.autoSetter : zone.teleopSetter}
            />
          </div>
        )}
      </For>
    </div>
  );
};
