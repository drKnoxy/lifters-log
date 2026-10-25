import { describe, expect, it } from 'vitest';
import { calcWeight, getPlates, oneRepMax, round5 } from './calc';

describe('round5', () => {
    it('rounds to the nearest 5', () => {
        expect(round5(112)).toBe(110);
        expect(round5(113)).toBe(115);
    });
});

describe('oneRepMax', () => {
    it('uses the Epley formula', () => {
        expect(oneRepMax({ weight: 300, reps: 3 })).toBe(330);
    });

    it('returns 0 for missing input', () => {
        expect(oneRepMax({ weight: null, reps: 5 })).toBe(0);
        expect(oneRepMax({ weight: 200, reps: null })).toBe(0);
    });
});

describe('calcWeight', () => {
    it('takes 90%, adds the cycle increment, applies the percentage and rounds', () => {
        // (300 * .9 + 2 * 10) * .85 = 246.5 -> 245
        expect(calcWeight(300, .85, 2, 10)).toBe(245);
    });

    it('returns a dash without a weight', () => {
        expect(calcWeight(0, .85, 0, 10)).toBe('-');
    });
});

describe('getPlates', () => {
    it('lists plates per side', () => {
        expect(getPlates(225)).toEqual(['2 x 45']);
        expect(getPlates(185)).toEqual(['1 x 45', '1 x 25']);
        expect(getPlates(140)).toEqual(['1 x 45', '1 x 2.5']);
    });

    it('is empty for a dash', () => {
        expect(getPlates('-')).toEqual([]);
    });
});
