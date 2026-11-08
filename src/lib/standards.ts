import { round5 } from './calc';

export type StrengthGender = 'male' | 'female';
export type StrengthLift = 'bench' | 'squat' | 'deadlift' | 'overheadPress';
export type StrengthLevel = 'Beginner' | 'Novice' | 'Intermediate' | 'Advanced';
export type StrengthThresholds = readonly [number, number, number, number];
export type StrengthProfile = { bodyweight: number | null; gender: StrengthGender | '' };

export const STRENGTH_LEVELS: readonly StrengthLevel[] = ['Beginner', 'Novice', 'Intermediate', 'Advanced'];

interface GenderTables {
    firstBodyweight: number;
    lifts: Record<StrengthLift, readonly StrengthThresholds[]>;
}

const TABLES: Record<StrengthGender, GenderTables> = {
    male: {
        firstBodyweight: 110,
        lifts: {
            bench: [
                [52, 84, 102, 121], [65, 98, 120, 143], [76, 112, 137, 163], [87, 124, 152, 182],
                [97, 136, 166, 200], [106, 147, 179, 216], [115, 157, 192, 231], [123, 167, 204, 246],
                [131, 176, 215, 259], [138, 185, 225, 272], [145, 193, 235, 285], [152, 201, 245, 296],
                [158, 209, 254, 308], [164, 216, 263, 318], [170, 223, 271, 329], [175, 229, 279, 339],
                [181, 236, 287, 348], [186, 242, 295, 357], [191, 248, 302, 366], [196, 254, 309, 375],
                [201, 259, 315, 383],
            ],
            squat: [
                [80, 126, 155, 175], [88, 139, 172, 199], [96, 151, 187, 220], [103, 162, 202, 240],
                [110, 172, 216, 258], [117, 181, 228, 275], [123, 190, 240, 291], [128, 199, 251, 307],
                [134, 207, 262, 321], [139, 214, 272, 335], [144, 221, 281, 348], [148, 228, 291, 360],
                [153, 235, 299, 372], [157, 241, 308, 383], [161, 247, 316, 394], [165, 253, 323, 405],
                [168, 258, 331, 415], [172, 264, 338, 424], [176, 269, 345, 434], [179, 274, 351, 443],
                [182, 278, 358, 452],
            ],
            deadlift: [
                [104, 159, 212, 248], [114, 175, 231, 272], [124, 189, 248, 294], [133, 203, 264, 315],
                [141, 216, 279, 334], [149, 227, 293, 352], [156, 238, 306, 368], [163, 249, 318, 384],
                [170, 259, 330, 399], [176, 268, 341, 413], [182, 277, 352, 427], [188, 285, 362, 440],
                [193, 293, 371, 452], [198, 301, 380, 464], [203, 309, 389, 475], [208, 316, 398, 486],
                [213, 323, 406, 497], [217, 329, 414, 507], [221, 336, 421, 516], [225, 342, 428, 526],
                [229, 348, 436, 535],
            ],
            overheadPress: [
                [47, 65, 75, 82], [51, 71, 83, 92], [55, 77, 90, 101], [59, 82, 97, 110],
                [62, 88, 103, 118], [66, 92, 109, 126], [69, 97, 115, 133], [71, 101, 120, 140],
                [74, 105, 125, 146], [77, 109, 129, 152], [79, 113, 134, 158], [81, 116, 138, 164],
                [84, 119, 142, 169], [86, 122, 146, 174], [88, 125, 149, 179], [90, 128, 153, 183],
                [91, 131, 156, 188], [93, 134, 160, 192], [95, 136, 163, 196], [97, 139, 166, 200],
                [98, 141, 169, 204],
            ],
        },
    },
    female: {
        firstBodyweight: 90,
        lifts: {
            bench: [
                [39, 60, 77, 87], [42, 63, 81, 94], [44, 67, 85, 101], [47, 70, 89, 107],
                [49, 72, 92, 112], [51, 75, 95, 117], [53, 77, 97, 121], [54, 79, 100, 126],
                [56, 81, 102, 130], [57, 83, 105, 133], [59, 85, 107, 137], [60, 87, 109, 140],
                [62, 89, 111, 144], [63, 90, 113, 147], [64, 92, 114, 150], [65, 93, 116, 152],
                [66, 95, 118, 155], [67, 96, 119, 158],
            ],
            squat: [
                [42, 90, 130, 163], [45, 94, 134, 170], [48, 98, 139, 176], [51, 101, 143, 182],
                [53, 105, 146, 187], [55, 108, 150, 191], [57, 110, 153, 196], [59, 113, 156, 200],
                [60, 115, 158, 207], [62, 118, 161, 207], [64, 120, 163, 211], [65, 122, 166, 214],
                [66, 124, 168, 217], [68, 126, 170, 220], [69, 128, 172, 223], [70, 129, 174, 226],
                [71, 131, 176, 228], [72, 132, 178, 231],
            ],
            deadlift: [
                [76, 114, 147, 188], [78, 122, 155, 199], [80, 128, 163, 209], [82, 134, 170, 218],
                [83, 140, 177, 226], [85, 145, 183, 234], [86, 150, 188, 241], [88, 154, 193, 247],
                [89, 159, 198, 254], [90, 163, 203, 260], [91, 166, 207, 265], [92, 170, 211, 271],
                [93, 173, 215, 276], [94, 177, 219, 281], [95, 180, 223, 285], [96, 183, 226, 290],
                [97, 186, 229, 294], [98, 188, 233, 298],
            ],
            overheadPress: [
                [26, 45, 54, 62], [27, 47, 56, 65], [29, 48, 58, 68], [30, 49, 60, 71],
                [31, 51, 62, 74], [32, 52, 64, 76], [33, 53, 65, 79], [33, 54, 67, 81],
                [34, 55, 68, 83], [35, 56, 69, 85], [36, 56, 71, 86], [36, 57, 72, 88],
                [37, 58, 73, 90], [38, 59, 74, 91], [38, 59, 75, 93], [39, 60, 76, 94],
                [39, 61, 77, 95], [40, 61, 77, 97],
            ],
        },
    },
};

const LIFT_KEYS: Record<string, StrengthLift> = {
    'Bench Press': 'bench',
    'Back Squat': 'squat',
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
    if (!Number.isFinite(bodyweight) || bodyweight <= 0) {
        return null;
    }

    const table = TABLES[gender];
    const rows = table.lifts[lift];
    const lastBodyweight = table.firstBodyweight + (rows.length - 1) * 10;
    if (bodyweight < table.firstBodyweight || bodyweight > lastBodyweight) {
        return null;
    }

    const position = (bodyweight - table.firstBodyweight) / 10;
    const lowerIndex = Math.floor(position);
    const upperIndex = Math.ceil(position);
    if (lowerIndex === upperIndex) {
        return rows[lowerIndex].map(round5) as unknown as StrengthThresholds;
    }

    const fraction = position - lowerIndex;
    return rows[lowerIndex].map((value, index) =>
        round5(value + (rows[upperIndex][index] - value) * fraction),
    ) as unknown as StrengthThresholds;
}

export function getStrengthLevel(oneRepMax: number, thresholds: StrengthThresholds): StrengthLevel {
    if (oneRepMax >= thresholds[3]) return 'Advanced';
    if (oneRepMax >= thresholds[2]) return 'Intermediate';
    if (oneRepMax >= thresholds[1]) return 'Novice';
    return 'Beginner';
}