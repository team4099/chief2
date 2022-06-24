import { Accessor, Component, Setter } from "solid-js";

type ShotWidgetProps = {
  getter: Accessor<Number>;
  setter: Setter<Number>;
};

export const ShotWidget: Component = ({ getter, setter }: ShotWidgetProps) => {
  // const [shotCounter, setCounter] = createSignal(0);

  return (
    <div class="h-14">
      <button
        type="button"
        class="w-1/3 h-full text-3xl rounded-l-xl float-left bg-red-400"
        onClick={() => {
          console.log(`typeof getter(): ${typeof getter}`);
          if (getter() > 0) {
            setter(getter() - 1);
          }
        }}
      >
        -
      </button>
      <div class="flex w-1/3 h-full text-2xl float-left items-center bg-gray-200">
        <p class="text-center w-full">{getter}</p>
      </div>
      <button
        type="button"
        class="text-3xl w-1/3 h-full  rounded-r-xl float-right bg-green-400"
        onClick={() => {
          setter(getter() + 1);
        }}
      >
        +
      </button>
    </div>
  );
};
