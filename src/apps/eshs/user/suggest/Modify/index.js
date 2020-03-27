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

  saveTask = (id, reloadId, callbackFunc) => {
    const { modifyTask } = this.props;
    modifyTask(id, typeof callbackFunc === 'function' ? callbackFunc : this.saveTaskAfter);
  };

  saveTaskAfter = (id, workSeq, taskSeq, formData, baseid) => {
    const { onCloseModalHandler, changeViewPage } = this.props;
    if (typeof onCloseModalHandler === 'function') {
      changeViewPage(baseid, workSeq, -1, 'LIST');
      onCloseModalHandler();
    }
    if (typeof changeViewPage === 'function') {
      changeViewPage(id, workSeq, taskSeq, 'VIEW');
    }
  };

  render = () => {
    const { sagaKey: id, viewLayer, loadingComplete, viewPageData, changeViewPage } = this.props;

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
                Save
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
  loadingComplete: PropTypes.func,
};

ModifyPage.defaultProps = {
  loadingComplete: () => {},
};

export default ModifyPage;
