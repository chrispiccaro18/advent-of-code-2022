const NOOP = 'noop';
const ADDX = 'addx';
// addx V takes two cycles to complete. 
// After two cycles, the X register is increased by the value V. (V can be negative.)
// noop takes one cycle to complete. It has no other effect.

const day10part01 = input => {
    let xRegister = 1;
    const interestingSignals = { 20: null, 60: null, 100: null, 140: null, 180: null, 220: null };
    const interestingCycles = Object.keys(interestingSignals);
    const instructions = input.split('\n');
    let addXToExecute = null;

    for(let cycle = 1, instructionIndex = 0, maxCycle = instructions.length;
        instructionIndex < instructions.length && cycle <= maxCycle;) {
        // during
        if(interestingCycles.includes(cycle.toString())) {
            interestingSignals[cycle] = xRegister * parseInt(interestingCycles[0]);
            interestingCycles.shift();
        }
        
        if(addXToExecute) {
            xRegister = xRegister + addXToExecute;
            addXToExecute = null;
            cycle++;
            instructionIndex++;
        } else {
            const [instructionType, stringValue] = instructions[instructionIndex].split(' ');
            if(instructionType === NOOP) {
                cycle++;
                instructionIndex++;
            }
            if(instructionType === ADDX) {
                const value = parseInt(stringValue);
                addXToExecute = value;
                cycle++;
                maxCycle++;
            }
        }  
    }
    // return xRegister;
    return Object.values(interestingSignals).reduce((count, value) => count + value, 0);
};

// DURING cycle, we are drawing a pixel at a position
// The left-most pixel in each row is in position 0, and the right-most pixel in each row is in position 39.

// if the 3 wide sprite, with middle position being xRegister, contains the pixel we are drawing = #
// otherwise = .

const isPixelDrawn = (position, xRegister) => {
    return Math.abs(position - xRegister) <= 1 && xRegister >= 0 && xRegister <= 39;
};

const day10part02 = input => {
    const instructions = input.split('\n');
    let addXToExecute = null;
    let xRegister = 1;
    let position = 0;
    let row = 0;
    let crt = '';

    for(let cycle = 1, instructionIndex = 0, maxCycle = instructions.length;
        (instructionIndex < instructions.length && cycle <= maxCycle) || row > 6;) {
        if(position > 39) {
            crt = crt + '\n';
            position = 0;
            row++;
        }
        if(isPixelDrawn(position, xRegister)) crt = crt + '#';
        else crt = crt + '.';
        position++;
        
        if(addXToExecute) {
            xRegister = xRegister + addXToExecute;
            addXToExecute = null;
            cycle++;
            instructionIndex++;
        } else {
            const [instructionType, stringValue] = instructions[instructionIndex].split(' ');
            if(instructionType === NOOP) {
                cycle++;
                instructionIndex++;
            }
            if(instructionType === ADDX) {
                const value = parseInt(stringValue);
                addXToExecute = value;
                cycle++;
                maxCycle++;
            }
        }  
    }

    return crt;
};

module.exports = {
    day10part01,
    day10part02,
};
