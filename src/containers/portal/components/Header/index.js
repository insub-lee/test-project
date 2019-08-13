import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import { split } from 'lodash';

import { lang } from 'utils/commonUtils';
import HyundaiLogo from 'images/Hyundai-Logo.png';

import Badge from '../../../../components/Badge/StyleBadge';
import UserSearch from '../../App/UserSearch';
import UserProfile from '../../App/UserProfile';
import AlarmPopover from '../../App/UserNotice';
import ManagerInfo from '../ManagerInfo';
// import messages from './messages';
import StyledHeader from './StyledHeader';
import Trigger from '../../App/Trigger';
import Button from '../../../../components/Button';

const Header = ({
  myHNotiCnt,
  managerInfo,
  view,
  hasRoleAdmin,
  setOpen: showMenu,
  handleClick: showFullScreen,
  execPage: gotoHome,
  setMyMenuData,
  execPage,
  headerTitle,
  location: { pathname },
  siteId,
}) => {
  const startPathName = split(pathname, '/', 2);

  let appName = '';
  let menuData = setMyMenuData;
  if (startPathName[1] === 'portal' || setMyMenuData === 'common' || setMyMenuData.HOME_YN === 'Y') {
    // appName = view !== 'Mobile' ? `: ${intlObj.get(messages.home)}` : intlObj.get(messages.home);
    // home txt 삭제 0422
    appName = '';
  } else if (lang.get('NAME', setMyMenuData)) {
    appName = view !== 'Mobile' ? `: ${lang.get('NAME', setMyMenuData)}` : lang.get('NAME', setMyMenuData);
  }

  if (setMyMenuData.length === 0) {
    menuData = 'common';
  }

  return (
    <StyledHeader className="portalHeader">
      <div className="onLeft">
        <ul>
          <li className="leftBottom">
            <Trigger>
              <span
                className="trigger icon icon-menu"
                onClick={showMenu}
                onKeyDown={showMenu}
                role="button"
                tabIndex="0"
              />
              <Badge count={myHNotiCnt} overflowCount={99}>
                <Link to="/" className="badgeLink" />
              </Badge>
            </Trigger>
            <h1 className="siteHeader">
              {siteId === 1183 ? (
                <img src={HyundaiLogo} alt="Hyundai Moto" onClick={() => gotoHome('common')} onKeyDown={() => gotoHome('common')} role="button" tabIndex="0" />
              ) : (
                <span
                  className="gotoHome"
                  onClick={() => gotoHome('common')}
                  onKeyDown={() => gotoHome('common')}
                  role="button"
                  tabIndex="0"
                >
                  {view !== 'Mobile' && headerTitle}
                </span>
              )}
              <span> {appName} </span>
              {/* 담당자 popover */}
              {(menuData.APP_YN === 'Y' && menuData.SRC_PATH !== 'PAGE') && view !== 'Mobile' && <ManagerInfo managerInfo={managerInfo} />}
            </h1>
          </li>
        </ul>
      </div>
      <div className="onRight">
        <ul>
          <li className="rightBottom">
            <ul className="iconMenuWrapper">
              <li>
                <UserSearch />{/* 구성원검색 */}
              </li>
              <li>
                <AlarmPopover />{/* 알림 */}
              </li>
              {/*
                <li>
                  <SettingsPopover />
                </li>
              */}
              <li>
                <div className="full-screenable-node">
                  <div align="right">
                    <Button type="mFullscreenButton" onClick={showFullScreen}>
                      <span className="icon icon-full" />
                    </Button>
                  </div>
                </div>
                {/* 풀스크린 버튼 */}
              </li>
              <li>
                <UserProfile execPage={execPage} />{/* 프로필 */}
              </li>
              {hasRoleAdmin === true && (
                <li>
                  <Tooltip placement="left" title="ADMIN">
                    <Link to="/admin" className="icon-setting" target="_blank" />
                  </Tooltip>
                </li>
              )}
            </ul>
          </li>
        </ul>
      </div>
    </StyledHeader>
  );
};

Header.propTypes = {
  setOpen: PropTypes.func.isRequired,
  execPage: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  myHNotiCnt: PropTypes.number.isRequired,
  setMyMenuData: PropTypes.object,
  managerInfo: PropTypes.array,
  view: PropTypes.string.isRequired,
  hasRoleAdmin: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  headerTitle: PropTypes.string,
};

Header.defaultProps = {
  setMyMenuData: 'common',
  managerInfo: undefined,
  headerTitle: '',
};

export default Header;
