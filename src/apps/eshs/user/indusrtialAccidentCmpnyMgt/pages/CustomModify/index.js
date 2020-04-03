import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { message, Popconfirm } from 'antd';

import { isJSON } from 'utils/helpers';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';

import View from 'components/BizBuilder/PageComp/view';
import { CHANGE_VIEW_OPT_SEQ } from 'components/BizBuilder/Common/Constants';

class CustomModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadFileList: [],
    };
  }

  fileUploadComplete = (id, response, etcData) => {
    const { formData, changeFormData } = this.props;
    const { DETAIL, code } = response;
    const selectedAttach = formData[etcData];
    const { uploadFileList } = this.state;
    const tmpAttach = { ...selectedAttach, DETAIL };
    changeFormData(id, etcData, tmpAttach);
    const tmpFileList = uploadFileList.map(file =>
      file.COMP_FIELD === etcData ? { ...file, isComplete: code === 200 || code === 300, isAttempted: true } : file,
    );
    this.setState({ uploadFileList: tmpFileList }, () => {
      const { uploadFileList } = this.state;

      let AttemptionCount = 0; // API 찌른 횟수
      let isCompleteCount = 0; // API 성공 횟수
      const limit = uploadFileList.length || 0; // 총 파일 갯수

      uploadFileList.forEach(e => {
        if (e.isAttempted === true) {
          // API 찌른 경우
          AttemptionCount++;
        }
        if (e.isComplete === true) {
          // API 성공 횟수
          isCompleteCount++;
        }
      });

      if (AttemptionCount === limit) {
        // 총 파일 갯수만큼 API를 찔렀는지
        if (isCompleteCount === limit) {
          // 총 파일 갯수만큼 API 정상 작동했는지
          this.saveTask(id, id, this.saveTaskAfter);
        } else {
          message.error('file upload 에러 발생 , 관리자에게 문의 바랍니다.!');
        }
      }
    });
  };

  filterAttach = field => {
    const config = JSON.parse(field.CONFIG);
    return config.info && config.info.isAttach;
  };

  saveBeforeProcess = (id, reloadId, callBackFunc) => {
    const { submitExtraHandler, formData, metaList } = this.props;
    const { uploadFileList } = this.state;
    const attachList = metaList && metaList.filter(mata => this.filterAttach(mata));
    // 첨부파일이 없는 경우 체크
    const isUploadByPass = attachList.filter(f => formData[f.COMP_FIELD]);
    if (isUploadByPass && isUploadByPass.length === 0) {
      this.saveTask(id, reloadId, this.saveTaskAfter);
    } else {
      attachList.map(attachItem => {
        const { COMP_FIELD } = attachItem;
        const attachInfo = formData[COMP_FIELD];
        if (attachInfo) {
          const { DETAIL, MOVEFILEAPI } = attachInfo;
          uploadFileList.push({ COMP_FIELD, isComplete: false, isAttempted: false });
          this.setState({ uploadFileList }, () => {
            const param = { PARAM: { DETAIL } };
            const moveFileApi = MOVEFILEAPI || '/upload/moveFileToReal';
            submitExtraHandler(id, 'POST', moveFileApi, param, this.fileUploadComplete, COMP_FIELD);
          });
        }
      });
    }
  };

  saveTask = (id, reloadId, callbackFunc) => {
    const {
      modifyTask,
      changeViewPage,
      listSagaKey,
      viewPageData: { workSeq },
    } = this.props;

    modifyTask(id, reloadId, () => changeViewPage(listSagaKey, workSeq, -1, 'LIST'));
  };

  saveTaskAfter = (id, workSeq, taskSeq, formData) => {
    const { reloadId, onCloseModalHandler, changeViewPage, isBuilderModal, isSaveModalClose, changeBuilderModalStateByParent, workInfo } = this.props;
    if (typeof onCloseModalHandler === 'function') {
      onCloseModalHandler();
    }
    if (typeof changeViewPage === 'function') {
      const changeViewOptIdx = workInfo.OPT_INFO.findIndex(opt => opt.OPT_SEQ === CHANGE_VIEW_OPT_SEQ);
      if (changeViewOptIdx !== -1) {
        const changeViewOpt = workInfo.OPT_INFO[changeViewOptIdx];
        const optValue = JSON.parse(changeViewOpt.OPT_VALUE);
        changeViewPage(id, workSeq, taskSeq, optValue.MODIFY);
      } else {
        message.success('수정되었습니다.');
      }
    }
    if (isBuilderModal) {
      changeViewPage(reloadId, workSeq, -1, 'LIST');
      if (isSaveModalClose) changeBuilderModalStateByParent(false, 'INPUT', -1, -1);
    }
  };

  render = () => {
    const {
      sagaKey: id,
      viewLayer,
      viewPageData,
      changeViewPage,
      isBuilderModal,
      ModifyCustomButtons,
      isLoading,
      reloadId,
      deleteTask,
      listSagaKey,
    } = this.props;

    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerData = JSON.parse(viewLayer[0].CONFIG).property || {};
      const { bodyStyle } = viewLayerData;

      return (
        <ContentsWrapper>
          <View key={`${id}_${viewPageData.viewType}`} {...this.props} />
          {ModifyCustomButtons ? (
            <ModifyCustomButtons saveBeforeProcess={this.saveBeforeProcess} {...this.props} />
          ) : (
            <div className="selSaveWrapper">
              <StyledButtonWrapper className="btn-wrap-inline">
                <StyledButton className="btn-primary btn-first" onClick={() => this.saveBeforeProcess(id, reloadId || id, this.saveTask)} loading={isLoading}>
                  수정
                </StyledButton>
                <Popconfirm
                  title="Are you sure ?"
                  onConfirm={() =>
                    deleteTask(id, listSagaKey, viewPageData.workSeq, viewPageData.taskSeq, () => changeViewPage(id, viewPageData.workSeq, -1, 'INPUT'))
                  }
                  okText="Yes"
                  cancelText="No"
                >
                  <StyledButton className="btn-primary btn-first">미사용</StyledButton>
                </Popconfirm>
                <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'INPUT')}>
                  RESET
                </StyledButton>
              </StyledButtonWrapper>
            </div>
          )}
        </ContentsWrapper>
      );
    }
    return '';
  };
}

CustomModify.propTypes = {
  isLoading: PropTypes.bool,
  // loadingComplete: PropTypes.func,
};

CustomModify.defaultProps = {
  isLoading: false,
  // loadingComplete: () => {},
};

export default CustomModify;
