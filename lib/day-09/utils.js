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

const isDiagNeeded = (targetKnot, currentKnot) => {
    const { R: targetKnotR, U: targetKnotU } = targetKnot;
    const { R: currentKnotR, U: currentKnotU } = currentKnot;

    if(targetKnotR - currentKnotR === 0 || targetKnotU - currentKnotU === 0) return false;
    return true;
};

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

module.exports = {
    diagRandU,
    diagRandD,
    diagLandU,
    diagLandD,
    isMovementNeeded,
    isDiagNeeded,
    determineDiagMovingDirection,
};
