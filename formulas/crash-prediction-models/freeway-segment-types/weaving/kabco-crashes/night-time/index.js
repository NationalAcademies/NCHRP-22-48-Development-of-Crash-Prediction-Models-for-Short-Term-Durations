
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
      val_1 = -0.679;
    }

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -3.710 + 0.536 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
      + val_1
    );
    return res;
  }
  if (row.type === 'B') {
    let res = 0;

    // 0.476
    let val_1 = 0;
    if (['OR', 'CO'].includes(row.State)) {
      val_1 = -0.908;
    }

    let val_2 = 0;
    if (['VA'].includes(row.State)) {
      val_2 = 2.257;
    }

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -1.676 + 0.278 * Math.log(row.On_Ramp_Volume)
      +0.120 * row.StdSpeed
      + val_1 + val_2
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'A') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -3.710 + 0.536 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
    ) * factor
    ;
    return res;
  }
  if (row.type === 'B') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -1.676 + 0.278 * Math.log(row.On_Ramp_Volume)
      +0.120 * row.StdSpeed
    ) * factor
    ;
    return res;
  }

}

module.exports = {
  specialModelFormula,
  genericModel
}