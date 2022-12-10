const { day08part01, calculateEdgeTrees, addEdgeTreesToMap, addVisibleTrees, flipGrid, addVisibleTreesOfColumns, day08part02, checkRight, checkLeft, checkDown, checkUp } = require('../../lib/day-08');
const { testInput, actualInput, expectedMap01, asymTrees, expectedMap02, expectedMap03, expectedFlippedGrid } = require('../../lib/day-08/input');

describe('day 09', () => {
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

    it('Checks right', () => {
        const treeRowsSplit = asymTrees.split('\n').map((row, rowIndex) => {
            return row.split('').map((treeHeight, columnIndex) => ({
                treeHeight: parseInt(treeHeight),
                rowIndex,
                columnIndex
            }));
        });
        checkRight(treeRowsSplit[0], treeRowsSplit[0][3]);
        expect(treeRowsSplit[0][3].rightCount).toBe(2);
        
        checkRight(treeRowsSplit[0], treeRowsSplit[0][5]);
        expect(treeRowsSplit[0][5].rightCount).toBe(0);
        
        checkRight(treeRowsSplit[0], treeRowsSplit[0][0]);
        expect(treeRowsSplit[0][0].rightCount).toBe(2);
        
        checkRight(treeRowsSplit[0], treeRowsSplit[0][1]);
        expect(treeRowsSplit[0][1].rightCount).toBe(1);
        
        checkRight(treeRowsSplit[0], treeRowsSplit[0][4]);
        expect(treeRowsSplit[0][4].rightCount).toBe(1);
    });
    
    it('Checks left', () => {
        const treeRowsSplit = asymTrees.split('\n').map((row, rowIndex) => {
            return row.split('').map((treeHeight, columnIndex) => ({
                treeHeight: parseInt(treeHeight),
                rowIndex,
                columnIndex
            }));
        });
        checkLeft(treeRowsSplit[0], treeRowsSplit[0][3]);
        expect(treeRowsSplit[0][3].leftCount).toBe(3);
        
        checkLeft(treeRowsSplit[0], treeRowsSplit[0][5]);
        expect(treeRowsSplit[0][5].leftCount).toBe(1);
        
        checkLeft(treeRowsSplit[0], treeRowsSplit[0][0]);
        expect(treeRowsSplit[0][0].leftCount).toBe(0);
        
        checkLeft(treeRowsSplit[0], treeRowsSplit[0][1]);
        expect(treeRowsSplit[0][1].leftCount).toBe(1);
        
        checkLeft(treeRowsSplit[0], treeRowsSplit[0][2]);
        expect(treeRowsSplit[0][2].leftCount).toBe(2);
    });
    
    it('Checks down', () => {
        const treeRowsSplit = expectedFlippedGrid;
        checkDown(treeRowsSplit[0], treeRowsSplit[0][0]);
        expect(treeRowsSplit[0][0].downCount).toBe(2);
        
        checkDown(treeRowsSplit[0], treeRowsSplit[0][1]);
        expect(treeRowsSplit[0][1].downCount).toBe(1);
        
        checkDown(treeRowsSplit[3], treeRowsSplit[3][0]);
        expect(treeRowsSplit[3][0].downCount).toBe(4);
        
        checkDown(treeRowsSplit[2], treeRowsSplit[2][1]);
        expect(treeRowsSplit[2][1].downCount).toBe(2);
        
        checkDown(treeRowsSplit[0], treeRowsSplit[0][4]);
        expect(treeRowsSplit[0][4].downCount).toBe(0);
    });
    
    it('Checks up', () => {
        const treeRowsSplit = expectedFlippedGrid;
        checkUp(treeRowsSplit[0], treeRowsSplit[0][0]);
        expect(treeRowsSplit[0][0].upCount).toBe(0);
        
        checkUp(treeRowsSplit[0], treeRowsSplit[0][2]);
        expect(treeRowsSplit[0][2].upCount).toBe(2);
        
        checkUp(treeRowsSplit[1], treeRowsSplit[1][4]);
        expect(treeRowsSplit[1][4].upCount).toBe(2);
        
        checkUp(treeRowsSplit[3], treeRowsSplit[3][4]);
        expect(treeRowsSplit[3][4].upCount).toBe(4);
    });
    
    it('Solves the part02 test input', () => {
        const result = day08part02(testInput);
        expect(result).toBe(8);
    });
    
    it('Solves the part01 actual input', () => {
        const result = day08part02(actualInput);
        expect(result).toBe(374400);
    });
});
