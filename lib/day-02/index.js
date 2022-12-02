// OPPONENT: A for Rock, B for Paper, and C for Scissors.
// MINE: X for Rock, Y for Paper, and Z for Scissors.

// Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock.
// If both players choose the same shape, the round instead ends in a draw.

// The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors) 
// plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).

// Calculate score of my choice
const calculateScoreOfChoice = (choice) => {
    switch (choice) {
        case 'X':
            return 1;
        case 'Y':
            return 2;
        case 'Z':
            return 3;
        default:
            break;
    }
    return choice;
};

// Calculate score of outcome
const calculateScoreOfOutcome = (choices) => {
    switch (choices) {
        case "A Y":
        case "B Z":
        case "C X":
            return 6;    
        case "A X":
        case "B Y":
        case "C Z":
            return 3;    
        case "A Z":
        case "B X":
        case "C Y":
            return 0;    
        default:
            break;
    }
};

const day02Part01 = (input) => {
    return input
    .split('\n')
    .map((choices, i, array) => {
        return calculateScoreOfOutcome(choices) + calculateScoreOfChoice(choices[2]);
    })
    .reduce((prev, current) => {
        return prev + current;
    }, 0);
};


module.exports = {
    calculateScoreOfChoice,
    calculateScoreOfOutcome,
    day02Part01,
};