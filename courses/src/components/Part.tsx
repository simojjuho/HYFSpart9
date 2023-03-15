import CoursePart from "../types";

const Part = ({part}: {part: CoursePart}) => {

    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

    switch (part.kind) {
        case "basic":
            return (
                <div>
                    <h4>{part.name}: {part.exerciseCount}</h4>
                    <p>{part.description}</p>
                </div>
            )
            case "group":
                return (
                    <div>
                    <h4>{part.name}: {part.exerciseCount}</h4>
                    <p>Group projects: {part.groupProjectCount}</p>
                </div> 
                )
            case "background":
                return (
                    <div>
                        <h4>{part.name}: {part.exerciseCount}</h4>
                        <p>{part.description}<br />
                        <em>{part.backroundMaterial}</em></p>
                    </div>
                )
            case 'special':
                return (
                    <div>
                    <h4>{part.name}: {part.exerciseCount}</h4>
                    <p>{part.description}<br />
                    {part.requirements}</p>
                </div>
                )
            default:
                return assertNever(part);
    }
};

export default Part;
