
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
    if (['OR', 'VA'].includes(row.State)) {
      val_1 = 1.164;
    }

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -3.873 + 0.345 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
      +0.105 * Math.log(row.StdSpeed)
      + val_1
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'A') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -3.873 + 0.345 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
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