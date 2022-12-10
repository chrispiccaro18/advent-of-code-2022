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

const day08part02 = input => {
    const treeRowsSplit = input.split('\n').map((row, rowIndex) => {
        return row.split('').map((treeHeight, columnIndex) => ({
            treeHeight: parseInt(treeHeight),
            rowIndex,
            columnIndex
        }));
    });
    // for each tree check left, right, up and down
    // left = rowIndex decreasing until equal or higher height or rowIndex of 0
    treeRowsSplit.forEach(row => {
        row.forEach(tree => {
            const { treeHeight, rowIndex: currentTreeRowIndex, columnIndex: currentTreeColumnIndex } = tree;
            let rightCount = 0;
            for(let index = currentTreeRowIndex + 1; index < row.length; index++) {
                const treeToCheck = row[index];
                if(treeToCheck.treeHeight >= treeHeight) break;
                rightCount++;
            }
            tree.rightCount = rightCount;
        });
    });
    // up = columnIndex decreasing until equal or higher height or columnIndex of 0
    // down = columnIndex increasing until equal or higher height or columnIndex of columnIndex.length - 1
    return input;
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
    day08part02,
};
