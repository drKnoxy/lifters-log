export const defaultRecords = [
  {
    label: "Overhead Press",
    increment: 5,
    reps: 2,
    weight: 115,
  },
  {
    label: "Deadlift",
    increment: 10,
    reps: 3,
    weight: 285,
  },
  {
    label: "Bench Press",
    increment: 5,
    reps: 1,
    weight: 180,
  },
  {
    label: "Back Squat",
    increment: 10,
    reps: 5,
    weight: 265,
  },
];

export function routine531(week) {
  var service = [
    [
      { reps: "5", percentage: 0.4 },
      { reps: "5", percentage: 0.5 },
      { reps: "5", percentage: 0.6 },
      { reps: "5", percentage: 0.65 },
      { reps: "5", percentage: 0.75 },
      { reps: "5+", percentage: 0.85 },
    ],
    [
      { reps: "5", percentage: 0.4 },
      { reps: "5", percentage: 0.5 },
      { reps: "3", percentage: 0.6 },
      { reps: "3", percentage: 0.7 },
      { reps: "3", percentage: 0.8 },
      { reps: "3+", percentage: 0.9 },
    ],
    [
      { reps: "5", percentage: 0.4 },
      { reps: "5", percentage: 0.5 },
      { reps: "5", percentage: 0.6 },
      { reps: "5", percentage: 0.75 },
      { reps: "3", percentage: 0.85 },
      { reps: "1+", percentage: 0.95 },
    ],
    [
      { reps: "5", percentage: 0.4 },
      { reps: "5", percentage: 0.5 },
      { reps: "5", percentage: 0.6 },
      { reps: "5+", percentage: 0.6 },
    ],
  ];

  return service[week];
}
