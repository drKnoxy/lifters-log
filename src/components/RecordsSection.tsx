import { useState } from 'preact/hooks';
import { LiftRecord, oneRepMax, round5 } from '../lib/calc';
import { parseDate } from '../lib/schedule';
import { StrengthProfile } from '../lib/standards';
import { ProficiencyGauge } from './ProficiencyGauge';

interface Props {
    records: LiftRecord[];
    onRecordsChange: (records: LiftRecord[]) => void;
    profile: StrengthProfile;
    onProfileChange: (profile: StrengthProfile) => void;
    startDate: string | undefined;
    onStartDateChange: (date: string | undefined) => void;
}

const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' });

export function formatStartDate(startDate: string | undefined) {
    const date = parseDate(startDate);
    return date ? dateFormat.format(date) : '';
}

// Number inputs can be empty while typing; keep that as null rather than 0
function toNumber(value: string): number | null {
    return value === '' ? null : Number(value);
}

export function RecordsSection({ records, onRecordsChange, profile, onProfileChange, startDate, onStartDateChange }: Props) {
    const [showEditForm, setShowEditForm] = useState(false);
    const isValid = records.every(r =>
        (r.isOptional && r.reps == null && r.weight == null) ||
        (r.reps != null && r.weight != null),
    );

    function update(index: number, field: 'reps' | 'weight', value: string) {
        onRecordsChange(records.map((r, i) => i === index ? { ...r, [field]: toNumber(value) } : r));
    }

    function updateBodyweight(value: string) {
        onProfileChange({ ...profile, bodyweight: toNumber(value) });
    }

    function updateGender(value: string) {
        onProfileChange({ ...profile, gender: value as StrengthProfile['gender'] });
    }

    return (
        <div class="col-xs-12 col-lg-6">
            <h2 class="hidden-print">
                Starting PRs
                {' '}
                {!showEditForm && (
                    <button type="button" class="btn btn-default btn-sm" onClick={() => setShowEditForm(true)}>
                        edit
                    </button>
                )}
            </h2>

            {showEditForm ? (
                <form onSubmit={e => e.preventDefault()}>
                    {records.map((record, i) => (
                        <div class="form-inline" key={record.label}>
                            <div class="row">
                                <div class="col-sm-3">
                                    <label class="hidden-xs">{record.label}</label>
                                    <h4 class="visible-xs">{record.label}</h4>
                                </div>
                                <div class="col-sm-9">
                                    <div class="row">
                                        <div class="col-xs-6">
                                            <fieldset class="form-group">
                                                <label class="visible-xs">Reps</label>
                                                <input class="form-control"
                                                    type="number"
                                                    value={record.reps ?? ''}
                                                    onInput={e => update(i, 'reps', e.currentTarget.value)}
                                                    required />
                                            </fieldset>
                                            <p class="form-control-static hidden-xs">x</p>
                                        </div>
                                        <div class="col-xs-6">
                                            <fieldset class="form-group">
                                                <label class="visible-xs">Weight</label>
                                                <div class="input-group">
                                                    <input class="form-control"
                                                        type="number"
                                                        value={record.weight ?? ''}
                                                        onInput={e => update(i, 'weight', e.currentTarget.value)}
                                                        required />
                                                    <div class="input-group-addon">lbs</div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div class="form-inline">
                        <div class="row">
                            <div class="col-sm-3">
                                <label>Strength profile</label>
                            </div>
                            <div class="col-sm-9">
                                <div class="row">
                                    <div class="col-xs-6">
                                        <div class="profile-field">
                                            <label class="profile-field__label" for="bodyweight">Body weight</label>
                                            <div class="input-group">
                                                <input class="form-control"
                                                    id="bodyweight"
                                                    type="number"
                                                    min="1"
                                                    step="0.1"
                                                    value={profile.bodyweight ?? ''}
                                                    onInput={e => updateBodyweight(e.currentTarget.value)} />
                                                <div class="input-group-addon">lbs</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6">
                                        <div class="profile-field">
                                            <label class="profile-field__label" for="gender">Gender</label>
                                            <select class="form-control"
                                                id="gender"
                                                value={profile.gender}
                                                onChange={e => updateGender(e.currentTarget.value)}>
                                                <option value="">Select</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-inline">
                        <div class="row">
                            <div class="col-sm-3">
                                <label for="start-date">Start Date</label>
                            </div>
                            <div class="col-sm-9">
                                <fieldset class="form-group">
                                    <input class="form-control"
                                        id="start-date"
                                        type="date"
                                        value={startDate ?? ''}
                                        onChange={e => onStartDateChange(e.currentTarget.value || undefined)} />
                                </fieldset>
                                <span class="help-block">The first day of cycle 1 / week 1.</span>
                            </div>
                        </div>
                    </div>

                    <button type="button"
                        class="btn btn-primary"
                        disabled={!isValid}
                        onClick={() => setShowEditForm(false)}>
                        Done
                    </button>
                </form>
            ) : (
                <div class="row">
                    {records
                        .filter(record => !record.isOptional || (record.reps != null && record.weight != null))
                        .map(record => (
                        <div class="col-sm-12" key={record.label}>
                            <div class="record-summary">
                                <strong>{record.label}:</strong>
                                {' '}
                                <span>{record.reps} x {record.weight}</span>
                                {' '}
                                {(record.reps ?? 0) > 1 && (
                                    <i>(1RM x {round5(oneRepMax(record))})</i>
                                )}
                            </div>
                            {profile.bodyweight != null && profile.gender && oneRepMax(record) > 0 && (
                                <ProficiencyGauge
                                    liftLabel={record.label}
                                    oneRepMax={oneRepMax(record)}
                                    bodyweight={profile.bodyweight}
                                    gender={profile.gender} />
                            )}
                        </div>
                    ))}
                    {(profile.bodyweight != null || profile.gender) && (
                        <div class="col-sm-12">
                            <strong>Strength profile:</strong>{' '}
                            {profile.bodyweight != null ? `${profile.bodyweight} lb` : 'Body weight not set'}
                            {' / '}
                            {profile.gender ? (profile.gender === 'male' ? 'Male' : 'Female') : 'Gender not set'}
                        </div>
                    )}
                    {startDate && (
                        <div class="col-sm-12">
                            <strong>Start Date:</strong> <span>{formatStartDate(startDate)}</span>
                        </div>
                    )}
                    <div class="col-xs-12">90% of your 1rm is used as the base for calculations.</div>
                </div>
            )}
        </div>
    );
}
