const { day07part01, calculateDirSize, calculateFilesInDir, changePath, mkDirTree, day07part02 } = require('../../lib/day-07');
const { testInput, actualInput } = require('../../lib/day-07/input');

const testDirTree = {
    '/': {
        name: '/',
        path: '/',
        children: ['/a', '/d'],
        files: [
            { name: 'b.txt', path: '/', size: 14848514 },
            { name: 'c.dat', path: '/', size: 8504156 },
        ]
    },
    '/a': {
        name: 'a',
        path: '/a',
        children: ['/a/e'],
        files: [
            { name: 'f', path: '/a', size: 29116 },
            { name: 'g', path: '/a', size: 2557 },
            { name: 'h.lst', path: '/a', size: 62596 }
        ]
    },
    '/d': { name: 'd', path: '/d', children: [], files: [
        { name: 'j', path: '/d', size: 4060174 },
        { name: 'd.log', path: '/d', size: 8033020 },
        { name: 'd.ext', path: '/d', size: 5626152 },
        { name: 'k', path: '/d', size: 7214296 },
    ] },
    '/a/e': { name: 'e', path: '/a/e', children: [], files: [
        { name: 'i', path: '/a/e', size: 584 },
    ] },
};

describe('day 07', () => {
    it('changes path back one dir', () => {
        const path = '/firstdir/seconddir';
        const direction = '..';
        const expected = '/firstdir';
        const result = changePath(path, direction);
        expect(result).toBe(expected);
    });
    
    it('changes path back one dir to root', () => {
        const path = '/firstdir';
        const direction = '..';
        const expected = '/';
        const result = changePath(path, direction);
        expect(result).toBe(expected);
    });
    
    it('retains root path if going back', () => {
        const path = '/';
        const direction = '..';
        const expected = '/';
        const result = changePath(path, direction);
        expect(result).toBe(expected);
    });
    
    it('goes forward a dir at root', () => {
        const path = '/';
        const direction = 'firstdir';
        const expected = '/firstdir';
        const result = changePath(path, direction);
        expect(result).toBe(expected);
    });
    
    it('goes forward a dir', () => {
        const path = '/firstdir';
        const direction = 'seconddir';
        const expected = '/firstdir/seconddir';
        const result = changePath(path, direction);
        expect(result).toBe(expected);
    });
    
    it('creates dirTree', () => {
        const input = testInput;
        const expected = testDirTree;
        const result = mkDirTree(input);
        expect(result).toEqual(expected);
    });

    it('Calculates file size in dir', () => {
        const currentDirTree = { ...testDirTree };
        const dir = currentDirTree['/d'];
        const result = calculateFilesInDir(dir);
        expect(result).toBe(24933642);
        expect(dir.size).toBe(24933642);
    });

    it('Calculates directory sizes', () => {
        const currentDirTree = { ...testDirTree };
        const dir = currentDirTree['/a'];
        const result = calculateDirSize(dir, currentDirTree);
        expect(result).toBe(94853);
    });

    it('Solves the part01 test input', () => {
        const result = day07part01(testInput);
        expect(result).toBe(95437);
    });
    
    it('Solves the part01 actual input', () => {
        const result = day07part01(actualInput);
        expect(result).toBe(1391690);
    });
    
    it('Solves the part02 test input', () => {
        const result = day07part02(testInput);
        expect(result).toBe(24933642);
    });
    
    it('Solves the part02 actual input', () => {
        const result = day07part02(actualInput);
        expect(result).toBe(5469168);
    });
});
