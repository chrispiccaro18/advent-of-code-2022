// const inputString = require('./input');

const totalCaloriesOfElf = (elfString) => {
    return elfString.split('\n').reduce((prev, current) => prev + parseInt(current), 0);
};

const day01Part01 = (inputString) => {
    let mostCalories = 0;
    
    const caloriesPerElf = inputString.split('\n\n');
    
    caloriesPerElf.forEach(elf => {
        const totalCaloriesOfCurrentElf = totalCaloriesOfElf(elf);
        if(totalCaloriesOfCurrentElf > mostCalories) mostCalories = totalCaloriesOfCurrentElf;
    });
    
    return mostCalories;
}


module.exports = {
    totalCaloriesOfElf,
    day01Part01,
};