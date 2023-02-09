
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
    val_1 = 2.808;
  }

  // 1.075
  let val_2 = 0;
  if (['VA'].includes(row.State)) {
    val_2 = 0.597;
  }

  // 1.795
  let val_3 = 0;
  if (['MI'].includes(row.State)) {
    val_3 = 1.026;
  }

  // 1.342
  let val_4 = 0;
  if (['OR'].includes(row.State)) {
    val_4 = 0.818;
  }

  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -1.305 + 0.381 * row.LogVolume
    - 0.555 * Math.log(row.AvgSpeed)
    + 0.027 * row.StdSpeedUP
    + 0.043 * row.AvgOccupancyDOWN
    - 0.177 * row.VSL_Seg
    + val_1 + val_2 + val_3 + val_4
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -1.305 + 0.381 * row.LogVolume
    - 0.555 * Math.log(row.AvgSpeed)
    + 0.027 * row.StdSpeedUP
    + 0.043 * row.AvgOccupancyDOWN
    - 0.177 * row.VSL_Seg) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}