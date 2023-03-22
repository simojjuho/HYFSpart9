import { HospitalEntry, Diagnosis } from "../../types";
import EntryGeneralInformation from "./EntryGeneralInformation";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ListOfDiagnoses from "./ListOfDiagnoses";


const HospitalEntryPage = ({entry, diagnoses}: {entry: HospitalEntry, diagnoses: Diagnosis[] | undefined}) => {


    return (
        <div className="entry">
            <EntryGeneralInformation entry={entry}/>
            <LocalHospitalIcon sx={{
                marginLeft: 3
            }}/>
            <ListOfDiagnoses entry={entry} diagnoses={diagnoses} />
            Diagnose by: <strong>{entry.specialist}</strong>
        </div>
    );
}

export default HospitalEntryPage;