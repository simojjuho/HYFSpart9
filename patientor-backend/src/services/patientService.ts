/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PatientEntry, NonsensitivePatientEntry, NewPatientEntry } from "../types";
import data from '../data/patients';
import { v4 as uuid } from 'uuid';
import { toNewPatientEntry } from "../utils";

let patients = data;

const patientEntries: PatientEntry[] = patients.map(obj => {
    const object = toNewPatientEntry(obj) as PatientEntry;
    object.id = obj.id;
    return object;
});


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

export const addEntry = (entry: NewPatientEntry): PatientEntry => {
    const newEntry: PatientEntry = {
        ...entry,
        id: uuid()
    };
    patients = patients.concat(newEntry);
    return newEntry;
};

export const getEntry = (id: string): PatientEntry => {
    const patientEntry = patientEntries.find(patient => patient.id === id);
    if(!patientEntry) {
        throw new Error(`Could not find a patient with such key: ${id}`);
    }
    return patientEntry;
};
