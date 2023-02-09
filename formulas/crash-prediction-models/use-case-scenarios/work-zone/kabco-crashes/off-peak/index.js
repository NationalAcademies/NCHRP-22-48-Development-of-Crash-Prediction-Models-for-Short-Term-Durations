
function Sigma(n) {
  let res = 0;
  for (let i = 1; i <= n; i ++) {
    res += i;
  }
  return res;
}

function specialModelFormula(row) {
  let res = 0;

  // 0.476
  let val_1 = 0;
  if (['TX'].includes(row.State)) {
    val_1 = -1.079;
  }


  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    -5.796 + 0.719 * row.LogVolume
    -2.729 * row.LogAvgSpeed
    +0.057 * row.StdSpeed
    + 1.229 * row.WZ
    + val_1
  );
  return res;
}

function genericModel(row, factor) {
  let res = 0;
  res = Number(row.crash_year) * Number(row.Miles) * Math.exp(
    5.796 + 0.719 * row.LogVolume
    - 2.729 * row.LogAvgSpeed
    + 0.057 * row.StdSpeed
    + 1.229 * row.WZ
  ) * factor
  ;
  return res;
}

module.exports = {
  specialModelFormula,
  genericModel
}