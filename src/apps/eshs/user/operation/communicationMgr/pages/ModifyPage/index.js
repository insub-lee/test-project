import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isJSON } from 'utils/helpers';
import Sketch from 'components/BizBuilder/Sketch';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import View from 'components/BizBuilder/PageComp/view';

class ModifyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
    };
  }

  // state값 reset테스트
  // componentWillUnmount() {
  //   const { removeReduxState, id } = this.props;
  //   removeReduxState(id);
  // }

  // componentDidMount() {
  //   const { sagaKey: id, setViewType, workSeq, taskSeq, setViewPageData } = this.props;
  //   console.debug(this.props.viewType, this.props.viewPageData.viewType);
  //   setViewType(id, 'MODIFY');
  //   setViewPageData(id, workSeq, taskSeq, 'MODIFY');
  //   console.debug(this.props.viewType, this.props.viewPageData.viewType);
  // }

  saveTask = (id, reloadId, callbackFunc) => {
    const { modifyTask } = this.props;
    modifyTask(id, typeof callbackFunc === 'function' ? callbackFunc : this.saveTaskAfter);
  };

  saveTaskAfter = (id, workSeq, taskSeq, formData) => {
    const { onCloseModalHandler, changeViewPage, baseSagaKey } = this.props;
    if (typeof onCloseModalHandler === 'function') {
      onCloseModalHandler();
      changeViewPage(baseSagaKey, workSeq, -1, 'LIST');
    }
  };

  render = () => {
    const { sagaKey: id, viewLayer, loadingComplete, viewPageData } = this.props;
    console.debug('@@@@@MODIFY PAGE', this.props.viewPageData.viewType);
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
            <View key={`${id}_${viewPageData.viewType}`} {...this.props} />
            <div className="alignRight">
              <StyledButton className="btn-primary" onClick={() => this.saveTask(id, id, this.saveTaskAfter)}>
                저장
              </StyledButton>
            </div>
          </Sketch>
        </StyledViewDesigner>
      );
    }
    return '';
  };
}

ModifyPage.propTypes = {
  sagaKey: PropTypes.string,
  viewLayer: PropTypes.array,
  isLoading: PropTypes.bool,
  loadingComplete: PropTypes.func,
  viewPageData: PropTypes.func,
  changeViewPage: PropTypes.func,
  taskSeq: PropTypes.string,
  formData: PropTypes.object,
  setViewType: PropTypes.func,
  onCloseModalHandler: PropTypes.func,
  baseSagaKey: PropTypes.string,
  modifyTask: PropTypes.func,
};

export default ModifyPage;
