
function Sigma(n) {
  let res = 0;
  for (let i = 1; i <= n; i ++) {
    res += i;
  }
  return res;
}

function specialModelFormula(row) {
  let res = 0, U, A, B, C;

  // 0.476
  let val_1 = 0;
  if (['GA'].includes(row.State)) {
    val_1 = 1.024;
  }



  U = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    - 11.148
      + 2.236 * row.LogVolume
      - 3.154 * row.LogAvgSpeed
      + 4.682 * row.WZ
  );
  res = Math.pow(Math.E, U) / (1 + Math.pow(Math.E, U))

  return res;
}

function genericModel(row, factor) {
  let res = 0, U, A, B, C;

  // 0.476
  let val_1 = 0;
  if (['GA'].includes(row.State)) {
    val_1 = 1.024;
  }

  U = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    - 11.148
    + 2.236 * row.LogVolume
    - 3.154 * row.LogAvgSpeed
    + 4.682 * row.WZ
  ) * factor;
  res = Math.pow(Math.E, U) / (1 + Math.pow(Math.E, U))

  return res;

}

module.exports = {
  specialModelFormula,
  genericModel
}