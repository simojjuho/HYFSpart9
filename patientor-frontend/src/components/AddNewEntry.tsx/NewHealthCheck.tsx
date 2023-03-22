import { TextField } from "@mui/material";
import { HealthCheckRating } from "../../types";

interface EntryProps {
    rating: HealthCheckRating,
    setRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>,
}

const NewHealthCheck = ({rating, setRating}: EntryProps) => {
    return (
        <TextField
            label="Health check rating"
            value={rating}
            onChange={({target}) => setRating(Number(target.value))}
            fullWidth
            margin="dense"
        />
    );
}

export default NewHealthCheck;