import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popconfirm } from 'antd';

import { isJSON } from 'utils/helpers';
import SignLine from 'apps/Workflow/SignLine';
import ApproveHistory from 'apps/Workflow/ApproveHistory';
import Sketch from 'components/BizBuilder/Sketch';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import View from 'components/BizBuilder/PageComp/view';

class ViewPage extends Component {
  componentDidMount() {
    const { sagaKey: id, draftId } = this.props;
    if (draftId !== -1) {
      this.props.getDraftProcess(id, draftId);
    }
  }

  // state값 reset테스트
  // componentWillUnmount() {
  //   const { removeReduxState, id } = this.props;
  //   removeReduxState(id);
  // }

  render = () => {
    const { sagaKey: id, viewLayer, viewPageData, changeViewPage, draftId, deleteTask, isBuilderModal } = this.props;

    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerData = JSON.parse(viewLayer[0].CONFIG).property || {};
      const { bodyStyle } = viewLayerData;

      return (
        <StyledViewDesigner>
          <Sketch {...bodyStyle}>
            {draftId !== -1 && <SignLine id={id} draftId={draftId} />}
            <View key={`${id}_${viewPageData.viewType}`} {...this.props} readOnly />
            {draftId !== -1 && <ApproveHistory draftId={draftId} />}
            <div className="alignRight">
              <Popconfirm
                title="Are you sure delete this task?"
                onConfirm={() => deleteTask(id, id, viewPageData.workSeq, viewPageData.taskSeq, changeViewPage)}
                okText="Yes"
                cancelText="No"
              >
                <StyledButton className="btn-primary">Delete</StyledButton>
              </Popconfirm>
              <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'MODIFY')}>
                Modify
              </StyledButton>
              <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'REVISION')}>
                Revision
              </StyledButton>
              {!isBuilderModal && (
                <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'LIST')}>
                  List
                </StyledButton>
              )}
            </div>
          </Sketch>
        </StyledViewDesigner>
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
