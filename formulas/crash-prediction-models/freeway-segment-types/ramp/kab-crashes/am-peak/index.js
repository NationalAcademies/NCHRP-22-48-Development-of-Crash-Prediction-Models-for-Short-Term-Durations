
function Sigma(n) {
  let res = 0;
  for (let i = 1; i <= n; i ++) {
    res += i;
  }
  return res;
}

function specialModelFormula(row) {
  let val_1 = 0;
  if (['FL', 'WI'].includes(row.State)) {
    val_1 = -1.757;
  }
  if (row.type === 'on') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -11.189 + 1.114 * Math.log(row.Volume)
      + 0.16782 * row.StdSpeed
      + val_1
    );
    return res;
  }

  if (row.type === 'off') {
    let res = 0;

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -14.193
      + 1.137 * Math.log(row.Volume)
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'on') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -11.189 + 1.114 * Math.log(row.Volume)
      + 0.16782 * row.StdSpeed
    ) * factor
    ;
    return res;
  }
  if (row.type === 'off') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -14.193
      + 1.137 * Math.log(row.Volume)
    ) * factor
    ;
    return res;
  }

}

module.exports = {
  specialModelFormula,
  genericModel
}