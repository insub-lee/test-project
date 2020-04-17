import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isJSON } from 'utils/helpers';
import SignLine from 'apps/Workflow/SignLine';
import ApproveHistory from 'apps/Workflow/ApproveHistory';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import View from 'components/BizBuilder/PageComp/view';
import Sketch from './Sketch';

class ContentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
    };
  }

  componentDidMount() {
    const { id, draftId } = this.props;
    if (draftId !== -1) {
      this.props.getDraftProcess(id, draftId);
    }
  }

  // state값 reset테스트
  componentWillUnmount() {
    const { removeReduxState, id } = this.props;
    console.debug('state값 reset테스트');
    // removeReduxState(id);
  }

  render = () => {
    const { id, viewLayer, loadingComplete, viewPageData, draftId } = this.props;

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
            {draftId !== -1 && <SignLine id={id} draftId={draftId} />}
            <View key={`${id}_${viewPageData.viewType}`} {...this.props} readOnly />
            {draftId !== -1 && <ApproveHistory draftId={draftId} />}
          </Sketch>
        </StyledViewDesigner>
      );
    }
    return '';
  };
}

ContentView.propTypes = {
  id: PropTypes.string,
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

ContentView.defaultProps = {
  draftId: -1,
  draftProcess: [],
  loadingComplete: () => {},
};

export default ContentView;
