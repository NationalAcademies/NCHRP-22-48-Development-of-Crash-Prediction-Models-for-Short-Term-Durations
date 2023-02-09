
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
  if (['AZ', 'FL'].includes(row.State)) {
    val_1 = 0.331;
  }

  // 1.075
  let val_2 = 0;
  if (['CO', 'IL', 'VA'].includes(row.State)) {
    val_2 = 1.061;
  }

  // 1.795
  let val_3 = 0;
  if (['GA', 'MI'].includes(row.State)) {
    val_3 = 1.638;
  }

  // 1.342
  let val_4 = 0;
  if (['KS', 'TX'].includes(row.State)) {
    val_4 = 0.623;
  }

  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -10.761 + 2.699 * Math.log(row.GP_Volume)
      -3.816 * Math.log(row.AvgSpeed))
  ;
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -0.123 + 0.364 * Math.log(Number(row.Volume))
    - 0.939 * Math.log(row.AvgSpeed) + 0.114 * row.StdSpeed
    + 0.572 * row.LaneNumber3_4 + 1.317 * row.LaneNumber5_) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}