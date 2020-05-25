import React, { Component } from 'react';
import { InputNumber, Button } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

class WidgetConfig extends Component {
  constructor(props) {
    super(props);
    this.state = { newDocDays: 0 };
  }

  onChange = value => this.setState({ newDocDays: value });

  handleClickSubmit = () => {
    const { item, size, sizeArr, user, type, updateBizGroupChgYn, sagaKey, submitHandlerBySaga } = this.props;
    const { newDocDays } = this.state;
    const result = {
      WIDGETID: item.id,
      PAGEID: item.PAGE_ID,
      ITEM: JSON.stringify({
        size: item.size,
        sizeArr: item.sizeArr,
        user: item.user,
        data: {
          newDocDays,
        },
      }),
      type,
    };

    submitHandlerBySaga(sagaKey, 'POST', '/api/portal/v1/page/updateBizWidgetConfigItemValue', { PARAM: result }, this.initDataBind);

    if (type !== 'mypage') {
      // 업무 그룹 변화 감지 함수
      updateBizGroupChgYn();
    }
  };

  initDataBind = (sagaKey, response) => {
    if (response && response.result === 'success') {
      message.success(<MessageContent>Save</MessageContent>);
    } else {
      message.error(<MessageContent>Error</MessageContent>);
    }
  };

  render() {
    const { item } = this.props;
    return (
      <div>
        <span>신규 문서 기준일수</span>
        <InputNumber min={0} max={10000} defaultValue={(item && item.data && item.data.newDocDays) || 0} onChange={this.onChange} />
        <StyledButton className="btn-light" onClick={this.handleClickSubmit}>
          적용
        </StyledButton>
      </div>
    );
  }
}

const WidgetConfigDevBase = props => <BizMicroDevBase sagaKey="mdcsMainWidgetConfig" component={WidgetConfig} {...props} />;

export default WidgetConfigDevBase;
