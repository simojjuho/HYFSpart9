import { Entry, Patient } from "../../types";
import AddNewEntry from "../AddNewEntry.tsx";
import SingleEntry from "./Entry";


/* This component lists all the entries with map. */
const Entries = ({ entries, patient, setPatient}: { entries: Entry[], patient: Patient, setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>
}) => {
    if(entries.length === 0) return null;

    return (
        <>
            <h3>Entries:</h3>
            <AddNewEntry patient={patient} setPatient={setPatient}/>
            {entries.map(entry => {
                return <SingleEntry  key={entry.id} entry={entry} />
            })}
        </>
    )    
}

export default Entries;