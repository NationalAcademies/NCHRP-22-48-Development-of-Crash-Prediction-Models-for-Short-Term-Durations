
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
    val_1 = 1.653;
  }
  // anchor
  console.log(row)
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -4.631 + 0.284 * row.LogVolume
     + 0.026 * (row.AvgSpeed - row.AvgSpeedDOWN)
     + 2.143 * row.LaneNumber
     + val_1
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -4.631 + 0.284 * row.LogVolume
    + 0.026 * (row.AvgSpeed - row.AvgSpeed_DOWN)
    + 2.143 * row.LaneNumber) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}
