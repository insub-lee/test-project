import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StyledContents from './StyledContents';
import ActionTrendChart from './ActionTrendChart';

class SubActionChartBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

  toggleExpanded() {
    const { enableFixView, disableFixView } = this.props;
    this.setState(
      prevState => ({
        isExpanded: !prevState.isExpanded,
      }),
      () => {
        if (this.state.isExpanded) {
          enableFixView();
        } else {
          disableFixView();
        }
      },
    );
  }

  render() {
    const { isExpanded } = this.state;
    const { actionTrendInfo = {} } = this.props;
    return (
      <StyledContents className={`${isExpanded ? 'expanded' : ''}`}>
        <div className="sub_wrap">
          <div className="sub_tit2">
            <span className="small">AREA별 조치현황 TREND</span>
            <div className="btn_wrap">
              <button
                type="button"
                className={`icon icon_arr_big ${isExpanded ? 'on' : ''}`}
                onClick={this.toggleExpanded}
              >
                축소/확대
              </button>
            </div>
          </div>
          <div className="sub_con">{actionTrendInfo.isLoaded && <ActionTrendChart info={actionTrendInfo?.data} />}</div>
        </div>
      </StyledContents>
    );
  }
}
SubActionChartBody.propTypes = {
  actionTrendInfo: PropTypes.shape({ isLoaded: PropTypes.bool, data: PropTypes.object }),
};

SubActionChartBody.defaultProps = { actionTrendInfo: { isLoaded: false, data: {} } };

export default SubActionChartBody;
