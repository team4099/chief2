import { Component, createSignal, onMount } from "solid-js";
import exportQR from "../util/export";
import { infoState, qrModalState } from "../util/globalstate";
const { matchKey, teamNumber, alliance, driverStation } = infoState;
const { hideQRModal, qrData } = qrModalState;
import Logo from "../../public/favicon.svg";
import html2canvas from "html2canvas";

export const QRCodeExportModal: Component = () => {
  onMount(async () => {
    exportQR();
  });
  return (
    <div class="fixed pin z-50 w-full h-full overflow-auto bg-neutral-700/75 flex px-2">
      <div class="mx-auto relative p-4 bg-white w-full max-w-md my-auto flex flex-col rounded-xl">
        <div class="flex flex-row my-2">
          <p class="font-bold text-xl my-2 flex-1">QR Code Export</p>
          <button
            onClick={() => {
              const canvasResult = html2canvas(
                document.getElementById("resultsComponent")
              )
                .then((r) => {
                  // setRenderCanvas(r);
                  var link = document.createElement("a");
                  link.download = "filename.png";
                  link.href = r.toDataURL();
                  link.click();
                })
                .catch((e) => console.log("Errored when export image: ", e));
            }}
            class="text-white font-bold text-m bg-team-gold hover:bg-team-gold-hover p-2 transition-all rounded-xl mr-1"
          >
            Download
          </button>

          <button
            onClick={() => {
              hideQRModal(); //
            }}
            class="text-white font-bold text-m bg-red-500 hover:bg-red-400 p-2 transition-all rounded-xl ml-1"
          >
            Close
          </button>
        </div>
        {/* <img src={qrData()} /> */}
        {/* <canvas id="canvas" /> */}
        <div class="p-4" id="resultsComponent">
          <div class="flex flex-row items-center">
            <img src={Logo} class="w-8" />
            <p class="font-bold text-2xl">Chief2</p>
          </div>
          <div
            class="flex flex-col mt-4 justify-center items-center"
            id="exportContent"
          >
            <p class="text-3xl">{matchKey()}</p>
            <div class="flex flex-row">
              <p>Team {teamNumber()}</p>
              <p class="mx-2">•</p>
              <p
                class={`font-bold ${
                  alliance() === "Blue"
                    ? "text-blue-500"
                    : alliance() === "Red"
                    ? "text-red-500"
                    : "text-black"
                }`}
              >
                {alliance()} {driverStation()}
              </p>
            </div>

            {/* {renderCanvas()} */}
            <div id="qrcode" class="mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ResultsComponent: Component = () => {
  return (
    <div class="p-4" id="resultsComponent">
      <div class="flex flex-row items-center">
        <img src={Logo} class="w-8" />
        <p class="font-bold text-2xl">Chief2</p>
      </div>
      <div
        class="flex flex-col mt-4 justify-center items-center"
        id="exportContent"
      >
        <p class="text-3xl">{matchKey()}</p>
        <div class="flex flex-row">
          <p>Team {teamNumber()}</p>
          <p class="mx-2">•</p>
          <p
            class={`font-bold ${
              alliance() === "Blue"
                ? "text-blue-500"
                : alliance() === "Red"
                ? "text-red-500"
                : "text-black"
            }`}
          >
            {alliance()} {driverStation()}
          </p>
        </div>
        <canvas id="canvas" />
      </div>
    </div>
  );
};
