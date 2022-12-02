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

// X means lose, Y means draw, Z means win.
// A for Rock, B for Paper, and C for Scissors.
// 0 if you lost, 3 if the round was a draw, and 6 if you won
// 1 for Rock, 2 for Paper, and 3 for Scissors

const determineOutcome = (choices) => {
    switch (choices[2]) {
        case 'X':
            return 0;
        case 'Y':
            return 3;
        case 'Z':
            return 6;
        default:
            break;
    }
};

const calculateTotalScore = (choices) => {
    let score = 0;
    const [opponent , _, outcome] = choices;
    switch (outcome) {
        case 'X':
            score = 0;
            break;
        case 'Y':
            score = 3;
            break;
        case 'Z':
            score = 6;
            break;
        default:
            break;
    }
    // depending on score and opponent decide our choice
    if(opponent === 'A') {
        switch (score) {
            case 0:
                // lose against rock, scissors 3
                return score + 3;
            case 3:
                // draw against rock, rock 1
                return score + 1;
            case 6:
                // win against rock, paper 2
                return score + 2; 
            default:
                break;
        }
    }
    if(opponent === 'B') {
        switch (score) {
            case 0:
                // lose against paper, rock 1
                return score + 1;
            case 3:
                // draw against paper, paper 2
                return score + 2;
            case 6:
                // win against paper, scissors 3
                return score + 3; 
            default:
                break;
        }
    }
    if(opponent === 'C') {
        switch (score) {
            case 0:
                // lose against scissors, paper 2
                return score + 2;
            case 3:
                // draw against scissors, scissors 3
                return score + 3;
            case 6:
                // win against scissors, rock 1
                return score + 1; 
            default:
                break;
        }
    }

    return score;
};

const day02Part02 = (input) => {
    return input
    .split('\n')
    .map(calculateTotalScore)
    .reduce((total, currentScore) => total + currentScore, 0);
};

module.exports = {
    calculateScoreOfChoice,
    calculateScoreOfOutcome,
    day02Part01,
    determineOutcome,
    calculateTotalScore,
    day02Part02,
};