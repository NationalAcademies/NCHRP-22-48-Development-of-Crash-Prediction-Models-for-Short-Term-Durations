
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
  if (['MI', 'WA'].includes(row.State)) {
    val_1 = -2.374;
  }

  let val_2 = 0;
  if (['VA'].includes(row.State)) {
    val_2 = -0.805;
  }

  U = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -2.392 + 0.157 * row.LogVolume
    - 0.038 * Math.log(Number(row.AvgSpeed))
    + val_1 + val_2
  );
  A = U / (1 + U);
  B = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -4.378 - 0.665 * row.LogVolume
    + 0.160 * Math.log(Number(row.AvgSpeed))
  );
  C = 1 - Math.exp(-B);
  res = (A * B) / C;

  return res;
}

function genericModel(row, factor) {
  let U, A, B, C;

  U = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -2.392 + 0.157 * row.LogVolume
    - 0.038 * Math.log(Number(row.AvgSpeed))
    + val_1 + val_2
  );
  A = U / (1 + U);
  B = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -4.378 - 0.665 * row.LogVolume
    + 0.160 * Math.log(Number(row.AvgSpeed))
  );
  C = 1 - Math.exp(-B);
  return (A * B * factor) / C;
}

module.exports = {
  specialModelFormula,
  genericModel
}