import QRCode from "@yzfe/qrcodejs";
import QrCreator from "qr-creator";
import {
  scoutIDState,
  infoState,
  autoState,
  autoShootingZones,
  teleopState,
  teleopShootingZones,
  endgameState,
  miscState,
  qrModalState,
} from "./globalstate";

const { scoutID, loggedIn, setScoutID } = scoutIDState;

const { matchKey, alliance, driverStation, teamNumber } = infoState;
const {
  cargoPreload,
  taxied,
  autoUpper,
  autoLower,
  autoMissed,
  autoHuman,
  autoNotes,
} = autoState;

const {
  autoFender,
  autoOpposingFender,
  autoTarmac,
  autoOpposingTarmac,
  autoLaunchpad,
  autoTerminal,
  autoElsewhere,
} = autoShootingZones;

const { teleopUpper, teleopLower, teleopMissed, teleopNotes } = teleopState;

const {
  teleopFender,
  teleopOpposingFender,
  teleopTarmac,
  teleopOpposingTarmac,
  teleopLaunchpad,
  teleopTerminal,
  teleopElsewhere,
} = teleopShootingZones;

const {
  attemptedLow,
  attemptedMedium,
  attemptedHigh,
  attemptedTraversal,
  finalClimb,
  finalClimbTime,
} = endgameState;

const {
  defenseTime,
  defensePlay,
  defendedTime,
  defenseCounter,
  driverRating,
  miscNotes,
} = miscState;

const { setQRData } = qrModalState;

export default async function exportQR() {
  const data_points = 29;

  // The CSV format is like this:
  // scout_id,match_key,team_number,alliance,driver_station,preloaded_cargo,auto_lower_hub,auto_upper_hub,auto_misses,taxied,auto_shooting_zones,teleop_lower_hub,teleop_upper_hub,teleop_misses,teleop_shooting_zones,attempted_low,attempted_mid,attempted_high,attempted_traversal,climb_time,final_climb_type,defense_pct,counter_defense_pct,defense_rating,counter_defense_rating,driver_rating,auto_notes,teleop_notes,endgame_notes
  // Generate a CSV string to match this format and replace true with 1 and false with 0

  const autoZones = [
    [autoFender(), "Fender"],
    [autoOpposingFender(), "Opposing Fender"],
    [autoTarmac(), "Tarmac"],
    [autoOpposingTarmac(), "Opposing Tarmac"],
    [autoLaunchpad(), "Launchpad"],
    [autoTerminal(), "Terminal"],
    [autoElsewhere(), "Elsewhere"],
  ];
  const teleopZones = [
    [teleopFender(), "Fender"],
    [teleopOpposingFender(), "Opposing Fender"],
    [teleopTarmac(), "Tarmac"],
    [teleopOpposingTarmac(), "Opposing Tarmac"],
    [teleopLaunchpad(), "Launchpad"],
    [teleopTerminal(), "Terminal"],
    [teleopElsewhere(), "Elsewhere"],
  ];

  var autoZoneData,
    teleopZoneData = "";

  autoZones.forEach(function (item, index) {
    if (item[0] != undefined) {
      autoZoneData += item[1] + ";";
    }
  });

  teleopZones.forEach(function (item, index) {
    if (item[0] != undefined) {
      teleopZoneData += item[1] + ";";
    }
  });

  if (autoZoneData[autoZoneData.length - 1] == ";") {
    autoZoneData = autoZoneData.slice(0, -1);
  }

  if (teleopZoneData[teleopZoneData.length - 1] == ";") {
    teleopZoneData = teleopZoneData.slice(0, -1);
  }

  console.log(attemptedMedium());

  var data = `${scoutID()},${matchKey()},${teamNumber()},${alliance()},${driverStation()},${cargoPreload()},${autoLower()},${autoUpper()},${autoMissed()},${taxied()},${autoZoneData},${teleopLower()},${teleopUpper()},${teleopMissed()},${teleopZoneData},${attemptedLow()},${attemptedMedium()},${attemptedHigh()},${attemptedTraversal()},${finalClimbTime()},${finalClimb()},${defenseTime()},${defensePlay()},${defendedTime()},${defenseCounter()},${driverRating()},${autoNotes()},${teleopNotes()},${miscNotes()}`;

  for (var i = 0; i < data_points; i++) {
    data = data.replace("undefined", "");
    data = data.replace("true", "1");
    data = data.replace("false", "0");
  }

  console.log(data);

  let qrcode = new QRCode(document.getElementById("qrcode"), {
    text: data,
    width: 256,
    height: 256,
  });

  // QrCreator.render(
  //   {
  //     text: data,
  //     radius: 0.0, // 0.0 to 0.5
  //     ecLevel: "L", // L, M, Q, H
  //     fill: "#000000", // foreground color
  //     background: null, // color or null for transparent
  //     size: 500, // in pixels
  //   },
  //   document.getElementById("canvas")
  // );
}
