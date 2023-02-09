
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

    // 0.476
    let val_1 = 0;
    if (['VA'].includes(row.State)) {
      val_1 = 0.659;
    }

    // 1.075
    let val_2 = 0;
    if (['WI'].includes(row.State)) {
      val_2 = -1.785;
    }

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -4.596 + 1.195 * Math.log(row.Volume)
      -1.548 * Math.log(row.AvgSpeed)
      +0.114 * row.StdSpeed
      + val_1 + val_2
    );
    return res;
  }

  if (row.type === 'off') {
    let res = 0;

    // 0.476
    let val_1 = 0;
    if (['VA'].includes(row.State)) {
      val_1 = 0.659;
    }

    // 1.075
    let val_2 = 0;
    if (['WI'].includes(row.State)) {
      val_2 = -1.785;
    }

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -4.881 + 1.003 * Math.log(row.Volume)
       - 0.894 * Math.log(row.AvgSpeed)
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'on') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -4.596 + 1.195 * Math.log(row.Volume)
      -1.548 * Math.log(row.AvgSpeed)
      +0.114 * row.StdSpeed
    ) * factor
    ;
    return res;
  }
  if (row.type === 'off') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -4.881 + 1.003 * Math.log(row.Volume)
      - 0.894 * Math.log(row.AvgSpeed)
    ) * factor
    ;
    return res;
  }

}

module.exports = {
  specialModelFormula,
  genericModel
}