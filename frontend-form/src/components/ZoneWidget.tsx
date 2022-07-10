import {
  Component,
  createEffect,
  createSignal,
  splitProps,
  For,
} from "solid-js";
import { ToggleButton } from "./";
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
  const zones = [
    {
      text: "Own Fender",
      id: "FenderToggle",
      autoGetter: autoFender,
      autoSetter: setAutoFender,
      teleopGetter: teleopFender,
      teleopSetter: setTeleopFender,
      sizing:"2/5"
    },
    {
      text: "Opp. Fender",
      id: "OppFenderToggle",
      autoGetter: autoOpposingFender,
      autoSetter: setAutoOpposingFender,
      teleopGetter: teleopOpposingFender,
      teleopSetter: setTeleopOpposingFender,
      sizing:"2/5"
    },
    {
      text: "Own Tarmac",
      id: "TarmacToggle",
      autoGetter: autoTarmac,
      autoSetter: setAutoTarmac,
      teleopGetter: teleopTarmac,
      teleopSetter: setTeleopTarmac,
      sizing:"2/5"
    },
    {
      text: "Opp. Tarmac",
      id: "OppTarmacToggle",
      autoGetter: autoOpposingTarmac,
      autoSetter: setAutoOpposingTarmac,
      teleopGetter: teleopOpposingTarmac,
      teleopSetter: setTeleopOpposingTarmac,
      sizing:"2/5"
    },
    {
      text: "Launchpad",
      id: "LaunchpadToggle",
      autoGetter: autoLaunchpad,
      autoSetter: setAutoLaunchpad,
      teleopGetter: teleopLaunchpad,
      teleopSetter: setTeleopLaunchpad,
      sizing:"2/5"
    },
    {
      text: "Terminal",
      id: "TerminalToggle",
      autoGetter: autoTerminal,
      autoSetter: setAutoTerminal,
      teleopGetter: teleopTerminal,
      teleopSetter: setTeleopTerminal,
      sizing:"2/5"
    },
    {
      text: "Elsewhere",
      id: "ElsewhereToggle",
      autoGetter: autoElsewhere,
      autoSetter: setAutoElsewhere,
      teleopGetter: teleopElsewhere,
      teleopSetter: setTeleopElsewhere,
      sizing:"full"
    },
  ];

  return (
    <div class="flex flex-wrap gap-2">
      <For each={zones}>
        {(zone, i) => (
          <div class={`basis-${zone.sizing} mx-auto`}>
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
