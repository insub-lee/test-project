import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Radio } from 'antd';

import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledModal from 'commonStyled/Modal/StyledModal';

const { TextArea } = Input;
const AntdModal = StyledModal(Modal);

class MdcsOpinionModal extends Component {
  componentDidMount() {}

  handleReqApprove = e => {
    e.preventDefault();
    const { queData } = this.props;
    let appvStatus = 2;
    let appvStatusName = '결재';
    if (queData.DRAFT_DATA.appvType) {
      appvStatus = queData.DRAFT_DATA.appvType;
      appvStatusName = queData.DRAFT_DATA.appvTypeName;
    }
    this.props.reqApprove(appvStatus, appvStatusName);
  };

  handleCloseOpinionModal = () => {
    this.props.setOpinion('');
    this.props.setOpinionVisible(false);
  };

  onChangeAppvType = e => {
    console.debug(e);
    this.props.changeQueDraftData('appvType', Number(e.target.value));
    this.props.changeQueDraftData('appvTypeName', e.target.text);
  };

  render() {
    const { queData, opinionVisible } = this.props;

    return (
      <AntdModal
        title="결재하기"
        visible={opinionVisible}
        onOk={this.handleCloseOpinionModal}
        onCancel={this.handleCloseOpinionModal}
        width="500px"
        style={{ top: 100 }}
        footer={[
          <StyledButton key="close" className="btn-light" onClick={this.handleCloseOpinionModal}>
            닫기
          </StyledButton>,
          <StyledButton key="ok" className="btn-primary" onClick={this.handleReqApprove}>
            결재
          </StyledButton>,
        ]}
      >
        <div>
          <div>
            <Radio.Group onChange={this.onChangeAppvType}>
              <Radio value={3} text="홀드">
                홀드
              </Radio>
              <Radio value={4} text="위임">
                위임
              </Radio>
              <Radio value={5} text="실무자검토">
                실무자검토
              </Radio>
            </Radio.Group>
          </div>
          <div>
            <p>의견</p>
            <TextArea rows={8} value={queData.OPINION} onChange={e => this.props.setOpinion(e.target.value)} />
          </div>
        </div>
      </AntdModal>
    );
  }
}

MdcsOpinionModal.propTypes = {
  queData: PropTypes.object,
  opinionVisible: PropTypes.bool,
  setOpinionVisible: PropTypes.func,
  setOpinion: PropTypes.func,
  reqApprove: PropTypes.func,
  changeQueDraftData: PropTypes.func,
};

MdcsOpinionModal.defaultProps = {
  queData: {},
  opinionVisible: false,
};

export default MdcsOpinionModal;
