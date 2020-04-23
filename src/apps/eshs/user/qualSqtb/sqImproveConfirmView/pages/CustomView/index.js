import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popconfirm } from 'antd';

import { isJSON } from 'utils/helpers';
import SignLine from 'apps/Workflow/SignLine';
import ApproveHistory from 'apps/Workflow/ApproveHistory';
import Sketch from 'components/BizBuilder/Sketch';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import View from 'components/BizBuilder/PageComp/view';
import Loadable from 'components/Loadable';

import Header from 'apps/eshs/user/qualSqtb/sqConfirmRequest/pages/Header';

import Loading from 'components/BizBuilderBase/viewComponent/Common/Loading';

class ViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StyledWrap: StyledViewDesigner,
    };
  }

  componentDidMount() {
    const { sagaKey: id, draftId, workInfo } = this.props;

    if (workInfo.BUILDER_STYLE_PATH) {
      const StyledWrap = Loadable({
        loader: () => import(`commonStyled/${workInfo.BUILDER_STYLE_PATH}`),
        loading: Loading,
      });
      this.setState({ StyledWrap });
    }

    if (draftId !== -1) {
      this.props.getDraftProcess(id, draftId);
    }
  }

  builderModalClose = () => {
    const { changeBuilderModalStateByParent } = this.props;
    changeBuilderModalStateByParent(false, 'INPUT', -1, -1);
  };

  render = () => {
    const {
      sagaKey: id,
      reloadId,
      viewLayer,
      viewPageData,
      changeViewPage,
      draftId,
      deleteTask,
      isBuilderModal,
      ViewCustomButtons,
      formData,
      setFormData,
      submitExtraHandler,
      getExtraApiData,
      extraApiData,
      changeFormData,
    } = this.props;

    const { StyledWrap } = this.state;

    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerData = JSON.parse(viewLayer[0].CONFIG).property || {};
      const { bodyStyle } = viewLayerData;
      return (
        <StyledWrap className={viewPageData.viewType}>
          <Sketch {...bodyStyle}>
            <Header
              sagaKey={id}
              formData={formData}
              viewPageData={{ ...viewPageData, viewType: 'CONFIRM_VIEW' }}
              setFormData={setFormData}
              changeViewPage={changeViewPage}
              deleteTask={deleteTask}
              modifySaveTask={() => this.saveBeforeProcess(id, reloadId || id, this.saveTask)}
              btnOnlySearch
              submitExtraHandler={submitExtraHandler}
              getExtraApiData={getExtraApiData}
              extraApiData={extraApiData}
              changeFormData={changeFormData}
            />
            {draftId !== -1 && <SignLine id={id} draftId={draftId} />}
            <View key={`${id}_${viewPageData.viewType}`} {...this.props} readOnly />
            {draftId !== -1 && <ApproveHistory draftId={draftId} />}
          </Sketch>
        </StyledWrap>
      );
    }
    return '';
  };
}

ViewPage.propTypes = {
  sagaKey: PropTypes.string,
  draftId: PropTypes.number,
  getDraftProcess: PropTypes.func,
  extraApiData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  formData: PropTypes.object,
  compProps: PropTypes.object,
  viewLayer: PropTypes.array,
  draftProcess: PropTypes.array,
  viewType: PropTypes.string,
  isLoading: PropTypes.bool,
  removeReduxState: PropTypes.func,
  reloadId: PropTypes.string,
  viewPageData: PropTypes.object,
  changeViewPage: PropTypes.func,
  deleteTask: PropTypes.func,
  isBuilderModal: PropTypes.any,
  ViewCustomButtons: PropTypes.any,
  submitExtraHandler: PropTypes.func,
  changeFormData: PropTypes.func,
  setFormData: PropTypes.func,
};

ViewPage.defaultProps = {
  draftId: -1,
  draftProcess: [],
  setFormData: () => {},
};

export default ViewPage;
