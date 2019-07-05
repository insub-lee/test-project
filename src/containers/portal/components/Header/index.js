import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlObj, lang } from 'utils/commonUtils';
// import SKhynixLogo from 'images/portal/header-bg-logo.png';
import Badge from '../../../../components/Badge/StyleBadge';
import UserSearch from '../../App/UserSearch';
import UserProfile from '../../App/UserProfile';
import AlarmPopover from '../../App/UserNotice';
import ManagerInfo from '../ManagerInfo';
import messages from './messages';
import StyledHeader from './StyledHeader';
import Trigger from '../../App/Trigger';
import Button from '../../../../components/Button';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setMyMenuData: this.props.setMyMenuData,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.setMyMenuData !== nextProps.setMyMenuData) {
      this.setState({ setMyMenuData: nextProps.setMyMenuData });
    }
  }
  showMenu = () => {
    const { setOpen } = this.props;
    setOpen();
  }
  showFullScreen = () => {
    const { handleClick } = this.props;
    handleClick();
  }
  gotoHome = () => {
    const { execPage } = this.props;
    execPage('common');
  }
  render() {
    const { myHNotiCnt, managerInfo, view } = this.props;
    const { setMyMenuData } = this.state;

    let appName = '';
    if (setMyMenuData === 'common' || setMyMenuData.HOME_YN === 'Y') {
      // appName = view !== 'Mobile' ? `: ${intlObj.get(messages.home)}` : intlObj.get(messages.home);
      // home txt 삭제 0422
      appName = '';
    } else if (lang.get('NAME', setMyMenuData)) {
      appName = view !== 'Mobile' ? `: ${lang.get('NAME', setMyMenuData)}` : lang.get('NAME', setMyMenuData);
    }

    if (this.state.setMyMenuData.length === 0) {
      this.state = {
        setMyMenuData: 'common',
      };
    }
    return (
      <StyledHeader className="portalHeader">
        <div className="onLeft">
          <ul>
            <li className="leftBottom">
              <Trigger>
                <span
                  className="trigger icon icon-menu"
                  onClick={this.showMenu}
                  onKeyDown={this.showMenu}
                  role="button"
                  tabIndex="0"
                />
                <Badge count={myHNotiCnt} overflowCount={99}>
                  <Link to="/" className="badgeLink" />
                </Badge>
              </Trigger>
              <h1 className="siteHeader">
                <span
                  className="gotoHome"
                  onClick={this.gotoHome}
                  onKeyDown={this.gotoHome}
                  role="button"
                  tabIndex="0"
                // style={{ background: 'transparent', cursor: 'pointer' }}
                >
                  {view !== 'Mobile' ?
                  intlObj.get(messages.skPortalTitle)
                  :
                  ' '
                  }
                </span>
                <span> {appName} </span>
                {/* 담당자 popover */}
                {
                  setMyMenuData.APP_YN === 'Y' && view !== 'Mobile'
                    ?
                      <ManagerInfo
                        managerInfo={managerInfo}
                      />
                    :
                    ''
                }
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
                {/* <li>
                  <SettingsPopover />
                </li> */}
                <li>
                  <div className="full-screenable-node">
                    <div align="right">
                      <Button type="mFullscreenButton" onClick={this.showFullScreen}>
                        <span className="icon icon-full" />
                      </Button>
                    </div>
                  </div>
                  {/* 풀스크린 버튼 */}
                </li>
                <li>
                  <UserProfile execPage={this.props.execPage} />{/* 프로필 */}
                </li>
                {/* { setMyMenuData.HOME_YN === 'Y' &&
                <li>
                  <Link to="/admin" className="icon-setting" target="_blank" />
                </li> } */}
              </ul>
            </li>
          </ul>
        </div>
      </StyledHeader>
    );
  }
}
Header.propTypes = {
  setOpen: PropTypes.func.isRequired,
  execPage: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  myHNotiCnt: PropTypes.number.isRequired,
  setMyMenuData: PropTypes.object,
  managerInfo: PropTypes.array,
  view: PropTypes.string.isRequired,
};

Header.defaultProps = {
  setMyMenuData: 'common',
  managerInfo: undefined,
};

export default Header;
