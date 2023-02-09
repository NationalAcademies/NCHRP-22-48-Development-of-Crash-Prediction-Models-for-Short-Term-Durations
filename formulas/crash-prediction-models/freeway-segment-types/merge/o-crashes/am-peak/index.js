
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
    -1.021 + 0.555 * Math.log(row.Mainline_Volume)
      + 0.509 * Math.log(row.Volume_OnRamp)
    -1.723 * Math.log(row.AvgSpeed)
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -1.021 + 0.555 * Math.log(row.Mainline_Volume)
    +0.509 * Math.log(row.Volume_OnRamp)
    -1.723 * Math.log(row.AvgSpeed)
  ) * factor;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}