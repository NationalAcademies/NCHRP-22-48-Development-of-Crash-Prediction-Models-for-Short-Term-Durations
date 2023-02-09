
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
  if (['FL'].includes(row.State)) {
    val_1 = -0.140;
  }

  // 1.075
  let val_2 = 0;
  if (['MI'].includes(row.State)) {
    val_2 = 1.034;
  }

  // 1.795
  let val_3 = 0;
  if (['CO', 'WA'].includes(row.State)) {
    val_3 = 0.701;
  }

  // 1.342
  let val_4 = 0;
  if (['TX', 'VA'].includes(row.State)) {
    val_4 = 0.490;
  }

  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -6.973 + 0.872 * Math.log(Number(row.Volume))
    - 0.335 * Math.log(row.AvgSpeed) + 0.033 * row.StdSpeed
    + val_1 + val_2 + val_3 + val_4
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -6.973 + 0.872 * Math.log(Number(row.Volume))
    - 0.335 * Math.log(row.AvgSpeed) + 0.033 * row.StdSpeed) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}