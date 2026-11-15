import { LiftRecord, calcWeight, oneRepMax } from '../lib/calc';
import { routine531 } from '../lib/routine531';

interface Props {
    week: number;
    cycle: number;
    active: boolean;
    records: LiftRecord[];
    frontSquat: LiftRecord | undefined;
    squatVariation: 'back' | 'front';
    onSquatVariationChange: (variation: 'back' | 'front') => void;
    selectedSets: Record<string, number | undefined>;
    onShowPlates: (column: string, set: number, record: LiftRecord, weight: number | '-') => void;
}

const ACCESSORIES = ['Chin-ups', 'Hanging Leg Raise', 'Dumbbell Row', 'Leg Curl'];

export function getProgramRecords(records: LiftRecord[], frontSquat: LiftRecord | undefined, squatVariation: 'back' | 'front') {
    return records.map(record => {
        const useFrontSquat = record.key === 'backSquat'
            && squatVariation === 'front'
            && frontSquat?.reps != null
            && frontSquat.weight != null;
        return useFrontSquat ? frontSquat : record;
    });
}

export function toggleSelectedSet(selected: Record<string, number | undefined>, column: string, set: number) {
    return { ...selected, [column]: selected[column] === set ? undefined : set };
}

export function ProgramTable({ week, cycle, active, records, frontSquat, squatVariation, onSquatVariationChange, selectedSets, onShowPlates }: Props) {
    const sets = routine531[week];
    const isDeload = week === 3;
    const programRecords = getProgramRecords(records, frontSquat, squatVariation);
    const showSquatSelector = frontSquat?.reps != null && frontSquat.weight != null;

    function renderLiftHeader(record: LiftRecord) {
        if (record.key !== 'backSquat' || !showSquatSelector) {
            return record.label;
        }

        return (
            <span class="squat-selector">
                <span aria-hidden="true">{squatVariation === 'front' ? 'Front Squat' : 'Back Squat'} ▾</span>
                <select
                    aria-label="Squat variation"
                    value={squatVariation}
                    onChange={e => onSquatVariationChange(e.currentTarget.value as 'back' | 'front')}>
                    <option value="back">Back Squat</option>
                    <option value="front">Front Squat</option>
                </select>
            </span>
        );
    }

    return (
        <table class={'table table-bordered table-program' + (active ? ' active' : '')}>
            <thead>
                <tr>
                    <th colSpan={99} class="table-header">
                        Week {week + 1} / Cycle {cycle + 1}
                    </th>
                </tr>
                <tr>
                    <th class="hidden-sm-down">&nbsp;</th>
                    {records.map(record => (
                        <th key={record.key}>{renderLiftHeader(record)}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {sets.map((set, i) => {
                    const isLast = i === sets.length - 1;
                    return (
                        <tr key={i} class={isLast ? 'active' : undefined}>
                            {(i === 0 || i === 3) && (
                                <th class="hidden-sm-down row-label" rowSpan={3}>
                                    {i === 0 ? 'Warm Up' : 'Active'}
                                </th>
                            )}
                            {programRecords.map((record, columnIndex) => {
                                const weight = calcWeight(oneRepMax(record), set.percentage, cycle, record.increment);
                                const column = records[columnIndex].key;
                                const selected = active && selectedSets[column] === i;
                                return (
                                    <td key={column} class={'nowrap weight-cell' + (selected ? ' selected' : '')}>
                                        <button type="button" class="weight-button" aria-pressed={selected}
                                            aria-label={`${record.label}: ${weight} x ${set.reps}`}
                                            onClick={() => onShowPlates(column, i, record, weight)}>
                                            <span class={isLast ? 'print-50' : undefined}>
                                                <span class="calculated-weight">{weight}</span>
                                                {' '}
                                                <span class="separator--weight-and-reps">x</span>
                                                {' '}
                                                <span class="reps">{set.reps}</span>
                                            </span>
                                            {isLast && <span class="print-pipe"></span>}
                                            {isLast && <span class="print-50"></span>}
                                        </button>
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
            <tbody>
                <tr>
                    <th class="hidden-sm-down" rowSpan={2}>Finisher</th>
                    {programRecords.map(record => (
                        <td key={record.key}>
                            {isDeload
                                ? '-'
                                : `5 x 10 @${calcWeight(oneRepMax(record), .60, cycle, record.increment)}`}
                        </td>
                    ))}
                </tr>
                <tr>
                    {ACCESSORIES.map(name => (
                        <td key={name}>
                            {name} <span class="hidden-sm-down">-</span> 5 x 10
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
}
