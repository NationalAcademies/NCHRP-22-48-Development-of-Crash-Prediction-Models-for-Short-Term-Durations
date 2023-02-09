
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
    3.549 + 0.418 * Math.log(row.Volume)
    +0.397 * Math.log(row.Volume_OnRamp)
    -2.353 * Math.log(row.AvgSpeed)
     +0.343 * row.LaneNumber3_4
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    3.549 + 0.418 * Math.log(row.Volume)
    +0.397 * Math.log(row.Volume_OnRamp)
    -2.353 * Math.log(row.AvgSpeed)
    +0.343 * row.LaneNumber3_4
  ) * factor;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}