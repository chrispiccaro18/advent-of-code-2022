// given the number of distinct characters and an array of characters,
// find the index of the last character of the first instance of the distinct characters
const findIndexOfLastDistinctChar = (numberOfDistinctChars, charArray) => {
    for(let i = 0, j = numberOfDistinctChars - 1; j < charArray.length;) {
        const potentialStartOfMarker = charArray.slice(i, j + 1);
        
        for(let k = 0; k < potentialStartOfMarker.length; k++) {
            const char = potentialStartOfMarker[k];
            const countOfCurrentChars = potentialStartOfMarker.filter(currentChar => currentChar === char).length;
            if(countOfCurrentChars <= 1 && k === potentialStartOfMarker.length - 2) return j;
            if(countOfCurrentChars > 1) {
                i = i + k + 1;
                j = j + k + 1;
                break;
            }
        }
    }
};

// start of a packet is indicated by a sequence of four characters that are all different
// the number of characters from the beginning of the buffer to the end of the first such four-character marker
const day06part01 = input => {
    const inputArray = input.split('');
    const endOfPacketIndex = findIndexOfLastDistinctChar(4, inputArray);
    return endOfPacketIndex + 1;
};

// A start-of-message marker is just like a start-of-packet marker,
// except it consists of 14 distinct characters rather than 4.
const day06part02 = input => {
    const inputArray = input.split('');
    const endOfMessageIndex = findIndexOfLastDistinctChar(14, inputArray);
    return endOfMessageIndex + 1;
};

module.exports = {
    day06part01,
    day06part02,
};
