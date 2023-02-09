
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
  if (['TX'].includes(row.State)) {
    val_1 = -1.261;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -1.405 + 0.970 * row.LogVolume
    - 1.583 * row.LogAvgSpeed
    + 1.623 * row.WZ
    + val_1
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -1.405 + 0.970 * row.LogVolume
    - 1.583 * row.LogAvgSpeed
    + 1.623 * row.WZ
  ) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}