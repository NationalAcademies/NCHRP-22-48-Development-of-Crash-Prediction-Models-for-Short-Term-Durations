
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
  if (['AZ', 'GA'].includes(row.State)) {
    val_1 = 1.404;
  }

  // 1.075
  let val_2 = 0;
  if (['CO', 'TX'].includes(row.State)) {
    val_2 = 0.280;
  }

  // 1.795
  let val_3 = 0;
  if (['MD', 'WA', 'MI'].includes(row.State)) {
    val_3 = 0.434;
  }

  // 1.342
  let val_4 = 0;
  if (['MI', 'OR', 'VA'].includes(row.State)) {
    val_4 = 0.802;
  }

  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -11.008 + 1.443 * Math.log(row.Volume)
    -0.795 * Math.log(row.GP_AvgSpeed)
    +0.101 * (row.GP_AvgSpeed - row.GP_AvgSpeed_DOWN)
    +0.947 * row.HOT_Out
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -1.182 + 0.303 * Math.log(Number(row.Volume))
    - 0.850 * Math.log(row.AvgSpeed) + 0.087 * row.StdSpeed
    + 0.679 * row.LaneNumber3_4 + 1.253 * row.LaneNumber5_) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}