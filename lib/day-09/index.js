// If the head is ever two steps directly up, down, left, or right from the tail, the tail must also move one step in that direction
// Otherwise, if the head and tail aren't touching and aren't in the same row or column, the tail always moves one step diagonally
// Assume the head and the tail both start at the same position, overlapping

const { isMovementNeeded, isDiagNeeded, determineDiagMovingDirection, determineNonDiagMovingDirection } = require('./utils');

// How many positions does the tail of the rope visit at least once?
const day09part01 = input => {
    const headPosition = { R: 0, U: 0, };
    let headPreviousPosition = {};
    let tailPosition = { R: 0, U: 0, };
    const tailTrail = new Map ();
    tailTrail.set(`${tailPosition.R}-${tailPosition.U}`, true);

    input.split('\n').forEach(instruction => {
        const [direction, numberOfStepsString] = instruction.split(' ');

        for(let i = 0; i < parseInt(numberOfStepsString); i++) {
            headPreviousPosition = { ...headPosition };
            if(direction === 'R' || direction === 'U') headPosition[direction]++;
            if(direction === 'L') headPosition.R--;
            if(direction === 'D') headPosition.U--;

            const diffInColumn = Math.abs(headPosition.R - tailPosition.R);
            const diffInRow = Math.abs(headPosition.U - tailPosition.U);
            if(diffInColumn > 1 || diffInRow > 1) {
                tailPosition = { ...headPreviousPosition };
                tailTrail.set(`${tailPosition.R}-${tailPosition.U}`, true);

            }
        }
    });
    return tailTrail.size;
};

const day09part02 = input => {
    const startingPosition = { R: 0, U: 0, };
    const knots = [...Array(10)].map(() => ({
        currentPosition: { ...startingPosition },
        previousPosition: {},
    }));
    const tailTrail = new Map ();
    // does tail change when we change knots[knots.length - 1]? looks like it does
    const tail = knots[knots.length - 1];
    tailTrail.set(`${tail.currentPosition.R}-${tail.currentPosition.U}`, true);
    // knot behind head will still behave as above
    // other following knots will not necessarily go to previous location of knot ahead of it
    input.split('\n').forEach(instruction => {
        const [direction, numberOfStepsString] = instruction.split(' ');
        
        for(let i = 0; i < parseInt(numberOfStepsString); i++) {
            const headKnotPositions = knots[0];
            headKnotPositions.previousPosition = { ...headKnotPositions.currentPosition };

            const { currentPosition: headKnotCurrentPosition } = headKnotPositions;
            if(direction === 'R' || direction === 'U') headKnotCurrentPosition[direction]++;
            if(direction === 'L') headKnotCurrentPosition.R--;
            if(direction === 'D') headKnotCurrentPosition.U--;

            const secondKnot = knots[1];
            if(isMovementNeeded(headKnotCurrentPosition, secondKnot.currentPosition)) {
                secondKnot.currentPosition = { ...headKnotPositions.previousPosition };
            }

            for(let j = 2; j < knots.length; j++) {
                // knot behind head will still behave as part01
                // other following knots will not necessarily go to previous location of knot ahead of it
                // recursion needed on each knot?
                const { currentPosition: currentKnotPosition } = knots[j];
                const { currentPosition: previousKnotPosition } = knots[j - 1];
                if(isMovementNeeded(previousKnotPosition, currentKnotPosition)) {
                    if(isDiagNeeded(previousKnotPosition, currentKnotPosition)) {
                        determineDiagMovingDirection(previousKnotPosition, currentKnotPosition);
                    } else {
                        determineNonDiagMovingDirection(previousKnotPosition, currentKnotPosition);
                    }
                }
                if(j === 9) {
                    tailTrail.set(`${tail.currentPosition.R}-${tail.currentPosition.U}`, true);
                }
            }
        }
    });

    return tailTrail.size;
};

module.exports = {
    day09part01,
    day09part02,
};
