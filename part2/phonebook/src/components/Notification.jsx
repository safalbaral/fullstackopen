const Notification = ({ messageObject }) => {
    const {message, success} = messageObject
    return message === null ? null : <div className={success === true ? "notification" : "error"}>{message}</div> 
}

export default Notification