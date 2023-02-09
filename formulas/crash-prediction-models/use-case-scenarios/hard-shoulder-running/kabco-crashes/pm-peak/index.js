
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
    val_1 = 0.716;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -1.717 + 0.411 * row.LogVolume
    - 0.609 * Math.log(row.AvgSpeed)
    + 2.204 * row.LaneNumber
    + val_1
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -1.717 + 0.411 * row.LogVolume
    - 0.609 * Math.log(row.AvgSpeed)
    + 2.204 * row.LaneNumber) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}