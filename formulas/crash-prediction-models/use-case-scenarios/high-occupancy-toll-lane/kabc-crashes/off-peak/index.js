
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
  if (['FL', 'KS', 'IL'].includes(row.State)) {
    val_1 = 0.441;
  }

  // 1.075
  let val_2 = 0;
  if (['GA'].includes(row.State)) {
    val_2 = 1.028;
  }

  // 1.795
  let val_3 = 0;
  if (['MD', 'WA', 'WI'].includes(row.State)) {
    val_3 = 0.867;
  }

  // 1.342
  let val_4 = 0;
  if (['MI', 'VA'].includes(row.State)) {
    val_4 = 0.399;
  }

  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -13.138 + 2.133 * Math.log(row.Volume)
    -2.269 * Math.log(row.AvgSpeed)
    +0.051 * (row.GP_AvgSpeed - row.GP_AvgSpeed_DOWN)
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -0.533 + 0.357 * Math.log(Number(row.Volume))
    - 0.959 * Math.log(row.AvgSpeed) + 0.096 * row.StdSpeed
    + 0.637 * row.LaneNumber3_4 + 1.301 * row.LaneNumber5_) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}