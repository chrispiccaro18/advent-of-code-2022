const { day03Part01, stringToEqualArrays, findCommonCharacter, convertCharToPriority, day03Part02 } = require('../../lib/day-03');
const { testInput, actualInput } = require('../../lib/day-03/input');

describe('day 03', () => {
    it('given a string, returns two arrays split in half', () => {
        const input = 'vJrwpWtwJgWrhcsFMMfFFhFp';
        const result = stringToEqualArrays(input);
        expect(result).toEqual([
            ['v', 'J', 'r', 'w', 'p', 'W', 't', 'w', 'J', 'g', 'W', 'r'],
            ['h', 'c', 's', 'F', 'M', 'M', 'f', 'F', 'F', 'h', 'F', 'p'],
        ]);
    });
    
    it('given two arrays, returns common character', () => {
        const input = [
            ['v', 'J', 'r', 'w', 'p', 'W', 't', 'w', 'J', 'g', 'W', 'r'],
            ['h', 'c', 's', 'F', 'M', 'M', 'f', 'F', 'F', 'h', 'F', 'p'],
        ];
        const result = findCommonCharacter(input);
        expect(result).toEqual('p');
    });

    it('given char, return priority', () => {
        const input = ['p', 'L', 'P', 'v', 't', 's'];
        const result = input.map(convertCharToPriority);
        expect(result).toEqual([16, 38, 42, 22, 20, 19]);
    });

    it('Solves the part01 test input', () => {
        const result = day03Part01(testInput);
        expect(result).toBe(157);
    });
    
    it('Solves the part01 actual input', () => {
        const result = day03Part01(actualInput);
        expect(result).toBe(7850);
    });

    it('Solves the part02 test input', () => {
        const result = day03Part02(testInput);
        expect(result).toBe(70);
    });
});
