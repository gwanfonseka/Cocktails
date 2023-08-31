import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notification)

    return (
        <div className={`${notification.type} notification animated-notification`}>
            {notification.message}
        </div>
    )
}

export default Notification