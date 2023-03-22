import NewHealthCheck from "./NewHealthCheck";
import NewHospitalCheck from "./NewHospital";
import NewOccupational from "./NewOccupational";
import { HealthCheckRating } from "../../types";

interface EntryProps {
    type: string,
    employer: string,
    setEmployer: React.Dispatch<React.SetStateAction<string>>,
    startDate: string,
    setStartDate: React.Dispatch<React.SetStateAction<string>>,
    endDate: string,
    setEndDate: React.Dispatch<React.SetStateAction<string>>,
    rating: HealthCheckRating,
    setRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>,
    dischargeDate: string,
    setDischarge: React.Dispatch<React.SetStateAction<string>>,
    dischargeCriteria: string,
    setCriteria: React.Dispatch<React.SetStateAction<string>>,
}

const EntrySwitch = ({type,
    employer,
    setEmployer,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    rating,
    setRating,
    dischargeDate,
    setDischarge,
    dischargeCriteria,
    setCriteria
}: EntryProps) => {
    

    switch (type) {
        case 'Hospital':
            return <NewHospitalCheck  
                dischargeDate={dischargeDate}
                setDischarge={setDischarge}
                dischargeCriteria={dischargeCriteria}
                setCriteria={setCriteria}
            />
        case 'OccupationalHealthcare':
            return <NewOccupational 
                employer={employer}
                setEmployer={setEmployer}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />
        case 'HealthCheck':
            return <NewHealthCheck 
                rating={rating} 
                setRating={setRating}
            />
        default:
            return null;
    }
}

export default EntrySwitch;