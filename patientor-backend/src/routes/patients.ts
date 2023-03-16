/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
const router = express.Router();
import { addEntry, getNonSensitiveEntries, getEntry } from '../services/patientService';
import { toNewPatientEntry } from '../utils';

router.get('/', (_req, res) => {
    const entries = getNonSensitiveEntries();
    res.send(entries);
});

router.get('/:id', ( req, res) => {
    const id = req.params.id;
    try{
        const patientEntry = getEntry(id);
        res.send(patientEntry);
    } catch (error: unknown) {
        let errorMsg = 'Something went wrong';
        if (error instanceof Error) errorMsg += ' Error: ' + error;
        res.status(404).send(errorMsg);
    }
});

router.post('/', (req, res) => {
    try {
        const newEntry = toNewPatientEntry(req.body);
        const addedEntry = addEntry(newEntry);
        res.json(addedEntry);
    }
    catch (error: unknown) {
        let errorMsg = 'Something went wrong.';
        if (error instanceof Error) errorMsg += ' Error: ' + error;
        res.status(400).send(errorMsg);
    }
});


export default router;