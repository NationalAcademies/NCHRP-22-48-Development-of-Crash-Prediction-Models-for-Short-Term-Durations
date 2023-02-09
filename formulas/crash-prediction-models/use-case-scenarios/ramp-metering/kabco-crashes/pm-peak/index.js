
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
  if (['FL', 'WI'].includes(row.State)) {
    val_1 = 1.82021;
  }

  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -3.004 + 0.120 * row.AvgOccupancy
    + val_1
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -3.004 + 0.120 * row.AvgOccupancy
  ) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}