
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
  if (['CA'].includes(row.State)) {
    val_1 = 0.850;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -1.520 + 1.085 * Math.log(Number(row.Volume))
    - 0.975 * Math.log(row.AvgSpeed)
    + 0.033 * row.AvgOccupancy_DOWN
    + val_1
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -1.520 + 1.085 * Math.log(Number(row.Volume))
    - 0.975 * Math.log(row.AvgSpeed)
    + 0.033 * AvgOccupancy_DOWN) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}