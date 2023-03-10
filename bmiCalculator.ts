console.log(calculateBMI(110, 177));

function calculateBMI(mass: number, height: number): String {
  /*Underweight (Severe thinness) 	< 16.0
Underweight (Moderate thinness) 	16.0 – 16.9 
Underweight (Mild thinness) 	17.0 – 18.4
Normal range 	18.5 – 24.9 
Overweight (Pre-obese) 	25.0 – 29.9
Obese (Class I) 	30.0 – 34.9 
Obese (Class II) 	35.0 – 39.9
Obese (Class III) 	≥ 40.0  */

  const heightAsMeters: number = height / 100;
  const bmi: number = Number((mass / Math.pow(heightAsMeters, 2)).toFixed(1));

  if (bmi <= 18.4) return "Underweight (unhealthy weight)";
  else if (bmi <= 24.9) return "Normal (healthy) weight";
  else if (bmi <= 29.9) return "Overweight";
  else return "Obese (unhealthy weight)";
}
