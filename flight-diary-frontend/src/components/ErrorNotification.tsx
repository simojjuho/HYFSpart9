const ErrorNotification = ({errorMsg}: {errorMsg: string}) => {
    if(!errorMsg) return null

    return (
        <div style={{color: "red"}}>
            {errorMsg}
        </div>
    )
}

export default ErrorNotification;