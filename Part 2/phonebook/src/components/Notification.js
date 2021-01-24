const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  let notificationClass = `notification notification-${notification.type}`;

  return <div className={notificationClass}>{notification.message}</div>;
};

export default Notification;
