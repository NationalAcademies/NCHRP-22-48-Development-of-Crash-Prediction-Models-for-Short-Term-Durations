
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
    val_1 = -0.932;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -11.187 + 3.011 * row.LogVolume
    -4.788 * row.LogAvgSpeed
    + 3.232 * row.Basic_Other_Segment
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -11.187 + 3.011 * row.LogVolume
    - 4.788 * row.LogAvgSpeed
    + 3.232 * row.Basic_Other_Segment
  ) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}