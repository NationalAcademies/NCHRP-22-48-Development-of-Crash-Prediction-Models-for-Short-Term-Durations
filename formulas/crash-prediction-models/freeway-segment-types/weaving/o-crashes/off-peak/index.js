
function Sigma(n) {
  let res = 0;
  for (let i = 1; i <= n; i ++) {
    res += i;
  }
  return res;
}

function specialModelFormula(row) {
  if (row.type === 'A') {
    let res = 0;

    // 0.476
    let val_1 = 0;
    if (['MI', 'WI'].includes(row.State)) {
      val_1 = 0.634;
    }

    let val_2 = 0;
    if (['OR'].includes(row.State)) {
      val_2 = -0.629;
    }

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      1.924 + 0.530 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
      +0.521 * (row.Off_Ramp_Volume / row.Volume)
      -1.509 * Math.log(row.AvgSpeed)
      +0.061 * row.StdSpeed
      + val_1 + val_2
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'A') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      1.924 + 0.530 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
      +0.521 * (row.Off_Ramp_Volume / row.Volume)
      -1.509 * Math.log(row.AvgSpeed)
      + 0.061 * row.StdSpeed
    ) * factor;
    return res;
  }
}

module.exports = {
  specialModelFormula,
  genericModel
}