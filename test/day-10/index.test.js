const { day10part01, day10part02 } = require('../../lib/day-10');
const { miniTestInput, testInput, actualInput } = require('../../lib/day-10/input');

describe('day 10', () => {
    it.skip('Solves the part01 mini test input', () => {
        const result = day10part01(miniTestInput);
        expect(result).toBe(-1);
    });

    it('Solves the part01 test input2', () => {
        const result = day10part01(testInput);
        expect(result).toBe(13140);
    });
    
    it('Solves the part01 actual input', () => {
        const result = day10part01(actualInput);
        expect(result).toBe(12540);
    });
    
    it('Solves the part02 test input', () => {
        const result = day10part02(testInput);
        expect(result).toBe(`##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`);
    });
    
    it('Solves the part02 actual input', () => {
        const result = day10part02(actualInput);
        expect(result).toBe(`####.####..##..####.####.#....#..#.####.
.....#....#..#....#.#....#....#..#.#....
###..###..#......#..###..#....####.###..
.....#....#.....#...#....#....#..#.#....
.....#....#..#.#....#....#....#..#.#....
.....####..##..####.####.####.#..#.####.`);
    });
});

// ####.####..##..####.####.#....#..#.####.
// .....#....#..#....#.#....#....#..#.#....
// ###..###..#......#..###..#....####.###..
// .....#....#.....#...#....#....#..#.#....
// .....#....#..#.#....#....#....#..#.#....
// .....####..##..####.####.####.#..#.####.
