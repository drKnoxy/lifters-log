import { describe, expect, it } from 'vitest';
import { formatDate, getSchedule, parseDate } from './schedule';

describe('parseDate / formatDate', () => {
    it('round-trips yyyy-mm-dd as a local date', () => {
        expect(formatDate(parseDate('2026-03-08')!)).toBe('2026-03-08');
    });

    it('rejects anything else', () => {
        expect(parseDate(undefined)).toBeNull();
        expect(parseDate('03/08/2026')).toBeNull();
    });
});

describe('getSchedule', () => {
    const start = '2026-10-25';

    it('is null without a start date', () => {
        expect(getSchedule(undefined, new Date())).toBeNull();
    });

    it('is week 1 for the first 7 days', () => {
        expect(getSchedule(start, new Date(2026, 9, 25, 23))).toEqual({ cycle: 0, week: 0, weeksIn: 0 });
        expect(getSchedule(start, new Date(2026, 9, 31, 23))).toEqual({ cycle: 0, week: 0, weeksIn: 0 });
    });

    it('rolls over on day 8, across a DST change', () => {
        expect(getSchedule(start, new Date(2026, 10, 1, 1))).toEqual({ cycle: 0, week: 1, weeksIn: 1 });
    });

    it('moves to the next cycle after 4 weeks', () => {
        expect(getSchedule(start, new Date(2027, 2, 20))).toEqual({ cycle: 5, week: 0, weeksIn: 20 });
    });

    it('is negative before the start date', () => {
        expect(getSchedule(start, new Date(2026, 9, 20))!.weeksIn).toBeLessThan(0);
    });
});
