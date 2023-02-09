
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
  if (['CO', 'TX'].includes(row.State)) {
    val_1 = 0.362;
  }

  // 1.075
  let val_2 = 0;
  if (['GA', 'MI'].includes(row.State)) {
    val_2 = 1.300;
  }

  // 1.795
  let val_3 = 0;
  if (['IL', 'VA'].includes(row.State)) {
    val_3 = 0.748;
  }

  // 1.342
  let val_4 = 0;
  if (['MD', 'WI'].includes(row.State)) {
    val_4 = 0.390;
  }

  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -8.795
      + 1.652 * Math.log(Number(row.Volume))
      - 1.572 * Math.log(row.GP_AvgSpeed)
      + 0.155 * (row.GP_AvgOccupancy_DOWN - row.GP_AvgOccupancy)
      + 1.448 * row.HOT_Out);

  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    1.304 + 0.283 * Math.log(Number(row.Volume))
    - 1.102 * Math.log(row.AvgSpeed) + 0.017 * row.StdSpeed
    + 0.669 * row.LaneNumber3_4 + 1.329 * row.LaneNumber5_) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}