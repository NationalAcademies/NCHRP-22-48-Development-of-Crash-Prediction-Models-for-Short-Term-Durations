
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
    if (['OR'].includes(row.State)) {
      val_1 = -0.452;
    }
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -1.559 + 0.833 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
      -1.100 * Math.log(row.AvgSpeed)
      + val_1
    );
    return res;
  }
  if (row.type === 'B') {
    let res = 0;
    console.log(0.542 * Math.log(row.Volume))
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -4.294 +
      0.542 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
      +0.666 * (row.Off_Ramp_Volume / row.Volume)
      +0.090 * row.StdSpeed
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'A') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -1.559 +
      0.833 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
      -1.100 * Math.log(row.AvgSpeed)
    ) * factor
    ;
    return res;
  }
  if (row.type === 'B') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -4.294 +
      0.542 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
      +0.666 * (row.Off_Ramp_Volume / row.Volume)
      +0.090 * row.StdSpeed
    ) * factor
    ;
    return res;
  }
}

module.exports = {
  specialModelFormula,
  genericModel
}