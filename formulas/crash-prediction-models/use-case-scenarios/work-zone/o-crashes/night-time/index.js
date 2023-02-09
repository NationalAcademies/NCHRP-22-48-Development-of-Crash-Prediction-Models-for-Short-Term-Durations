
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
    val_1 = -4.018;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -9.389 + 0.978 * row.LogVolume
    + 0.274 * row.StdSpeed
    + 1.683 * row.WZ
    + val_1
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -9.389
    + 0.978 * row.LogVolume
    + 0.274 * row.StdSpeed
    + 1.683 * row.WZ
  ) * factor;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}