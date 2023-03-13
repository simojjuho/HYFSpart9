export interface Diagnose {
    name: string,
    code: string,
    latin?: string
}

export interface PatientEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
}

export type NonsensitivePatientEntry =  Omit<PatientEntry, 'ssn'>;