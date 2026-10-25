import { LiftRecord, calcWeight, getPlates, oneRepMax } from '../lib/calc';
import { routine531 } from '../lib/routine531';

interface Props {
    week: number;
    cycle: number;
    active: boolean;
    records: LiftRecord[];
    onShowPlates: (plates: string[]) => void;
}

const ACCESSORIES = ['Chin-ups', 'Hanging Leg Raise', 'Dumbbell Row', 'Leg Curl'];

export function ProgramTable({ week, cycle, active, records, onShowPlates }: Props) {
    const sets = routine531[week];
    const isDeload = week === 3;

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
                    {records.map(record => <th key={record.label}>{record.label}</th>)}
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
                            {records.map(record => {
                                const weight = calcWeight(oneRepMax(record), set.percentage, cycle, record.increment);
                                return (
                                    <td key={record.label} class="nowrap" onClick={() => onShowPlates(getPlates(weight))}>
                                        <span class={isLast ? 'print-50' : undefined}>
                                            <span class="calculated-weight">{weight}</span>
                                            {' '}
                                            <span class="separator--weight-and-reps">x</span>
                                            {' '}
                                            <span class="reps">{set.reps}</span>
                                        </span>
                                        {isLast && <span class="print-pipe"></span>}
                                        {isLast && <span class="print-50"></span>}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
            <tbody>
                <tr>
                    <th class="hidden-sm-down" rowSpan={2}>Accessory</th>
                    {records.map(record => (
                        <td key={record.label}>
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
