# Strength Standards

The proficiency gauges estimate four 1RM tiers (Novice, Intermediate, Advanced, Elite) from the user's body weight, gender, and lift. For body weights from 90 to 350 lb, each tier is calculated as:

`round5(lift coefficient × gender coefficient × 175 × (175 / bodyweight)^0.75)`

The lift coefficients at the 175 lb male reference weight are:

| Lift | Novice | Intermediate | Advanced | Elite |
| --- | ---: | ---: | ---: | ---: |
| Back Squat | 1.03 | 1.49 | 1.86 | 2.20 |
| Front Squat | 0.86 | 1.23 | 1.57 | 1.83 |
| Bench Press | 0.86 | 1.14 | 1.43 | 1.69 |
| Deadlift | 1.26 | 1.86 | 2.23 | 2.57 |
| Overhead Press | 0.57 | 0.69 | 0.77 | 0.94 |

Male gender coefficient is 1.0. The source gives female ranges rather than exact values, so the app uses their midpoints: 0.575 for upper-body lifts and 0.705 for lower-body lifts. Final thresholds are rounded to the nearest 5 lb.

The gauge shows three adjacent tiers, shifting from Novice–Advanced to Intermediate–Elite as the user's current tier moves upward. Front squat is an optional input and is included in the strength gauges, not the 5/3/1 program tables.

The baseline coefficients and formula are from the [Dynamic Strength Standards Calculator specification](https://share.gemini.google/QRJCuLGQBQdA).
