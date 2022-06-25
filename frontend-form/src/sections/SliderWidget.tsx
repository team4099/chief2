import { Component, createSignal } from "solid-js";

export const SliderWidget: Component = () => {

  const [percent, setPercent] = createSignal(0)

  return(
        <div class = "flex flexrow">
            <div class="basis-3/4">
                <input
                    type="range"
                    class="
                            
                            accent-[#efae04]
                    
                            w-full
                            h-8
                            bg-transparent
                            focus:outline-none focus:ring-0 focus:shadow-none
                        "
                    min="0"
                    value = "0"
                    max="100"
                    step="25"
                    id="slider"
                />
            </div>
            <div class="basis-1/4 text-center">
                <output class="text-center">{percent()}%</output>
            </div>
        </div>
        

        
  );
};