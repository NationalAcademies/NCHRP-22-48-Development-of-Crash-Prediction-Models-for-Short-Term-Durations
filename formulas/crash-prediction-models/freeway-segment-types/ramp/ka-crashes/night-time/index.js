
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
  if (['VA'].includes(row.State)) {
    val_1 = 1.385;
  }


  U = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -8.175 + 0.545 * Math.log(Number(row.Volume))
    - 4.841 * row.AvgOccupancy
    + 0.445 * row.LaneNumber3_4
  );
  A = U / (1 + U);
  B = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -12.084 + 0.019 * Math.log(Number(row.Volume))
    + 0.574 * row.StdSpeed
  );
  C = 1 - Math.exp(-B);
  res = (A * B) / C;

  return res;
}

function genericModel(row, factor) {
  let U, A, B, C;
  U = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -8.175 + 0.545 * Math.log(Number(row.Volume))
    - 4.841 * row.AvgOccupancy
    + 0.445 * row.LaneNumber3_4
  );
  A = U / (1 + U);
  B = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -12.084 + 0.019 * Math.log(Number(row.Volume))
    + 0.574 * row.StdSpeed
  );
  C = 1 - Math.exp(-B);
  return (A * B * factor) / C;

}

module.exports = {
  specialModelFormula,
  genericModel
}