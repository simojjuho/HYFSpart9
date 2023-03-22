import { Button } from "@mui/material";
import { useState } from "react";
import { Patient } from "../../types";
import EntryForm from "./EntryForm";


const AddNewEntry = ({patient, setPatient}: {patient: Patient, setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>
}) => {
    const [isActive, setActive] = useState(false);

    return (
        <div>
            <Button onClick={() => {setActive(!isActive)}}>Add new entry</Button>
            <EntryForm isActive={isActive} setActive={setActive} patient={patient} setPatient={setPatient}/>
        </div>
    )
}

export default AddNewEntry;