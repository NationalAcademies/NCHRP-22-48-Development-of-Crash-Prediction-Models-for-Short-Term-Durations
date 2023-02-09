
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
  if (['MI'].includes(row.State)) {
    val_1 = 0.730;
  }

  // 1.075
  let val_2 = 0;
  if (['TX'].includes(row.State)) {
    val_2 = 0.462;
  }

  // 1.795
  let val_3 = 0;
  if (['VA', 'CO', 'WA'].includes(row.State)) {
    val_3 = 0.665;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -9.747 + 0.840 * Math.log(Number(row.Volume))
    + 0.031 * (row.AvgOccupancy_DOWN - row.AvgOccupancy)
    + 0.037 * row.StdSpeed
    + 0.244 * row.LaneNumber3_4
    + val_1 + val_2 + val_3
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -9.747 + 0.840 * Math.log(Number(row.Volume))
    + 0.031 * (row.AvgOccupancy_DOWN - row.AvgOccupancy)
    + 0.037 * row.StdSpeed
    + 0.244 * row.LaneNumber3_4) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}