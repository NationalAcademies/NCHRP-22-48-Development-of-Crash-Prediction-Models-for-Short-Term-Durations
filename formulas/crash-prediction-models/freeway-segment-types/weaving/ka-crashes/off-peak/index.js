
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
    val_1 = 1.555;
  }

  // 1.075
  let val_2 = 0;
  if (['IL'].includes(row.State)) {
    val_2 = 0.553;
  }

  // 1.795
  let val_3 = 0;
  if (['MD'].includes(row.State)) {
    val_3 = -0.737;
  }

  // 1.342
  let val_4 = 0;
  if (['VA'].includes(row.State)) {
    val_4 = 1.020;
  }

  let val_5 = 0;
  if (['WI'].includes(row.State)) {
    val_5 = 1.905;
  }

  U = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -8.263 + 0.548 * Math.log(Number(row.Volume)) + 0.076 * row.StdSpeed
    + 0.022 * (row.AvgSpeed_UP - row.AvgSpeed_DOWN)
    + val_1 + val_2 + val_3 + val_4 + val_5
  );
  A = U / (1 + U);
  B = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -2.012 + 0.033 * (row.AvgSpeed_UP - row.AvgSpeed_DOWN)
  );
  C = 1 - Math.exp(-B);
  res = (A * B) / C;

  return res;
}

function genericModel(row, factor) {
  let U, A, B, C;
  U = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -8.263 + 0.548 * Math.log(Number(row.Volume)) + 0.076 * row.StdSpeed
    + 0.022 * (row.AvgSpeed_UP - row.AvgSpeed_DOWN)
  );
  A = U / (1 + U);
  B = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -2.012 + 0.033 * (row.AvgSpeed_UP - row.AvgSpeed_DOWN)
  );
  C = 1 - Math.exp(-B);
  return (A * B * factor) / C;
}

module.exports = {
  specialModelFormula,
  genericModel
}