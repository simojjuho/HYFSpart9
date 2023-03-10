import express from "express";
import { calculateBMI } from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { mass, height } = req.query;

  if (isNaN(Number(mass)) || isNaN(Number(height))) {
    res.status(400).json({ error: "malformatted parametres" });
  } else {
    const bmi: String = calculateBMI(Number(mass), Number(height));
    res.json({
      weight: mass,
      height: height,
      bmi: bmi,
    });
  }
});

const PORT: number = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
