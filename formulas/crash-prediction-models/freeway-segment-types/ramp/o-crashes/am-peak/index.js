
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
    if (['WI'].includes(row.State)) {
      val_1 = -1.8296;
    }
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -3.5122 + 0.7997 * Math.log(row.Volume)
      -0.9495 * Math.log(row.AvgSpeed)
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
      -5.760 + 1.197 * Math.log(row.Volume)
      -1.021 * Math.log(row.AvgSpeed)
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'on') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -3.5122 + 0.7997 * Math.log(row.Volume)
      -0.9495 * Math.log(row.AvgSpeed)
    ) * factor
    ;
    return res;
  }
  if (row.type === 'off') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -5.760 + 1.197 * Math.log(row.Volume)
      -1.021 * Math.log(row.AvgSpeed)
    ) * factor
    ;
    return res;
  }

}

module.exports = {
  specialModelFormula,
  genericModel
}