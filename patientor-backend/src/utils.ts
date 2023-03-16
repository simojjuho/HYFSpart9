import { Gender, NewPatientEntry } from "./types";

const isString = (param: unknown): param is string => {
    return typeof param === 'string' || param instanceof String;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseName = (name: unknown): string => {
    if(!isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseOccupation = (occupation: unknown): string => {
    if(!isString(occupation)) {
        throw new Error('Incorrect or missng occupation');
    }
    return occupation;
};

const parseSsn = (ssn: unknown): string => {
    if(!isString(ssn)) {
        throw new Error('Incorrect or missng social security number');
    }
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if(!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if(!isString(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birth');
    }   
    return dateOfBirth;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if(!object || typeof object != 'object') {
        throw new Error('Incorrect or missing data');
    }

    if('name' in object && 'occupation' in object && 'gender' in object && 'dateOfBirth' in object && 'ssn' in object) {
        const newEntry: NewPatientEntry = {
            name: parseName(object.name),
            occupation: parseOccupation(object.occupation),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            entries: []            
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');

    
};