import React, { Component } from 'react';
import { Select, Input, Button } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

class BuilderDataWidgetSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        WORK_SEQ: props.item.data.WORK_SEQ,
        MORE_URL: props.item.data.MORE_URL,
      },
    }
  }

  componentDidMount() {
    const { sagaKey, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'workList',
        type: 'GET',
        url: '/api/builder/v1/work/main'
      }
    ];
    getCallDataHandler( sagaKey, apiAry, () => {});
  }

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
    const { item, result } = this.props;

    return (
      <div style={{ marginTop: '10px' }}>
        <table style={{ width: '100%' }}>
          <colgroup>
            <col width="20%" />
            <col width="80%" />
          </colgroup>
          <tbody>
            <tr>
              <th>빌더</th>
              <td>
                <Select defaultValue={this.state.data.WORK_SEQ} style={{ width: '50%' }} placeholder="빌더선택" onChange={val => this.onChangeData('WORK_SEQ', val)}>
                {result && result.workList && result.workList.list && result.workList.list.map(builder => (
                  <Select.Option value={builder.WORK_SEQ}>{builder.NAME_KOR}({builder.WORK_ID})</Select.Option>
                ))}
                </Select>
              </td>
            </tr>
            <tr>
              <th>더보기 URL</th>
              <td>
                <Input defaultValue={this.state.data.MORE_URL} style={{ width: '80%' }} onChange={e => this.onChangeData('MORE_URL', e.target.value)} />
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

const WidgetConfigDevBase = props => <BizMicroDevBase sagaKey="BuilderDataWidgetSetting" component={BuilderDataWidgetSetting} {...props} />;

export default WidgetConfigDevBase;