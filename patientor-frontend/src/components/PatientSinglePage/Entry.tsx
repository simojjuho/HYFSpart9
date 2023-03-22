import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../../types";
import { useResource } from "../../hooks";
import { Diagnosis } from "../../types";
import HealthCheckEntryPage from "./HealthcheckEntry";
import HospitalEntryPage from "./HospitalEntry";
import OccupationalEntry from "./OccupationalEntry";

/* This component just switches between different types of entries.  */
const SingleEntry = ({ entry }: { entry: Entry }) => {

    const assertNever = (value: never): never => {
    throw new Error(`Unhandled union member: ${JSON.stringify(value)}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [diagnoses, setDiagnoses] = useResource<Diagnosis[]>({method: 'GET', url: 'http://localhost:3001/api/diagnoses'});

    switch (entry.type) {
        case 'HealthCheck':
            return <HealthCheckEntryPage entry={entry as HealthCheckEntry} diagnoses={diagnoses}/>;
        case 'Hospital':
            return <HospitalEntryPage entry={entry as HospitalEntry} diagnoses={diagnoses}/>;
        case 'OccupationalHealthcare':
            return <OccupationalEntry entry={entry as OccupationalHealthcareEntry} diagnoses={diagnoses}/>;
        default:
            return assertNever(entry);
    }
}

export default SingleEntry;