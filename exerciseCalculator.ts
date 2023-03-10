console.log(calculateExercises([2, 1, 0, 1, 1, 0, 2, 1, 2, 1], 2));

interface ExerciseAssesment {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: String;
  target: number;
  average: number;
}

function calculateExercises(
  period: number[],
  target: number
): ExerciseAssesment {
  const ratingDescriptions: String[] = [
    "You should have done better",
    "Not bad but not quite",
    "Well done, keep up the good pace!",
    "Super! Don't work out too much, though!",
  ];

  const periodLength: number = period.length;
  const trainingDays: number = period.filter((day) => day > 0).length;
  const trainingHours: number = period.reduce((current, acc) => {
    return current + acc;
  }, 0);
  const average: number = trainingHours / periodLength;
  const success: boolean = average >= target;

  let rating: number;
  if (average < target / 2) {
    rating = 1;
  } else if (average < target) {
    rating = 2;
  } else if (average < target + 1) {
    rating = 3;
  } else {
    rating = 4;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: ratingDescriptions[rating - 1],
    target,
    average,
  };
}
