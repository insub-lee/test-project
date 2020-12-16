import React, { Component } from 'react';
import StyledContents from './StyledContents';
import ActionDataTable from './ActionDataTable';

class SubActionDataBody extends Component {
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
    const { viewFilter, actionData } = this.props;
    return (
      <StyledContents className={`${isExpanded ? 'expanded' : ''}`}>
        <div className="sub_wrap">
          <div className="sub_tit2">
            <span className="small">유형별 조치현황</span>
            <div className="btn_wrap">
              <button type="button" className={`icon icon_arr_big ${isExpanded ? 'on' : ''}`} onClick={this.toggleExpanded}>
                축소/확대
              </button>
            </div>
          </div>
          <div className="sub_con">
            <ActionDataTable data={viewFilter === 'ALL' ? actionData : actionData.filter(item => item.key === viewFilter)} />
          </div>
        </div>
      </StyledContents>
    );
  }
}

export default SubActionDataBody;
