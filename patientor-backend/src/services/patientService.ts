import { PatientEntry, NonsensitivePatientEntry } from "../types";
import patientEntries from '../data/patients';

export const getNonSensitiveEntries = ():NonsensitivePatientEntry[] => {
    return( patientEntries.map(({id, name, dateOfBirth, gender, occupation}) => {
        return({
            id,
            name,
            dateOfBirth,
            gender,
            occupation
            });
        }
    )
    );
};

export const getEntries = ():PatientEntry[] => {
    return patientEntries;
};
