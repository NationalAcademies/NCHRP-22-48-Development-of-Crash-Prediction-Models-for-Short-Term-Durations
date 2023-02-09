
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
      val_1 = -1.0013;
    }
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -5.9341 + 0.8865 * Math.log(row.Volume)
      -0.5353 * Math.log(row.AvgSpeed)
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
      -5.783 + 0.9296 * Math.log(row.Volume)
      -0.6201 * Math.log(row.AvgSpeed)
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'on') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -5.9341 + 0.8865 * Math.log(row.Volume)
      -0.5353 * Math.log(row.AvgSpeed)
    ) * factor
    ;
    return res;
  }
  if (row.type === 'off') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -5.783 + 0.9296 * Math.log(row.Volume)
      -0.6201 * Math.log(row.AvgSpeed)
    ) * factor
    ;
    return res;
  }

}

module.exports = {
  specialModelFormula,
  genericModel
}