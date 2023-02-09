
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
    val_1 = 1.154;
  }

  // 1.075
  let val_2 = 0;
  if (['MI', 'VA'].includes(row.State)) {
    val_2 = 0.535;
  }

  let val_1_1 = 0;
  if (['GA'].includes(row.State)) {
    val_1_1 = 1.767;
  }

  let val_2_2 = 0;
  if (['MI', 'VA'].includes(row.State)) {
    val_2_2 = 1.087;
  }


  U = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -2.641 + 0.446 * Math.log(Number(row.Volume)) - 1.035 * row.StdSpeed
    + 0.049 * row.StdSpeed
    + val_1 + val_2
  );
  A = U / (1 + U);
  B = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -12.553 + 2.433 * row.AvgSpeed_UP
    + 0.105 * row.StdSpeed + val_1_1 + val_2_2
  );
  C = 1 - Math.exp(-B);
  res = (A * B) / C;

  return res;
}

function genericModel(row, factor) {
  let U, A, B, C;
  U = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -2.641 + 0.446 * Math.log(Number(row.Volume)) - 1.035 * row.StdSpeed
    + 0.049 * row.StdSpeed
  );
  A = U / (1 + U);
  B = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -12.553 + 2.433 * row.AvgSpeed_UP
    + 0.105 * row.StdSpeed
  );
  C = 1 - Math.exp(-B);
  return (A * B * factor) / C;

}

module.exports = {
  specialModelFormula,
  genericModel
}