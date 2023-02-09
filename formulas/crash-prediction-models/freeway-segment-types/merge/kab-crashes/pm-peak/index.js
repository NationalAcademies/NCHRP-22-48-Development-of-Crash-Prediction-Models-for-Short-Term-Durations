
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
    val_1 = 0.947;
  }
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -6.831 + 0.719 * Math.log(row.Mainline_Volume)
    +0.359 * Math.log(row.Volume_OnRamp)
    -0.965 * row.AvgSpeed
    + val_1
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -6.831 + 0.719 * Math.log(row.Mainline_Volume)
    +0.359 * Math.log(row.Volume_OnRamp)
    -0.965 * row.AvgSpeed
  ) * factor;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}