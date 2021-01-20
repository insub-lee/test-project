import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import BizBuilderBase from 'components/BizBuilderBase';
import StyledContentsModal from 'commonStyled/MdcsStyled/Modal/StyledContentsModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import JasperViewer from 'components/JasperViewer';

const AntdModal = StyledContentsModal(Modal);

class ValidityView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coverView: { workSeq: undefined, taskSeq: undefined, viewMetaSeq: undefined, visible: false, viewType: 'VIEW' },
      jasperView: {
        visible: false,
        src: '',
      },
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

  // 재스퍼 리포트 보기
  clickJasperView = src => {
    this.setState({ jasperView: { visible: true, src } });
  };

  onCloseJasperView = () => {
    this.setState({
      jasperView: {
        visible: false,
        src: '',
      },
    });
  };

  render() {
    const { WORK_SEQ, TASK_SEQ } = this.props;
    const { coverView, jasperView } = this.state;

    return (
      <>
        <BizBuilderBase
          sagaKey="validityView"
          workSeq={WORK_SEQ}
          taskSeq={TASK_SEQ}
          viewType="VIEW"
          clickCoverView={this.clickCoverView}
          clickJasperView={this.clickJasperView}
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
        <AntdModal
          className="JasperModal"
          title="리포트 보기"
          visible={jasperView.visible}
          footer={null}
          width={900}
          initialWidth={900}
          okButtonProps={null}
          onCancel={this.onCloseJasperView}
          destroyOnClose
        >
          <JasperViewer title="JasperView" src={jasperView.src} />
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
