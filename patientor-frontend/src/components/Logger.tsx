import { Alert, AlertColor } from "@mui/material";

interface AlertProps {
    type: string,
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    isActive: boolean,
    message: string
}

const Logger = ({type, setActive, isActive, message}: AlertProps) => {
    if(!isActive || !type) return null;

    setTimeout(() => {
        setActive(!isActive)
    }, 5000)

    return (
        <Alert severity={type as AlertColor}>{message}</Alert>
    )
}

export default Logger;