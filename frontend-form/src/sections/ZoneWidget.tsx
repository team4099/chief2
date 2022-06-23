import { Component, createEffect, createSignal, splitProps, For } from "solid-js";
import { ToggleButton } from "./ToggleButton";



export const ZoneWidget: Component = () => {

  const [zones, setZones] = createSignal([
    { text: "Fender", id: "FenderToggle"},
    { text: "Opp. Fender", id: "OppFenderToggle"},
    { text: "Tarmac", id: "TarmacToggle"},
    { text: "Opposing Tarmac", id: "OppTarmacToggle"},
    { text: "Launchpad", id: "LaunchpadToggle"},
    { text: "Terminal", id: "TerminalToggle"},
    { text: "Elsewhere", id: "ElsewhereToggle"},
  ])

  return(
    <div class="flex flex-wrap gap-4">
      <For each={zones()}>{(zone, i) => 
        <div class="w-32 mx-auto">
          <ToggleButton text={zone.text} id={zone.id} />
        </div>
      }</For>

    </div>
    
  );
};