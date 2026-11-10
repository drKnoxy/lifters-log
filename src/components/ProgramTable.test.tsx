import { describe, expect, it } from 'vitest';
import { LiftRecord } from '../lib/calc';
import { getProgramRecords } from './ProgramTable';

const records: LiftRecord[] = [
    { label: 'Bench Press', increment: 5, reps: 1, weight: 180 },
    { label: 'Back Squat', increment: 10, reps: 5, weight: 265 },
];
const frontSquat: LiftRecord = { label: 'Front Squat', increment: 10, reps: 3, weight: 200 };

describe('getProgramRecords', () => {
    it('uses the front squat in place of the back squat when selected', () => {
        expect(getProgramRecords(records, frontSquat, 'front')).toEqual([records[0], frontSquat]);
    });

    it('keeps the back squat when front squat details are unavailable', () => {
        expect(getProgramRecords(records, undefined, 'front')).toEqual(records);
    });

    it('keeps the back squat when front squat details are incomplete', () => {
        expect(getProgramRecords(records, { ...frontSquat, weight: null }, 'front')).toEqual(records);
    });
});
