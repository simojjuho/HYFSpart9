import { Entry } from "../../types";

const EntryGeneralInformation = ({entry}: {entry: Entry}) => {
    return (
        <div style={{display: 'inline'}}>
            {entry.date}: {entry.description}
            
        </div>
    )
}

export default EntryGeneralInformation;