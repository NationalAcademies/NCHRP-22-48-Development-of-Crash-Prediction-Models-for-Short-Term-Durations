
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
    if (['OR', 'CO'].includes(row.State)) {
      val_1 = -0.953;
    }

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      4.644 + 0.472 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
      -1.853 * Math.log(row.AvgSpeed)
      + val_1
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'A') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      4.644 + 0.472 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
      -1.853 * Math.log(row.AvgSpeed)
    ) * factor;
    return res;
  }
}

module.exports = {
  specialModelFormula,
  genericModel
}