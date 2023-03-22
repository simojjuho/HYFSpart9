import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Dialog, Chip, Box, OutlinedInput } from "@mui/material";
import { useState } from "react";
import { Diagnosis, Entry, HealthCheckRating, Patient } from "../../types";
import EntrySwitch from "./EntrySwitch";
import patientService from '../../services/patients'
import { useParams } from "react-router-dom";
import axios from 'axios';
import Logger from "../Logger";
import { useResource } from "../../hooks";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const EntryForm = ({isActive, setActive, patient, setPatient}: 
    {isActive: boolean, setActive: React.Dispatch<React.SetStateAction<boolean>>, patient: Patient, setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>}) => {
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosis, setDiagnosis] = useState<string[]>([]);
    const [employer, setEmployer] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [rating, setRating] = useState<HealthCheckRating>(0);
    const [dischargeDate, setDischarge] = useState('');
    const [dischargeCriteria, setCriteria] = useState('');
    const [error, setError] = useState('');
    const [errorVisible, setVisible] = useState(false);
    const [errorType, setErrorType] = useState('');

    const [allDiagnoses, setAllDiagnoses] = useResource<Diagnosis[]>({method: 'GET', url: 'http://localhost:3001/api/diagnoses'});
    
    const id = useParams().id;

    if(!allDiagnoses) return null;


    const emptyFields = (isAll = false) => {
        if(isAll) {
            setDescription('');
            setDate('');
            setSpecialist('');
            setDiagnosis([]);
        }
        setStartDate('');
        setEndDate('');
        setEmployer('');
        setRating(0);
        setDischarge('');
        setCriteria('');
    }

    const handleChange = (event: SelectChangeEvent) => {
        emptyFields()
        setType(event.target.value);
    };


    const handleDiagnosisChange = (e: SelectChangeEvent<typeof diagnosis>) => {
        const {
            target: {value}
        } = e;
        setDiagnosis(
            typeof value === 'string' ? value.split(',') : value
            )
    }

    
    const handleEntry = async () => {
        emptyFields(true)
        const strippedEntry = {
            date,
            description,
            specialist,
            diagnosisCodes: diagnosis,
            type
        }
        let newEntry = {};
        switch (type) {
            case 'Hospital':
                newEntry = {
                    ...strippedEntry,
                    discharge: {
                        date: dischargeDate,
                        criteria: dischargeCriteria
                    }
                }
                break;
            case 'OccupationalHealthcare':
                newEntry = {
                    ...strippedEntry,
                    employerName: employer ,
                    sickLeave: {
                        startDate,
                        endDate
                    }
                }
                break;
            case 'HealthCheck':
                newEntry = {
                    ...strippedEntry,
                    healthCheckRating: rating
                }
                break;
                
        }
        try {
            const result = await patientService.addEntry(id as string, newEntry as Entry);
            const patientWithEntry = {
                ...patient,
                entries: patient.entries.concat(result)
            }
            setPatient(patientWithEntry);
            setActive(false);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === "string") {
                    const message = e.response.data.replace('Something went wrong. Error: ', '');
                    console.error(message);
                    setError(message);
                    setErrorType('error');
                    setVisible(true);
                } else {
                    setError("Unrecognized axios error");
                    setErrorType('error');
                    setVisible(true);
                }
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
                setErrorType('error');
                setVisible(true);
            }
        }
        
    }

    if(!isActive) return null;

    return (
        <Dialog open={isActive} onClose={()=>setActive(!isActive)}>
            <DialogTitle>Create a new entry</DialogTitle>
            <Logger isActive={errorVisible} setActive={setVisible} type={errorType} message={error} />
            <DialogContent>
                <DialogContentText>
                    
                </DialogContentText>
                <Input 
                    value={date}
                    onChange={({target}) => setDate(target.value)}
                    type="Date"
                    fullWidth
                    margin="dense"
                />
                <TextField 
                    value={description}
                    onChange={({target}) => setDescription(target.value)}
                    label="Description"
                    fullWidth
                    margin="dense"
                />
                <TextField 
                    value={specialist}
                    onChange={({target}) => setSpecialist(target.value)}
                    label="Specialist"
                    fullWidth
                    margin="dense"
                />
                <Select
                    label="Diagnosis codes"
                    multiple
                    value={diagnosis}
                    onChange={handleDiagnosisChange}
                    fullWidth
                    margin="dense"
                    input={<OutlinedInput id="select-multiple-chip" label="Diagnosis codes" />}
                    MenuProps={MenuProps}
                >
                    {allDiagnoses.map(option => {
                        return <MenuItem
                            key={option.code}
                            value={option.code}
                            >{option.code}: {option.name}
                            </MenuItem>
                    })}
                </Select>
                <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    label="Type"
                    id="demo-simple-select-filled"
                    value={type}
                    onChange={handleChange}
                    variant="standard"
                    margin="dense"
                    autoFocus
                    fullWidth
                >
                    <MenuItem value={'Hospital'}>Hospital entry</MenuItem>
                    <MenuItem value={'OccupationalHealthcare'}>Occupational health entry</MenuItem>
                    <MenuItem value={'HealthCheck'}>Health check</MenuItem>
                </Select>
                <EntrySwitch 
                    type={type}
                    employer={employer}
                    setEmployer={setEmployer}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    rating={rating}
                    setRating={setRating}
                    dischargeDate={dischargeDate}
                    setDischarge={setDischarge}
                    dischargeCriteria={dischargeCriteria}
                    setCriteria={setCriteria}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setActive(!isActive)}>Cancel</Button>
                <Button onClick={handleEntry} >Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EntryForm;