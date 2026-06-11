import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({
      weight: Number(weight),
      height: Number(height),
      bmi,
    });
  } else {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const dailyExerciseHours: number[] = daily_exercises;

  if (!isNaN(Number(target)) && !dailyExerciseHours.some(isNaN)) {
    return res.json(calculateExercises(dailyExerciseHours, Number(target)));
  } else {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
