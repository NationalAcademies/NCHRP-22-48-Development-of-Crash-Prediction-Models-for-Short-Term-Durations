
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
    val_1 = 1.488;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -0.535 + 0.322 * row.LogVolume
    - 0.624 * Math.log(row.AvgSpeed) + 1.535 * row.LaneNumber
    + val_1
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -0.535 + 0.322 * row.LogVolume
    - 0.624 * Math.log(row.AvgSpeed) + 1.535 * row.LaneNumber
  ) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}