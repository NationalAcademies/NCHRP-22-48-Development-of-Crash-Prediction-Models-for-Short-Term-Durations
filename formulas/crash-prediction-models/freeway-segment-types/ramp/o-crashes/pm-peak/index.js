
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
      -3.7951 + 1.0635 * Math.log(row.Volume)
      -1.3242 * Math.log(row.AvgSpeed)
    );
    return res;
  }

  if (row.type === 'off') {
    let val_1 = 0;
    if (['FL'].includes(row.State)) {
      val_1 = 0.720;
    }
    let res = 0;

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -4.541 + 0.810 * Math.log(row.Volume)
      -0.664 * Math.log(row.AvgSpeed)
      -0.652 * row.Curve
      + val_1
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'on') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -3.7951 + 1.0635 * Math.log(row.Volume)
      -1.3242 * Math.log(row.AvgSpeed)
    ) * factor
    ;
    return res;
  }
  if (row.type === 'off') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -4.541 + 0.810 * Math.log(row.Volume)
      -0.664 * Math.log(row.AvgSpeed)
      -0.652 * row.Curve
    ) * factor
    ;
    return res;
  }

}

module.exports = {
  specialModelFormula,
  genericModel
}