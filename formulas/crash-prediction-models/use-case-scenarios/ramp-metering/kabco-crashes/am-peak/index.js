
function Sigma(n) {
  let res = 0;
  for (let i = 1; i <= n; i ++) {
    res += i;
  }
  return res;
}

function specialModelFormula(row) {
  let res = 0;

  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -4.181 + 0.182 * row.AvgOccupancy
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -4.181 + 0.182 * row.AvgOccupancy) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}