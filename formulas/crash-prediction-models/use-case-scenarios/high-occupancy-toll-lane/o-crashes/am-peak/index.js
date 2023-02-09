
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
  if (['CO', 'VA'].includes(row.State)) {
    val_1 = 0.618;
  }

  // 1.075
  let val_2 = 0;
  if (['GA', 'MI'].includes(row.State)) {
    val_2 = 1.461;
  }

  // 1.795
  let val_3 = 0;
  if (['IL', 'KS'].includes(row.State)) {
    val_3 = 1.066;
  }

  // 1.342
  let val_4 = 0;
  if (['MD', 'OR'].includes(row.State)) {
    val_4 = -0.853;
  }

  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -2.504 + 1.512 * Math.log(row.GP_Volume)
    -2.699 * Math.log(row.AvgSpeed)
    +0.129 * (row.GP_AvgSpeed - row.GP_AvgSpeed_DOWN)
    -0.965 * row.SeparationType
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -0.653 + 0.451 * Math.log(Number(row.Volume))
    - 1.059 * Math.log(row.AvgSpeed) + 0.095 * row.StdSpeed
    + 0.642 * row.LaneNumber3_4 + 1.290 * 1.278) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}