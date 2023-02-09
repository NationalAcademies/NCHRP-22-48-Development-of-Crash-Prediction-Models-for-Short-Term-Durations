
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
    if (['VA'].includes(row.State)) {
      val_1 = 1.51225;
    }
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -9.25389 + 0.70273 * Math.log(row.Volume)
      + 0.09139 * row.StdSpeed
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
      -7.156 + 0.823 * Math.log(row.Volume)
      - 0.097 * Math.log(row.AvgSpeed)
      - 0.678 * row.Curve
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'on') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -9.25389 + 0.70273 * Math.log(row.Volume)
      + 0.09139 * row.StdSpeed
    ) * factor
    ;
    return res;
  }
  if (row.type === 'off') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -7.156 + 0.823 * Math.log(row.Volume)
      - 0.097 * Math.log(row.AvgSpeed)
      - 0.678 * row.Curve
    ) * factor
    ;
    return res;
  }

}

module.exports = {
  specialModelFormula,
  genericModel
}