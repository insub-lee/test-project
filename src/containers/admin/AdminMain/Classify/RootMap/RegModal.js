import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal, Select } from 'antd';
import StyledButton from '../../../../../components/Button/StyledButton';

const { Option } = Select;

class RegModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useYn: '',
    };
  }

  handleOkModal = e => {
    e.preventDefault();
    const { rootMap } = this.props;
    const isRootMap = Object.prototype.hasOwnProperty.call(rootMap, 'MAP_ID');
    const data = new FormData(e.target);

    if (isRootMap) {
      const payload = {
        ...rootMap,
      };
      data.forEach((value, key) => {
        payload[key] = value;
      });
      this.props.updateRootMap(payload);
    } else {
      const payload = {};
      data.forEach((value, key) => {
        payload[key] = value;
      });
      this.props.addRootMap(payload);
    }
  };

  handleCloselModal = () => {
    this.props.setSelectedRootMap({});
    this.props.setVisibleModal(false);
  };

  handleUseYnChange = val => {
    this.setState({ useYn: val });
  };

  render() {
    const { rootMap } = this.props;
    const { useYn } = this.state;
    const isRootMap = Object.prototype.hasOwnProperty.call(rootMap, 'MAP_ID');

    return (
      <Modal
        title="분류추가"
        visible={this.props.visible}
        onOk={() => {}}
        onCancel={this.handleCloselModal}
        width="400px"
        style={{ top: 100 }}
        footer={null}
        destroyOnClose
      >
        <form onSubmit={this.handleOkModal}>
          <div>
            <ul className="entryName">
              <li>
                <label htmlFor="l_ko">한국어</label>
                <Input name="NAME_KOR" maxLength={100} defaultValue={rootMap.NAME_KOR} />
              </li>
              <li>
                <label htmlFor="l_en">English</label>
                <Input name="NAME_ENG" maxLength={100} defaultValue={rootMap.NAME_ENG} />
              </li>
              <li>
                <label htmlFor="l_ch">中國語</label>
                <Input name="NAME_CHN" maxLength={100} defaultValue={rootMap.NAME_CHN} />
              </li>
              <li>
                <label htmlFor="l_ch">사용여부</label>
                <Select value={useYn !== '' ? useYn : rootMap.USE_YN} onChange={val => this.handleUseYnChange(val)}>
                  <Option value="Y">사용</Option>
                  <Option value="N">사용안함</Option>
                </Select>
                <input type="hidden" name="USE_YN" value={useYn !== '' ? useYn : rootMap.USE_YN} />
              </li>
            </ul>
          </div>
          <div style={{ width: '100%', textAlign: 'right', padding: '20px 0 0' }}>
            <StyledButton className="btn-light" key="back" htmlType="button" onClick={this.handleCloselModal}>
              닫기
            </StyledButton>
            <StyledButton className="btn-primary" key="ok" type="primary" htmlType="submit" style={{ marginLeft: '8px' }}>
              {isRootMap ? '수정' : '저장'}
            </StyledButton>
          </div>
        </form>
      </Modal>
    );
  }
}

RegModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisibleModal: PropTypes.func.isRequired,
  addRootMap: PropTypes.func.isRequired,
  updateRootMap: PropTypes.func.isRequired,
  rootMap: PropTypes.object.isRequired,
  setSelectedRootMap: PropTypes.func.isRequired,
};

export default RegModal;
