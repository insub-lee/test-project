import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Popover } from 'antd';

import Badge from 'components/Badge/StyleBadge';
import iconNotify from 'images/portal/icon-notify.png';

import StyledNotification from './StyledNotification';
import Contents from './Contents';
import EmptyContents from './EmptyContents';

const Notification = ({
  myMNotiCnt, myMNotiList, view, execPage, onNoneClick, visible, onClick, onClickNotiButton, showNoti,
}) => (
  <div>
    {myMNotiCnt > 0 && (
      <StyledNotification>
        {view !== 'Mobile' ? (
          <Popover
            placement="rightBottom"
            title="미등록 App 알림 수신함"
            content={myMNotiCnt.length !== 0 ? (
              <Contents
                myMNotiList={myMNotiList}
                onClickItem={(key) => {
                  execPage(key, 'execMenu');
                  onNoneClick();
                }}
              />) : <EmptyContents />
            }
            trigger="click"
            overlayClassName="userMenuNotification"
            visible={visible}
          >
            <div
              onClick={onClick}
              onKeyPress={() => { }}
              role="button"
              tabIndex="0"
            >
              <p className="unreadTotalNumTxt">
                <img src={iconNotify} alt="알림" />
                <button className="registNotNoti">미등록 앱 알림 수신</button>
              </p>
              <Badge count={myMNotiCnt} overflowCount={99} className="badgeCount">
                <Link to="/" className="badgeLink" />
              </Badge>
            </div>
          </Popover>
        ) : (
          <div
            onClick={onClickNotiButton}
            onKeyPress={() => { }}
            role="button"
            tabIndex="0"
          >
            <p className="unreadTotalNumTxt">
              <img src={iconNotify} alt="알림" />
              <button className="registNotNoti">미등록 앱 알림 수신</button>
            </p>
            <Badge count={myMNotiCnt} overflowCount={99} className="badgeCount">
              <Link to="/" className="badgeLink" />
            </Badge>
          </div>
        )
        }
      </StyledNotification>
    )}
    {showNoti && (
      <Contents
        myMNotiList={myMNotiList}
        onClickItem={(key) => {
          execPage(key, 'execMenu');
          onNoneClick();
        }}
      />
    )}
  </div>
);

Notification.propTypes = {
  myMNotiCnt: PropTypes.number,
  myMNotiList: PropTypes.arrayOf(PropTypes.object),
  view: PropTypes.string,
  execPage: PropTypes.func,
  onNoneClick: PropTypes.func,
  visible: PropTypes.bool,
  onClick: PropTypes.func,
  onClickNotiButton: PropTypes.func,
  showNoti: PropTypes.bool,
};

Notification.defaultProps = {
  myMNotiCnt: 0,
  myMNotiList: [],
  view: '',
  execPage: () => {},
  onNoneClick: () => {},
  visible: false,
  onClick: () => {},
  onClickNotiButton: () => {},
  showNoti: false,
};

export default Notification;
