
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
    val_1 = 1.501;
  }

  // 1.075
  let val_2 = 0;
  if (['IL', 'MI'].includes(row.State)) {
    val_2 = 0.515;
  }

  // 1.795
  let val_3 = 0;
  if (['MD', 'WI'].includes(row.State)) {
    val_3 = 0.589;
  }

  // 1.342
  let val_4 = 0;
  if (['VA'].includes(row.State)) {
    val_4 = 1.383;
  }

  let val_5 = 0;
  if (['WA'].includes(row.State)) {
    val_5 = 1.201;
  }

  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -1.537 + 0.277 * Math.log(Number(row.Volume))
    - 0.831 * Math.log(row.AvgSpeed) + 0.083 * row.StdSpeed
    + 0.704 * row.LaneNumber6_8 + 1.355 * row.LaneNumber10_
    + val_1 + val_2 + val_3 + val_4 + val_5
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -1.537 + 0.277 * Math.log(Number(row.Volume))
    - 0.831 * Math.log(row.AvgSpeed) + 0.083 * row.StdSpeed
    + 0.704 * row.LaneNumber6_8 + 1.355 * row.LaneNumber10_) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}