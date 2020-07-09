import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popconfirm } from 'antd';

import { isJSON } from 'utils/helpers';
import SignLine from 'apps/Workflow/SignLine';
import ApproveHistory from 'apps/Workflow/ApproveHistory';
import Sketch from 'components/BizBuilder/Sketch';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import View from 'components/BizBuilder/PageComp/view';
import { DefaultStyleInfo } from 'components/BizBuilder/DefaultStyleInfo';
import { REVISION_OPT_CODE } from 'components/BizBuilder/Common/Constants';

// import Loadable from 'components/Loadable';
// import Loading from 'components/BizBuilderBase/viewComponent/Common/Loading';

class ViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StyledWrap: StyledViewDesigner,
      isRevision: false,
    };
  }

  componentDidMount() {
    const { sagaKey: id, draftId, workInfo } = this.props;

    if (workInfo.BUILDER_STYLE_PATH) {
      // const StyledWrap = Loadable({
      //   loader: () => import(`commonStyled/${workInfo.BUILDER_STYLE_PATH}`),
      //   loading: Loading,
      // });
      const StyledWrap = DefaultStyleInfo(workInfo.BUILDER_STYLE_PATH);
      this.setState({ StyledWrap });
    }

    if (workInfo && workInfo.OPT_INFO) {
      let isRevision = false;
      workInfo.OPT_INFO.forEach(opt => {
        if (opt.OPT_CODE === REVISION_OPT_CODE && opt.ISUSED === 'Y') isRevision = true;
      });
      this.setState({ isRevision });
    }

    if (draftId !== -1) {
      this.props.getDraftProcess(id, draftId);
    }
  }

  builderModalClose = () => {
    const { changeBuilderModalStateByParent } = this.props;
    if (typeof changeBuilderModalStateByParent === 'function') {
      changeBuilderModalStateByParent(false, 'INPUT', -1, -1);
    }
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
      isTaskFavorite,
      formData,
      setTaskFavorite,
    } = this.props;

    const { StyledWrap, isRevision } = this.state;

    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerData = JSON.parse(viewLayer[0].CONFIG).property || {};
      const { bodyStyle } = viewLayerData;

      return (
        <StyledWrap className={viewPageData.viewType}>
          <Sketch {...bodyStyle}>
            {draftId !== -1 && <SignLine id={id} draftId={draftId} />}
            <View key={`${id}_${viewPageData.viewType}`} {...this.props} readOnly />
            {draftId !== -1 && <ApproveHistory draftId={draftId} />}
            {ViewCustomButtons ? (
              <ViewCustomButtons {...this.props} />
            ) : (
              <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
                {isTaskFavorite && (
                  <StyledButton
                    className="btn-primary mr5 btn-sm"
                    onClick={() => setTaskFavorite(id, formData.WORK_SEQ, formData.TASK_ORIGIN_SEQ, formData.BUILDER_TASK_FAVORITE || 'N')}
                  >
                    {formData.BUILDER_TASK_FAVORITE === 'Y' ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                  </StyledButton>
                )}
                <StyledButton className="btn-primary mr5 btn-sm" onClick={() => changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'MODIFY')}>
                  수정
                </StyledButton>
                <Popconfirm
                  title="Are you sure delete this task?"
                  onConfirm={() =>
                    deleteTask(id, reloadId, viewPageData.workSeq, viewPageData.taskSeq, !isBuilderModal ? changeViewPage : this.builderModalClose)
                  }
                  okText="Yes"
                  cancelText="No"
                >
                  <StyledButton className="btn-light mr5 btn-sm">삭제</StyledButton>
                </Popconfirm>
                {isRevision && (
                  <StyledButton className="btn-light mr5 btn-sm" onClick={() => changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'REVISION')}>
                    새버전
                  </StyledButton>
                )}
                {!isBuilderModal && (
                  <StyledButton className="btn-light btn-sm" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'LIST')}>
                    목록
                  </StyledButton>
                )}
              </StyledButtonWrapper>
            )}
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
};

ViewPage.defaultProps = {
  draftId: -1,
  draftProcess: [],
};

export default ViewPage;
