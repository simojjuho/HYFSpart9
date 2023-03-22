import { useParams } from "react-router-dom";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male'
import TransgenderIcon from '@mui/icons-material/Transgender';
import { useSingleResource } from "../../hooks";
import Entries from "./Entries";
import { Container, ContainerProps } from "@mui/material";
import { styled } from '@mui/material/styles'
import { Patient } from "../../types";

const StyledContainer = styled(Container)<ContainerProps>(({ theme }) => ({
    maxWidth: '75%',
    width: 800,
    marginTop: 100,
    padding: '50px 20px 50px 30px',
    backgroundColor: '#F0F0F0',
    boxShadow: '5px 10px 30px -5px #F7F5FF'

}));


/* Main page of patients. Under it are all the components for entries at health facilities. */
const PatientSinglePage = () => {
    const id = useParams().id;
    const [patient, setPatient] = useSingleResource<Patient>(id, {method: 'GET', url: `http://localhost:3001/api/patients/${id}`});
    if(!patient) return null;

    const getGenderIcon = () => {
        switch (patient.gender) {
            case 'male':
                return <MaleIcon />;
            case 'female':
                return <FemaleIcon />;
            case 'other':
                return <TransgenderIcon />;
            default:
                return <TransgenderIcon />
        }
    }


    return (
        <StyledContainer><h2>{patient.name} {getGenderIcon()}</h2>
        <br />
        ssh: {patient.ssn}<br />
        occupation: {patient.occupation}
        <Entries entries={patient.entries} patient={patient} setPatient={setPatient} />
        </StyledContainer>
    )
}

export default PatientSinglePage;
