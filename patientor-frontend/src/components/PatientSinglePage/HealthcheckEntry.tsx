import { Diagnosis, HealthCheckEntry } from "../../types";
import DiagnosisItem from "./Diagnosis";
import EntryGeneralInformation from "./EntryGeneralInformation";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheckEntryPage = ({entry, diagnoses}: {entry: HealthCheckEntry, diagnoses: Diagnosis[] | undefined}) => {
    const getHealthIcon = () => {
        switch (entry.healthCheckRating) {
            case 0:
                return <FavoriteIcon sx={{ color: 'green' }}/>;
            case 1:
                return <FavoriteIcon sx={{ color: 'yellow' }}/>;
            case 2:
                return <FavoriteIcon sx={{ color: 'orange' }}/>;
            case 3:
                return <FavoriteIcon sx={{ color: 'red' }}/>;

        }
    }

    return (
        <div className="entry">
            <EntryGeneralInformation entry={entry} />
            <MedicalInformationIcon sx={{
                marginLeft: 3
            }} />
            <ul>
                {entry.diagnosisCodes?.map( code => {
                    const diagnosis = diagnoses?.find(diagnosis => diagnosis.code === code)
                    return <DiagnosisItem key={code} code={code} diagnosis={diagnosis} />
                })}
            </ul>
            Heath assesment: {getHealthIcon()} <br />
            Diagnose by: <strong>{entry.specialist}</strong>
        </div>
    );
}

export default HealthCheckEntryPage;
