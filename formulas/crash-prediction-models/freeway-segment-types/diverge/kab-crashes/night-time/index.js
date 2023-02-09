
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
    -9.421
    + 0.867 * Math.log(Number(row.Mainline_Volume))
    + 1.132 * (row.Volume_OffRamp / row.Mainline_Volume)
    + 0.708 * row.LaneNumber5_
    + val_1

  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -9.421
    + 0.867 * Math.log(Number(row.Mainline_Volume))
    + 1.132 * (row.Volume_OffRamp / row.Mainline_Volume)
    + 0.708 * row.LaneNumber5_
  ) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}