
function Sigma(n) {
  let res = 0;
  for (let i = 1; i <= n; i ++) {
    res += i;
  }
  return res;
}

function specialModelFormula(row) {
  let val_1 = 0;
  if (['VA', 'WI'].includes(row.State)) {
    val_1 = -1.0476;
  }
  if (row.type === 'on') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -5.9135 + 1.23 * Math.log(row.Volume)
      - 1.6683 * Math.log(row.AvgSpeed)
      + val_1
    );
    return res;
  }

  if (row.type === 'off') {
    let res = 0;

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -6.429 + 0.509 * Math.log(row.Volume)
      + (row.ThruLanes >= 2 ? 0.8454 : 0)
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'on') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -5.9135 + 1.23 * Math.log(row.Volume)
      - 1.6683 * Math.log(row.AvgSpeed)
    ) * factor
    ;
    return res;
  }
  if (row.type === 'off') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -6.429 + 0.509 * Math.log(row.Volume)
      + (row.ThruLanes >= 2 ? 0.8454 : 0)
    ) * factor
    ;
    return res;
  }

}

module.exports = {
  specialModelFormula,
  genericModel
}