export interface Schedule {
    cycle: number;
    week: number;
    weeksIn: number;   // negative before the start date
}

export function parseDate(str: string | undefined | null): Date | null {
    const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str || '');
    return parts ? new Date(+parts[1], +parts[2] - 1, +parts[3]) : null;
}

export function formatDate(date: Date): string {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${mm}-${dd}`;
}

// Days since epoch for the local calendar date, so DST doesn't skew the diff
export function dayNumber(date: Date): number {
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 864e5;
}

/**
 * Which cycle/week `today` falls in, based on the 'yyyy-mm-dd' start date
 */
export function getSchedule(startDate: string | undefined, today: Date): Schedule | null {
    const start = parseDate(startDate);
    if (!start) {
        return null;
    }

    const weeksIn = Math.floor((dayNumber(today) - dayNumber(start)) / 7);

    return {
        cycle: Math.floor(weeksIn / 4),
        week: weeksIn % 4,
        weeksIn,
    };
}
