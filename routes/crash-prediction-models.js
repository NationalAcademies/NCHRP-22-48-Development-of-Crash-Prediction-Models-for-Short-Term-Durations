const express = require("express");
const router = express.Router();

function isFigurePage(lastPath) {
    const figurePagePaths = ['AM Peak', 'Off Peak', 'PM Peak', 'Night Time'];
    lastPath = decodeURIComponent(lastPath);
    return figurePagePaths.includes(lastPath);
}

router.get(``, function (req, res) {
    res.render('crash-prediction-models/crash-prediction-models.pug');
});

router.get(`/${encodeURIComponent('Freeway Segment Types')}`, function (req, res) {
  res.render(`crash-prediction-models/Freeway-Segment-Types/Freeway-Segment-Types.pug`);
})

router.get(`/${encodeURIComponent('Use Case Scenarios')}`, function (req, res) {

    const scenarios = [
        // { type: 'Freeway Segment Type', image: 'scenario1.png', link: req.originalUrl + '/Freeway Segment Types' },
        { type: 'High Occupancy Vehicle Lane (HOV)', image: 'scenario2.png', link: req.originalUrl + '/High Occupancy Vehicle Lane' },
        { type: 'Variable/Advisory Speed Limit (VSL/VAS)', image: 'scenario3.png', link: req.originalUrl + '/Variable Advisory Speed Limit' },
        { type: 'Hard Shoulder Running (HSR)', image: 'scenario4.png', link: req.originalUrl + '/Hard Shoulder Running' },
        { type: 'High Occupancy Toll Lane (HOT)', image: 'scenario5.png', link: req.originalUrl + '/High Occupancy Toll Lane' },
        //{ type: 'Reversible Lane (RL)', image: 'scenario6.png', link: req.originalUrl + '/Reversible Lane' },
        { type: 'Ramp Metering (RM)', image: 'scenario7.png', link: req.originalUrl + '/Ramp Metering' },
        { type: 'Work Zone (WZ)', image: 'scenario8.png', link: req.originalUrl + '/Work Zone' },
    ];
    res.render('crash-prediction-models/use-case-scenarios/use-case-scenarios.pug', {
        scenarios
    });
});

router.get(`/${encodeURIComponent('Use Case Scenarios')}*`, function (req, res) {
    let pugPath;
    const paths = req.originalUrl.split('/').slice(3);
    const pugName = paths[paths.length - 1];

    pugPath = 'crash-prediction-models/use-case-scenarios/' + [...paths, pugName + '.pug'].map(item => decodeURIComponent(item)).join('/');
    pugPath = pugPath.replace(/ /g, '-');

    if (isFigurePage(paths[paths.length - 1])) {

    }

    res.render(pugPath);
});

router.get(`/${encodeURIComponent('Freeway Segment Types')}*`, function (req, res) {
    let pugPath;
    const paths = req.originalUrl.split('/').slice(3);
    const pugName = paths[paths.length - 1];

    pugPath = 'crash-prediction-models/Freeway Segment Types/' + [...paths, pugName + '.pug'].map(item => decodeURIComponent(item)).join('/');
    pugPath = pugPath.replace(/ /g, '-');

    if (isFigurePage(paths[paths.length - 1])) {

    }

    res.render(pugPath);
});



module.exports = router;