import { Accessor, Component, createSignal, For, Setter, createEffect, splitProps } from "solid-js";
import { ChildProperties } from "solid-js/web";

export const RadioWidget: Component = (props) => {

  const [local, others] = splitProps(props, ["legend", "group", "options", "getter", "setter", "checked"]);

  return (
    <>
      <fieldset
        class="flex flex-row"
        onChange={(e) => {
          console.log(`(${local.group}) ${e.target.value}`);
          local.setter(e.target.value);
        }}
      >
        <legend class="font-bold">{local.legend}</legend>
        <For each={local.options}>
          {(item: string, index) => {
            return (
              <label class="flex-1 bg-black text-white border-primary mx-1 rounded-xl px-2 py-1">
                <input
                  type="radio"
                  class="bg-gray-300"
                  id={`${local.group}-${index()}`}
                  name={local.group}
                  value={item}
                  checked={local.checked}
                />
                <label class="pl-1" for={`${local.group}-${index()}`}>{item}</label>
              </label>
            );
          }}
        </For>
      </fieldset>
      <h1 {...others}></h1>
    </>
  );
};

