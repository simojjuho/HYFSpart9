import { ExerciseAssesment } from "./interfaces/ExerciseAssesment";
import { parseArguments } from "./utilities/parseArguments";

try {
  const [target, ...exercises] = parseArguments(process.argv);
  console.log(calculateExercises(exercises, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }
  console.log(errorMessage);
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
