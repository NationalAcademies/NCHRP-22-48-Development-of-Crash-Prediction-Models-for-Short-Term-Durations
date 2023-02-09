
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
    val_1 = 2.696;
  }

  // 1.075
  let val_2 = 0;
  if (['VA'].includes(row.State)) {
    val_2 = 0.876;
  }

  // 1.795
  let val_3 = 0;
  if (['WA', 'MI'].includes(row.State)) {
    val_3 = 0.412;
  }

  // 1.342
  let val_4 = 0;
  if (['IL', 'KS'].includes(row.State)) {
    val_4 = 1.342;
  }

  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -0.414 + 0.209 * row.LogVolume
    - 0.472 * Math.log(row.AvgSpeed) + 0.035 * row.StdOccupancyDown
    + 0.047 * row.AvgOccupancyDown
    - 0.221 * row.VSL_Seg
    + val_1 + val_2 + val_3
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -0.414 + 0.209 * row.LogVolume
    - 0.472 * Math.log(row.AvgSpeed) + 0.035 * row.StdOccupancyDown
    + 0.047 * row.AvgOccupancyDown
    - 0.221 * row.VSL_Seg) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}