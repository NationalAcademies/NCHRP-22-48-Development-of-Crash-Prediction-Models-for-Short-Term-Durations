
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
    val_1 = 1.056;
  }

  // 1.075
  let val_2 = 0;
  if (['IL'].includes(row.State)) {
    val_2 = 0.664;
  }

  // 1.795
  let val_3 = 0;
  if (['MD'].includes(row.State)) {
    val_3 = 0.634;
  }

  // 1.342
  let val_4 = 0;
  if (['VA'].includes(row.State)) {
    val_4 = 1.521;
  }

  let val_5 = 0;
  if (['WA'].includes(row.State)) {
    val_5 = 1.596;
  }

  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -8.030 + 0.627 * Math.log(Number(row.Volume))
    + 0.020 * row.StdSpeed
    + 0.303 * row.LaneNumber3_4

  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -8.030 + 0.627 * Math.log(Number(row.Volume))
    + 0.020 * row.StdSpeed
    + 0.303 * row.LaneNumber3_4) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}