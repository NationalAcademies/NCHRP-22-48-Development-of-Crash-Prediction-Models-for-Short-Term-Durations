
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
  if (['GA'].includes(row.State)) {
    val_1 = 2.445;
  }

  // 1.075
  let val_2 = 0;
  if (['CO', 'MI'].includes(row.State)) {
    val_2 = 0.704;
  }

  // 1.795
  let val_3 = 0;
  if (['TX', 'VA'].includes(row.State)) {
    val_3 = 0.525;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -0.633 + 0.637 * Math.log(Number(row.Volume))
    - 1.391 * Math.log(row.AvgSpeed)
    + 0.218 * row.LaneNumber3_4
    + val_1 + val_2 + val_3
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -0.633 + 0.637 * Math.log(Number(row.Volume))
    - 1.391 * Math.log(row.AvgSpeed)
    + 0.218 * row.LaneNumber3_4) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}