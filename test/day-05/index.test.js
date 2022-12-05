const { day05part01 } = require('../../lib/day-05');
const { testInput, actualInput } = require('../../lib/day-05/input');

describe('day 05', () => {
    it('Solves the part01 test input', () => {
        const result = day05part01(testInput);
        expect(result).toBe('CMZ');
    });
    
    it('Solves the part01 actual input', () => {
        const result = day05part01(actualInput);
        expect(result).toBe('QNHWJVJZW');
    });

});
