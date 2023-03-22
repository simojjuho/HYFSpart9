import { Input, InputLabel, TextField } from "@mui/material";

interface EntryProps {
    employer: string,
    setEmployer: React.Dispatch<React.SetStateAction<string>>,
    startDate: string,
    setStartDate: React.Dispatch<React.SetStateAction<string>>,
    endDate: string,
    setEndDate: React.Dispatch<React.SetStateAction<string>>
}

const NewOccupational = ({ employer, setEmployer, startDate, setStartDate, endDate, setEndDate }: EntryProps) => {
    return (
        <div>
            <TextField
                label="Employer"
                value={employer}
                onChange={({target}) => setEmployer(target.value)}
                fullWidth          
                margin="dense"  
            />
            <InputLabel>Sickeave start date:</InputLabel>
            <Input
                type='Date'
                value={startDate}
                onChange={({target}) => setStartDate(target.value)}
                fullWidth        
                margin="dense"    
            />
            <InputLabel>Sickeave end date:</InputLabel>
            <Input
                type='Date'
                value={endDate}
                onChange={({target}) => setEndDate(target.value)}
                fullWidth       
                margin="dense"     
            />
        </div>
    );
}

export default NewOccupational;