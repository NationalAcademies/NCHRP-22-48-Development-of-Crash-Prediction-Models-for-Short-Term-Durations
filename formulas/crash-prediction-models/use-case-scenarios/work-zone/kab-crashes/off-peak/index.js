
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
    val_1 = 1.770;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -6.904 + 0.781 * row.LogVolume
    + 0.822 * row.WZ
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -6.904
    + 0.781 * row.LogVolume
    + 0.822 * row.WZ
  ) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}