
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
  if (['CO', 'KS', 'VA'].includes(row.State)) {
    val_1 = 0.664;
  }

  // 1.075
  let val_2 = 0;
  if (['GA'].includes(row.State)) {
    val_2 = 1.820;
  }

  // 1.795
  let val_3 = 0;
  if (['IL'].includes(row.State)) {
    val_3 = 1.331;
  }

  // 1.342
  let val_4 = 0;
  if (['MD', 'OR'].includes(row.State)) {
    val_4 = 0.305;
  }

  let val_5 = 0;
  if (['MI'].includes(row.State)) {
    val_5 = 0.985;
  }

  let val_6 = 0;
  if (['TX', 'WA'].includes(row.State)) {
    val_6 = 0.399;
  }

  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -2.521 + 0.502 * Math.log(Number(row.Volume))
    - 0.555 * Math.log(row.AvgSpeed) + 0.023 * row.StdSpeed
    + 0.517 * row.LaneNumber6_8 + 1.128 * row.LaneNumber10_
    + val_1 + val_2 + val_3 + val_4 + val_5 + val_6
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -2.521 + 0.502 * Math.log(Number(row.Volume))
    - 0.555 * Math.log(row.AvgSpeed) + 0.023 * row.StdSpeed
    + 0.517 * row.LaneNumber6_8 + 1.128 * row.LaneNumber10_) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}