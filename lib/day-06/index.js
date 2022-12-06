// start of a packet is indicated by a sequence of four characters that are all different
// the number of characters from the beginning of the buffer to the end of the first such four-character marker

const day06part01 = input => {
    const fullInputArray = input.split('');
    let endOfPacket = null;

    for(let i = 0, j = 3; j < fullInputArray.length; i++, j++) {
        if(endOfPacket) break;

        const fourChars = fullInputArray.slice(i, j + 1);
        
        let dupeFound = false;
        for(let k = 0; k < fourChars.length; k++) {
            if(dupeFound) break;
            const char = fourChars[k];
            if(fourChars.filter(currentChar => currentChar === char).length > 1) {
                dupeFound = true;
                break;
            }
            if(fourChars.filter(currentChar => currentChar === char).length <= 1 && k === fourChars.length - 1) {
                endOfPacket = j;
            }
        }
    }
    return endOfPacket + 1;
};

const day06part02 = input => {
    const fullInputArray = input.split('');
    let endOfPacket = null;

    for(let i = 0, j = 13; j < fullInputArray.length; i++, j++) {
        if(endOfPacket) break;

        const fourChars = fullInputArray.slice(i, j + 1);
        
        let dupeFound = false;
        for(let k = 0; k < fourChars.length; k++) {
            if(dupeFound) break;
            const char = fourChars[k];
            if(fourChars.filter(currentChar => currentChar === char).length > 1) {
                dupeFound = true;
                break;
            }
            if(fourChars.filter(currentChar => currentChar === char).length <= 1 && k === fourChars.length - 1) {
                endOfPacket = j;
            }
        }
    }
    return endOfPacket + 1;
};

module.exports = {
    day06part01,
    day06part02,
};
