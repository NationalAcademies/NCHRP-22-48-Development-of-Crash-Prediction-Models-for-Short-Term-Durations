
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
    val_1 = 1.703;
  }

  // 1.075
  let val_2 = 0;
  if (['IL', 'KS', 'VA', 'MD', 'MI'].includes(row.State)) {
    val_2 = 0.559;
  }

  // 1.795
  let val_3 = 0;
  if (['OR', 'TX'].includes(row.State)) {
    val_3 = 0.277;
  }

  // 1.342
  let val_4 = 0;
  if (['WI'].includes(row.State)) {
    val_4 = 0.571;
  }

  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -3.950 + 0.390 * Math.log(Number(row.Volume))
    - 0.272 * Math.log(row.AvgSpeed) + 0.018 * row.StdSpeed
    + 0.622 * row.LaneNumber6_8 + 1.221 * row.LaneNumber10_
    + val_1 + val_2 + val_3 + val_4
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -3.950 + 0.390 * Math.log(Number(row.Volume))
    - 0.272 * Math.log(row.AvgSpeed) + 0.018 * row.StdSpeed
    + 0.622 * row.LaneNumber6_8 + 1.221 * row.LaneNumber10_) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}