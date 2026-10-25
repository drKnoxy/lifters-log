import { useState } from 'preact/hooks';
import { LiftRecord } from '../lib/calc';
import { getSchedule } from '../lib/schedule';
import { useStoredState } from '../lib/storage';
import { CycleWeekPicker } from './CycleWeekPicker';
import { PlateAlert } from './PlateAlert';
import { ProgramTable } from './ProgramTable';
import { RecordsSection } from './RecordsSection';

const DEFAULT_RECORDS: LiftRecord[] = [
    { label: 'Overhead Press', increment: 5,  reps: 2, weight: 115 },
    { label: 'Deadlift',       increment: 10, reps: 3, weight: 285 },
    { label: 'Bench Press',    increment: 5,  reps: 1, weight: 180 },
    { label: 'Back Squat',     increment: 10, reps: 5, weight: 265 },
];

const WEEKS = [0, 1, 2, 3];

export function App() {
    const [records, setRecords] = useStoredState('records', DEFAULT_RECORDS);
    const [currentCycle, setCurrentCycle] = useStoredState('currentCycle', 0);
    const [currentWeek, setCurrentWeek] = useStoredState('currentWeek', 0);
    const [startDate, setStartDate] = useStoredState<string | undefined>('startDate', undefined);
    const [plates, setPlates] = useState<string[] | null>(null);

    const schedule = getSchedule(startDate, new Date());

    return (
        <>
            {plates && <PlateAlert messages={plates} onClose={() => setPlates(null)} />}

            <div class="row">
                <div class="col-xs-12 col-lg-6 hidden-print">
                    <h1 style={{ paddingTop: 0 }}>Online 5/3/1 Calculator</h1>
                    <p>This is a calculator for wendler's 5/3/1 routine. Enter your PRs, and the tables below will update with what weights you should be using.</p>
                </div>
                <RecordsSection
                    records={records}
                    onRecordsChange={setRecords}
                    startDate={startDate}
                    onStartDateChange={setStartDate} />
            </div>

            <hr class="m-y-1" />

            <CycleWeekPicker
                currentCycle={currentCycle}
                currentWeek={currentWeek}
                onCycleChange={setCurrentCycle}
                onWeekChange={setCurrentWeek}
                schedule={schedule}
                startDate={startDate} />

            <div class="m-b-1 xs-expand">
                {WEEKS.map(week => (
                    <ProgramTable
                        key={week}
                        week={week}
                        cycle={currentCycle}
                        active={week === currentWeek}
                        records={records}
                        onShowPlates={setPlates} />
                ))}
            </div>

            <footer class="small text-center">
                <hr />
                &lt;3 <a href="https://twitter.com/adamwknox">adamwknox</a> | <a href="https://github.com/drKnoxy/lifters-log">sourcecode</a>
            </footer>
        </>
    );
}
