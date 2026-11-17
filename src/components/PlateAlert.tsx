import { getPlates } from '../lib/calc';

interface Props {
    lift: string;
    weight: number | '-';
    barWeight: number;
    onBarWeightChange: (weight: number) => void;
    onClose: () => void;
}

export function PlateAlert({ lift, weight, barWeight, onBarWeightChange, onClose }: Props) {
    return (
        <div class="alert alert-info plate-alert">
            <button type="button" class="close" aria-label="Close plate helper" onClick={onClose}>x</button>
            <strong>{lift}: {weight} lb</strong>
            <div>
                Bar:
                {[35, 45].map(bar => (
                    <button type="button" key={bar}
                        class={'btn btn-default btn-xs' + (barWeight === bar ? ' active' : '')}
                        aria-pressed={barWeight === bar}
                        onClick={() => onBarWeightChange(bar)}>
                        {bar} lb
                    </button>
                ))}
            </div>
            <ul>
                {getPlates(weight, barWeight).map(msg => <li key={msg}>{msg}</li>)}
            </ul>
        </div>
    );
}
