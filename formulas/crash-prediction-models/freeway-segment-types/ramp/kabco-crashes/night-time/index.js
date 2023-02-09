
function Sigma(n) {
  let res = 0;
  for (let i = 1; i <= n; i ++) {
    res += i;
  }
  return res;
}

function specialModelFormula(row) {
  let val_1 = 0;
  if (['WI'].includes(row.State)) {
    val_1 = -1.052;
  }
  if (row.type === 'on') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -6.9112 + 1.058 * Math.log(row.Volume)
      -0.4786 * Math.log(row.AvgSpeed)
    );
    return res;
  }

  if (row.type === 'off') {
    let res = 0;

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -4.899 + 0.917 * Math.log(row.Volume)
      - 0.606 * Math.log(row.AvgSpeed)
      -0.033 * row.StdSpeed
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'on') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -6.9112 + 1.058 * Math.log(row.Volume)
      -0.4786 * Math.log(row.AvgSpeed)
    ) * factor
    ;
    return res;
  }
  if (row.type === 'off') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -4.899 + 0.917 * Math.log(row.Volume)
      - 0.606 * Math.log(row.AvgSpeed)
      -0.033 * row.StdSpeed
    ) * factor
    ;
    return res;
  }

}

module.exports = {
  specialModelFormula,
  genericModel
}