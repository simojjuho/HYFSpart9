/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PatientEntry, NonsensitivePatientEntry, NewPatientEntry, EntryWithoutId } from "../types";
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

export const addPatientEntry = (entry: NewPatientEntry): PatientEntry => {
    const newEntry: PatientEntry = {
        ...entry,
        id: uuid()
    };
    patients = patients.concat(newEntry);
    return newEntry;
};


export const getEntry = (id: string): PatientEntry => {
    const patientEntry = patients.find(patient => patient.id === id);
    if(!patientEntry) {
        throw new Error(`Could not find a patient with such key: ${id}`);
    }
    return patientEntry;
};

export const addEntry = (id: string, newEntry: EntryWithoutId): PatientEntry => {
    let patientEntry = patients.find(patient => patient.id === id);
    if(!patientEntry) {
        throw new Error(`Could not find a patient with such key: ${id}`);
    }
    const entryWithId = {
        ...newEntry,
        id: uuid()
    };
    patientEntry = {
        ...patientEntry,
        entries: patientEntry.entries.concat(entryWithId)
    };
    patients = patients.map(patient => {
        return patient.id != id ? patient : patientEntry as PatientEntry;
    });
    return patientEntry;
};
