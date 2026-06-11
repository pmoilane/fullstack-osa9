interface ExerciseData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
interface ExerciseDataInput {
  target: number;
  dailyExerciseHours: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseDataInput => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const dailyExerciseHours = args.slice(3).map(Number);
  if (!isNaN(Number(args[2])) && !dailyExerciseHours.some(isNaN)) {
    return {
      target: Number(args[2]),
      dailyExerciseHours,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises = (
  dailyExerciseHours: number[],
  target: number,
): ExerciseData => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((h) => h > 0).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b) / periodLength;
  const success = average >= target;
  let rating: number;
  let ratingDescription: string;
  if (average < target / 2) {
    rating = 1;
    ratingDescription = 'not good';
  } else if (average >= target) {
    rating = 3;
    ratingDescription = 'great job!';
  } else {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, dailyExerciseHours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(dailyExerciseHours, target));
  } catch (error: unknown) {
    let errorMessage = 'Something unexpected happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
