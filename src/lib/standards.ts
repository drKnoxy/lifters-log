import { round5 } from './calc';

export type StrengthGender = 'male' | 'female';
export type StrengthLift = 'bench' | 'squat' | 'frontSquat' | 'deadlift' | 'overheadPress';
export type StrengthLevel = 'Novice' | 'Intermediate' | 'Advanced' | 'Elite';
export type StrengthThresholds = readonly [number, number, number, number];
export type StrengthProfile = { bodyweight: number | null; gender: StrengthGender | '' };

export const STRENGTH_LEVELS: readonly StrengthLevel[] = ['Novice', 'Intermediate', 'Advanced', 'Elite'];

const LIFT_COEFFICIENTS: Record<StrengthLift, StrengthThresholds> = {
    squat: [1.03, 1.49, 1.86, 2.20],
    frontSquat: [0.86, 1.23, 1.57, 1.83],
    bench: [0.86, 1.14, 1.43, 1.69],
    deadlift: [1.26, 1.86, 2.23, 2.57],
    overheadPress: [0.57, 0.69, 0.77, 0.94],
};

const LIFT_KEYS: Record<string, StrengthLift> = {
    'Bench Press': 'bench',
    'Back Squat': 'squat',
    'Front Squat': 'frontSquat',
    Deadlift: 'deadlift',
    'Overhead Press': 'overheadPress',
};

export function getStrengthLift(label: string): StrengthLift | undefined {
    return LIFT_KEYS[label];
}

export function getStrengthThresholds(
    lift: StrengthLift,
    bodyweight: number,
    gender: StrengthGender,
): StrengthThresholds | null {
    if (!Number.isFinite(bodyweight) || bodyweight < 90 || bodyweight > 350) {
        return null;
    }

    const upperBody = lift === 'bench' || lift === 'overheadPress';
    const genderMultiplier = gender === 'male' ? 1 : upperBody ? 0.575 : 0.705;
    const bodyweightMultiplier = 175 * (175 / bodyweight) ** 0.75;
    return LIFT_COEFFICIENTS[lift].map(coefficient =>
        round5(coefficient * genderMultiplier * bodyweightMultiplier),
    ) as unknown as StrengthThresholds;
}

export function getStrengthLevel(oneRepMax: number, thresholds: StrengthThresholds): StrengthLevel {
    if (oneRepMax >= thresholds[3]) return 'Elite';
    if (oneRepMax >= thresholds[2]) return 'Advanced';
    if (oneRepMax >= thresholds[1]) return 'Intermediate';
    return 'Novice';
}

export function getStrengthScale(oneRepMax: number, thresholds: StrengthThresholds) {
    const levelIndex = STRENGTH_LEVELS.indexOf(getStrengthLevel(oneRepMax, thresholds));
    const startIndex = levelIndex === 0 ? 0 : 1;
    const visibleThresholds = thresholds.slice(startIndex, startIndex + 3) as unknown as readonly [number, number, number];
    const max = startIndex === 0 ? thresholds[3] : thresholds[3] * 1.15;

    return {
        min: visibleThresholds[0],
        max,
        thresholds: visibleThresholds,
        levels: STRENGTH_LEVELS.slice(startIndex, startIndex + 3),
    };
}
