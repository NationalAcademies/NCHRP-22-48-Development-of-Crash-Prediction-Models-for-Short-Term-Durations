
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
  if (['GA', 'MI'].includes(row.State)) {
    val_1 = 1.392;
  }

  // 1.075
  let val_2 = 0;
  if (['IL'].includes(row.State)) {
    val_2 = 0.997;
  }

  // 1.795
  let val_3 = 0;
  if (['MD', 'WI'].includes(row.State)) {
    val_3 = -0.383;
  }

  // 1.342
  let val_4 = 0;
  if (['OR'].includes(row.State)) {
    val_4 = -0.700;
  }

  let val_5 = 0;
  if (['CO', 'KS', 'TX', 'VA'].includes(row.State)) {
    val_5 = 0.475;
  }

  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    1.154 + 0.322 * Math.log(Number(row.Volume))
    - 1.209 * Math.log(row.AvgSpeed) + 0.100 * row.StdSpeed
    + 0.631 * row.LaneNumber6_8 + 1.272 * row.LaneNumber10_
    + val_1 + val_2 + val_3 + val_4 + val_5
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    1.154 + 0.322 * Math.log(Number(row.Volume))
    - 1.209 * Math.log(row.AvgSpeed) + 0.100 * row.StdSpeed
    + 0.631 * row.LaneNumber6_8 + 1.272 * row.LaneNumber10_) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}