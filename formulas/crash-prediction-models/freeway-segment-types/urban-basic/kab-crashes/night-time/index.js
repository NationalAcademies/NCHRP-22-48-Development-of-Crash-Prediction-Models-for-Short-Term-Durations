
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
  if (['GA', 'IL', 'VA'].includes(row.State)) {
    val_1 = 1.134;
  }

  // 1.075
  let val_2 = 0;
  if (['MD'].includes(row.State)) {
    val_2 = -0.722;
  }

  // 1.795
  let val_3 = 0;
  if (['MI'].includes(row.State)) {
    val_3 = 0.453;
  }

  // 1.342
  let val_4 = 0;
  if (['WA', 'WI'].includes(row.State)) {
    val_4 = -0.430;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -5.283 + 0.367 * Math.log(Number(row.Volume))
    + 1.519 * (row.AvgOccupancy_DOWN - row.AvgOccupancy_UP)
    + 0.566 * row.LaneNumber6_8 + 1.226 * row.LaneNumber10_
    + val_1 + val_2 + val_3 + val_4
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -5.283 + 0.367 * Math.log(Number(row.Volume))
    + 1.510 * (row.AvgOccupancy_DOWN - AvgOccupancy_UP)
    + 0.566 * row.LaneNumber6_8 + 1.226 * row.LaneNumber10_) * factor;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}