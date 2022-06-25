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
    <fieldset class="flex flex-row">
      <legend class="font-bold">{legend}</legend>
      <For each={options}>
        {(option: string) => (
          <label class="flex-1 bg-gray-200 mx-1 rounded-xl px-2 py-1">
            <input
              type="radio"
              id={`${group}-1`}
              name={group}
              value={option}
            />
            <label for={`${group}-1`}>{option}</label>
          </label>
        )}
      </For>
    </fieldset>
  );
};
