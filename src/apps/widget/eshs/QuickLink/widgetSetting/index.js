import React, { Component } from 'react';
import { Input, Button } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

class QuickLinkWidgetSetting extends Component {
  state = {
    data: {
      QUICK_LINK_DESC: '',
      QUICK_LINK_URL: '',
    },
  }

  componentDidMount() {}

  onChangeData = (key, val) => {
    this.setState(prevState => {
      const { data } = prevState;
      data[key] = val;
      return { data }
    });
  };

  onSaveWidgetConfig = () => {
    const { item, type, updateBizGroupChgYn, sagaKey, submitHandlerBySaga } = this.props;
    const submitData = {
      PARAM: {
        WIDGETID: item.id,
        PAGEID: item.PAGE_ID,
        ITEM: JSON.stringify({
          size: item.size,
          sizeArr: item.sizeArr,
          user: item.user,
          data: {
            ...this.state.data
          },
        }),
        type,
      }
    };

    submitHandlerBySaga(sagaKey, 'POST', '/api/portal/v1/page/updateBizWidgetConfigItemValue', submitData, this.initDataBind);

    if (type === 'bizgroup') {
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
      <div style={{ marginTop: '10px' }}>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <th>설명</th>
              <td>
                <Input.TextArea defaultValue={item.data.QUICK_LINK_DESC} rows={4} onChange={e => this.onChangeData('QUICK_LINK_DESC', e.target.value)} />
              </td>
            </tr>
            <tr>
              <th>link</th>
              <td>
                <Input defaultValue={item.data.QUICK_LINK_URL} style={{ width: '80%' }} onChange={e => this.onChangeData('QUICK_LINK_URL', e.target.value)} />
                <Button type="primary" htmlType="button" size="small" onClick={this.onSaveWidgetConfig} style={{ marginLeft: 8 }}>
                  적용
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const WidgetConfigDevBase = props => <BizMicroDevBase sagaKey="QuickLinkWidgetSetting" component={QuickLinkWidgetSetting} {...props} />;

export default WidgetConfigDevBase;