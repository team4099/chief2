import { Component, createSignal, onMount } from "solid-js";
import exportQR from "../util/export";
import { infoState, qrModalState, scoutIDState } from "../util/globalstate";
const { matchKey, teamNumber, alliance, driverStation } = infoState;
const { scoutID } = scoutIDState;
const { hideQRModal, qrData } = qrModalState;
import Logo from "../../public/favicon.svg";
import html2canvas from "html2canvas";

export const QRCodeExportModal: Component = () => {
  onMount(async () => {
    exportQR();
  });

  // Solution retrieved from
  // https://stackoverflow.com/a/35366681
  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);
    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }

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
                .then((r: HTMLCanvasElement) => {
                  // setRenderCanvas(r);
                  let dataURL = r.toDataURL();
                  let blob = dataURItoBlob(dataURL);
                  let file = new File(
                    [blob],
                    `${teamNumber()}-${matchKey()}.png`
                  );

                  if (
                    navigator.canShare &&
                    navigator.canShare({ files: [file] })
                  ) {
                    navigator
                      .share({
                        files: [file],
                        title: "Scouting Match Data",
                        text: "M atch data",
                      })
                      .then(() => console.log("Share was successful."))
                      .catch((error) => console.log("Sharing failed", error));
                  } else {
                    console.log(
                      `Your system doesn't support sharing files, downloading image instead`
                    );

                    var link = document.createElement("a");
                    link.download = "filename.png";
                    link.href = r.toDataURL();
                    link.click();
                  }
                })
                .catch((e) =>
                  console.log("Errored when export image: ", e.toString())
                );
            }}
            class="text-white font-bold text-xs bg-team-gold hover:bg-team-gold-hover px-2 transition-all rounded-xl mr-1"
          >
            Download
          </button>

          <button
            onClick={() => {
              hideQRModal(); //
            }}
            class="text-white font-bold text-xs bg-red-500 hover:bg-red-400 px-2 transition-all rounded-xl ml-1"
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
              <p class="mx-2">•</p>
              <p class="font-bold">{scoutID()}</p>
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
