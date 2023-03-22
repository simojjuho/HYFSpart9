import { TextField } from "@mui/material"

interface EntryProps {
    dischargeDate: string,
    setDischarge: React.Dispatch<React.SetStateAction<string>>,
    dischargeCriteria: string
    setCriteria: React.Dispatch<React.SetStateAction<string>>
}

const NewHospitalCheck = ({ dischargeDate, setDischarge, dischargeCriteria, setCriteria }: EntryProps) => {


    return (
        <div>
            <TextField
                label="Discharge date"
                value={dischargeDate}
                onChange={({target}) => setDischarge(target.value)}
                fullWidth            
                margin="dense"
            />
            <TextField
                label="Discharge criteria"
                value={dischargeCriteria}
                onChange={({target}) => setCriteria(target.value)}
                fullWidth        
                margin="dense"    
            />
        </div>
    );
}

export default NewHospitalCheck;