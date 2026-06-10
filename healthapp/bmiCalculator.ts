export interface HumanData {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): HumanData => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const heightMeters = height / 100;
  const bmi = weight / (heightMeters * heightMeters);
  if (bmi < 16.0) {
    return 'Underweight (Severe thinness)';
  } else if (bmi >= 16.0 && bmi < 17.0) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi >= 17.0 && bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi >= 18.5 && bmi < 25.0) {
    return 'Normal range';
  } else if (bmi >= 25.0 && bmi < 30.0) {
    return 'Overweight (Pre-obese)';
  } else if (bmi >= 30.0 && bmi < 35.0) {
    return 'Obese (Class I)';
  } else if (bmi >= 35.0 && bmi < 40.0) {
    return 'Obese (Class II)';
  } else if (bmi > 40.0) {
    return 'Obese (Class III)';
  } else {
    return 'something went wrong';
  }
};

//console.log(calculateBmi(180, 74));

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something unexpected happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
