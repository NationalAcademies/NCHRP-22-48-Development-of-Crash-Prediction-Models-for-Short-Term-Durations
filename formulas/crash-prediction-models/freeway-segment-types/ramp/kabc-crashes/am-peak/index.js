
function Sigma(n) {
  let res = 0;
  for (let i = 1; i <= n; i ++) {
    res += i;
  }
  return res;
}

function specialModelFormula(row) {
  let val_1 = 0;
  if (['VA'].includes(row.State)) {
    val_1 = 0.8589;
  }
  if (row.type === 'on') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -3.688 + 0.648 * Math.log(row.Volume)
      -1.015 * Math.log(row.AvgSpeed)
      + val_1
    );
    return res;
  }

  if (row.type === 'off') {
    let res = 0;

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -9.213
       + 0.885 * Math.log(row.Volume)
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'on') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -3.688 + 0.648 * Math.log(row.Volume)
      -1.015 * Math.log(row.AvgSpeed)
    ) * factor
    ;
    return res;
  }
  if (row.type === 'off') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -9.213
      + 0.885 * Math.log(row.Volume)
    ) * factor
    ;
    return res;
  }

}

module.exports = {
  specialModelFormula,
  genericModel
}