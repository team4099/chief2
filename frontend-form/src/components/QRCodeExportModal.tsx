import { Component, createSignal, onMount } from "solid-js";
import exportQR from "../util/export";
import { qrModalState } from "../util/globalstate";
const { hideQRModal, qrData } = qrModalState;

export const QRCodeExportModal: Component = () => {
  onMount(() => {
    exportQR();
  });
  return (
    <div class="fixed pin z-50 w-full h-full overflow-auto bg-neutral-700/75 flex px-2">
      <div class="mx-auto relative p-4 bg-white w-full max-w-md my-auto flex flex-col rounded-xl">
        <div class="flex flex-row my-2">
          <p class="font-bold text-xl my-2 flex-1">QR Code Export</p>
          <button
            onClick={() => {
              hideQRModal();
            }}
            class="text-white font-bold text-m bg-red-500 hover:bg-red-400 p-2 transition-all rounded-xl"
          >
            Close
          </button>
        </div>
        {/* <img src={qrData()} /> */}
        <canvas id="canvas" />
      </div>
    </div>
  );
};
