
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
      val_1 = 0.639;
    }

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      2.019 + 0.520 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
      + 0.473 * (row.Off_Ramp_Volume / row.Volume) - 1.462 * Math.log(row.AvgSpeed)
      + 0.066 * row.StdSpeed
      + val_1
    );
    console.log(res)
    return res;
  }
  if (row.type === 'B') {
    let res = 0;

    // 0.476
    let val_1 = 0;
    if (['CO'].includes(row.State)) {
      val_1 = -2.156;
    }

    let val_2 = 0;
    if (['OR'].includes(row.State)) {
      val_2 = -0.823;
    }

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -11.916 + 1.377 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
      + 0.656 * (row.Off_Ramp_Volume / row.Volume)
      + 0.102 * row.StdSpeed
      + val_1 + val_2
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'A') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      2.019 +
      0.520 * Math.log(row.Volume)
      +0.473 * row.Off_Ramp_Volume
      -1.462 * Math.log(row.AvgSpeed)
      +0.066 * row.StdSpeed
    ) * factor
    ;
    return res;
  }
  if (row.type === 'B') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -11.916 + 1.377 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
      + 0.656 * (row.Off_Ramp_Volume / row.Volume)
      + 0.102 * row.StdSpeed
    ) * factor
    ;
    return res;
  }
}

module.exports = {
  specialModelFormula,
  genericModel
}