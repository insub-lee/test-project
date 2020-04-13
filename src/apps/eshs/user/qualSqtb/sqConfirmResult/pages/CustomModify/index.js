import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, message } from 'antd';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as selectors from 'containers/common/Auth/selectors';

import { isJSON } from 'utils/helpers';
import Sketch from 'components/BizBuilder/Sketch';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import View from 'components/BizBuilder/PageComp/view';
import { CHANGE_VIEW_OPT_SEQ } from 'components/BizBuilder/Common/Constants';
import moment from 'moment';

import InterLock from 'apps/eshs/user/qualSqtb/sqtbEquipMgt/pages/InterLock';
import Material from 'apps/eshs/user/qualSqtb/sqtbEquipMgt/pages/Material';
import Header from 'apps/eshs/user/qualSqtb/sqConfirmRequest/pages/Header';

class ModifyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadFileList: [],
      qualTaskSeq: 0,
    };
  }

  componentDidMount() {
    const { sagaKey: id, formData, getExtraApiData } = this.props;
    const USER_ID = (formData && formData.REG_USER_ID) || 0;
    const apiArray = [
      {
        key: 'info',
        url: '/api/eshs/v1/common/userinfowithgender',
        type: 'POST',
        params: { PARAM: { USER_ID } },
      },
    ];

    getExtraApiData(id, apiArray, this.appStart);
  }

  appStart = sagaKey => {
    const { setFormData, formData, extraApiData } = this.props;
    const userInfo = (extraApiData && extraApiData.info && extraApiData.info.userInfo) || {};
    console.debug('new Data ', moment(new Date()).format('YYYY-MM-DD'));
    setFormData(sagaKey, {
      ...formData,
      REQ_EMP_NO: userInfo.EMP_NO,
      REQ_INTRA_PHONE: userInfo.OFFICE_TEL_NO,
      REQ_EMP_NM: userInfo.NAME,
      REQ_DEPT_NM: userInfo.DEPT,
      EXAM_DT: moment(new Date()).format('YYYY-MM-DD'),
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      formData,
      formData: { interLockReload = '', materialReload = '' },
      sagaKey,
      changeFormData,
      setFormData,
    } = nextProps;
    const qualTaskSeq = (nextProps.formData && nextProps.formData.CHILDREN_TASK_SEQ) || 0;

    if (prevState.qualTaskSeq !== qualTaskSeq) {
      if (typeof interLockReload === 'function') {
        interLockReload(qualTaskSeq);
      }
      if (typeof materialReload === 'function') {
        materialReload(qualTaskSeq);
      }
      changeFormData(sagaKey, 'EQUIP_TASK_SEQ', qualTaskSeq);
      return { qualTaskSeq };
    }
    return null;
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
    const { modifyTask } = this.props;
    modifyTask(id, reloadId, typeof callbackFunc === 'function' ? callbackFunc : this.saveTaskAfter);
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
        changeViewPage(id, workSeq, taskSeq, 'VIEW');
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
      formData,
      setFormData,
      extraApiData,
      getExtraApiData,
      changeFormData,
      deleteTask,
    } = this.props;

    const { qualTaskSeq } = this.state;
    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerData = JSON.parse(viewLayer[0].CONFIG).property || {};
      const { bodyStyle } = viewLayerData;
      return (
        <StyledViewDesigner>
          <Sketch {...bodyStyle}>
            <Header
              sagaKey={id}
              formData={formData}
              viewPageData={viewPageData}
              setFormData={setFormData}
              changeViewPage={changeViewPage}
              deleteTask={deleteTask}
              modifySaveTask={() => this.saveBeforeProcess(id, reloadId || id, this.saveTask)}
            />
            <View key={`${id}_${viewPageData.viewType}`} {...this.props} />
            <InterLock
              id={id}
              formData={{ ...formData, TASK_SEQ: qualTaskSeq }}
              changeFormData={changeFormData}
              getExtraApiData={getExtraApiData}
              extraApiData={extraApiData}
              viewPageData={{ viewType: 'VIEW' }}
            />
            <Material
              id={id}
              formData={{ ...formData, TASK_SEQ: qualTaskSeq }}
              changeFormData={changeFormData}
              getExtraApiData={getExtraApiData}
              extraApiData={extraApiData}
              viewPageData={{ viewType: 'VIEW' }}
            />
          </Sketch>
        </StyledViewDesigner>
      );
    }
    return '';
  };
}

ModifyPage.propTypes = {
  isLoading: PropTypes.bool,
  formData: PropTypes.object,
  changeFormData: PropTypes.func,
  deleteTask: PropTypes.func,
  extraApiData: PropTypes.any,
  setFormData: PropTypes.func,
};

ModifyPage.defaultProps = {
  isLoading: false,
  formData: {},
  changeFormData: () => {},
  deleteTask: () => {},
  setFormData: () => {},
};

export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(ModifyPage);
