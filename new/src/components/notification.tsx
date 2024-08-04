import React from 'react';

interface NotificationProps {
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  return (
    <div className="notification-container">
      <div className="notification">
        {message}
      </div>
    </div>
  );
};

export default Notification;
