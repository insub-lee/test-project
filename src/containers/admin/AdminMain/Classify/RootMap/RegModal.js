import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal, Button } from 'antd';

class RegModal extends Component {
  componentDidMount() {}

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

  render() {
    const { rootMap } = this.props;
    const isRootMap = Object.prototype.hasOwnProperty.call(rootMap, 'MAP_ID');

    return (
      <Modal
        title="분류추가"
        visible={this.props.visible}
        onOk={this.handleOkModal}
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
            </ul>
          </div>
          <div style={{ width: '100%', textAlign: 'right', padding: '20px 0 0' }}>
            <Button key="back" htmlType="button" onClick={this.handleCloselModal}>
              닫기
            </Button>
            <Button key="ok" type="primary" htmlType="submit" style={{ marginLeft: '8px' }}>
              {isRootMap ? '수정' : '저장'}
            </Button>
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
