import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { lang } from 'utils/commonUtils';
import ManagerInfo from 'containers/portal/components/ManagerInfo';
import WidgetSettingModal from './WidgetSettingModal';
import { BtnIconNotify, BtnIconSettings, BtnIconReload, BtnIconSeeDetails } from '../uielements/styles/buttons.style';
import { WidgetHeader } from './StyleWidget';

export default class WidgetsHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  onReload = (item) => {
    console.log(item, 'reloadTest');
    // 콜백 함수
    item.onReload(item, this);
  }
  onModal = () => {
    this.setState({ show: true });
  }
  onModalButton = () => {
    this.setState({ show: true });
  }
  closeModal = () => {
    this.setState({ show: false });
  }
  render() {
    const {
      item,
    } = this.props;
    const {
      managerInfo,
    } = item;
    const headerStyle = {};
    if (item.bgColor) {
      headerStyle.backgroundColor = item.bgColor;
    }
    if (item.color) {
      headerStyle.color = item.color;
    }
    let { functions } = item.basic;
    if (functions === undefined) {
      functions = [];
    }
    return (
      <WidgetHeader
        style={headerStyle}
        className={item.user && item.user.isTitle ? 'widgetHeader' : 'widgetHeader noTitle'}
      >
        <h2>
          <BtnIconNotify
            title="새 알림"
            className={item.user && item.user.isTitle ? 'notifyStatus' : 'notifyStatus noTitle'}
            style={item.UNREAD_CNT ? { display: 'block' } : { display: 'none' }}
            // style={{ display: 'block' }}
          />
          {lang.get('NAME', item)}
          {
            (functions.length === 0 && !managerInfo) || (functions.length === 0 && JSON.parse(managerInfo).length === 0)
              ?
                ''
              :
                <div className="iconsWrapper">
                  <ul>
                    <li
                      style={functions.includes('settings') ? { display: 'block' } : { display: 'none' }}
                    >
                      <BtnIconSettings
                        title="환경설정"
                        onClick={this.onModal}
                      />
                    </li>
                    <li
                      style={functions.includes('reload') ? { display: 'block' } : { display: 'none' }}
                    >
                      <BtnIconReload
                        title="새로고침"
                        onClick={() => this.onReload(item)}
                      />
                    </li>
                    <li
                      style={functions.includes('more') ? { display: 'block' } : { display: 'none' }}
                    >
                      <BtnIconSeeDetails
                        title="더보기"
                      />
                    </li>
                    <li
                      style={managerInfo && JSON.parse(managerInfo).length > 0 ? { display: 'block' } : { display: 'none' }}
                    >
                      <ManagerInfo
                        managerInfo={managerInfo ? JSON.parse(managerInfo) : undefined}
                      />
                    </li>
                  </ul>
                </div>
          }
        </h2>
        <WidgetSettingModal show={this.state.show} closeModal={this.closeModal} item={item} />
      </WidgetHeader>
    );
  }
}
WidgetsHeader.propTypes = {
  item: PropTypes.object.isRequired,
};
