const Console = require("console");

function Sigma(n) {
  let res = 0;
  for (let i = 1; i <= n; i ++) {
    res += i;
  }
  return res;
}

function specialModelFormula(row) {
  let res = 0;

  // 0.476
  let val_1 = 0;
  if (['GA'].includes(row.State)) {
    val_1 = 1.613;
  }

  // 1.075
  let val_2 = 0;
  if (['VA'].includes(row.State)) {
    val_2 = 0.569;
  }

  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -1.519 + 0.412 * row.LogVolume
    - 0.390 * Math.log(row.AvgSpeed)
    + 0.064 * row.StdSpeedUP
    + 0.029 * (row.AvgOccupancyDown - row.AvgOccupancy)
    + val_1 + val_2
  );

  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -1.519 + 0.412 * row.LogVolume
    - 0.390 * Math.log(row.AvgSpeed)
    + 0.064 * row.StdSpeedUP
    + 0.029 * (row.AvgOccupancyDown - row.AvgOccupancy)
  ) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}