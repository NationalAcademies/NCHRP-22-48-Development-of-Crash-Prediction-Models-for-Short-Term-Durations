const path = require("path");
const express = require('express');
const fileupload = require("express-fileupload")

const {renderNavs} = require('./util')
const navs = require('./data/navs')
const RequiredData = require('./data/Required-Data')

const CrashRoute = require("./routes/crash-prediction-models")
const {figure} = require("./formulas");
const fs = require("fs");

const app = express();
app.set('view engine', 'pug');

app.use(fileupload());
app.use(express.static('public'));
app.use(express.static('excels'));
app.use(express.urlencoded({ extended: false }))

app.post("/figure", async (req, res) => {
    try {
        // delete all file
        fs.rmdirSync(path.resolve(__dirname, './excels'), {
            recursive: true
        });
        fs.mkdirSync(path.resolve(__dirname, './excels'));
        let path_split = req.headers.referer.split('/').slice(3);
        let dataFile,
            figureModel,
            savePath,
            crashes_state;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        figureModel = req.body.model || 'special';
        let type = req.body.type;
        crashes_state = req.body.crashes_state;
        crashes_state = Number(crashes_state);
        dataFile = req.files.dataFile;
        savePath = path.resolve(__dirname, `./excels/${Date.now() + Math.ceil(Math.random() * 10000)}.csv`);
        dataFile.mv(savePath, function (err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            figure(savePath, figureModel, crashes_state, path_split, type).then(filename => {
                const fname = path_split.join('-') + '-result' + '.csv'
                res.setHeader('Content-Disposition', 'attachment; filename=' + fname)
                res.sendFile(path.resolve(__dirname, `./excels/${filename}`), );
            })

        })
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.use(function (req, res, next) {
    let pathWay = '';
    let navsHTML = '';
    let urlStr = '';

    let paths = req.path.split('/');
    let url = req.originalUrl;
    urlStr = url.split('/').filter(item => item.length > 0).map(item => decodeURIComponent(item)).join('/');


    paths = paths.filter(p => p.length > 0).map(p => decodeURIComponent(p));
    pathWay = paths.join(' > ');

    navsHTML = renderNavs(navs, paths);

    res.locals.navsHTML = navsHTML;
    res.locals.pathWay = pathWay;
    res.locals.urlStr = urlStr;
    next();
})
app.get('/', function (req, res) {
    res.redirect('/Home');
});

app.get('/Home', function (req, res) {

    res.render('home/home.pug');
});

app.get('/About', function (req, res) {
    res.render('about/about.pug');
})

app.get(`/${encodeURIComponent('Required Data')}`, function (req, res) {
    res.render('required-data/required-data.pug', {requiredData: RequiredData})
});

app.use(`/${encodeURIComponent('Crash Prediction Models')}`, CrashRoute);


app.get(`/${encodeURIComponent('Contact Us')}`, function (req, res) {
    res.render('contact-us/contact-us.pug');
})

// app.get(`/${encodeURIComponent('Crash Prediction Models')}*`, function (req, res) {
//     let navsHTML = '';
//     let paths = req.path.split('/');
//
//     paths = paths.filter(p => p.length > 0).map(p => decodeURIComponent(p));
//
//     navsHTML = renderNavs(navs, paths);
//
//     res.render('home/home.pug', {navsHTML: navsHTML});
// })

app.use(function (req, res) {
    res.status(404).send("Not Found");
})

module.exports = app;