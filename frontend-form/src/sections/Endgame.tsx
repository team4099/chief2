import { Component, createSignal } from "solid-js";


export const Endgame: Component = () => {

  const [time, setTime] = createSignal(0);

  setInterval(() => {setTime(time() + 1)}, 1000);

  return (
    <div class="items-middle justify-center align-center">
      <div class="justify-center align-middle items-center shadow-2xl p-8 m-8 rounded-xl">
        <p class="font text-center text-3xl ">Endgame</p>
        <div class="m-4" style="text-align:center">

          <p class="font-bold" style="display: inline;">Timer: &nbsp </p>
          <p style="display: inline;">{Math.floor(time() / 60)}:{time() % 60}</p>

        </div>

        <div class="m-4" style="text-align:center">
          <button id="reset-timer" style="border: 2px solid black;display: inline;padding: 5px;width: 200px;height: 50px;border-radius: 15px;background: #A1A1A1;">Reset Timer</button>
          <p style="display: inline">&nbsp&nbsp&nbsp</p>
          <button id="start-stop"style="border: 2px solid black;display: inline;padding: 5px;width: 200px;height: 50px;border-radius: 15px;background: #A1A1A1;">Start/Stop</button>  
        </div>

        <div style="text-align:center">
          <p style="font-size:20px">Attempted Climb</p>
          <p>&nbsp</p>
          <button id="low-climb" style="border: 2px solid black;display: inline;padding: 5px;width: 100%;height: 50px;border-radius: 25px;background: #A1A1A1;">Low</button>
          <p style="line-height:0.5;">&nbsp</p>
          <button id="medium-climb" style="border: 2px solid black;display: inline;padding: 5px;width: 100%;height: 50px;border-radius: 25px;background: #A1A1A1;">Medium</button>
          <p style="line-height:0.5;">&nbsp</p>
          <button id="high-climb" style="border: 2px solid black;display: inline;padding: 5px;width: 100%;height: 50px;border-radius: 25px;background: #A1A1A1;">High</button>
          <p style="line-height:0.5;">&nbsp</p>
          <button id="traversal-climb" style="border: 2px solid black;display: inline;padding: 5px;width: 100%;height: 50px;border-radius: 25px;background: #A1A1A1;">Traversal</button>
        </div>

        <div style="text-align:center">
          <p style="line-height:2;">&nbsp</p>
          <p style="font-size:20px;display: inline;">Final Climb Time:&nbsp</p>

          <input
            type="text"
            id="final-time"
            style="display: inline;border: 2px solid black;border-radius: 5px;"
          />
        </div>

        <div style="text-align:center">
          <p style="font-size:20px;display: inline;">Final Climb Type:&nbsp</p>

          <select
            id="finalclimb"
            style="display: inline;border: 2px solid black;border-radius: 5px;"
          >
            <option value="low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Traversal">Traversal</option>

          </select>
        </div>

        
      </div>
    </div>

  );
};