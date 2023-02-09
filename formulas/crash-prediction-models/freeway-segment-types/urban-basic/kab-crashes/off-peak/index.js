
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
  if (['GA', 'VA'].includes(row.State)) {
    val_1 = 1.416;
  }

  // 1.075
  let val_2 = 0;
  if (['IL'].includes(row.State)) {
    val_2 = 0.748;
  }

  // 1.795
  let val_3 = 0;
  if (['MD'].includes(row.State)) {
    val_3 = 0.847;
  }

  // 1.342
  let val_4 = 0;
  if (['MI'].includes(row.State)) {
    val_4 = 0.377;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -3.205 + 0.352 * Math.log(Number(row.Volume))
    - 0.655 * Math.log(row.AvgSpeed) + 0.069 * row.StdSpeed
    + 0.605 * row.LaneNumber6_8 + 1.106 * row.LaneNumber10_
    + val_1 + val_2 + val_3 + val_4
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -3.205 + 0.352 * Math.log(Number(row.Volume))
    - 6.55 * Math.log(row.AvgSpeed) + 0.069 * row.StdSpeed
    + 0.605 * row.LaneNumber6_8 + 1.106 * row.LaneNumber10_) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}