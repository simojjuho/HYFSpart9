import React, { useState } from "react";
import { addDiary } from "../services/flightData";
import { FlightDiaryEntry, Weather, Visibility, NewDiaryEntry } from "../types";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";

interface IProps {
  diaries: FlightDiaryEntry[];
  setDiaries: Dispatch<SetStateAction<FlightDiaryEntry[]>>;
  setErrorMsg: Dispatch<SetStateAction<string>>;
}

const NewDiaryForm = ({diaries, setDiaries, setErrorMsg}: IProps) => {
    const [newDate, setNewDate] = useState<string>('');
    const [newComment, setNewComment] = useState('');
    const [newWeather, setWeather] = useState<Weather>('sunny' as Weather);
    const [newVisibility, setVisibility] = useState<Visibility>('great' as Visibility)


    const clearErrorMsg = () => {
      setTimeout(()=>{
        setErrorMsg('')
      }, 5000)
    };


    const handleFormSend = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const newEntry: NewDiaryEntry = {
            date: newDate,
            weather: newWeather,
            visibility: newVisibility,
            comment: newComment
        }
        try{
            const addedEntry = await addDiary(newEntry);
            setDiaries(diaries.concat(addedEntry.data));
        } catch (error) {
            if (axios.isAxiosError(error)) {
              if(error.response) {
                setErrorMsg(error.response.data);
                clearErrorMsg()
              } else {
                setErrorMsg('Something happened, couldn\'t add the entry.')
                console.log(error)
                clearErrorMsg()
              }            

            } else {
              console.error(error);
              setErrorMsg('Something happened, couldn\'t add the entry.')
              clearErrorMsg()
            }
          }
          setNewDate('');

          setNewComment('');
    }

    return (
      <div>
        <h3>Add a new entry</h3>
        <form onSubmit={handleFormSend}>
            Date: 
            <input type="date" value={newDate} onChange={({target})=>setNewDate(target.value)} /><br />
            Visibility:
            <input type="radio" defaultChecked name="visibility"  value="great" onChange={()=>setVisibility('great' as Visibility)} /> great
            <input type="radio" name="visibility" value="good"  onChange={()=>setVisibility('good' as Visibility)}/>good
            <input type="radio" name="visibility" value="ok"  onChange={()=>setVisibility('ok' as Visibility)}/>ok
            <input type="radio" name="visibility" value="poor"  onChange={()=>setVisibility('poor' as Visibility)}/> poor          
            <br />
            Weather:
            <input type="radio" defaultChecked name="weather" value="sunny"  onChange={()=>setWeather('sunny' as Weather)}/>sunny
            <input type="radio" name="weather" value="rainy"  onChange={()=>setWeather('rainy' as Weather)}/>rainy 
            <input type="radio" name="weather" value="cloudy"  onChange={()=>setWeather('cloudy' as Weather)}/>cloudy
            <input type="radio" name="weather" value="stormy"  onChange={()=>setWeather('stormy' as Weather)}/>stormy
            <input type="radio" name="weather" value="windy"  onChange={()=>setWeather('windy' as Weather)}/>windy<br />
            Comment:
            <input type="text" value={newComment} onChange={({target}) => setNewComment(target.value)} /> <br />
            <button type="submit">Submit</button>
        </form>
        </div>
    );
}

export default NewDiaryForm;