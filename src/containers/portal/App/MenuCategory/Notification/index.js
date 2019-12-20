import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Popover } from 'antd';
import { Table } from 'semantic-ui-react';
import Scrollbars from 'react-custom-scrollbars';
import styled from 'styled-components';
import { lang } from 'utils/commonUtils';
import Badge from 'components/Badge/StyleBadge';
import iconNotify from 'images/portal/icon-notify.png';

const StyleNotification = styled.div`
  width: 340px;
  height: 35px;
  line-height: 35px;
  background: #edeff2;
  color: #404040;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  text-align: left;
  margin: 10px 10px 0px 10px;

  @media only screen and (max-width: 320px) {
    width: 250px !important;
  }

  .registNotNoti {
    margin-right: 16px;
    background: transparent;
  }

  .unreadTotalNumTxt {
    float: left;
  }

  .ant-badge {
    position: relative;
    float: right;

    .ant-badge-count {
      top: 9px;
      right: 0;
      transform: none;
    }
  }

  img {
    margin: 0 6px 4px 6px;
    vertical-align: middle;
  }
`;

const ResultsTableWrapper = styled.div`
  width: 230px;
  padding-bottom: 20px;

  @media only screen and (max-width: 320px) {
    padding-bottom: 0;
  }

  tr {
    cursor: pointer;

    td {
      height: 29px;
      color: #404040;
      font-size: 12px;

      &:first-child {
        width: 175px;
        padding-left: 16px;
      }

      &:last-child {
        width: calc(100% - 175px);

        .ant-badge {
          display: inline-block;
          float: right;

          .ant-badge-count {
            right: 0;
            min-width: 15px;
            height: 16px;
            font-size: 10px;
            line-height: 16px;
            background: #f85023;
            box-shadow: none;
          }
        }
      }
    }
  }
`;

class Notification extends PureComponent { //eslint-disable-line
  render() {
    const onClickItem = key => {
      this.props.execPage(key, 'execMenu');
      this.props.onNoneClick();
    };

    const { myMNotiCnt, myMNotiList, view } = this.props;

    const contents = (
      <div style={{ paddingTop: 13 }}>
        <Scrollbars className="custom-scrollbar" autoHide autoHideTimeout={1000} autoHideDuration={100} autoHeight autoHeightMin={0} autoHeightMax={290}>
          <ResultsTableWrapper>
            <Table size="small" style={{ width: '100%' }}>
              <Table.Body>
                {myMNotiList.map(noti => (
                  <Table.Row key={noti.MENU_ID}>
                    <Table.Cell onClick={() => onClickItem(noti)}>
                      {noti.SEC_YN === 'Y' ? <p>{lang.get('NAME', noti)}</p> : <p style={{ color: 'lightgray' }}>{lang.get('NAME', noti)}</p>}
                    </Table.Cell>
                    <Table.Cell>
                      <Badge count={noti.UNREAD_CNT ? noti.UNREAD_CNT : ''} overflowCount={99} className="badgeCount">
                        <Link to="/" className="badgeLink" />
                      </Badge>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </ResultsTableWrapper>
        </Scrollbars>
      </div>
    );

    const emptyContents = <div style={{ paddingTop: 13, textAlign: 'center' }}>알림 수신이 없습니다.</div>;

    return (
      <div>
        {myMNotiCnt !== 0 ? (
          <StyleNotification>
            {view !== 'Mobile' ? (
              <Popover
                placement="rightBottom"
                title="미등록 App 알림 수신함"
                content={myMNotiCnt.length !== 0 ? contents : emptyContents}
                trigger="click"
                overlayClassName="userMenuNotification"
                visible={this.props.visible}
              >
                <div
                  onClick={this.props.onClick}
                  // onClick={() => { handleSetDockIconType('MAX'); }}
                  onKeyPress={() => {}}
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
                onClick={this.props.onClickNotiButton}
                // onClick={() => { handleSetDockIconType('MAX'); }}
                onKeyPress={() => {}}
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
            )}
          </StyleNotification>
        ) : (
          <div className="emptyContents" style={{ display: 'none' }} />
        )}
      </div>
    );
  }
}

Notification.propTypes = {
  myMNotiList: PropTypes.array.isRequired,
  myMNotiCnt: PropTypes.number.isRequired,
  // myHNotiCnt: PropTypes.number.isRequired,
  execPage: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onNoneClick: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  // onMouseEnter: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  onClickNotiButton: PropTypes.func.isRequired,
};

export default Notification;
