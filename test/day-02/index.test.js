const { calculateScoreOfChoice, calculateScoreOfOutcome, day02Part01, determineOutcome, calculateTotalScore, day02Part02 } = require('../../lib/day-02');
const { testInput, actualInput } = require('../../lib/day-02/input');

describe('day 02', () => {
    it('Calculates the score of Rock', () => {
        const choice = 'X';
        const result = calculateScoreOfChoice(choice);
        expect(result).toBe(1);
    });
    
    it('Calculates the score of Paper', () => {
        const choice = 'Y';
        const result = calculateScoreOfChoice(choice);
        expect(result).toBe(2);
    });
    
    it('Calculates the score of Scissors', () => {
        const choice = 'Z';
        const result = calculateScoreOfChoice(choice);
        expect(result).toBe(3);
    });
    
    it('Calculates the score of a Win', () => {
        const choices01 = 'C X';
        const result01 = calculateScoreOfOutcome(choices01);
        expect(result01).toBe(6);
        
        const choices02 = 'A Y';
        const result02 = calculateScoreOfOutcome(choices02);
        expect(result02).toBe(6);
        
        const choices03 = 'B Z';
        const result03 = calculateScoreOfOutcome(choices03);
        expect(result03).toBe(6);

    });
    
    it('Calculates the score of a Draw', () => {
        const choices01 = 'A X';
        const result01 = calculateScoreOfOutcome(choices01);
        expect(result01).toBe(3);
        
        const choices02 = 'B Y';
        const result02 = calculateScoreOfOutcome(choices02);
        expect(result02).toBe(3);
        
        const choices03 = 'C Z';
        const result03 = calculateScoreOfOutcome(choices03);
        expect(result03).toBe(3);

    });

    it('Calculates the score of a Loss', () => {
        const choices01 = 'A Z';
        const result01 = calculateScoreOfOutcome(choices01);
        expect(result01).toBe(0);
        
        const choices02 = 'B X';
        const result02 = calculateScoreOfOutcome(choices02);
        expect(result02).toBe(0);
        
        const choices03 = 'C Y';
        const result03 = calculateScoreOfOutcome(choices03);
        expect(result03).toBe(0);

    });

    it('Solves the part01 test input', () => {
        const result = day02Part01(testInput);
        expect(result).toBe(15);
    });
    
    it('Solves part01', () => {
        const result = day02Part01(actualInput);
        expect(result).toBe(12645);
    });

    it('calculates total score if opp uses rock', () => {
        const choices01 = 'A X';
        const result01 = calculateTotalScore(choices01);
        expect(result01).toBe(3);
        
        const choices02 = 'A Y';
        const result02 = calculateTotalScore(choices02);
        expect(result02).toBe(4);
        
        const choices03 = 'A Z';
        const result03 = calculateTotalScore(choices03);
        expect(result03).toBe(8);
    });
    
    it('calculates total score if opp uses paper', () => {
        const choices01 = 'B X';
        const result01 = calculateTotalScore(choices01);
        expect(result01).toBe(1);
        
        const choices02 = 'B Y';
        const result02 = calculateTotalScore(choices02);
        expect(result02).toBe(5);
        
        const choices03 = 'B Z';
        const result03 = calculateTotalScore(choices03);
        expect(result03).toBe(9);
    });
    
    it('calculates total score if opp uses scissors', () => {
        const choices01 = 'C X';
        const result01 = calculateTotalScore(choices01);
        expect(result01).toBe(2);
        
        const choices02 = 'C Y';
        const result02 = calculateTotalScore(choices02);
        expect(result02).toBe(6);
        
        const choices03 = 'C Z';
        const result03 = calculateTotalScore(choices03);
        expect(result03).toBe(7);
    });

    it('Solves the part02 test input', () => {
        const result = day02Part02(testInput);
        expect(result).toBe(12);
    });
    
    it('Solves part02', () => {
        const result = day02Part02(actualInput);
        expect(result).toBe(11756);
    });

});
