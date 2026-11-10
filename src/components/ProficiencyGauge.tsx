import { useEffect, useRef } from 'preact/hooks';
import { BarController, BarElement, CategoryScale, Chart, LinearScale, type Plugin } from 'chart.js';
import { getStrengthLevel, getStrengthLift, getStrengthScale, getStrengthThresholds, StrengthGender } from '../lib/standards';

Chart.register(BarController, BarElement, CategoryScale, LinearScale);

interface Props {
    liftLabel: string;
    oneRepMax: number;
    bodyweight: number;
    gender: StrengthGender;
}

export function ProficiencyGauge({ liftLabel, oneRepMax, bodyweight, gender }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const lift = getStrengthLift(liftLabel);
    const thresholds = lift ? getStrengthThresholds(lift, bodyweight, gender) : null;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !thresholds) {
            return;
        }

        const scale = getStrengthScale(oneRepMax, thresholds);
        const [first, second, third] = scale.thresholds;
        const segmentValues = [
            second - first,
            third - second,
            scale.max - third,
        ];
        const colors = ['#b7dce9', '#82c1d8', '#158cba'];
        const overlay: Plugin<'bar'> = {
            id: 'proficiency-thresholds',
            afterDatasetsDraw(chart) {
                const bar = chart.getDatasetMeta(1).data[0] as BarElement | undefined;
                const xScale = chart.scales.x;
                if (!bar || !xScale) {
                    return;
                }

                const context = chart.ctx;
                const labels = scale.thresholds.map((threshold, index) => {
                    const position = xScale.getPixelForValue(threshold);
                    const levelLabel = scale.levels[index];
                    const weightLabel = `${Math.round(threshold)} lb`;
                    const labelWidth = Math.max(
                        context.measureText(levelLabel).width,
                        context.measureText(weightLabel).width,
                    ) + 6;
                    const align: CanvasTextAlign = index === 0 ? 'left' : 'center';
                    const left = align === 'left' ? position : position - labelWidth / 2;
                    return { position, levelLabel, weightLabel, labelWidth, align, left };
                });
                const rowRightEdges: number[] = [];

                context.save();
                context.font = '10px sans-serif';
                context.textAlign = 'center';
                context.textBaseline = 'top';

                const barHalfHeight = 6;
                labels.forEach(label => {
                    let row = rowRightEdges.findIndex(rightEdge =>
                        label.left > rightEdge + 4,
                    );
                    if (row === -1) {
                        row = rowRightEdges.length;
                        rowRightEdges.push(0);
                    }
                    rowRightEdges[row] = label.left + label.labelWidth;

                    const labelY = bar.y + barHalfHeight + 4 + row * 18;
                    context.fillStyle = '#555';
                    context.textAlign = label.align;
                    context.fillText(label.levelLabel, label.position, labelY);
                    context.fillText(label.weightLabel, label.position, labelY + 11);
                });

                context.strokeStyle = '#555';
                context.lineWidth = 1;
                scale.thresholds.forEach(threshold => {
                    const x = xScale.getPixelForValue(threshold);
                    context.beginPath();
                    context.moveTo(x, bar.y - barHalfHeight);
                    context.lineTo(x, bar.y + barHalfHeight);
                    context.stroke();
                });

                const markerValue = Math.max(scale.min, Math.min(oneRepMax, scale.max));
                const markerX = xScale.getPixelForValue(markerValue);
                context.fillStyle = '#222';
                context.fillRect(markerX - 2, bar.y - 9, 4, 18);
                context.restore();
            },
        };

        const chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: [''],
                datasets: segmentValues.map((value, index) => ({
                    data: [value],
                    backgroundColor: colors[index],
                    borderColor: colors[index],
                    borderWidth: 0,
                    borderSkipped: false,
                    barThickness: 12,
                    stack: 'strength-levels',
                })),
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                layout: { padding: { top: 0, right: 0, bottom: 48, left: 0 } },
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false },
                },
                scales: {
                    x: {
                        type: 'linear',
                        min: scale.min,
                        max: scale.max,
                        stacked: true,
                        display: false,
                        alignToPixels: true,
                    },
                    y: { type: 'category', stacked: true, display: false, alignToPixels: true },
                },
            },
            plugins: [overlay],
        });

        return () => chart.destroy();
    }, [lift, oneRepMax, thresholds]);

    if (!lift) {
        return null;
    }
    if (!thresholds) {
        return <p class="proficiency-unavailable">No benchmark available for this body weight.</p>;
    }

    const level = getStrengthLevel(oneRepMax, thresholds);
    const scale = getStrengthScale(oneRepMax, thresholds);
    const accessibleThresholds = scale.thresholds.map((threshold, index) =>
        `${scale.levels[index]} ${Math.round(threshold)} pounds`,
    ).join(', ');

    return (
        <div class="proficiency-gauge"
            role="img"
            aria-label={`${liftLabel}: ${level}, estimated 1RM ${Math.round(oneRepMax)} pounds. Thresholds: ${accessibleThresholds}`}>
            <canvas ref={canvasRef} aria-hidden="true" />
        </div>
    );
}