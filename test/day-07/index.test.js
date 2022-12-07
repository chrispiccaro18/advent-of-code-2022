const { day07part01 } = require('../../lib/day-07');
const { testInput } = require('../../lib/day-07/input');

describe('day 07', () => {
    it('Solves the part01 test input', () => {
        const result = day07part01(testInput);
        expect(result).toBe(95437);
    });
    
    // it('Solves the part01 actual input', () => {
    //     const result = day06part01(actualInput);
    //     expect(result).toBe(1140);
    // });
    
    // it('Solves the part01 test input', () => {
    //     const result = testInputs.map(testInput => day06part02(testInput));
    //     expect(result).toEqual([
    //         19,
    //         23,
    //         23,
    //         29,
    //         26,
    //     ]);
    // });
    
    // it('Solves the part02 actual input', () => {
    //     const result = day06part02(actualInput);
    //     expect(result).toBe(3495);
    // });

});
