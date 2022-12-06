const calculateTotalCalories = (elfString) => {
    return elfString
        .split('\n')
        .reduce((prev, current) => prev + parseInt(current), 0);
};

const day01Part01 = (inputString) => {
    return inputString
        .split('\n\n')
        .map(calculateTotalCalories)
        .sort((a, b) => b - a)[0];
};

const day01Part02 = (inputString) => {
    return inputString
        .split('\n\n')
        .map(calculateTotalCalories)
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((prev, current) => prev + current, 0);
};

module.exports = {
    calculateTotalCalories,
    day01Part01,
    day01Part02,
};
