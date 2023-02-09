
function Sigma(n) {
  let res = 0;
  for (let i = 1; i <= n; i ++) {
    res += i;
  }
  return res;
}

function specialModelFormula(row) {

  if (row.type === 'on') {
    let val_1 = 0;
    if (['FL'].includes(row.State)) {
      val_1 = -1.2254;
    }
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -8.3864 + 1.3395 * Math.log(row.Volume)
      -2.1475 * Math.log(row.AvgSpeed)
      + 2.3001 * row.Curve
    );
    return res;
  }

  if (row.type === 'off') {
    let val_1 = 0;
    if (['FL', 'WI'].includes(row.State)) {
      val_1 = -1.1572;
    }
    let res = 0;

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -6.486 + 0.418 * Math.log(row.Volume)
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'on') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -8.3864 + 1.3395 * Math.log(row.Volume)
      -2.1475 * Math.log(row.AvgSpeed)
      + 2.3001 * row.Curve
    ) * factor
    ;
    return res;
  }
  if (row.type === 'off') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -6.486 + 0.418 * Math.log(row.Volume)
    ) * factor
    ;
    return res;
  }

}

module.exports = {
  specialModelFormula,
  genericModel
}