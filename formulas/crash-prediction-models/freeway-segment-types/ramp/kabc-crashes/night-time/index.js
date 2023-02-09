
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
      -6.627 + 0.966 * Math.log(row.Volume)
      + 0.7706 * row.Curve
    );
    return res;
  }

  if (row.type === 'off') {
    let res = 0;

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -6.910 + 1.057 * Math.log(row.Volume)
      - 0.763 * Math.log(row.AvgSpeed)
      - 1.014 * row.Curve
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'on') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -6.627 + 0.966 * Math.log(row.Volume)
      + 0.7706 * row.Curve
    ) * factor
    ;
    return res;
  }
  if (row.type === 'off') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -6.910 + 1.057 * Math.log(row.Volume)
      - 0.763 * Math.log(row.AvgSpeed)
      - 1.014 * row.Curve
    ) * factor
    ;
    return res;
  }

}

module.exports = {
  specialModelFormula,
  genericModel
}