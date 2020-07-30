import React, { Component } from 'react';

import BizBuilderBase from 'components/BizBuilderBase';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';

class ModalView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { viewType, workSeq, taskSeq, closeBtnFunc, clickCoverView } = this.props;
    return (
      <BizBuilderBase
        sagaKey="SearchView"
        viewType={viewType}
        workSeq={workSeq}
        taskSeq={taskSeq}
        clickCoverView={clickCoverView}
        closeBtnFunc={closeBtnFunc}
        ViewCustomButtons={({ closeBtnFunc: onClickClose, isTaskFavorite, sagaKey, formData, setTaskFavorite }) => (
          <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
            {isTaskFavorite && (
              <StyledButton
                className="btn-primary mr5 btn-sm"
                onClick={() => setTaskFavorite(sagaKey, formData.WORK_SEQ, formData.TASK_ORIGIN_SEQ, formData.BUILDER_TASK_FAVORITE || 'N')}
              >
                {formData.BUILDER_TASK_FAVORITE === 'Y' ? '즐겨찾기 해제' : '즐겨찾기 추가'}
              </StyledButton>
            )}
            <StyledButton className="btn-primary btn-sm mr5" onClick={() => this.onClickDownLoad(formData)}>
              다운로드 신청
            </StyledButton>
            <StyledButton className="btn-light btn-sm" onClick={onClickClose}>
              닫기
            </StyledButton>
          </StyledButtonWrapper>
        )}
      />
    );
  }
}

export default ModalView;
