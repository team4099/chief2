import { Component, createEffect, createSignal, splitProps } from "solid-js";

export const ToggleButton: Component = (props) => {
  const [toggleState, setToggle] = createSignal(false);
  const [toggleColor, setColor] = createSignal("#21262d");
  const [local, others] = splitProps(props, ["text"]);

  createEffect(() => {
    setToggle(props.getter())
    if (toggleState()) {
      setColor("rgb(239,174,4)");
    } else {
      setColor("#21262d");
    }
  });

  return (
    <button
      type="button"
      {...others}
      class="w-full mt-2 h-12 border-primary rounded-xl"
      style={{
        "background-color": toggleColor(),
      }}
      onClick={() => {
        setToggle(!toggleState());
        props.setter(!props.getter());
        console.log(`(${props.stage}, ${props.id}) state: ${props.getter()}`);
      }}
    >
      {local.text}
    </button>
  );
};
