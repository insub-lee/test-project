import React, { Component } from 'react';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';
import { intlObj } from 'utils/commonUtils';
import { BtnDkGray, BtnLgtGray } from 'containers/store/components/uielements/buttons.style';
import StyleModal from 'containers/portal/components/Modal/StyleModal';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import Draggable from 'react-draggable';

import messages from '../Page/messages';

import StyleWidgetSetting from './StyleWidgetSetting';

const { TextArea } = Input;

class ApplyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: 'disabled',
      note: '',
    };
    this.onSec = this.onSec.bind(this);
  }

  onSec() {
    const { item } = this.props;
    const { note } = this.state;

    if (note.length > 9) {
      message.success(
        <MessageContent>
          {intlObj.get(messages.successApply)}
        </MessageContent>,
        3,
      );

      this.props.sendApply(item.APP_ID, item.PAGE_ID, note);
      this.props.onClose();
    } else {
      message.error(
        <MessageContent>
          {intlObj.get(messages.ReasonErr)}
        </MessageContent>,
        3,
      );
    }
  }

  changeInputKeyword = (e) => {
    if (e.target.value.length > 9) {
      this.setState({ note: e.target.value, disabled: '' });
    } else {
      this.setState({ note: e.target.value, disabled: 'disabled' });
    }
  }

  render() {
    const modalSize = {
      // 모달 size(width와 height) 및 중심에 오는 좌표 재설정
      width: 500,
      height: 240,
      marginTop: '-120px',
      marginLeft: '-250px',
    }

    return (
      <Draggable
        handle="h2.modalTitle"
      >
        <StyleModal style={modalSize}>
          <h2 className="modalTitle">
            {intlObj.get(messages.AppUsed)}
            <Button className="modalClose" onClick={this.props.onClose} />
          </h2>
          <StyleWidgetSetting className="modalWrapper">
            <div className="modalContents" style={{ marginTop: 20 }}>
              <TextArea
                rows={5}
                placeholder={intlObj.get(messages.AppShow)}
                onKeyUp={this.changeInputKeyword}
                name="Input"
                style={{ height: 116, resize: 'none' }}
              />
            </div>
          </StyleWidgetSetting>
          <div className="modalFooter">
            <BtnLgtGray key="back" onClick={this.props.onClose}>
              {intlObj.get(messages.cancel)}
            </BtnLgtGray>
            <BtnDkGray key="submit" className={this.state.disabled} onClick={() => this.onSec()}>
              {intlObj.get(messages.save)}
            </BtnDkGray>
          </div>
        </StyleModal>
      </Draggable>
    );
  }
}

ApplyPage.propTypes = {
  onClose: PropTypes.func.isRequired,
  sendApply: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default ApplyPage;
