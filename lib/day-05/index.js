
const createCrateColumns = crateRows => {
    const startingCratesColumnNumbers = crateRows[crateRows.length - 1].split(' ').filter(char => !!char);
    const reversedColumnOfCrates = [...Array(startingCratesColumnNumbers.length)].map(() => []);
    const INDEXOFFIRSTCRATE = 1;
    const NEXTCRATE = 4;
    const indexOfLastCrate = crateRows[0].length - 2;
    const justCrateRows = crateRows.slice(0, crateRows.length - 1);

    justCrateRows.forEach(row => {

        let crateIndex = INDEXOFFIRSTCRATE;
        let columnIndex = startingCratesColumnNumbers[0] - 1;
    
        while(crateIndex <= indexOfLastCrate) {
            // const columnIndex = parseInt(crateIndex / NEXTCRATE);
            if(row[crateIndex] !== ' ')
                reversedColumnOfCrates[columnIndex].push(row[crateIndex]);
            crateIndex = crateIndex + NEXTCRATE;
            columnIndex++;
        }

    });

    return reversedColumnOfCrates;

};

const normalizeInstructions = instructionsString => {
    return instructionsString.map(instruction => {
        return instruction.split(' ').reduce((instructionObject, instructionElement, index, instructionArray) => {
            if(index % 2 === 0)
                instructionObject[instructionElement] = parseInt(instructionArray[index + 1]);
    
            return instructionObject;
        }, {});
    });
};

const executeInstructions = (crateColumns, instructionObject) => {
    const { move, from, to } = instructionObject;
    for(let moveIndex = 0; moveIndex < move; moveIndex++) {
        crateColumns[to - 1].unshift(crateColumns[from - 1].shift());
    }
};

const day05part01 = input => {
    const [startingCrates, instructionString] = input.split('\n\n');
    
    const startingCratesRows = startingCrates.split('\n');

    const crateColumns = createCrateColumns(startingCratesRows);
    
    const instructions = instructionString.split('\n');
    const instructionObjects = normalizeInstructions(instructions);

    instructionObjects.forEach(instruction => {
        executeInstructions(crateColumns, instruction);
    });

    return crateColumns.reduce((topCrates, currentRow) => topCrates + currentRow[0], '');
};

module.exports = {
    day05part01,
};
