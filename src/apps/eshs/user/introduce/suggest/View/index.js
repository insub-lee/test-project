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

class ViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
    };
  }

  componentDidMount() {
    const { sagaKey: id, draftId } = this.props;
    if (draftId !== -1) {
      this.props.getDraftProcess(id, draftId);
    }
  }

  deleteTaskModal = (id, workSeq, taskSeq, changeViewPage) => {
    const { deleteTask, baseid, onCloseModalHandler } = this.props;
    deleteTask(id, baseid, workSeq, taskSeq, changeViewPage);
    onCloseModalHandler();
  };

  // state값 reset테스트
  // componentWillUnmount() {
  //   const { removeReduxState, id } = this.props;
  //   removeReduxState(id);
  // }

  render = () => {
    const { sagaKey: id, viewLayer, loadingComplete, viewPageData, changeViewPage, draftId, onReplyChange, formData } = this.props;

    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerData = JSON.parse(viewLayer[0].CONFIG).property || {};
      const { bodyStyle } = viewLayerData;

      // 로딩
      if (this.props.isLoading === false && this.state.initLoading) {
        this.setState(
          {
            initLoading: false,
          },
          () => loadingComplete(),
        );
      }
      return (
        <StyledViewDesigner>
          <Sketch {...bodyStyle}>
            <View key={`${id}_${viewPageData.viewType}`} {...this.props} readOnly />
            <div className="alignRight">
              <StyledButton className="btn-primary">안전관계자발송</StyledButton>
              <StyledButton className="btn-primary" onClick={() => onReplyChange(formData)}>
                답변글
              </StyledButton>
              <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'MODIFY')}>
                수정
              </StyledButton>
              <Popconfirm
                title="Are you sure delete this task?"
                onConfirm={() => this.deleteTaskModal(id, viewPageData.workSeq, viewPageData.taskSeq, changeViewPage)}
                okText="Yes"
                cancelText="No"
              >
                <StyledButton className="btn-primary">삭제</StyledButton>
              </Popconfirm>
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
  loadingComplete: PropTypes.func,
  removeReduxState: PropTypes.func,
};

ViewPage.defaultProps = {
  draftId: -1,
  draftProcess: [],
  loadingComplete: () => {},
};

export default ViewPage;
