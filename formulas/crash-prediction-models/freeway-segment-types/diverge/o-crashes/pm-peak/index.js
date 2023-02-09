
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
    val_1 = 0.415;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    1.972
    + 0.850 * Math.log(Number(row.Mainline_Volume))
    + 0.838 * (row.Volume_OffRamp / row.Mainline_Volume)
    + 0.316 * Math.log(row.AvgSpeed_UP)
    + 0.392 * row.LaneNumber3_4
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    1.972
    + 0.850 * Math.log(Number(row.Mainline_Volume))
    + 0.838 * (row.Volume_OffRamp / row.Mainline_Volume)
    + 0.316 * Math.log(row.AvgSpeed_UP)
    + 0.392 * row.LaneNumber3_4
  ) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}