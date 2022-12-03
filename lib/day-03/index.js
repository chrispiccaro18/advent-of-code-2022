// first half of characters represent items in the first compartment
// Lowercase item types a through z have priorities 1 through 26.
// Uppercase item types A through Z have priorities 27 through 52.

const stringToEqualArrays = string => {
    const stringArray = string.split('');
    const halfwayIndex = stringArray.length / 2;
    // console.log([stringArray.slice(0, halfwayIndex), stringArray.slice(halfwayIndex, stringArray.length)]);
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


const day03Part02 = input => {
    return input;
};

module.exports = {
    stringToEqualArrays,
    findCommonCharacter,
    convertCharToPriority,
    day03Part01,
    day03Part02,
};
