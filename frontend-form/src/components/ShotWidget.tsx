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
        class="w-1/3 h-full text-3xl rounded-l-xl float-left bg-[#e5534b]"
        onClick={() => {
          console.log(`typeof getter(): ${typeof getter}`);
          if (getter() > 0) {
            setter(getter() - 1);
          }
        }}
      >
        -
      </button>
      <div class="flex w-1/3 h-full text-2xl float-left items-center bg-[#21262e]">
        <p class="text-center w-full">{getter}</p>
      </div>
      <button
        type="button"
        class="text-3xl w-1/3 h-full  rounded-r-xl float-right bg-[#57ab5a]"
        onClick={() => {
          setter(getter() + 1);
        }}
      >
        +
      </button>
    </div>
  );
};
