
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
  if (['AZ', 'FL', 'TX'].includes(row.State)) {
    val_1 = 0.476;
  }

  // 1.075
  let val_2 = 0;
  if (['CO', 'VA'].includes(row.State)) {
    val_2 = 1.075;
  }

  // 1.795
  let val_3 = 0;
  if (['GA', 'MI'].includes(row.State)) {
    val_3 = 1.795;
  }

  // 1.342
  let val_4 = 0;
  if (['IL', 'KS'].includes(row.State)) {
    val_4 = 1.342;
  }

  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -4.774 + 0.614 * row.LogVolume
      + 0.025 * (row.AvgSpeed - row.AvgSpeed_DOWN)
      + 2.379 * row.LaneNumber
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -4.774 + 0.614 * row.LogVolume
    + 0.025 * (row.AvgSpeed - row.AvgSpeed_DOWN)
    + 2.379 * LaneNumber) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}