// first half of characters represent items in the first compartment
// Lowercase item types a through z have priorities 1 through 26.
// Uppercase item types A through Z have priorities 27 through 52.

const stringToEqualArrays = string => {
    const stringArray = string.split('');
    const halfwayIndex = stringArray.length / 2;
    return [stringArray.slice(0, halfwayIndex), stringArray.slice(halfwayIndex, stringArray.length)];
};

const findCommonCharacter = rucksackHalves => {
    const [firstHalf, secondHalf] = rucksackHalves;
    for(let i = 0; i < firstHalf.length; i++) {
        const firstHalfChar = firstHalf[i];
        if(secondHalf.includes(firstHalfChar)) return firstHalfChar;
    }
};

const convertCharToPriority = char => {
    // a z A Z
    // 97 122 65 90
    const UTF16Code = char.charCodeAt(0);

    if(UTF16Code < 97) return UTF16Code - 38;
    else return UTF16Code - 96;
};

const day03Part01 = input => {
    return input
        .split('\n')
        .map(stringToEqualArrays)
        .map(findCommonCharacter)
        .reduce((total, current) => total + convertCharToPriority(current), 0);
};

const groupIntoThrees = arrayOfArrays => {
    return arrayOfArrays.reduce((newArray, current, index) => {
        if(!(index % 3)) {
            newArray.push([current]);
            return newArray;
        } else {
            const newArrayIndex = parseInt(index / 3);
            newArray[newArrayIndex].push(current);
            return newArray;
        }
    }, []);
};

const determineCommonChars = arrays => {
    if(arrays.length <= 1) return arrays[0];

    const [firstArray, secondArray] = arrays;

    const matches = firstArray.reduce((possibleMatches, firstArrayChar) => {
        if(secondArray.includes(firstArrayChar) && !possibleMatches.includes(firstArrayChar)) {
            return [...possibleMatches, firstArrayChar];
        }
        else return possibleMatches;
    }, []);

    arrays.shift();
    arrays.shift();
    return determineCommonChars([matches, ...arrays]);
};

const day03Part02 = input => {
    const arraysOfRucksackItems = input
        .split('\n')
        .map(rucksack => rucksack.split(''));
    
    return groupIntoThrees(arraysOfRucksackItems)
        .map(determineCommonChars)
        .reduce((total, current) => total + convertCharToPriority(current[0]), 0);
};

module.exports = {
    stringToEqualArrays,
    findCommonCharacter,
    convertCharToPriority,
    day03Part01,
    groupIntoThrees,
    determineCommonChars,
    day03Part02,
};
