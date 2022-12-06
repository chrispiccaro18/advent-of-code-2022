const { day06part01 } = require('../../lib/day-06');
const { testInputs, actualInput } = require('../../lib/day-06/input');

describe('day 06', () => {
    it('Solves the part01 test input', () => {
        const result = testInputs.map(testInput => day06part01(testInput));
        expect(result).toEqual([
            7,
            5,
            6,
            10,
            11,
        ]);
    });
    
    it('Solves the part01 actual input', () => {
        const result = day06part01(actualInput);
        expect(result).toBe(1140);
    });
    
    // it('Solves the part02 test input', () => {
    //     const result = day05part02(testInput);
    //     expect(result).toBe('MCD');
    // });
    
    // it('Solves the part02 actual input', () => {
    //     const result = day05part02(actualInput);
    //     expect(result).toBe('BPCZJLFJW');
    // });

});
