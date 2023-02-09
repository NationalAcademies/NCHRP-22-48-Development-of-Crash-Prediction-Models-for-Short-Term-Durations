
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
    val_1 = -1.327;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -5.799 + 0.768 * row.LogVolume
    +0.094 * row.StdSpeed
    + 1.107 * row.WZ
    + val_1
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -5.799 + 0.768 * Math.exp(row.Volume)
    + 0.094 * row.StdSpeed
    + 1.107 * row.WZ
  ) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}