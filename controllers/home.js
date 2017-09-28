/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
    res.render('home', {
        title: 'Home'
    });
};


const getOutcomeType = (array) => {
    array.sort();
    let mostFrequnet = null
    for (let i = 0; i < array.length; i++) {

        const single = array[i];
        const total = (array.lastIndexOf(single) - array.indexOf(single)) + 1;

        if (total > mostFrequnet) {
            mostFrequnet = total;
            i = array.lastIndexOf(single) + 1;
        }
    }
    return mostFrequnet;
};

const createOutcomeArray = () => {
    const array = [];
    let iterator = 0;
    do {
        array.push(Math.floor(Math.random() * 6));
    } while (iterator++ < 2);

    return array;
};

exports.getOutcome = (req, res) => {
    const resultArray = createOutcomeArray();
    const isBonus = Math.random() >= 0.5;
    let bonusArray;
    if(isBonus) {
        bonusArray = createOutcomeArray();
    }

    res.send({
        results: resultArray,
        type: getOutcomeType(resultArray),
        bonus: isBonus ? {results: bonusArray, type: getOutcomeType(bonusArray)} : isBonus
    });
};



