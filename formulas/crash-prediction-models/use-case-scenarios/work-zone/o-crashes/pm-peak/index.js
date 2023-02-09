
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
    val_1 = -3.969;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -10.636 + 1.214 * row.LogVolume
     + 0.165 * row.StdSpeed
     + val_1
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -10.636 + 1.214 * row.LogVolume
    + 0.165 * row.StdSpeed
  ) * factor;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}