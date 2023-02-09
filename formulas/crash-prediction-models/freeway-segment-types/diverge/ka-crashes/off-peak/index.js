
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
    val_1 = 0.415;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -8.551
    + 0.660 * Math.log(Number(row.Mainline_Volume))
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -8.551
    + 0.660 * Math.log(Number(row.Mainline_Volume))
  ) * factor
  ;
  return res;

}

module.exports = {
  specialModelFormula,
  genericModel
}