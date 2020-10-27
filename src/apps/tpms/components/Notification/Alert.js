import React from 'react';
import Notification from 'rc-notification';

let notification = null;
Notification.newInstance({}, n => {
  notification = n;
  notification.notice({ maxCount: 1 });
});

const defaultStyle = {
  width: 300,
  padding: 10,
};

function notiMessage(message) {
  notification.notice({
    content: <p style={{ color: '#1fb5ad', ...defaultStyle }}>{message}</p>,
    closable: true,
    maxCount: 1,
  });
}

function alertMessage(message) {
  notification.notice({
    content: <p style={{ color: '#e34c26', ...defaultStyle }}>{message}</p>,
    closable: true,
    maxCount: 1,
    // duration: null,
  });
}

export default {
  notice: message => notiMessage(message),
  alert: message => alertMessage(message),
};
