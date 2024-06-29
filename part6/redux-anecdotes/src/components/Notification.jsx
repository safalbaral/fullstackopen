import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { removeNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(()=> {
    setTimeout(()=> {
      dispatch(removeNotification())
    }, 5000)
  }, [dispatch, notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

export default Notification