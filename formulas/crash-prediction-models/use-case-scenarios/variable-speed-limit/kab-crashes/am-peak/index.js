
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
  if (['GA'].includes(row.State)) {
    val_1 = 2.042;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -5.461 + 0.636 * row.LogVolume
    - 0.822 * Math.log(row.AvgSpeed)
    + 0.121 * row.StdSpeed
    - 0.255 * row.VSL_Seg
    + val_1
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -5.461 + 0.636 * row.LogVolume
    - 0.822 * Math.log(row.AvgSpeed)
    + 0.121 * row.StdSpeed
    - 0.255 * row.VSL_Seg) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}