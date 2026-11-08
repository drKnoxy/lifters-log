import { describe, expect, it } from 'vitest';
import { getStrengthLevel, getStrengthThresholds } from './standards';

describe('getStrengthThresholds', () => {
    it('returns the published bodyweight row', () => {
        expect(getStrengthThresholds('bench', 180, 'male')).toEqual([125, 165, 205, 245]);
        expect(getStrengthThresholds('overheadPress', 180, 'female')).toEqual([35, 55, 70, 85]);
    });

    it('interpolates between the published bodyweight rows', () => {
        expect(getStrengthThresholds('bench', 185, 'male')).toEqual([125, 170, 210, 255]);
    });

    it('returns null outside the source bodyweight ranges', () => {
        expect(getStrengthThresholds('bench', 89, 'female')).toBeNull();
        expect(getStrengthThresholds('bench', 311, 'male')).toBeNull();
    });

    it('includes the first and last published bodyweight rows', () => {
        expect(getStrengthThresholds('bench', 90, 'female')).toEqual([40, 60, 75, 85]);
        expect(getStrengthThresholds('bench', 310, 'male')).toEqual([200, 260, 315, 385]);
    });
});

describe('getStrengthLevel', () => {
    it('returns the highest achieved level and folds elite into advanced', () => {
        const thresholds = [100, 150, 200, 250] as const;
        expect(getStrengthLevel(99, thresholds)).toBe('Beginner');
        expect(getStrengthLevel(150, thresholds)).toBe('Novice');
        expect(getStrengthLevel(220, thresholds)).toBe('Intermediate');
        expect(getStrengthLevel(400, thresholds)).toBe('Advanced');
    });
});