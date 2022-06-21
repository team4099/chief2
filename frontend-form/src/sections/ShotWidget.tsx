import { Component, createEffect, createSignal, splitProps } from "solid-js";

export const ShotWidget: Component = () => {

  const [shotCounter, setCounter] = createSignal(0)

  return(
    <div class="h-14 border border-[#7b7b7b]">
      <button
        type="button"
        class="w-1/3 h-full text-3xl border-solid border-[#7b7b7b] border rounded-r-md float-left bg-red-400"
        onClick = {() => {
          if (shotCounter() > 0){
            setCounter(shotCounter()-1);
          }
        }}
      >
        -
      </button>
      <div class="flex w-1/3 h-full text-2xl float-left items-center">
        <p class="text-center w-full">{shotCounter()}</p>
      </div>
      <button
        type="button"
        class="text-3xl w-1/3 h-full border-solid border-[#7b7b7b] border rounded-l-md float-right bg-green-400"
        onClick = {() => {
          setCounter(shotCounter()+1);
        }}
      >
        +
      </button>
    </div>
  );
};