
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
    val_1 = 1.366;
  }

  // 1.075
  let val_2 = 0;
  if (['KS', 'MI', 'VA'].includes(row.State)) {
    val_2 = 0.687;
  }

  // 1.795
  let val_3 = 0;
  if (['MD', 'WA', 'WI'].includes(row.State)) {
    val_3 = 0.617;
  }

  // 1.342
  let val_4 = 0;
  if (['OR'].includes(row.State)) {
    val_4 = 0.339;
  }

  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -1.984 + 0.388 * Math.log(Number(row.Volume))
    - 0.836 * Math.log(row.AvgSpeed) + 0.086 * row.StdSpeed
    + 0.618 * row.LaneNumber6_8 + 1.258 * row.LaneNumber10_
    + val_1 + val_2 + val_3 + val_4
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -1.984 + 0.399 * Math.log(Number(row.Volume))
    - 1.836 * Math.log(row.AvgSpeed) + 0.086 * row.StdSpeed
    + 0.618 * row.LaneNumber6_8 + 1.258 * row.LaneNumber10_) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}