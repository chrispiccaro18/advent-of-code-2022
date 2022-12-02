const { calculateTotalCalories, day01Part01, day01Part02 } = require('../../lib/day-01');
const { testInput, actualInput } = require('../../lib/day-01/input');

describe('day 01', () => {
    it('takes an Elf string and calculates total calories', () => {
        const elfString = '1000\n2000\n3000';
        const result = 6000;

        expect(calculateTotalCalories(elfString)).toEqual(result);
    });

    it('solves part 01 test', () => {
        const expected = 24000;
        const result = day01Part01(testInput);
        
        expect(result).toEqual(expected);
    });
    
    it('solves part 01', () => {
        const expected = 71924;
        const result = day01Part01(actualInput);
        
        expect(result).toEqual(expected);
    });

    it('solves part 02 test', () => {
        const expected = 45000;
        const result = day01Part02(testInput);

        expect(result).toEqual(expected);
    });
    
    it('solves part 02', () => {
        const expected = 210406;
        const result = day01Part02(actualInput);

        expect(result).toEqual(expected);
    });
});
