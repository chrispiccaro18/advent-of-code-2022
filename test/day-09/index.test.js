const { day09part01, day09part02 } = require('../../lib/day-09');
const { testInput, actualInput, testInput2 } = require('../../lib/day-09/input');

describe('day 09', () => {
    it('Solves the part01 test input', () => {
        const result = day09part01(testInput);
        expect(result).toBe(13);
    });
    
    it('Solves the part01 actual input', () => {
        const result = day09part01(actualInput);
        expect(result).toBe(5874);
    });
    
    it('Solves the part02 test input', () => {
        const result = day09part02(testInput);
        expect(result).toBe(1);
    });
    
    it('Solves the part02 test input2', () => {
        const result = day09part02(testInput2);
        expect(result).toBe(36);
    });
    
    // it('Solves the part02 actual input', () => {
    //     const result = day09part02(actualInput);
    //     expect(result).toBe(3495);
    // });
});
