
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
      -9.6834 + 0.9446 * Math.log(row.Volume)
      -1.6683 * Math.log(row.AvgSpeed)
      + val_1
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
      -10.805
      + 1.078 * Math.log(row.Volume)
      -1.1945 * row.Curve
      + val_1
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'on') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -9.6834 + 0.9446 * Math.log(row.Volume)
      -1.6683 * Math.log(row.AvgSpeed)
    ) * factor
    ;
    return res;
  }
  if (row.type === 'off') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -10.805
      + 1.078 * Math.log(row.Volume)
      -1.1945 * row.Curve
    ) * factor
    ;
    return res;
  }

}

module.exports = {
  specialModelFormula,
  genericModel
}