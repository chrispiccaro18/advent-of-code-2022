const { day07part01, calculateDirSize, calculateFilesInDir } = require('../../lib/day-07');
const { testInput, actualInput } = require('../../lib/day-07/input');

describe('day 07', () => {
    it('Calculates file size in dir', () => {
        const dir = {
            name: 'd',
            parent: '/',
            children: [],
            files: ['j', 'd.log', 'd.ext', 'k']
        };
        const files = {
            'b.txt': { name: 'b.txt', parent: '/', size: 14848514 },
            'c.dat': { name: 'c.dat', parent: '/', size: 8504156 },
            f: { name: 'f', parent: 'a', size: 29116 },
            g: { name: 'g', parent: 'a', size: 2557 },
            'h.lst': { name: 'h.lst', parent: 'a', size: 62596 },
            i: { name: 'i', parent: 'e', size: 584 },
            j: { name: 'j', parent: 'd', size: 4060174 },
            'd.log': { name: 'd.log', parent: 'd', size: 8033020 },
            'd.ext': { name: 'd.ext', parent: 'd', size: 5626152 },
            k: { name: 'k', parent: 'd', size: 7214296 }
        };
        const result = calculateFilesInDir(dir, files);
        expect(result).toBe(24933642);
    });

    it('Calculates directory sizes', () => {
        const dir = {
            name: 'a',
            parent: '/',
            children: [
                'e',
            ],
            files: ['f', 'g', 'h.lst']
        };

        const dirTree = {
            '/': { name: '/', children: ['a', 'd'], files: ['b.txt', 'c.dat'] },
            files: {
                'b.txt': { name: 'b.txt', parent: '/', size: 14848514 },
                'c.dat': { name: 'c.dat', parent: '/', size: 8504156 },
                f: { name: 'f', parent: 'a', size: 29116 },
                g: { name: 'g', parent: 'a', size: 2557 },
                'h.lst': { name: 'h.lst', parent: 'a', size: 62596 },
                i: { name: 'i', parent: 'e', size: 584 },
                j: { name: 'j', parent: 'd', size: 4060174 },
                'd.log': { name: 'd.log', parent: 'd', size: 8033020 },
                'd.ext': { name: 'd.ext', parent: 'd', size: 5626152 },
                k: { name: 'k', parent: 'd', size: 7214296 }
            },
            a: {
                name: 'a',
                parent: '/',
                children: ['e'],
                files: ['f', 'g', 'h.lst']
            },
            d: {
                name: 'd',
                parent: '/',
                children: [],
                files: ['j', 'd.log', 'd.ext', 'k']
            },
            e: { name: 'e', parent: 'a', children: [], files: ['i'] }
        };
        const result = calculateDirSize(dir, dirTree);
        expect(result).toBe(94853);
    });

    it.only('Solves the part01 test input', () => {
        const result = day07part01(testInput);
        expect(result).toBe(95437);
    });
    
    it.only('Solves the part01 actual input', () => {
        const result = day07part01(actualInput);
        expect(result).toBe(1140);
    });
});
