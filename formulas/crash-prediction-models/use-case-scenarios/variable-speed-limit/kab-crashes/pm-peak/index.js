
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
    val_1 = 1.913;
  }

  // 1.075
  let val_2 = 0;
  if (['VA'].includes(row.State)) {
    val_2 = 1.494;
  }
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -3.644 + 0.311 * row.LogVolume
    - 0.496 * Math.log(row.AvgSpeed)
    + 0.085 * row.StdSpeed
    + val_1 + val_2
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -3.644 + 0.311 * row.LogVolume
    - 0.496 * Math.log(row.AvgSpeed)
    + 0.085 * row.StdSpeed) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}