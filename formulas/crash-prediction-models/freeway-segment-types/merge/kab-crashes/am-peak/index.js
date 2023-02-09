
function Sigma(n) {
  let res = 0;
  for (let i = 1; i <= n; i ++) {
    res += i;
  }
  return res;
}

function specialModelFormula(row) {
  let res = 0;
  let val_1 = 0;
  if (['VA'].includes(row.State)) {
    val_1 = 1.181;
  }
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -7.304 + 0.650 * Math.log(row.Mainline_Volume)
    +0.454 * Math.log(row.Volume_OnRamp)
    -0.832 * row.AvgSpeed
    + val_1
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -7.304 + 0.650 * Math.log(row.Mainline_Volume)
    +0.454 * Math.log(row.Volume_OnRamp)
    -0.832 * row.AvgSpeed
  ) * factor;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}