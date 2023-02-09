
function Sigma(n) {
  let res = 0;
  for (let i = 1; i <= n; i ++) {
    res += i;
  }
  return res;
}

function specialModelFormula(row) {
  if (row.type === 'on') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -5.339 + 0.966 * Math.log(row.Volume)
      -0.873 * Math.log(row.AvgSpeed)
      +0.069 * row.StdSpeed
      +0.423 * row.Curve
    );
    return res;
  }

  if (row.type === 'off') {
    let res = 0;

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -4.223 + 0.956 * Math.log(row.Volume)
      - 1.002 * Math.log(row.AvgSpeed)
      + 0.089 * row.StdSpeed
      + (row.ThruLanes >= 2 ? 0.456 : 0)
      -0.469 * row.Curve
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'on') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -5.339 + 0.966 * Math.log(row.Volume)
      -0.873 * Math.log(row.AvgSpeed)
      +0.069 * row.StdSpeed
      +0.423 * row.Curve
    ) * factor
    ;
    return res;
  }
  if (row.type === 'off') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -4.223 + 0.956 * Math.log(row.Volume)
      - 1.002 * Math.log(row.AvgSpeed)
      + 0.089 * row.StdSpeed
      + (row.ThruLanes >= 2 ? 0.456 : 0)
      -0.469 * row.Curve
    ) * factor
    ;
    return res;
  }

}

module.exports = {
  specialModelFormula,
  genericModel
}