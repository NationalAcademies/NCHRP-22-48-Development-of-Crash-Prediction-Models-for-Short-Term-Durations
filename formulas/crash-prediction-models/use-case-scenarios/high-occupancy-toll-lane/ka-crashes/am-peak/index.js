
function Sigma(n) {
  let res = 0;
  for (let i = 1; i <= n; i ++) {
    res += i;
  }
  return res;
}

function specialModelFormula(row) {
  let res = 0, U, A, B, C;

  // 0.476
  let val_1 = 0;
  if (['GA'].includes(row.State)) {
    val_1 = 1.024;
  }

  // 1.075
  let val_2 = 0;
  if (['IL', 'VA'].includes(row.State)) {
    val_2 = 0.482;
  }

  // 1.795
  let val_3 = 0;
  if (['TX'].includes(row.State)) {
    val_3 = -0.491;
  }

  // 1.342
  let val_4 = 0;
  if (['WI'].includes(row.State)) {
    val_4 = -1.021;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -4.640 + 1.345 * Math.log(Number(row.Volume_GP))
    -1.695 * Math.log(row.AvgSpeed_GP)
    + 0.105 * (row.AvgSpeed_GP - row.Downstream_GP)
    - 0.976 * row.SeparationType);

  return res;
}

function genericModel(row, factor) {
  let U, A, B, C;
  U = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -5.573 + 0.249 * Math.log(Number(row.Volume)) + 0.079 * row.StdSpeed
    + 0.026 * (row.AvgOccupancy_DOWN - row.Target)
  );
  A = U / (1 + U);
  B = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -2.563 + 0.116 * (row.Target - row.AvgOccupancy_DOWN)
  );
  C = 1 - Math.exp(-B);
  return (A * B * factor) / C;

}

module.exports = {
  specialModelFormula,
  genericModel
}