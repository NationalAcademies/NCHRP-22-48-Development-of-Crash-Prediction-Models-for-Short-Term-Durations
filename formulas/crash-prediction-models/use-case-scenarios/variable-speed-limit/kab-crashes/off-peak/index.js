
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
    val_1 = -1.997;
  }

  // 1.075
  let val_2 = 0;
  if (['WA'].includes(row.State)) {
    val_2 = -1.786;
  }

  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -1.761 + 0.202 * row.LogVolume
    - 0.196 * Math.log(row.AvgSpeed)
    + 0.067 * row.StdSpeed
    + 0.067 * (row.AvgOccupancyDOWN - row.AvgOccupancy)
    + val_1 + val_2
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -1.761 + 0.202 * row.LogVolume
    - 0.196 * Math.log(row.AvgSpeed)
    + 0.067 * row.StdSpeed
    + 0.067 * (row.AvgOccupancyDOWN - row.AvgOccupancy)) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}