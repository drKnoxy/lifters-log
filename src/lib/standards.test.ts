import { describe, expect, it } from 'vitest';
import { getStrengthLevel, getStrengthLift, getStrengthScale, getStrengthThresholds } from './standards';

describe('getStrengthThresholds', () => {
    it('calculates the published 175 lb male benchmarks', () => {
        expect(getStrengthThresholds('squat', 175, 'male')).toEqual([180, 260, 325, 385]);
        expect(getStrengthThresholds('bench', 175, 'male')).toEqual([150, 200, 250, 295]);
        expect(getStrengthThresholds('deadlift', 175, 'male')).toEqual([220, 325, 390, 450]);
        expect(getStrengthThresholds('overheadPress', 175, 'male')).toEqual([100, 120, 135, 165]);
        expect(getStrengthThresholds('frontSquat', 175, 'male')).toEqual([150, 215, 275, 320]);
    });

    it('scales benchmarks by body weight and gender', () => {
        expect(getStrengthThresholds('bench', 175, 'female')).toEqual([85, 115, 145, 170]);
        expect(getStrengthThresholds('squat', 200, 'male')).toEqual([165, 235, 295, 350]);
    });

    it('returns null outside the supported bodyweight range', () => {
        expect(getStrengthThresholds('bench', 89.9, 'female')).toBeNull();
        expect(getStrengthThresholds('bench', 350.1, 'male')).toBeNull();
        expect(getStrengthThresholds('bench', Number.NaN, 'male')).toBeNull();
    });

    it('includes the supported bodyweight endpoints', () => {
        expect(getStrengthThresholds('bench', 90, 'female')).not.toBeNull();
        expect(getStrengthThresholds('bench', 350, 'male')).not.toBeNull();
    });

    it('recognizes front squat as an optional benchmark lift', () => {
        expect(getStrengthLift('Front Squat')).toBe('frontSquat');
    });
});

describe('getStrengthLevel', () => {
    const thresholds = [100, 150, 200, 250] as const;

    it('returns the highest achieved tier', () => {
        expect(getStrengthLevel(99, thresholds)).toBe('Novice');
        expect(getStrengthLevel(150, thresholds)).toBe('Intermediate');
        expect(getStrengthLevel(220, thresholds)).toBe('Advanced');
        expect(getStrengthLevel(250, thresholds)).toBe('Elite');
    });
});

describe('getStrengthScale', () => {
    const thresholds = [100, 150, 200, 250] as const;

    it('shows three tiers from novice through advanced at lower levels', () => {
        expect(getStrengthScale(150, thresholds)).toEqual({
            min: 100,
            max: 250,
            thresholds: [100, 150, 200],
            levels: ['Novice', 'Intermediate', 'Advanced'],
        });
    });

    it('shifts the three-tier window up for advanced and elite lifters', () => {
        expect(getStrengthScale(250, thresholds)).toEqual({
            min: 150,
            max: 287.5,
            thresholds: [150, 200, 250],
            levels: ['Intermediate', 'Advanced', 'Elite'],
        });
    });
});
