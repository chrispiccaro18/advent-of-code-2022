const diagRandU = position => {
    const { R, U } = position;
    return { 
        R: R + 1,
        U: U + 1,
    };
};

const diagLandU = position => {
    const { R, U } = position;
    return { 
        R: R - 1,
        U: U + 1,
    };
};

const diagRandD = position => {
    const { R, U } = position;
    return { 
        R: R + 1,
        U: U - 1,
    };
};

const diagLandD = position => {
    const { R, U } = position;
    return { 
        R: R - 1,
        U: U - 1,
    };
};

const isMovementNeeded = (targetKnot, currentKnot) => {
    const diffInColumn = Math.abs(targetKnot.R - currentKnot.R);
    const diffInRow = Math.abs(targetKnot.U - currentKnot.U);
    return diffInColumn > 1 || diffInRow > 1;
};

// TODO
const isDiagNeeded = (targetKnot, currentKnot) => {
    const { R: targetKnotR, U: targetKnotU } = targetKnot;
    const { R: currentKnotR, U: currentKnotU } = currentKnot;

    if(targetKnotR - currentKnotR > 1 || targetKnotU - currentKnotU > 1) return false;

    return true;
};

// TODO
const determineDiagMovingDirection = (targetKnot, currentKnot) => {
    const { R: targetKnotR, U: targetKnotU } = targetKnot;
    const { R: currentKnotR, U: currentKnotU } = currentKnot;

    // RU
    if(targetKnotR > currentKnotR && targetKnotU > currentKnotU) {
        currentKnot = { ...diagRandU(currentKnot) };
    }
    // RD
    if(targetKnotR > currentKnotR && targetKnotU < currentKnotU) {
        currentKnot = { ...diagRandD(currentKnot) };
    }
    // LU
    if(targetKnotR < currentKnotR && targetKnotU > currentKnotU) {
        currentKnot = { ...diagLandU(currentKnot) };
    }
    // LD
    if(targetKnotR < currentKnotR && targetKnotU < currentKnotU) {
        currentKnot = { ...diagLandD(currentKnot) };
    }
};

// TODO
const determineNonDiagMovingDirection = (targetKnot, currentKnot) => {
    const { R: targetKnotR, U: targetKnotU } = targetKnot;
    const { R: currentKnotR, U: currentKnotU } = currentKnot;
    // R
    if(targetKnotU - currentKnotU === 0 && targetKnotR - currentKnotR > 0) currentKnot.R = targetKnotR - 1;
    // L
    if(targetKnotU - currentKnotU === 0 && targetKnotR - currentKnotR < 0) currentKnot.R = targetKnotR + 1;
    // U
    if(targetKnotR - currentKnotR === 0 && targetKnotU - currentKnotU > 0) currentKnot.U = targetKnotU - 1;
    // D
    if(targetKnotR - currentKnotR === 0 && targetKnotU - currentKnotU < 0) currentKnot.U = targetKnotU + 1;
};

module.exports = {
    diagRandU,
    diagRandD,
    diagLandU,
    diagLandD,
    isMovementNeeded,
    isDiagNeeded,
    determineDiagMovingDirection,
    determineNonDiagMovingDirection,
};
