
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
  if (['VA'].includes(row.State)) {
    val_1 = 1.575;
  }

  // 1.075
  let val_2 = 0;
  if (['FL', 'MD'].includes(row.State)) {
    val_2 = 1.310;
  }

  // 1.795
  let val_3 = 0;
  if (['TX', 'CO', 'MI'].includes(row.State)) {
    val_3 = 1.796;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -0.912 + 0.597 * Math.log(Number(row.Volume))
    - 1.656 * Math.log(row.AvgSpeed)
    + 5.718 * row.AvgOccupancy
    + val_1 + val_2 + val_3
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -0.912 + 0.597 * Math.log(Number(row.Volume))
    - 1.656 * Math.log(row.AvgSpeed)
    + 5.718 * row.AvgOccupancy) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}