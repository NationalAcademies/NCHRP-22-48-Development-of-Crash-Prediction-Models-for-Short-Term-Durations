
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
    -11.503 + 0.925 * Math.log(row.Mainline_Volume)

  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -11.503 + 0.925 * Math.log(row.Mainline_Volume)
  ) * factor;
  return res;

}

module.exports = {
  specialModelFormula,
  genericModel
}