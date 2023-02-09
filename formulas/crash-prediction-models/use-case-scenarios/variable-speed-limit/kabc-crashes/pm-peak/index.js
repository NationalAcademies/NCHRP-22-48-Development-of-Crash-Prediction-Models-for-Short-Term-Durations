
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
    val_1 = 2.252;
  }

  let val_2 = 0;
  if (['OR'].includes(row.State)) {
    val_2 = 0.67;
  }



  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -3.218 + 0.609 * row.LogVolume
    - 0.777 * Math.log(row.AvgSpeed) + 0.024 * row.AvgOccupancy_DOWN
    - 0.280 * row.VSL_Seg
    + 0.221 * row.Basic_Other_Segment
    + val_1 + val_2
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -3.218 + 0.609 * row.LogVolume
    - 0.777 * Math.log(row.AvgSpeed) + 0.024 * row.AvgOccupancy_DOWN
    - 0.280 * row.VSL_Seg
    + 0.221 * row.Basic_Other_Segment) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}