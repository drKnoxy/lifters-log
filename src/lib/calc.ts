export interface LiftRecord {
    key: string;
    label: string;
    increment: number;
    reps: number | null;   // null while the input is empty
    weight: number | null;
    isOptional?: boolean;
}

const LEGACY_LIFT_KEYS = new Map([
    ['Overhead Press', 'overheadPress'],
    ['Deadlift', 'deadlift'],
    ['Bench Press', 'benchPress'],
    ['Back Squat', 'backSquat'],
    ['Front Squat', 'frontSquat'],
]);

export function ensureLiftKeys(records: Array<Omit<LiftRecord, 'key'> & { key?: string }>): LiftRecord[] {
    return records.map((record, index) => ({
        ...record,
        key: record.key || LEGACY_LIFT_KEYS.get(record.label) || `lift-${index + 1}`,
    }));
}

export function round5(num: number): number {
    return Math.round(num / 5) * 5;
}

/**
 * Working weight for a set
 *
 * @param weight     estimated 1rm
 * @param percentage percentage of the training max for this set
 * @param cycle      zero-based cycle, each one adds `increment`
 * @param increment  lbs added per cycle
 */
export function calcWeight(weight: number, percentage: number, cycle: number, increment: number): number | '-' {
    // weight comes from user input, so it is very possible for it to be falsey
    if (!weight) {
        return '-';
    }

    weight *= .9;                   // start with 90% of the recorded 1rm
    weight += (cycle * increment);  // add to the weight based on cycle
    weight *= percentage;           // modify the weight used based on the program
    return round5(weight);          // round it to the nearest 5 lbs
}

/**
 * Epley Formula for One rep max
 * https://en.wikipedia.org/wiki/One-repetition_maximum
 */
export function oneRepMax(r: Pick<LiftRecord, 'weight' | 'reps'>): number {
    if (!r.weight || !r.reps) {
        return 0;
    }

    return r.weight * (1 + r.reps / 30);
}

/**
 * Returns the plates needed on each side of the bar
 */
export function weightOnBar(weight: number, bar = 45): { plate: number, count: number }[] {
    let platesPerSide = (weight - bar) / 2;
    const out: { plate: number, count: number }[] = [];

    [45, 35, 25, 10, 5, 2.5].forEach(plate => {
        const count = Math.floor(platesPerSide / plate);
        if (count > 0) {
            out.push({ plate, count });
            platesPerSide -= count * plate;
        }
    });

    return out;
}

export function getPlates(weight: number | '-'): string[] {
    if (weight === '-') {
        return [];
    }
    return weightOnBar(weight).map(({ plate, count }) => `${count} x ${plate}`);
}
