const findRangesThatContain = twoArrays => {
    const [[firstLower, firstHigher], [secondLower, secondHigher]] = twoArrays;

    if(parseInt(firstLower) <= parseInt(secondLower) && parseInt(firstHigher) >= parseInt(secondHigher)) return true;
    if(parseInt(firstLower) >= parseInt(secondLower) && parseInt(firstHigher) <= parseInt(secondHigher)) return true;

    return false;
};

const findRangesThatOverlap = twoArrays => {
    const [[firstLower, firstHigher], [secondLower, secondHigher]] = twoArrays;
    const firstLowerParsed = parseInt(firstLower);
    const firstHigherParsed = parseInt(firstHigher);
    const secondLowerParsed = parseInt(secondLower);
    const secondHigherParsed = parseInt(secondHigher);

    if(firstLowerParsed === secondLowerParsed ||
        firstLowerParsed === secondHigherParsed ||
        firstHigherParsed === secondLowerParsed ||
        firstHigherParsed === secondHigherParsed) return true;

    if(firstLowerParsed < secondLowerParsed &&
        firstHigherParsed < secondHigherParsed &&
        firstHigherParsed > secondLowerParsed) return true;
    if(firstLowerParsed > secondLowerParsed &&
        firstHigherParsed > secondHigherParsed &&
        firstLowerParsed < secondHigherParsed) return true;

    return findRangesThatContain(twoArrays);
};

const day04part01 = input => {
    return input
        .split('\n')
        .map(elfPair => {
            const elfPairSplit = elfPair.split(',');
            return elfPairSplit.map(elf => elf.split('-'));
        })
        .map(seperatedElfPair => findRangesThatContain(seperatedElfPair))
        .filter(passes => !!passes)
        .length;
};

const day04part02 = input => {
    return input
        .split('\n')
        .map(elfPair => {
            const elfPairSplit = elfPair.split(',');
            return elfPairSplit.map(elf => elf.split('-'));
        })
        .map(seperatedElfPair => findRangesThatOverlap(seperatedElfPair))
        .filter(passes => !!passes)
        .length;
};

module.exports = {
    findRangesThatContain,
    findRangesThatOverlap,
    day04part01,
    day04part02,
};
