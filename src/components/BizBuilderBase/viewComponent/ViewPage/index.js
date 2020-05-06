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
import { DefaultStyleInfo } from 'components/BizBuilder/DefaultStyleInfo';

// import Loadable from 'components/Loadable';
// import Loading from 'components/BizBuilderBase/viewComponent/Common/Loading';

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
      // const StyledWrap = Loadable({
      //   loader: () => import(`commonStyled/${workInfo.BUILDER_STYLE_PATH}`),
      //   loading: Loading,
      // });
      const StyledWrap = DefaultStyleInfo(workInfo.BUILDER_STYLE_PATH);
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
    const { sagaKey: id, reloadId, viewLayer, viewPageData, changeViewPage, draftId, deleteTask, isBuilderModal, ViewCustomButtons } = this.props;

    const { StyledWrap } = this.state;

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
              <div className="alignRight">
                <StyledButton className="btn-primary btn-first" onClick={() => changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'MODIFY')}>
                  Modify
                </StyledButton>
                <Popconfirm
                  title="Are you sure delete this task?"
                  onConfirm={() =>
                    deleteTask(id, reloadId, viewPageData.workSeq, viewPageData.taskSeq, !isBuilderModal ? changeViewPage : this.builderModalClose)
                  }
                  okText="Yes"
                  cancelText="No"
                >
                  <StyledButton className="btn-light btn-first">Delete</StyledButton>
                </Popconfirm>
                <StyledButton className="btn-light btn-first" onClick={() => changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'REVISION')}>
                  Revision
                </StyledButton>
                {!isBuilderModal && (
                  <StyledButton className="btn-light btn-first" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'LIST')}>
                    List
                  </StyledButton>
                )}
              </div>
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
