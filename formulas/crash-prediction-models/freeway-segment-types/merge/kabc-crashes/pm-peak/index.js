
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
    -3.579 + 0.586 * Math.log(row.Mainline_Volume)
    +0.449 * Math.log(row.Volume_OnRamp)
    -1.358 * Math.log(row.AvgSpeed)
  );
  return res;
}

function specialModelFormula(row) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -2.448 + 0.447 * Math.log(row.Mainline_Volume)
    +0.416 * Math.log(row.Volume_OnRamp)
    -1.390 * Math.log(row.AvgSpeed)
    +0.415 * row.LaneNumber3_4
  ) * factor;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}