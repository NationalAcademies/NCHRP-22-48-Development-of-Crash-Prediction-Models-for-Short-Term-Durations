
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
  if (['WA'].includes(row.State)) {
    val_1 = -2.723;
  }

  U = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -4.252 + 0.602 * row.LogVolume
    - 0.776 * Math.log(Number(row.AvgSpeed))
    + 0.109 * (row.AvgOccupancyDOWN - row.AvgOccupancy)
    + val_1
  );
  A = U / (1 + U);
  B = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -2.129 - 0.599 * row.LogVolume
    + 0.253 * Math.log(Number(row.AvgSpeed))
  );
  C = 1 - Math.exp(-B);
  res = (A * B) / C;

  return res;
}

function genericModel(row, factor) {
  let U, A, B, C;

  U = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -4.252 + 0.602 * row.LogVolume
    - 0.776 * Math.log(Number(row.AvgSpeed))
    + 0.109 * (row.AvgOccupancyDOWN - row.AvgOccupancy)
  );
  A = U / (1 + U);
  B = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -2.129 - 0.599 * row.LogVolume
    + 0.253 * Math.log(Number(row.AvgSpeed))
  );
  C = 1 - Math.exp(-B);
  return (A * B * factor) / C;
}

module.exports = {
  specialModelFormula,
  genericModel
}