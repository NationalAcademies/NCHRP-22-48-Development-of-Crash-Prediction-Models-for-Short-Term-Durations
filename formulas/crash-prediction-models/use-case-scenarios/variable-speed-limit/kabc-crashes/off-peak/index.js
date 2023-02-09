
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
    val_1 = 2.198;
  }

  let val_2 = 0;
  if (['OR'].includes(row.State)) {
    val_2 = 0.867;
  }

  let val_3 = 0;
  if (['OR'].includes(row.State)) {
    val_3 = 0.566;
  }

  let val_4 = 0;
  if (['OR'].includes(row.State)) {
    val_4 = 1.143;
  }



  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -3.606 + 0.432 * row.LogVolume
    - 0.379 * Math.log(row.AvgSpeed)
    + 0.063 * row.StdSpeed_UP
    - 0.047 * (row.AvgOccupancyDOWN - row.AvgOccupancy)
    - 0.175 * row.VSL_Seg
    + val_1 + val_2 + val_3 + val_4
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -3.606 + 0.432 * row.LogVolume
    - 0.379 * Math.log(row.AvgSpeed)
    + 0.063 * row.StdSpeedUP
    - 0.047 * (row.AvgOccupancyDOWN - row.AvgOccupancy)
    - 0.175 * row.VSL_Seg) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}