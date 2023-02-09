
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
    val_1 = 2.164;
  }

  // 1.075
  let val_2 = 0;
  if (['VA', 'MI'].includes(row.State)) {
    val_2 = 0.685;
  }

  // 1.795
  let val_3 = 0;
  if (['OR'].includes(row.State)) {
    val_3 = -0.726;
  }



  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -2.097 + 0.640 * row.LogVolume
    - 0.849 * Math.log(row.AvgSpeed)
    + 0.025 * row.AvgOccupancyDOWN
    - 0.109 * row.VSL_Seg
    + val_1 + val_2 + val_3
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -2.097 + 0.640 * row.LogVolume
    - 0.849 * Math.log(row.AvgSpeed)
    + 0.025 * row.AvgOccupancyDOWN
    - 0.109 * row.VSL_Seg) * factor;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}