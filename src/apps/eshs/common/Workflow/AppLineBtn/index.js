import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'antd';

import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import CustomWorkProcess from 'apps/Workflow/CustomWorkProcess';

const AntdModal = StyledAntdModal(Modal);

class AppLineBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempProcessRule: {},
      modalObj: {
        title: '',
        visible: false,
        content: [],
      },
    };
  }

  componentDidMount() {}

  save = () => {
    const { setProcessRule } = this.props;
    const { tempProcessRule } = this.state;

    if (typeof setProcessRule === 'function') {
      setProcessRule(tempProcessRule);
    }
    return this.handleModal();
  };

  handleModal = (title = '', visible = false, content = []) => this.setState({ modalObj: { title, visible, content } });

  render() {
    const { processRule, prcId, draftId } = this.props;
    const {
      modalObj: { title, visible, content },
    } = this.state;
    return (
      <>
        <StyledButton
          className="btn-gray btn-sm btn-first"
          onClick={() =>
            this.handleModal('결재선', true, [
              <>
                <CustomWorkProcess
                  processRule={processRule}
                  PRC_ID={prcId}
                  draftId={draftId || -1}
                  viewType={draftId ? 'VIEW' : 'INPUT'}
                  setProcessRule={(_, prcRule) => this.setState({ tempProcessRule: prcRule })}
                />
                <StyledButtonWrapper className="btn-wrap-center btn-wrap-mb-10">
                  <StyledButton className="btn-primary btn-xxs btn-first" onClick={this.save}>
                    저장
                  </StyledButton>
                  <StyledButton className="btn-primary btn-xxs btn-first" onClick={() => this.handleModal('', false)}>
                    닫기
                  </StyledButton>
                </StyledButtonWrapper>
              </>,
            ])
          }
        >
          결재선
        </StyledButton>
        <AntdModal className="modal-table-pad" title={title} width="80%" visible={visible} destroyOnClose footer={null} onCancel={() => this.handleModal()}>
          {content}
        </AntdModal>
      </>
    );
  }
}

AppLineBtn.propTypes = {
  processRule: PropTypes.object,
  prcId: PropTypes.number,
  draftId: PropTypes.number,
  setProcessRule: PropTypes.func,
};

AppLineBtn.defaultProps = {
  processRule: {},
  prcId: undefined,
  draftId: undefined,
  setProcessRule: () => {},
};

export default AppLineBtn;
