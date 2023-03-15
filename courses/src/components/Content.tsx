import CoursePart from "../types";
import Part from "./Part";


const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
    return (
        <div>
            {courseParts.map((part: CoursePart) => {
                return <Part key={part.name} part={part}/>
            })}
        </div>
    );
}

export default Content;