import { Accessor, Component, createSignal, For, Setter } from "solid-js";

type RadioWidgetProps = {
  legend: string;
  group: string;
  options: string[];
  getter: Accessor<any>;
  setter: Setter<any>;
};

export const RadioWidget: Component = ({
  legend,
  group,
  options,
  getter,
  setter,
}: RadioWidgetProps) => {
  return (
    <fieldset
      class="flex flex-row"
      onChange={(e) => {
        console.log(`(${group}) ${e.target.value}`);
        setter(e.target.value);
      }}
    >
      <legend class="font-bold pb-1">{legend}</legend>
      <For each={options}>
        {(item: string, index) => {
          return (
            <label class="flex-1 border-primary bg-black mx-1 rounded-xl px-2 py-1">
              <input
                type="radio"
                class=" bg-gray-200"
                id={`${group}-${index()}`}
                name={group}
                value={item}
              />
              <label class="pl-1" for={`${group}-${index()}`}>{item}</label>
            </label>
          );
        }}
      </For>
    </fieldset>
  );
};

