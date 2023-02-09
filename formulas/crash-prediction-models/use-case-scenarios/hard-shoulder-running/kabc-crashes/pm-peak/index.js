
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
    val_1 = 0.918;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -2.883 + 0.657 * row.LogVolume
    -0.713 * Math.log(row.AvgSpeed)
    + val_1
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -2.883 + 0.657 * row.LogVolume
    -0.713 * Math.log(row.AvgSpeed)) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}