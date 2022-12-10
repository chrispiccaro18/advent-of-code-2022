const calculateEdgeTrees = treeRows => (2 * treeRows.length) + (2 * treeRows[0].length) - 4;

const isEdgeTree = (rowIndex, columnIndex, treeRowsSplit, row) => 
    // isFirstRow = rowIndex === 0;
    rowIndex === 0 ||
    //isLastRow = rowIndex === row.length - 1;
    rowIndex === treeRowsSplit.length - 1 ||
    // const isFirstColumn = columnIndex === 0;
    columnIndex === 0 ||
    // const isLastColumn = columnIndex === treeRowsSplit.length - 1;
    columnIndex === row.length - 1;

const addEdgeTreesToMap = (treeRowsSplit, visibleTreeMap) => {
    treeRowsSplit.forEach(row => {
        row.forEach(tree => {
            const { treeHeight, rowIndex, columnIndex } = tree;
            if(isEdgeTree(rowIndex, columnIndex, treeRowsSplit, row)) visibleTreeMap.set(`${rowIndex}-${columnIndex}`, treeHeight);
        });
    });
    return visibleTreeMap;
};

const addVisibleTrees = (treeRowsSplit, visibleTreeMap) => {
    treeRowsSplit.forEach(row => {
        const firstTreeInRow = row[0];
        const lastTreeInRow = row[row.length - 1];
        let rowBaseCaseLR = firstTreeInRow.treeHeight;
        let rowBaseCaseRL = lastTreeInRow.treeHeight;

        row.forEach((tree, currentColumnIndex) => {
            const { treeHeight, rowIndex, columnIndex } = tree;
            if(!isEdgeTree(rowIndex, columnIndex, treeRowsSplit, row)) {
                if(treeHeight > rowBaseCaseLR) {
                    visibleTreeMap.set(`${rowIndex}-${columnIndex}`, treeHeight);
                    rowBaseCaseLR = treeHeight;
                }
                
            }

            const treeMirror = row[row.length - 1 - currentColumnIndex];
            const { treeHeight: treeHeightMirror, rowIndex: rowIndexMirror, columnIndex: columnIndexMirror } = treeMirror;
            if(!isEdgeTree(rowIndexMirror, columnIndexMirror, treeRowsSplit, row)) {
                if(treeHeightMirror > rowBaseCaseRL) {
                    visibleTreeMap.set(`${rowIndexMirror}-${columnIndexMirror}`, treeHeightMirror);
                    rowBaseCaseRL = treeHeightMirror;
                }
            }
        });
    });
    return visibleTreeMap;
};

const flipGrid = input => {
    const flippedGrid = [...Array(input[0].length)].map(() => []);
    input.forEach(row => row.forEach((tree, columnIndex) => flippedGrid[columnIndex].push(tree)));
    return flippedGrid;
};

const addVisibleTreesOfColumns = (treeRowsSplit, visibleTreeMap) => {
    treeRowsSplit.forEach(row => {
        const firstTreeInRow = row[0];
        const lastTreeInRow = row[row.length - 1];
        let rowBaseCaseLR = firstTreeInRow.treeHeight;
        let rowBaseCaseRL = lastTreeInRow.treeHeight;

        row.forEach((tree, currentColumnIndex) => {
            const { treeHeight, rowIndex, columnIndex } = tree;
            if(!isEdgeTree(rowIndex, columnIndex, row, treeRowsSplit)) {
                if(treeHeight > rowBaseCaseLR) {
                    visibleTreeMap.set(`${rowIndex}-${columnIndex}`, treeHeight);
                    rowBaseCaseLR = treeHeight;
                }
                
            }

            const treeMirror = row[row.length - 1 - currentColumnIndex];
            const { treeHeight: treeHeightMirror, rowIndex: rowIndexMirror, columnIndex: columnIndexMirror } = treeMirror;
            if(!isEdgeTree(rowIndexMirror, columnIndexMirror, row, treeRowsSplit)) {
                if(treeHeightMirror > rowBaseCaseRL) {
                    visibleTreeMap.set(`${rowIndexMirror}-${columnIndexMirror}`, treeHeightMirror);
                    rowBaseCaseRL = treeHeightMirror;
                }
            }
        });
    });
    return visibleTreeMap;
};

