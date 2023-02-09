
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
      val_1 = 0.966;
    }
    let val_2 = 0;
    if (['OR', 'VA'].includes(row.State)) {
      val_2 = 1.277;
    }

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -1.627 + 0.591 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
      +0.644 * (row.Off_Ramp_Volume / row.Volume)
      -1.226 * Math.log(row.AvgSpeed)
      + 0.078 * row.StdSpeed
      +0.105 * Math.log(row.StdSpeed)
      + val_1 + val_2
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'A') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -1.627 + 0.591 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
      +0.644 * (row.Off_Ramp_Volume / row.Volume)
      -1.226 * Math.log(row.AvgSpeed)
      + 0.078 * row.StdSpeed
      +0.105 * Math.log(row.StdSpeed)
    ) * factor
    ;
    return res;
  }
}

module.exports = {
  specialModelFormula,
  genericModel
}