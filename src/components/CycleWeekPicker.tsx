import { Schedule } from '../lib/schedule';
import { formatStartDate } from './RecordsSection';

interface Props {
    currentCycle: number;
    currentWeek: number;
    onCycleChange: (cycle: number) => void;
    onWeekChange: (week: number) => void;
    schedule: Schedule | null;
    startDate: string | undefined;
}

const CYCLES = [0, 1, 2, 3, 4, 5, 6, 7];
const WEEKS = [0, 1, 2, 3];

function plural(n: number) {
    return `${n} week${n === 1 ? '' : 's'}`;
}

export function CycleWeekPicker({ currentCycle, currentWeek, onCycleChange, onWeekChange, schedule, startDate }: Props) {
    // How many weeks the selected cycle/week is ahead (+) or behind (-) of today
    const offset = schedule ? (currentCycle * 4 + currentWeek) - schedule.weeksIn : 0;

    function goToSchedule() {
        if (schedule) {
            onCycleChange(schedule.cycle);
            onWeekChange(schedule.week);
        }
    }

    return (
        <div class="m-b-1 hidden-print">
            <div class="header-buttons">
                <label>cycle:</label>
                <div class="btn-group">
                    {CYCLES.map(cycle => (
                        <button type="button" key={cycle}
                            onClick={() => onCycleChange(cycle)}
                            class={[
                                'btn btn-default',
                                cycle === currentCycle && 'active',
                                schedule && cycle === schedule.cycle && 'scheduled',
                            ].filter(Boolean).join(' ')}>
                            {cycle + 1}
                        </button>
                    ))}
                </div>
            </div>
            <div class="header-buttons" style={{ clear: 'both', marginBottom: '4px' }}>
                <label>week:</label>
                <div class="btn-group">
                    {WEEKS.map(week => (
                        <button type="button" key={week}
                            onClick={() => onWeekChange(week)}
                            class={[
                                'btn btn-default',
                                week === currentWeek && 'active',
                                schedule && week === schedule.week && currentCycle === schedule.cycle && 'scheduled',
                            ].filter(Boolean).join(' ')}>
                            {week + 1}
                        </button>
                    ))}
                </div>
            </div>

            <h2 class="display-2">Lifting Routine</h2>

            {schedule && (
                <p class="schedule-status">
                    {schedule.weeksIn < 0 ? (
                        <span>Your program starts {formatStartDate(startDate)}.</span>
                    ) : (
                        <span>
                            This week is <strong>Cycle {schedule.cycle + 1} / Week {schedule.week + 1}</strong>.
                            {' '}
                            {offset < 0 && (
                                <span class="text-danger">You're viewing {plural(-offset)} behind. </span>
                            )}
                            {offset > 0 && (
                                <span class="text-muted">You're viewing {plural(offset)} ahead. </span>
                            )}
                            {offset !== 0 && (
                                <button type="button" class="btn btn-link btn-inline" onClick={goToSchedule}>
                                    Go to this week
                                </button>
                            )}
                        </span>
                    )}
                </p>
            )}
        </div>
    );
}
