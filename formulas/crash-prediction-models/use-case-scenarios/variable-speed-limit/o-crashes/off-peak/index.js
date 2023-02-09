
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
    val_1 = 1.454;
  }

  // 1.075
  let val_2 = 0;
  if (['VA'].includes(row.State)) {
    val_2 = 0.453;
  }

  // 1.795
  let val_3 = 0;
  if (['OR'].includes(row.State)) {
    val_3 = -0.776;
  }

  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -1.494 + 0.392 * row.LogVolume
    - 0.403 * Math.log(row.AvgSpeed)
    + 0.066 * row.StdSpeedUP
    + val_1 + val_2 + val_3
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -1.494 + 0.392 * row.LogVolume
    - 0.403 * Math.log(row.AvgSpeed)
    + 0.066 * row.StdSpeedUP
    ) * factor;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}