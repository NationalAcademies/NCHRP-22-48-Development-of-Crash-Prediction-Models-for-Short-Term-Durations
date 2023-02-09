
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
  if (['IL', 'VA', 'MI'].includes(row.State)) {
    val_1 = 0.977;
  }

  // 1.075
  let val_2 = 0;
  if (['TX'].includes(row.State)) {
    val_2 = 0.434;
  }

  let val_3 = 0;
  if (['WI'].includes(row.State)) {
    val_3 = 0.988;
  }

  let val_1_1 = 0;
  if (['GA'].includes(row.State)) {
    val_1_1 = 1.615;
  }

  let val_2_2 = 0;
  if (['IL', 'VA'].includes(row.State)) {
    val_2_2 = 1.009;
  }

  let val_3_3 = 0;
  if (['MI', 'TX'].includes(row.State)) {
    val_3_3 = 0.637;
  }


  U = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -5.547 + 0.583 * Math.log(Number(row.Volume)) - 0.570 * row.AvgSpeed
    + val_1 + val_2 + val_3
  );
  A = U / (1 + U);
  B = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -5.548 + 0.383 * Math.log(Number(row.Volume))
    + 0.027 * (row.AvgSpeed_UP - row.AvgSpeed_DOWN)
    + val_1_1 + val_2_2 + val_3_3
  );
  C = 1 - Math.exp(-B);
  res = (A * B) / C;

  return res;
}

function genericModel(row, factor) {
  let U, A, B, C;
  U = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -5.547 + 0.583 * Math.log(Number(row.Volume)) - 0.570 * row.AvgSpeed
  );
  A = U / (1 + U);
  B = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -5.548 + 0.383 * Math.log(Number(row.Volume))
    + 0.027 * (row.AvgSpeed_UP - row.AvgSpeed_DOWN)
  );
  C = 1 - Math.exp(-B);
  return (A * B * factor) / C;
}

module.exports = {
  specialModelFormula,
  genericModel
}