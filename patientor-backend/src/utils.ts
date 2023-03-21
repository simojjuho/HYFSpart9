import { BaseEntryNoId, Diagnosis, EntryWithoutId, Gender, HealthCheckRating, NewPatientEntry } from "./types";

const isString = (param: unknown): param is string => {
    return typeof param === 'string' || param instanceof String;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if(!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if(!object || typeof object != 'object') {
        throw new Error('Incorrect or missing data');
    }

    if('name' in object && 'occupation' in object && 'gender' in object && 'dateOfBirth' in object && 'ssn' in object) {
        const newEntry: NewPatientEntry = {
            name: parseStringElement(object.name, 'name'),
            occupation: parseStringElement(object.occupation, 'occupation'),
            ssn: parseStringElement(object.ssn, 'social sercurity number'),
            gender: parseGender(object.gender),
            dateOfBirth: parseStringElement(object.dateOfBirth, 'date of birth'),
            entries: []            
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};

const parseStringElement = (element: unknown, elementName: string): string => {
    if(!isString(element)) {
        throw new Error(`Incorrect or missing ${elementName}`);
    }
    return element;
};

const parseEntryType = (type: unknown): string => {
    if(!isString(type) && (type != 'HealthCheck' || type != 'Hospital' || type != 'OccupationalHealthcare')) {
        throw new Error('Incorrect or missing type info');
    }
    return type as string;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> | undefined => {
    if(diagnosisCodes instanceof Array<Diagnosis['code']>) {
        let isStringHolder = true;
        diagnosisCodes.forEach(element => {
            if(!isString(element)) {
                isStringHolder = false;
            }
        });
        if(!isStringHolder) {
            return undefined;
        }
        return diagnosisCodes as Array<Diagnosis['code']>;
    }
    throw new Error('Incorrect or missing diagnosis values');
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if(typeof rating != 'number') {
        throw new Error('Incorrect or missing healthcheck rating value');
    }
    if(rating > 3 || rating < 0) {
        throw new Error(`Healtch check rating must be from 0 to 3. Now it is ${rating}`);
    }
    return rating;
};

const parseHealthCheckEntry = (entry: BaseEntryNoId, object: object): EntryWithoutId => {
    let healthCheckEntry = {};
    if ('type' in object && 'healthCheckRating' in object) {
        healthCheckEntry = {
            ...entry,
            type: parseEntryType(object.type),
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
        };
        return healthCheckEntry as EntryWithoutId;
    }
    throw new Error('Health check rating missing or invalid');
};

const parseSickLeave = (object: object): object => {
    if('startDate' in object && 'endDate' in object) {
        if(!isString(object.startDate || !isString(object.endDate))) {
            throw new Error('Sickleave start or end date incorrect');
        }
        return object;
    }
    throw new Error('Sick leave start or end date missing');
};

const assertNever = (value: never): never => {
    throw new Error(`Unhandled union member: ${JSON.stringify(value)}`);
    };

const parseDischarge = (object: object): object => {
    if('date' in object && 'criteria' in object) {
        if(!isString(object.date) && !isString(object.criteria)) {
            throw new Error('Discharge date and / or criteria incorrect');
        }
        return object;
    }
    throw new Error('Discharge date and / or criteria incorrect');

};

const parseOccupationalEntry = (entry: BaseEntryNoId, object: object): EntryWithoutId => {
    let occupationalEntry = {};
    if ('type' in object && 'employerName' in object) {
        occupationalEntry = {
            ...entry,
            type: parseEntryType(object.type),
            employerName: parseStringElement(object.employerName, 'employer name')
        };
    if('sickLeave' in object && typeof object.sickLeave === 'object' && object.sickLeave) {
        occupationalEntry = {
            ...occupationalEntry,
            sickLeave: parseSickLeave(object.sickLeave)
        };
    }
        return occupationalEntry as EntryWithoutId;
    }
    throw new Error('Please check again all the fields.');
};

const parseHospitalEntry = (entry: BaseEntryNoId, object: object): EntryWithoutId => {
    let hospitalEntry = {};
    if ('type' in object && 'discharge' in object && typeof object.discharge === 'object' && object.discharge) {
        hospitalEntry = {
            ...entry,
            type: parseEntryType(object.type),
            discharge: parseDischarge(object.discharge)
        };
        return hospitalEntry as EntryWithoutId;
    }
    throw new Error('Please check again all the fields.');
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
    if(!object || typeof object != 'object') {
        throw new Error('Incorrect or missing data');
    }

    if('description' in object && 'date' in object && 'specialist' in object) {
        let newEntry: BaseEntryNoId = {
            description: parseStringElement(object.description, 'description'),
            date: parseStringElement(object.date, 'date'),
            specialist: parseStringElement(object.specialist, 'specialist name'),
        };

        if('diagnosisCodes' in object) {
            newEntry = {
                ...newEntry,
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
            };
        }
        if ('type' in object) {
            let parsedEntry: EntryWithoutId;
            switch(object.type) {
                case 'HealthCheck':
                    parsedEntry = parseHealthCheckEntry(newEntry, object);
                    return parsedEntry;
                case 'OccupationalHealthcare':
                    parsedEntry = parseOccupationalEntry(newEntry, object);
                    return parsedEntry;
                case 'Hospital':
                    parsedEntry = parseHospitalEntry(newEntry, object);
                    return parsedEntry;
                default:
                    assertNever(object as never);
            }         
        }
        throw new Error('Missing or incorrect values in new entry. Please check again. KEY CHECK');

    }
    throw new Error('Missing or incorrect values in new entry. Please check again. OBJECT CHECK');
    
};