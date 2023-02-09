const path = require("path");
function getFormula(refSplit) {
    let formulaPath = refSplit.map(item => {
        return decodeURIComponent(item).replace(/\s/g, '-').toLowerCase();
    }).join('/');

    const formulas = require(path.resolve(__dirname, `./${formulaPath}/index.js`));

    return formulas;
}

module.exports = {

    getFormula
}