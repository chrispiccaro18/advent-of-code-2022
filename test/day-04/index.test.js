const { day04part01, funk } = require('../../lib/day-04');
const { testInput, actualInput } = require('../../lib/day-04/input');

describe('day 04', () => {

    it('can check the range of two numbers', () => {
        const input = [
            [2, 4],
            [1, 7],
        ];

        const result = funk(input);
        expect(result).toBe(true);
        
        const input02 = [
            [1, 1],
            [1, 7],
        ];

        const result02 = funk(input02);
        expect(result02).toBe(true);
    });

    it('Solves the part01 test input', () => {
        const result = day04part01(testInput);
        expect(result).toBe(2);
    });
    
    it('Solves the part01 actual input', () => {
        const result = day04part01(actualInput);
        expect(result).toBe(573);
    });

});
