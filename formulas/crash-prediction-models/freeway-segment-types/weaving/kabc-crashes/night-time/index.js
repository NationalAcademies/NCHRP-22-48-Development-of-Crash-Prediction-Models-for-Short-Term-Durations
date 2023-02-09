
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
      val_1 = -1.874;
    }

    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -7.942 + 0.834 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
      + val_1
    );
    return res;
  }
}

function genericModel(row, factor) {
  if (row.type === 'A') {
    let res = 0;
    res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
      -7.942 + 0.834 * Math.log(Number(row.Volume) + Number(row.On_Ramp_Volume))
    ) * factor
    ;
    return res;
  }
}

module.exports = {
  specialModelFormula,
  genericModel
}