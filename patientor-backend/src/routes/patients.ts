import express from 'express';
const router = express.Router();
import { getNonSensitiveEntries } from '../services/patientService';

router.get('/', (_req, res) => {
    const entries = getNonSensitiveEntries();
    res.send(entries);
});

export default router;