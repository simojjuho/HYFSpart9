import List from '@mui/material/List'
import { Diagnosis, Entry } from '../../types'
import DiagnosisItem from './Diagnosis'

const ListOfDiagnoses = ({entry, diagnoses}: {entry: Entry, diagnoses: Diagnosis[] | undefined}) => {

    return (
        <List sx={{ padding: '20px 0 20px 0' }} component={'ul'}>
            {entry.diagnosisCodes?.map( code => {
                const diagnosis = diagnoses?.find(diagnosis => diagnosis.code === code)
                return <DiagnosisItem key={code} code={code} diagnosis={diagnosis} />
            })}
        </List>
)}

export default ListOfDiagnoses;