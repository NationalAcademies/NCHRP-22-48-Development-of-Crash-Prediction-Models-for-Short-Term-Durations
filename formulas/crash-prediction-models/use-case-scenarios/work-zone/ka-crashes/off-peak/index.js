
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
  if (['TX'].includes(row.State)) {
    val_1 = 1.669;
  }



  U = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    - 9.228
    + 1.213 * row.LogVolume
    + 1.504 * row.WZ
    + val_1
  );
  res = Math.pow(Math.E, U) / (1 + Math.pow(Math.E, U))

  return res;
}

function genericModel(row, factor) {
  let res = 0, U, A, B, C;

  // 0.476
  let val_1 = 0;
  if (['TX'].includes(row.State)) {
    val_1 = 1.669;
  }



  U = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    - 9.228
    + 1.213 * row.LogVolume
    + 1.504 * row.WZ
  ) * factor;
  res = Math.pow(Math.E, U) / (1 + Math.pow(Math.E, U))

  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}