
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
  if (['VA'].includes(row.State)) {
    val_1 = 1.00;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -3.754
    + 0.730 * Math.log(Number(row.Mainline_Volume))
    + 0.670 * (row.Volume_OffRamp / row.Mainline_Volume)
    + 1.186 * Math.log(row.AvgSpeed_UP)
    + 0.371 * row.LaneNumber3_4
    + val_1

  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -3.754
    + 0.730 * Math.log(Number(row.Mainline_Volume))
    + 0.670 * (row.Volume_OffRamp / row.Mainline_Volume)
    + 1.186 * Math.log(row.AvgSpeed_UP)
    + 0.371 * row.LaneNumber3_4
  ) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}