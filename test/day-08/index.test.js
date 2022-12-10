const { day08part01, calculateEdgeTrees, addEdgeTreesToMap, addVisibleTrees, flipGrid, addVisibleTreesOfColumns } = require('../../lib/day-08');
const { testInput, actualInput, expectedMap01, asymTrees, expectedMap02, expectedMap03, expectedFlippedGrid } = require('../../lib/day-08/input');

describe('day 08', () => {
    it('Calculates edge trees of tree grid', () => {
        const result = calculateEdgeTrees(testInput.split('\n'));
        expect(result).toBe(16);
    });
    
    it('Calculates edge trees of asym grid', () => {
        const result = calculateEdgeTrees(asymTrees.split('\n'));
        expect(result).toBe(18);
    });
    
    it('Adds edge trees to visible map', () => {
        const resultMap = new Map();
        const treeRowsSplit = testInput.split('\n').map((row, rowIndex) => {
            return row.split('').map((treeHeight, columnIndex) => ({
                treeHeight: parseInt(treeHeight),
                rowIndex,
                columnIndex
            }));
        });
        addEdgeTreesToMap(treeRowsSplit, resultMap);
        expect(resultMap).toEqual(expectedMap01);
    });
    
    it('Adds edge trees on asym grid to visible map', () => {
        const resultMap = new Map();
        const treeRowsSplit = asymTrees.split('\n').map((row, rowIndex) => {
            return row.split('').map((treeHeight, columnIndex) => ({
                treeHeight: parseInt(treeHeight),
                rowIndex,
                columnIndex
            }));
        });
        addEdgeTreesToMap(treeRowsSplit, resultMap);
        expect(resultMap).toEqual(expectedMap02);
    });
    
    it('Adds visible trees both ways in a row', () => {
        const expectedMap = new Map();
        expectedMap.set('1-1', 5);
        expectedMap.set('1-3', 8);
        expectedMap.set('1-4', 9);
        expectedMap.set('1-5', 8);
        const resultMap = new Map();
        const input = [
            [3, 0, 3, 7, 3, 1],
            [3, 5, 3, 8, 9, 8, 0],
            [3, 5, 3, 9, 0]
        ].map((row, rowIndex) => {
            return row.map((treeHeight, columnIndex) => ({
                treeHeight: parseInt(treeHeight),
                rowIndex,
                columnIndex
            }));
        });
        addVisibleTrees(input, resultMap);
        expect(resultMap).toEqual(expectedMap);
    });

    it('Flips grid', () => {
        const treeRowsSplit = asymTrees.split('\n').map((row, rowIndex) => {
            return row.split('').map((treeHeight, columnIndex) => ({
                treeHeight: parseInt(treeHeight),
                rowIndex,
                columnIndex
            }));
        });
        const result = flipGrid(treeRowsSplit);
        expect(result).toEqual(expectedFlippedGrid);
    });
    
    it('Correctly adds visible trees to flipped grid', () => {
        const result = new Map();
        addVisibleTreesOfColumns(expectedFlippedGrid, result);
        expect(result).toEqual(expectedMap03);
    });

    it('Solves the part01 test input', () => {
        const result = day08part01(testInput);
        expect(result).toBe(21);
    });
    
    it('Solves the part01 actual input', () => {
        const result = day08part01(actualInput);
        expect(result).toBe(1715);
    });
});
