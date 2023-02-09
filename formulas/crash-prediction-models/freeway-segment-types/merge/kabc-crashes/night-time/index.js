
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
    -8.748 + 0.847 * Math.log(row.Volume)
    +0.342 * Math.log(row.Volume_OnRamp)
    + 0.303 * row.LaneNumber3_4
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -8.748 + 0.847 * Math.log(row.Volume)
    +0.342 * Math.log(row.Volume_OnRamp)
    +0.303 * row.LaneNumber3_4
  ) * factor;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}