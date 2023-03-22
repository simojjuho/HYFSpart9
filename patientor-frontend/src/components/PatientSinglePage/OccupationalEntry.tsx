import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import DiagnosisItem from "./Diagnosis";
import EntryGeneralInformation from "./EntryGeneralInformation";
import WorkIcon from '@mui/icons-material/Work';

const OccupationalEntry = ({entry, diagnoses}: {entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[] | undefined}) => {

    return (
        <div className="entry">
            <EntryGeneralInformation entry={entry} />
            <WorkIcon sx={{
                marginLeft: 3
            }} />
            <ul>
                {entry.diagnosisCodes?.map( code => {
                    const diagnosis = diagnoses?.find(diagnosis => diagnosis.code === code)
                    return <DiagnosisItem key={code} code={code} diagnosis={diagnosis} />
                })}
            </ul>
            Diagnose by: <strong>{entry.specialist}</strong>
        </div>
    );
}

export default OccupationalEntry;