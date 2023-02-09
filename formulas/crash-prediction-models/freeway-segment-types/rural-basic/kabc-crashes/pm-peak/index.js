
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
    val_1 = 4.459;
  }

  // 1.075
  let val_2 = 0;
  if (['FL'].includes(row.State)) {
    val_2 = 0.486;
  }

  // 1.795
  let val_3 = 0;
  if (['VA', 'CO'].includes(row.State)) {
    val_3 = 1.246;
  }

  // 1.342
  let val_4 = 0;
  if (['MI', 'TX'].includes(row.State)) {
    val_4 = 0.801;
  }

  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -3.523 + 0.748 * Math.log(Number(row.Volume))
    - 1.395 * Math.log(row.AvgSpeed)
    + val_1 + val_2 + val_3 + val_4
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -3.523 + 0.748 * Math.log(Number(row.Volume))
    - 1.395 * Math.log(row.AvgSpeed)) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}