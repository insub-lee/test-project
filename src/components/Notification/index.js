import React from 'react';
import { notification } from 'antd';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { BtnDkGray } from 'containers/portal/components/uielements/buttons.style';

const NotificationContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .textDesc {
    display: inline-block;
    height: 38px;
    color: #222222;
    font-size: 12px;
    overflow: hidden;
  }
  .imgContent {
    float: left;
    min-width: 60px; //padding-left 10px 포함
    width: 60px;
    min-height: 50px;
    height: 50px;
    padding-left: 10px;

    a.linkedImg {
      display: inline-block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border: 1px solid #d1d2d3;

      > img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
`;

const close = () => {};

const notificationConfig = args => {
  const config = {
    duration: 5,
    placement: 'bottomRight',
  };

  if (args.message !== undefined) {
    const msg = args.message;
    const URL = args.message.URL ? args.message.URL : false;
    const key = `open${Date.now()}`;
    const btnClick = () => {
      notification.close(key);
    };

    const src = args.images;

    config.description = (
      <NotificationContent>
        {URL !== false ? (
          <a href={URL} onClick={btnClick} target="_blank" rel="noopener noreferrer">
            <span className="textDesc">{parse(msg.CONTENT_KOR)}</span>
          </a>
        ) : (
          <span className="textDesc">{parse(msg.CONTENT_KOR)}</span>
        )}
        {src.length > 0 ? (
          <div className="imgContent">
            {src.map(image => (
              <a href={image.url !== '' ? image.url : false} target="_blank" rel="noopener noreferrer" className="linkedImg">
                <img src={`/img/thumb/200x200/${image.seq}`} alt={image.id} />
              </a>
            ))}
          </div>
        ) : (
          false
        )}
      </NotificationContent>
    );
    config.message = msg.TITLE_KOR;
  }

  if (args.buttons !== undefined && args.buttons.length > 0) {
    const link = args.buttons[0].link.url !== '' ? args.buttons[0].link.url : '';
    const btns = args.buttons[0];
    const key = `open${Date.now()}`;
    const btnClick = () => {
      if (link !== '') {
        window.open(link);
      }
      notification.close(key);
    };
    const btn = (
      // <Button a="1" type={btns.type} size={btns.size} onClick={btnClick}>
      //   {btns.value}
      // </Button>
      <BtnDkGray a="1" type={btns.type} size={btns.size} onClick={btnClick}>
        {btns.value}
      </BtnDkGray>
    );
    config.duration = 0;
    config.btn = btn;
    config.key = key;
    config.onClose = close;
  }
  return config;
};

const openNotification = args => {
  if (args.RECV_YN === 'Y') {
    notification.open(notificationConfig(args));
  }
};

const openNotificationCustom = args => {
  if (args.RECV_YN === 'Y') {
    notification.open({
      duration: 5,
      description: args.message,
    });
  }
};

export const notify = {
  normal: args => openNotification(args),
  component: args => openNotificationCustom(args),
};

export default notify;

/*
{
  "appId": "55",
  "type": "notify/COMMON_NOTIFY",
  "message": {
    "MSG_TYPE": "A",
    "TITLE": "새로운 이벤트가 발생했습니다.",
    "TITLE_KOR": "새로운 이벤트가 발생했습니다.",
    "TITLE_ENG": "@새로운 이벤트가 발생했습니다.",
    "TITLE_CHN": "@@새로운 이벤트가 발생했습니다.",
    "CONTENT": "새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다.",
    "CONTENT_KOR": "새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다.",
    "CONTENT_ENG": "@새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다.",
    "CONTENT_CHN": "@@새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다."
  },
  "link": {
    "type": "popup/window",
    "url": "http://dev.board.com/",
    "size": [400,600]
  },
  "images": [],
  "buttons": [
    {
      "type": "primary",
      "size": "default",
      "value": "확인",
      "link": {
        "type": "out",
        "url": "http://dev.board.com",
        "size": [400,600]
      }
    }
  ],
  "target": {
    "empNo": ["X0101006", "X0101007"]
  }
}
*/
