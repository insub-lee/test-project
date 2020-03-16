import React, { Component } from 'react';
import { Select, Button, Divider, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';

const { Option } = Select;

class ViewChangeProcessSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      WORK_SEQ: -1,
      VIEW_CHANGE_PROCESS_SEQ: -1,
      VIEW_CHANGE_PROCESS_NAME: '',
      INPUT_META_SEQ: undefined,
      MODIFY_META_SEQ: undefined,
      VIEW_META_SEQ: undefined,
      LIST_META_SEQ: undefined,
    };
  }

  setSelectedViewChangeProcess = seq => {
    const { workSeq, viewChangeProcessList } = this.props;
    let selectedItem = {
      WORK_SEQ: workSeq,
      VIEW_CHANGE_PROCESS_SEQ: -1,
      VIEW_CHANGE_PROCESS_NAME: '',
      INPUT_META_SEQ: undefined,
      MODIFY_META_SEQ: undefined,
      VIEW_META_SEQ: undefined,
      LIST_META_SEQ: undefined,
    };
    if (seq > -1) {
      const idx = viewChangeProcessList.findIndex(iNode => iNode.VIEW_CHANGE_PROCESS_SEQ === seq);
      if (idx > -1) selectedItem = viewChangeProcessList[idx];
    }
    this.setState({ ...selectedItem });
  };

  saveAfterProcess = seq => {
    const { workSeq } = this.props;
    const { VIEW_CHANGE_PROCESS_SEQ } = this.state;
    if (VIEW_CHANGE_PROCESS_SEQ === -1) this.setState({ VIEW_CHANGE_PROCESS_SEQ: seq, WORK_SEQ: workSeq }, () => console.debug(this.state));
  };

  saveProcess = () => {
    const { action, workSeq } = this.props;
    const { WORK_SEQ } = this.state;
    const formData = { ...this.state, WORK_SEQ: workSeq };
    action.saveViewChangeProcess(formData, this.saveAfterProcess);
  };

  render() {
    const { inputViewList, modifyViewList, viewViewList, listViewList, viewChangeProcessList } = this.props;
    const { VIEW_CHANGE_PROCESS_SEQ, VIEW_CHANGE_PROCESS_NAME, INPUT_META_SEQ, MODIFY_META_SEQ, VIEW_META_SEQ, LIST_META_SEQ } = this.state;
    return (
      <table>
        <tbody>
          <tr>
            <td>화면 전환 그룹</td>
            <td>
              <Select
                placeholder="화면 전환 그룹 선택"
                style={{ width: '180px' }}
                value={VIEW_CHANGE_PROCESS_SEQ}
                onChange={value => this.setSelectedViewChangeProcess(value)}
              >
                {viewChangeProcessList &&
                  viewChangeProcessList.length > 0 &&
                  viewChangeProcessList.map(item => (
                    <Option key={`viewChangeProcessList_${item.VIEW_CHANGE_PROCESS_SEQ}`} value={item.VIEW_CHANGE_PROCESS_SEQ}>
                      {item.VIEW_CHANGE_PROCESS_NAME}
                    </Option>
                  ))}
                <Option value={-1}>추가</Option>
              </Select>
            </td>
            <td>화면 전환 그룹명</td>
            <td>
              <Input
                placeholder="화면 전환 그룹명 입력"
                style={{ width: '180px' }}
                value={VIEW_CHANGE_PROCESS_NAME}
                onChange={e => this.setState({ VIEW_CHANGE_PROCESS_NAME: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>입력 화면</td>
            <td>
              <Select
                placeholder="입력 화면 선택"
                style={{ width: '180px' }}
                value={INPUT_META_SEQ || undefined}
                onChange={value => this.setState({ INPUT_META_SEQ: value })}
              >
                {inputViewList &&
                  inputViewList.length > 0 &&
                  inputViewList.map(item => (
                    <Option key={`inputViewList_${item.META_SEQ}`} value={item.META_SEQ}>
                      {`${item.NAME_KOR}(${item.META_SEQ})`}
                    </Option>
                  ))}
              </Select>
            </td>
            <td>수정 화면</td>
            <td>
              <Select
                placeholder="수정 화면 선택"
                style={{ width: '180px' }}
                value={MODIFY_META_SEQ || undefined}
                onChange={value => this.setState({ MODIFY_META_SEQ: value })}
              >
                {modifyViewList &&
                  modifyViewList.length > 0 &&
                  modifyViewList.map(item => (
                    <Option key={`modifyViewList_${item.META_SEQ}`} value={item.META_SEQ}>
                      {`${item.NAME_KOR}(${item.META_SEQ})`}
                    </Option>
                  ))}
              </Select>
            </td>
          </tr>
          <tr>
            <td>조회 화면</td>
            <td>
              <Select
                placeholder="조회 화면 선택"
                style={{ width: '180px' }}
                value={VIEW_META_SEQ || undefined}
                onChange={value => this.setState({ VIEW_META_SEQ: value })}
              >
                {viewViewList &&
                  viewViewList.length > 0 &&
                  viewViewList.map(item => (
                    <Option key={`viewViewList_${item.META_SEQ}`} value={item.META_SEQ}>
                      {`${item.NAME_KOR}(${item.META_SEQ})`}
                    </Option>
                  ))}
              </Select>
            </td>
            <td>목록 화면</td>
            <td>
              <Select
                placeholder="목록 화면 선택"
                style={{ width: '180px' }}
                value={LIST_META_SEQ || undefined}
                onChange={value => this.setState({ LIST_META_SEQ: value })}
              >
                {listViewList &&
                  listViewList.length > 0 &&
                  listViewList.map(item => (
                    <Option key={`listViewList_${item.META_SEQ}`} value={item.META_SEQ}>
                      {`${item.NAME_KOR}(${item.META_SEQ})`}
                    </Option>
                  ))}
              </Select>
            </td>
          </tr>
          <tr>
            <td colSpan="4" style={{ textAlign: 'right' }}>
              <Button type="primary" onClick={this.saveProcess}>
                Save
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
export default ViewChangeProcessSetting;
