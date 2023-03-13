export const parseArguments = (args: string[]): number[] => {
  const amountOfArgs = args.length - 2;

  if (args.length < 4) throw new Error('Not enough arguments!');
  if (args.length > 2 + amountOfArgs) throw new Error('Too many arguments!');

  let checkedArgs: number[] = [];
  for (let i = 2; i < 2 + amountOfArgs; i++) {
    if (!isNaN(Number(args[i]))) {
      checkedArgs = [...checkedArgs, Number(args[i])];
    } else throw new Error('Provided values were not numbers');
  }

  return checkedArgs;
};
