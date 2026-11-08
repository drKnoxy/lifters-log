# Strength Standards Research

This note documents the benchmark source used by the proficiency gauges. The 1RM being evaluated is the app's estimate from `oneRepMax` in `calc.ts`.

## Selected Source

[StrengthLog's strength standards](https://www.strengthlog.com/strength-standards/) publishes bodyweight-specific tables by gender for bench press, squat, deadlift, and overhead press. Its overhead-press page reports training-log samples of 14,081 men and 5,711 women. The source defines five levels (Beginner, Novice, Intermediate, Advanced, Elite) using percentiles of its logged lifters.

The app uses the source's Beginner, Novice, Intermediate, and Advanced cutoffs. Elite is grouped into Advanced so the gauge has the four requested labels. A level is the highest cutoff reached; lifts below the Beginner cutoff remain Beginner.

Source values are published in 10 lb bodyweight steps. `standards.ts` stores the four selected cutoffs for each source row, linearly interpolates between adjacent rows, and rounds each resulting cutoff to the nearest 5 lb. Those rounded cutoffs are used for both gauge positions and level classification. It does not extrapolate outside the published ranges (90-260 lb for women and 110-310 lb for men), so gauges are unavailable outside those ranges. The cited dataset uses men/women categories; the app leaves gender unset by default and only compares when the profile matches one of those categories.

The source's 220 lb women's squat row displays `1266` for the Novice value, inconsistent with the adjacent 210 lb (`124`) and 230 lb (`128`) rows. The local table uses `126`, treating the final `6` as a stray footnote digit. Recheck the source if updating the data.

## Example At 180 lb Bodyweight

Rounded 1RM cutoffs in pounds, in Beginner / Novice / Intermediate / Advanced order.

| Lift | Men | Women |
| --- | --- | --- |
| Bench Press | 125 / 165 / 205 / 245 | 55 / 85 / 105 / 135 |
| Squat | 130 / 200 / 250 / 305 | 60 / 120 / 160 / 205 |
| Deadlift | 165 / 250 / 320 / 385 | 90 / 165 / 205 / 260 |
| Overhead Press | 70 / 100 / 120 / 140 | 35 / 55 / 70 / 85 |

## Alternatives Considered

- [Strength Level](https://strengthlevel.com/strength-standards) covers the four lifts and has a substantially larger logged-lift dataset, but also introduces age as a benchmark dimension and uses different percentile cutoffs.
- [Stronger standards](https://www.strongermobileapp.com/standards), the initially supplied reference, varies by bodyweight, age, and sex and presents six levels. Its standards pages cover bench press, squat, and deadlift, but not overhead press.

The exact source pages used for the selected tables are [bench press](https://www.strengthlog.com/bench-press-strength-standards-lb/), [squat](https://www.strengthlog.com/squat-strength-standards-lb/), [deadlift](https://www.strengthlog.com/deadlift-strength-standards-lb/), and [overhead press](https://www.strengthlog.com/overhead-press-strength-standards-lb/). Reviewed 2026-11-08.