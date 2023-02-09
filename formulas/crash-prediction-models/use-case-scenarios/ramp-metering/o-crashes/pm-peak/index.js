
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
  if (['WI'].includes(row.State)) {
    val_1 = 2.06611;
  }

  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -3.90244 + 0.20306 * row.AvgOccupancy
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -3.90244 + 0.20306 * row.AvgOccupancy
  ) * factor;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}