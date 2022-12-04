const funk = twoArrays => {
    const [[firstLower, firstHigher], [secondLower, secondHigher]] = twoArrays;

    if(parseInt(firstLower) <= parseInt(secondLower) && parseInt(firstHigher) >= parseInt(secondHigher)) return true;
    if(parseInt(firstLower) >= parseInt(secondLower) && parseInt(firstHigher) <= parseInt(secondHigher)) return true;

    return false;
};

const day04part01 = input => {
    return input
        .split('\n')
        .map(elfPair => {
            const elfPairSplit = elfPair.split(',');
            return elfPairSplit.map(elf => {
                return elf.split('-');
            });
        })
        .map(seperatedElfPair => {
            return funk(seperatedElfPair);
        })
        .filter(passes => !!passes)
        .length;
    // .map(elf => {
    //     console.log(elf)
    //     return elf.split('-');
    // });
};

module.exports = {
    day04part01,
    funk,
};
