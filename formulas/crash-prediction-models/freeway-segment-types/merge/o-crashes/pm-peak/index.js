
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
    0.670 + 0.500 * Math.log(row.Mainline_Volume)
    + 0.484 * Math.log(row.Volume_OnRamp)
    -2.031 * Math.log(row.AvgSpeed)
    +0.284 * row.LaneNumber3_4
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    0.670 + 0.500 * Math.log(row.Mainline_Volume)
    +0.484 * Math.log(row.Volume_OnRamp)
    -2.031 * Math.log(row.AvgSpeed)
    +0.284 * row.LaneNumber3_4
  ) * factor;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}