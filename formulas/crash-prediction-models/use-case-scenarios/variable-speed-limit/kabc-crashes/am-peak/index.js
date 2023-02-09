
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
    val_1 = 2.476;
  }

  // 1.075
  let val_2 = 0;
  if (['MI', 'WA'].includes(row.State)) {
    val_2 = -0.415;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -2.124 + 0.339 * row.LogVolume
    - 0.485 * Math.log(row.AvgSpeed)
    + 0.055 * row.AvgOccupancyDOWN
    - 0.224 * row.VSL_Seg
    + val_1 + val_2
  );

  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -2.124 + 0.339 * row.LogVolume
    - 0.485 * Math.log(row.AvgSpeed)
    + 0.055 * row.AvgOccupancyDOWN
    - 0.224 * row.VSL_Seg) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}