const day08part01 = input => {
    const treeRowsSplit = input.split('\n').map((row, rowIndex) => {
        return row.split('').map((treeHeight, columnIndex) => ({
            treeHeight: parseInt(treeHeight),
            rowIndex,
            columnIndex
        }));
    });
    const visibleTreeMap = new Map();
    addEdgeTreesToMap(treeRowsSplit, visibleTreeMap);
    addVisibleTrees(treeRowsSplit, visibleTreeMap);
    const flippedGrid = flipGrid(treeRowsSplit);
    addVisibleTreesOfColumns(flippedGrid, visibleTreeMap);
    return visibleTreeMap.size;
};

const checkRight = (row, tree) => {
    const { treeHeight, columnIndex: currentTreeColumnIndex } = tree;
    let rightCount = 0;
    for(let index = currentTreeColumnIndex + 1; index < row.length; index++) {
        const treeToCheck = row[index];
        rightCount++;
        if(treeToCheck.treeHeight >= treeHeight) break;
    }
    tree.rightCount = rightCount;
};

const checkLeft = (row, tree) => {
    const { treeHeight, columnIndex: currentTreeColumnIndex } = tree;
    let leftCount = 0;
    for(let index = currentTreeColumnIndex - 1; index > -1; index--) {
        const treeToCheck = row[index];
        leftCount++;
        if(treeToCheck.treeHeight >= treeHeight) break;
    }
    tree.leftCount = leftCount;
};

const checkDown = (column, tree) => {
    const { treeHeight, rowIndex: currentTreeRowIndex } = tree;
    let downCount = 0;
    for(let index = currentTreeRowIndex + 1; index < column.length; index++) {
        const treeToCheck = column[index];
        downCount++;
        if(treeToCheck.treeHeight >= treeHeight) break;
    }
    tree.downCount = downCount;
};

const checkUp = (column, tree) => {
    const { treeHeight, rowIndex: currentTreeRowIndex } = tree;
    let upCount = 0;
    for(let index = currentTreeRowIndex - 1; index > -1; index--) {
        const treeToCheck = column[index];
        upCount++;
        if(treeToCheck.treeHeight >= treeHeight) break;
    }
    tree.upCount = upCount;
};

const day08part02 = input => {
    const treeRowsSplit = input.split('\n').map((row, rowIndex) => {
        return row.split('').map((treeHeight, columnIndex) => ({
            treeHeight: parseInt(treeHeight),
            rowIndex,
            columnIndex
        }));
    });
    treeRowsSplit.forEach(row => {
        row.forEach(tree => {
            checkLeft(row, tree);
            checkRight(row, tree);
        });
    });
    const flippedGrid = flipGrid(treeRowsSplit);
    flippedGrid.forEach(column => {
        column.forEach(tree => {
            checkUp(column, tree);
            checkDown(column, tree);
        });
    });

    let highestScenicTreeScore = 0;

    flipGrid(treeRowsSplit);
    flippedGrid.forEach(column => {
        column.forEach(tree => {
            const { leftCount, rightCount, upCount, downCount } = tree;
            const currentTreeScore = leftCount * rightCount * upCount * downCount;
            if(currentTreeScore > highestScenicTreeScore) highestScenicTreeScore = currentTreeScore;
        });
    });

    return highestScenicTreeScore;
};

module.exports = {
    calculateEdgeTrees,
    addEdgeTreesToMap,
    addVisibleTrees,
    flipGrid,
    addVisibleTreesOfColumns,
    day08part01,
    checkRight,
    checkLeft,
    checkDown,
    checkUp,
    day08part02,
};
