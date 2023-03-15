import { FlightDiaryEntry, NewDiaryEntry } from '../types';
import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getDiaries = async () => {
    const result = await axios.get<FlightDiaryEntry[]>(baseUrl);
    return result.data;
}

export const addDiary = async (newEntry: NewDiaryEntry) => {
    const result = await axios.post<FlightDiaryEntry>(baseUrl, newEntry);
    return result;
}
