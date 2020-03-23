import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import { isJSON } from 'utils/helpers';
import Sketch from 'components/BizBuilder/Sketch';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import View from 'components/BizBuilder/PageComp/view';

class ModifyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadFileList: [],
    };
  }

  fileUploadComplete = (id, response, etcData) => {
    const { formData, changeFormData } = this.props;
    const { DETAIL } = response;
    const selectedAttach = formData[etcData];
    const { uploadFileList } = this.state;
    const tmpAttach = { ...selectedAttach, DETAIL };
    changeFormData(id, etcData, tmpAttach);
    const tmpFileList = uploadFileList.map(file => (file.COMP_FIELD === etcData ? { ...file, isComplete: true } : file));
    this.setState({ uploadFileList: tmpFileList }, () => {
      const { uploadFileList } = this.state;
      const isUploadComplete = uploadFileList.find(f => f.isComplete === false);
      if (!isUploadComplete) {
        this.saveTask(id, id, this.saveTaskAfter);
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
          uploadFileList.push({ COMP_FIELD, isComplete: false });
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
    const { reloadId, onCloseModleHandler, changeViewPage, isBuilderModal, isSaveModalClose, changeBuilderModalStateByParent } = this.props;
    if (typeof onCloseModleHandler === 'function') {
      onCloseModleHandler();
    }
    if (typeof changeViewPage === 'function') {
      changeViewPage(id, workSeq, taskSeq, 'VIEW');
    }
    if (isBuilderModal) {
      changeViewPage(reloadId, workSeq, -1, 'LIST');
      if (isSaveModalClose) changeBuilderModalStateByParent(false, 'INPUT', -1, -1);
    }
  };

  render = () => {
    const { sagaKey: id, viewLayer, viewPageData, changeViewPage, isBuilderModal, CustomButtons, isLoading, reloadId } = this.props;

    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerData = JSON.parse(viewLayer[0].CONFIG).property || {};
      const { bodyStyle } = viewLayerData;

      return (
        <StyledViewDesigner>
          <Sketch {...bodyStyle}>
            <View key={`${id}_${viewPageData.viewType}`} {...this.props} />
            {CustomButtons ? (
              <CustomButtons saveBeforeProcess={this.saveBeforeProcess} {...this.props} />
            ) : (
              <div className="alignRight">
                <Button type="primary" className="btn-primary" onClick={() => this.saveBeforeProcess(id, reloadId || id, this.saveTask)} loading={isLoading}>
                  Save
                </Button>
                {!isBuilderModal && (
                  <Button type="primary" className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'LIST')}>
                    List
                  </Button>
                )}
              </div>
            )}
          </Sketch>
        </StyledViewDesigner>
      );
    }
    return '';
  };
}

ModifyPage.propTypes = {
  isLoading: PropTypes.bool,
  // loadingComplete: PropTypes.func,
};

ModifyPage.defaultProps = {
  isLoading: false,
  // loadingComplete: () => {},
};

export default ModifyPage;
