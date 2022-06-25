import { Component, createSignal } from "solid-js";

export const RadioWidget: Component = () => {


  return(

        <div class="m-4">
            <label class="inline-flex items-center">
            <input type="radio" class=" h-8 w-8 text-amber-400 border-2 focus:outline-amber-400" name="flexRadioDefault" value="1"></input>
            <span class="ml-1 mr-2">1</span>
            </label>

            <label class="inline-flex items-center">
            <input type="radio" class=" h-8 w-8 text-amber-400 border-2 focus:outline-amber-400" name="flexRadioDefault" value="2"></input>
            <span class="ml-1 mr-2">2</span>
            </label>

            <label class="inline-flex items-center">
            <input type="radio" class=" h-8 w-8 text-amber-400 border-2 focus:outline-amber-400" name="flexRadioDefault" value="3"></input>
            <span class="ml-1 mr-2">3</span>
            </label>

            <label class="inline-flex items-center">
            <input type="radio" class=" h-8 w-8 text-amber-400 border-2 focus:outline-amber-400" name="flexRadioDefault" value="4"></input>
            <span class="ml-1 mr-2">4</span>
            </label>

            <label class="inline-flex items-center">
            <input type="radio" class=" h-8 w-8 text-amber-400 border-2 focus:outline-amber-400" name="flexRadioDefault" value="5"></input>
            <span class="ml-1 mr-2">5</span>
            </label>
        </div>
        
    );
};