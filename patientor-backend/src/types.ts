export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}


export interface Diagnose {
    name: string,
    code: string,
    latin?: string
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
  }

export type BaseEntryNoId = Omit<BaseEntry, 'id'>;

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
  }

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
  }
  
  interface OccupationalHealthCareEntry extends BaseEntry {
    type: 'OccupationalHealthcare'
    employerName: string;
    sickLeave?: {
      startDate: string;
      endDate: string;
    }
  }
  
  interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: {
      date: string;
      criteria: string;
    }
  }
  
export type Entry =
| HospitalEntry
| OccupationalHealthCareEntry
| HealthCheckEntry;

export interface PatientEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}

export type NonsensitivePatientEntry =  Omit<PatientEntry, 'ssn' | 'entries' >;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;