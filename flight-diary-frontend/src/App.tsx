import { useState, useEffect } from "react";
import { FlightDiaryEntry } from "./types";
import { getDiaries } from "./services/flightData";
import NewDiaryForm from "./components/NewDiaryForm";
import ErrorNotification from "./components/ErrorNotification";
import EntriesList from "./components/EntriesList";

function App() {
  const [diaries, setDiaries] = useState<FlightDiaryEntry[]>([])
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(()=>{
    getDiaries()
      .then(diaries => {
        setDiaries(diaries)
  })
  },[])

  return (
    <div>
      <h1>Flight Diary App</h1>
      <ErrorNotification errorMsg={errorMsg} />      
      <EntriesList diaries ={diaries} />
      <NewDiaryForm diaries={diaries} setDiaries={setDiaries} setErrorMsg={setErrorMsg}/>
    </div>
  );
}

export default App;
