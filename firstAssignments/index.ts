import express from 'express';
import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { mass, height } = req.query;

  if (isNaN(Number(mass)) || isNaN(Number(height))) {
    res.status(400).json({ error: 'malformatted parametres' });
  } else {
    const bmi: string = calculateBMI(Number(mass), Number(height));
    res.json({
      weight: mass,
      height: height,
      bmi: bmi,
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if(!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing!' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  daily_exercises.forEach((e: number) => {
    if(isNaN(e)) {
      res.status(400).json({ error: 'malformatted parametres' });
    }      
  });
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises( daily_exercises, target);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
