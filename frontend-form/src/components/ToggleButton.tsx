import { Component, createEffect, createSignal, splitProps } from "solid-js";

export const ToggleButton: Component = (props) => {
  const [toggleState, setToggle] = createSignal(false);
  const [toggleColor, setColor] = createSignal("rgb(23,23,32)");
  const [local, others] = splitProps(props, ["text"]);

  createEffect(() => {
    setToggle(props.getter())
    if (toggleState()) {
      setColor("rgb(239,174,4)");
    } else {
      setColor("rgb(217,217,217)");
    }
  });

  return (
    <button
      type="button"
      {...others}
      class="w-full mt-2 h-12 border-solid border-[#7b7b7b] border rounded-xl"
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
