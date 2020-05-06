import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { isJSON } from 'utils/helpers';
import styled from 'styled-components';
import { SettingFilled } from '@ant-design/icons';
import SettingModal from './basicSettingModal';

const Wrapper = styled.div`
  .excelSettingBtn {
    margin-top: 5px;
    cursor: pointer;
  }
`;

class excelDownloadSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  onChangeOptionValue = (key, val) => {
    const { info, setChangeValue, optSeq } = this.props;
    const { workInfo } = info;
    const optList = workInfo.OPT_INFO;
    const nOptList = optList.map(opt => {
      if (opt.OPT_SEQ === optSeq) {
        if (isJSON(opt.OPT_VALUE)) {
          const tempVal = JSON.parse(opt.OPT_VALUE);
          tempVal[key] = val;
          return { ...opt, OPT_VALUE: JSON.stringify(tempVal) };
        }
        return { ...opt, OPT_VALUE: JSON.stringify({ [key]: val }) };
      }
      return opt;
    });
    setChangeValue('workInfo', 'OPT_INFO', nOptList);
  };

  toggleModalVisible = () => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible,
    });
  };

  handleConfigSave = () => {
    const { onSaveClick } = this.props;
    this.setState(
      {
        modalVisible: false,
      },
      () => onSaveClick(),
    );
  };

  render() {
    const { optConfig } = this.props;
    const { modalVisible } = this.state;
    const optValue = optConfig && optConfig.OPT_VALUE && optConfig.OPT_VALUE.length > 0 ? JSON.parse(optConfig.OPT_VALUE) : {};
    return (
      <>
        <Wrapper>
          <div className="excelSettingBtn" onClick={this.toggleModalVisible} onKeyPress={() => {}} role="button" tabIndex="0">
            엑셀상세 설정
            <SettingFilled style={{ marginLeft: '5px' }} />
          </div>
        </Wrapper>
        <Modal
          visible={modalVisible}
          centered
          destroyOnClose
          footer={null}
          bodyStyle={{ padding: '1px' }}
          onCancel={() =>
            this.setState({
              modalVisible: false,
            })
          }
          width="800px"
        >
          <SettingModal onSaveClick={this.handleConfigSave} onChangeOptionValue={this.onChangeOptionValue} optValue={optValue} />
        </Modal>
      </>
    );
  }
}

excelDownloadSetting.propTypes = {
  info: PropTypes.any,
  setChangeValue: PropTypes.func,
  optSeq: PropTypes.number,
  optConfig: PropTypes.object,
  onSaveClick: PropTypes.func,
};

export default excelDownloadSetting;
