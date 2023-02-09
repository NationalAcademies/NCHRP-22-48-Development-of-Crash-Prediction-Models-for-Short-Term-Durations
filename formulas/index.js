const path = require("path");
const csv = require("csv-parser");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require("fs");
const {getFormula} = require("./formulas");

const header = [
    { id: 'State', title: 'State' },
    { id: 'RouteId', title: 'RouteId' },
    { id: 'SegmentId', title: 'SegmentId' },
    { id: 'SegmentId_UP', title: 'SegmentId_UP' },
    { id: 'SegmentId_DOWN', title: 'SegmentId_DOWN' },
    { id: 'Miles', title: 'Miles' },
    { id: 'Urban_Rural', title: 'Urban_Rural' },
    { id: 'SegmentType', title: 'SegmentType' },
    { id: 'LaneNumber2', title: 'LaneNumber2' },
    { id: 'LaneNumber3_4', title: 'LaneNumber3_4' },
    { id: 'LaneNumber5_', title: 'LaneNumber5_' },
    { id: 'period', title: 'period' },
    { id: 'Volume', title: 'Volume' },
    { id: 'AvgSpeed', title: 'AvgSpeed' },
    { id: 'StdSpeed', title: 'StdSpeed' },
    { id: 'CoefOfVarSpeed', title: 'CoefOfVarSpeed' },
    { id: 'AvgOccupancy', title: 'AvgOccupancy' },
    { id: 'StdOccupancy', title: 'StdOccupancy' },
    { id: 'CoefOfVarOccupancy', title: 'CoefOfVarOccupancy' },
    { id: 'Volume_UP', title: 'Volume_UP' },
    { id: 'AvgSpeed_UP', title: 'AvgSpeed_UP' },
    { id: 'StdSpeed_UP', title: 'StdSpeed_UP' },
    { id: 'CoefOfVarSpeed_UP', title: 'CoefOfVarSpeed_UP' },
    { id: 'AvgOccupancy_UP', title: 'AvgOccupancy_UP' },
    { id: 'StdOccupancy_UP', title: 'StdOccupancy_UP' },
    { id: 'CoefOfVarOccupancy_UP', title: 'CoefOfVarOccupancy_UP' },
    { id: 'Volume_DOWN', title: 'Volume_DOWN' },
    { id: 'AvgSpeed_DOWN', title: 'AvgSpeed_DOWN' },
    { id: 'StdSpeed_DOWN', title: 'StdSpeed_DOWN' },
    { id: 'CoefOfVarSpeed_DOWN', title: 'CoefOfVarSpeed_DOWN' },
    { id: 'AvgOccupancy_DOWN', title: 'AvgOccupancy_DOWN' },
    { id: 'StdOccupancy_DOWN', title: 'StdOccupancy_DOWN' },
    { id: 'CoefOfVarOccupancy_DOWN', title: 'CoefOfVarOccupancy_DOWN' },
    { id: 'crash_year', title: 'crash_year' },
    { id: 'calibration_factor', title: 'Calibration_Factor' },
    { id: 'Result', title: 'Result' }
]

function saveFile(datas) {
    let item = datas[0];
    delete item.calibration_factor;
    delete item.type;
    delete item.factor;
    let header = Object.keys(item).map(item => {
        return {
            id: item,
            title: item
        }
    })
    return new Promise((resolve, reject) => {
        const filename = `../excels/${Date.now()}.csv`
        const filePath = path.resolve(__dirname, filename);
        const csvWriter = createCsvWriter({
            path: filePath,
            header: header
        });
        csvWriter.writeRecords(datas).then(() => {
            resolve(filename);
        })
    })

}

function figure(filePath, model, crashes_state, refSplit, type) {
    let predicted_crashes_sigma = 0;
    let observed_crashes_sigma = 0;
    const {specialModelFormula, genericModel} = getFormula(refSplit);
    return new Promise((resolve, reject) => {
        let results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                const keys = Object.keys(row);
                if (row[keys[0]]) {
                    row.WZ = row.WZ_Segment;
                    row.crash_year = row.crash_year || row.CrashYear;
                    row.Target = row.AvgSpeed - row.AvgSpeed_DOWN;
                    row.type = type;
                    row.AvgSpeed = row.AvgSpeed || row.AvgSpeed_UP;
                    row.AvgSpeedDOWN = row.AvgSpeedDOWN || row.AvgSpeedDown;
                    row.AvgOccupancyDOWN = row.AvgOccupancyDown;
                    row.StdOccupancyDOWN = row.StdOccupancyDown;
                    row.StdSpeedUP = row.StdSpeedUp;
                    row.StdSpeedDOWN = row.StdSpeedDown;
                    if ('ThruLanes' in row) {
                        let Thrulanes = row.Thrulanes;
                        if (Thrulanes > 4 && Thrulanes < 9) {
                            row['LaneNumber3_4'] = 1;
                        } else if (Thrulanes > 8) {
                            row['LaneNumber5_'] = 1;
                        } else {
                            row['LaneNumber3_4'] = row['LaneNumber5_'] = 0;
                        }
                    }
                    if (model === 'special') {
                        row.Result = specialModelFormula(row);
                        row.calibration_factor = "";
                        results.push(row)
                    }
                    if (model === 'generic') {
                        observed_crashes_sigma += crashes_state;
                        let item = specialModelFormula(row);
                        if (!isNaN(item)) {
                            predicted_crashes_sigma += specialModelFormula(row);
                            results.push(row);
                        }

                    }
                }

            })
            .on('end', () => {
                if (model === 'generic') {
                    const calibration_factor = observed_crashes_sigma / predicted_crashes_sigma;
                    for (let i = 0; i < results.length; i ++) {
                        results[i].calibration_factor = calibration_factor;
                        results[i].Result = genericModel(results[i], calibration_factor);
                    }
                }
                saveFile(results).then(filename => {
                    resolve(filename);
                })
            });
    })

}

module.exports = {
    figure
}
