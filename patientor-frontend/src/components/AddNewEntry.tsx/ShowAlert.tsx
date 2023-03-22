import { Alert, AlertColor } from "@mui/material";

const ShowAlert = ({errorVisible, type, error}: {errorVisible: boolean, type: string, error: string}) => {

    if(!errorVisible || !type) return null;

    return (
        <Alert severity={type as AlertColor}>{error}</Alert>
    );
}

export default ShowAlert;