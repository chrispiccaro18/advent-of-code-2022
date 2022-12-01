const { totalCaloriesOfElf, day01Part01 } = require("../../lib/day-01");
const { testInput, actualInput } = require("../../lib/day-01/input");

describe('day 01', () => {
    it('takes an Elf string and calculates total calories', () => {
        const elfString = '1000\n2000\n3000';
        const result = 6000;

        expect(totalCaloriesOfElf(elfString)).toEqual(result);
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
});