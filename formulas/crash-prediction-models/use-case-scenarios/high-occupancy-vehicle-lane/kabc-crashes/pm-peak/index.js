
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
    val_1 = 0.382;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -1.520 + 0.224 * Math.log(Number(row.Volume))
    - 0.424 * Math.log(row.AvgSpeed) + 0.061 * row.StdSpeed
    + 0.015 * row.AvgOccupancy_DOWN + val_1
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -1.520 + 0.224 * Math.log(Number(row.Volume))
    - 0.424 * Math.log(row.AvgSpeed) + 0.061 * row.StdSpeed
    + 0.015 * row.AvgOccupancy_DOWN) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}