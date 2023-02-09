
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
  if (['MD'].includes(row.State)) {
    val_1 = -2.113;
  }

  // 1.075
  let val_2 = 0;
  if (['FL', 'TX'].includes(row.State)) {
    val_2 = -1.322;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -8.546 + 0.745 * Math.log(Number(row.Volume))
    - 0.5752 * row.AvgOccupancy
    + val_1 + val_2
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -8.546 + 0.745 * Math.log(Number(row.Volume))
    - 0.5752 * row.AvgOccupancy) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}