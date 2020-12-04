import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import BizBuilderBase from 'components/BizBuilderBase';
import StyledContentsModal from 'commonStyled/MdcsStyled/Modal/StyledContentsModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const AntdModal = StyledContentsModal(Modal);

class ValidityView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coverView: { workSeq: undefined, taskSeq: undefined, viewMetaSeq: undefined, visible: false, viewType: 'VIEW' },
    };
  }

  componentDidMount() {}

  clickCoverView = (workSeq, taskSeq, viewMetaSeq) => {
    const coverView = { workSeq, taskSeq, viewMetaSeq, visible: true, viewType: 'VIEW' };
    this.setState({ coverView });
  };

  onCloseCoverView = () => {
    const { coverView } = this.state;
    const tempCoverView = { ...coverView, visible: false };
    this.setState({ coverView: tempCoverView });
  };

  render() {
    const { WORK_SEQ, TASK_SEQ } = this.props;
    const { coverView } = this.state;

    return (
      <>
        <BizBuilderBase
          sagaKey="standardDocView"
          workSeq={WORK_SEQ}
          taskSeq={TASK_SEQ}
          viewType="VIEW"
          clickCoverView={this.clickCoverView}
          ViewCustomButtons={() => false}
        />
        <AntdModal
          className="modalWrapper modalTechDoc modalCustom"
          title="표지 보기"
          width={800}
          destroyOnClose
          visible={coverView.visible}
          onCancel={this.onCloseCoverView}
          footer={[]}
        >
          <BizBuilderBase
            sagaKey="CoverView"
            viewType={coverView.viewType}
            workSeq={coverView.workSeq}
            taskSeq={coverView.taskSeq}
            viewMetaSeq={coverView.viewMetaSeq}
            onCloseCoverView={this.onCloseCoverView}
            onCloseModalHandler={this.onClickModifyDoCoverView}
            ViewCustomButtons={({ onCloseCoverView }) => (
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <StyledButton className="btn-primary btn-sm" onClick={onCloseCoverView}>
                  닫기
                </StyledButton>
              </div>
            )}
          />
        </AntdModal>
      </>
    );
  }
}

ValidityView.propTypes = {
  WORK_SEQ: PropTypes.number,
  TASK_SEQ: PropTypes.number,
};

export default ValidityView;
