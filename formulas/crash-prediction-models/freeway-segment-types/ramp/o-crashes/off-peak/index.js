
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
        -4.7541 + 0.9771 * Math.log(row.Volume)
      -1.0356 * Math.log(row.AvgSpeed)
      + val_1
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
      -2.547 + 0.810 * Math.log(row.Volume)
      -1.304 * Math.log(row.AvgSpeed)
      + (row.ThruLanes >= 2 ? 0.741 : 0)
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'on') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -4.7541 + 0.9771 * Math.log(row.Volume)
      -1.0356 * Math.log(row.AvgSpeed)
    ) * factor
    ;
    return res;
  }
  if (row.type === 'off') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -2.547 + 0.810 * Math.log(row.Volume)
      -1.304 * Math.log(row.AvgSpeed)
      + (row.ThruLanes >= 2 ? 0.741 : 0)
    ) * factor
    ;
    return res;
  }

}

module.exports = {
  specialModelFormula,
  genericModel
}