import express from "express";
const router = express.Router();
import getDiagnoses from "../services/diagnoseService";
import { Diagnose } from "../types";

router.get('/', (_req, res) => {
    const diagnoses: Diagnose[] = getDiagnoses();
    res.send(diagnoses);
});

export default router;