
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
      -3.046 + 0.838 * Math.log(row.Volume)
      -1.271 * Math.log(row.AvgSpeed)
      + (row.ThruLanes >= 2 ? 0.696 : 0)
      +0.493 * row.Curve
      + val_1
    );
    return res;
  }

  if (row.type === 'off') {
    let res = 0;

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -3.504 + 0.730 * Math.log(row.Volume)
      - 0.768 * Math.log(row.AvgSpeed)
      + (row.ThruLanes >= 2 ? 0.7594 : 0)
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'on') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -3.046 + 0.838 * Math.log(row.Volume)
      -1.271 * Math.log(row.AvgSpeed)
      + (row.ThruLanes >= 2 ? 0.696 : 0)
      +0.493 * row.Curve
    ) * factor
    ;
    return res;
  }
  if (row.type === 'off') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -3.504 + 0.730 * Math.log(row.Volume)
      - 0.768 * Math.log(row.AvgSpeed)
      + (row.ThruLanes >= 2 ? 0.7594 : 0)
    ) * factor
    ;
    return res;
  }

}

module.exports = {
  specialModelFormula,
  genericModel
}