const { day04part01, funk, day04part02, funk2 } = require('../../lib/day-04');
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

    it('identifies overlap', () => {
        const input = [
            [["2", "4"], ["6", "8"]], 
            [["2", "3"], ["4", "5"]], 
            [["5", "7"], ["7", "9"]], 
            [["2", "8"], ["3", "7"]], 
            [["6", "6"], ["4", "6"]], 
            [["2", "6"], ["4", "8"]]];

        const result = input.map(funk2);
        expect(result).toEqual([false, false, true, true, true, true]);
    });

    it('Solves the part02 test input', () => {
        const result = day04part02(testInput);
        expect(result).toBe(4);
    });
    
    it('Solves the part02 actual input', () => {
        const result = day04part02(actualInput);
        expect(result).toBe(867);
    });

});
