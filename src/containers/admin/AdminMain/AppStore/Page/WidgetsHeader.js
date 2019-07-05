import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BtnIconNotify } from 'components/uielements/styles/buttons.style';
import { intlObj } from 'utils/commonUtils';
import { Link } from 'react-router-dom';
import * as feed from 'components/Feedback/functions';
import messages from './messages';
import WidgetSettingModal from './WidgetSettingModal';
import { WidgetHeader } from './StyleWidget';

export default class WidgetsHeader extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
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

    const headerStyle = {
      color: item.color,
      backgroundColor: item.bgColor,
    };

    const handleDeleteWidget = () => {
      feed.showConfirm(`${item.title} ${intlObj.get(messages.deleteWidget)}`, '', () => item.deleteWidget(Number(item.id)));
    };

    const { functions } = item.basic;

    return (
      <WidgetHeader
        style={headerStyle}
        className={item.user.isTitle ? 'draggableCancel widgetHeader' : 'draggableCancel widgetHeader noTitle'}
      >
        <h2>
          <BtnIconNotify
            title="새 알림"
            className={item.user.isTitle ? 'notifyStatus' : 'notifyStatus noTitle'}
            style={functions.includes('notify') ? { display: 'block' } : { display: 'none' }}
          />
          <span>{item.title}</span>
          <ul className="iconsWrapper">
            <li
              style={functions.includes('settings') ? { display: 'block' } : { display: 'none' }}
            >
              <Link
                className="setupWidget"
                to={`/admin/adminmain/appstore/widgetsetting/${item.PAGE_ID}/${item.id}`}
                title="위젯 설정"
              />
            </li>
            <li
              style={functions.includes('delete') ? { display: 'block' } : { display: 'none' }}
            >
              <button
                className="deleteWidget"
                title="위젯 삭제"
                onClick={handleDeleteWidget}
              />
            </li>
          </ul>
        </h2>
        <WidgetSettingModal show={this.state.show} closeModal={this.closeModal} item={item} />
      </WidgetHeader>
    );
  }
}

WidgetsHeader.propTypes = {
  item: PropTypes.object.isRequired,
};
