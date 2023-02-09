
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
    val_1 = 1.34854;
  }
  if (row.type === 'on') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -10.464 + 0.929 * Math.log(row.Volume)
      + 0.13195 * row.StdSpeed
      + val_1
    );
    return res;
  }

  if (row.type === 'off') {
    let res = 0;

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -3.767 + 0.885 * Math.log(row.Volume)
      - 1.348 * Math.log(row.AvgSpeed)
      + (row.ThruLanes >= 2 ? 0.746 : 0)
      - 0.667 * row.Curve
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'on') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -10.464 + 0.929 * Math.log(row.Volume)
      + 0.13195 * row.StdSpeed
    ) * factor
    ;
    return res;
  }
  if (row.type === 'off') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -3.767 + 0.885 * Math.log(row.Volume)
      - 1.348 * Math.log(row.AvgSpeed)
      + (row.ThruLanes >= 2 ? 0.746 : 0)
      - 0.667 * row.Curve
    ) * factor
    ;
    return res;
  }

}

module.exports = {
  specialModelFormula,
  genericModel
}