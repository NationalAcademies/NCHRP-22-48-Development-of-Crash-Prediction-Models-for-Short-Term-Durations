
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
    if (['CO'].includes(row.State)) {
      val_1 = -0.748;
    }

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      3.474 + 0.516 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
      - 1.642 * Math.log(row.AvgSpeed)
      + val_1
    );
    return res;
  } else if (row.type === 'B') {
    let res = 0;

    // 0.476
    let val_1 = 0;
    if (['CO'].includes(row.State)) {
      val_1 = -2.169;
    }
    let val_2 = 0;
    if (['MI'].includes(row.State)) {
      val_2 = 0.916;
    }

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -10.657 + 1.200 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
      + 0.786 * (row.Off_Ramp_Volume / row.Volume)
      +0.152 * row.StdSpeed
      + val_1 + val_2
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'A') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      3.474 +
      0.516 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
      -1.642 * Math.log(row.AvgSpeed)
    ) * factor
    ;
    return res;
  }
  if (row.type === 'B') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -10.657 + 1.200 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
      + 0.786 * (row.Off_Ramp_Volume / row.Volume)
      +0.152 * row.StdSpeed
    ) * factor
    ;
    return res;
  }
}

module.exports = {
  specialModelFormula,
  genericModel
}