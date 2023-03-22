import { Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';
import { useResource } from "./hooks";
import { Patient } from "./types";
import PatientListPage from "./components/PatientListPage";
import PatientSinglePage from "./components/PatientSinglePage";

const App = () => {

  //Using custom hook, actually a bit proud of this even though quite simple!
  const [patients, setPatients] = useResource<Patient[]>({method: 'GET', url: 'http://localhost:3001/api/patients'});


  if(!patients) return null;
  
  return (
    <div className="App">
      
        <Container sx={{ sm: {
          width: '80%'
        },
        mx: {
          margin: '0 auto',
        } }}>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path={`/:id`} element={<PatientSinglePage />} />
          </Routes>
        </Container>
    </div>
  );
};

export default App;
