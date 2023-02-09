const fs = require("fs");
const csv = require("csv-parser");
const valuesMapping = {
  'No.ofyears': 'crash_year',
  'SegmentLength': 'Miles',
  'Volume': 'Volume',
  'AvgSpeed': 'AvgSpeed',
  'Std.Speed': 'StdSpeed',
  'LaneNumber6−8': 'LaneNumber3_4',
  'LaneNumber≥10': 'LaneNumber5_',
  'Diff.AvgOccupancy(Downstream-Upstream)': ''
}

function figure(formula, row) {
  formula = formula.replace(/\s/g, '');
  formula = formula.replace(/×/g, '*');
  formula = formula.replace(/−/g, '-');
  formula = formula.replace(/\+/g, '+');

  for (let key in valuesMapping) {
    if (key === 'Diff.AvgOccupancy(Downstream-Upstream)') {
      if (formula.includes('Diff.AvgOccupancy(Downstream-Upstream)')) {
        let diff = row['AvgOccupancy_DOWN'] - row['AvgOccupancy_UP'];
        formula = formula.replace(/Diff\.AvgOccupancy\(Downstream-Upstream\)/g, "*" + diff);
      }
      continue;
    }

    if (key === 'LaneNumber6−8') {
      formula = formula.replace(/LaneNumber6-8/g, '*' + row[valuesMapping[key]])
      continue
    }

    if (
      new RegExp(`\\d+${key}`, 'g').test(formula)
    ) {

      formula = formula.replace(new RegExp(`(\\d+\.\\d+)${key}`, 'g'), `$1*${row[valuesMapping[key]]}`)
    } else {
      formula = formula.replace(new RegExp(`${key}`, 'g'), row[valuesMapping[key]]);
    }
  }


  let staticValuePartsMatch = formula.match(/(\d+\.\d+)\(.*?\)/g);
  if (Array.isArray(staticValuePartsMatch)) {
    staticValuePartsMatch.forEach(item => {
      let staticValue = 0;
      let staticValueMatch = item.match(/\d+\.\d+/);
      if (staticValueMatch && typeof staticValueMatch[0] !== 'undefined') {
        staticValue = staticValueMatch[0];
      }

      let statesMatched = item.match(/\((.*)\)/);
      if (statesMatched && statesMatched[1]) {
        statesMatched = statesMatched[1];
        let states = statesMatched.split(',');
        if (!states.includes(row.State)) {
          staticValue = 0;
        }
      }

      formula = formula.replace(item, staticValue);

    });
  }

  // replace math functions
  formula = formula.replace(/exp/g, 'Math.exp');
  formula = formula.replace(/(\d+)Log(\d+\.\d+)/g, '$1*Math.log($2)');

  formula = formula.split('=')[1];
  console.log(eval(formula))

}

let row_data;

fs.createReadStream('./excels/1648110867779.csv')
  .pipe(csv())
  .on('data', (row) => {
    row_data = row;
  })
  .on('end', () => {
    figure(`Predicted Crashes = No. of years × Segment Length
× ex p(−5.283 + 0.367LogVolume + 1.510Diff.AvgOccupancy(Downstream − Upstream)
+ 0.566LaneNumber6−8 + 1.226LaneNumber≥10 + 1.134(GA,IL, VA)
− 0.722(MD) + 0.453(MI) − 0.430(WA, WI))
`, row_data)
  });



