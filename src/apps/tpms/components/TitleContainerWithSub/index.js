import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ContainerWrapper from './ContainerWrapper';
import TitleWrap from './TitleWrap';
import BodyWrap from './BodyWrap';

class TitleContainerWithSub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      isCollapsed: false,
    };
    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
    this.disableExpanded = this.disableExpanded.bind(this);
  }

  toggleExpanded() {
    const { enableFixView, disableFixView } = this.props;
    this.setState(
      prevState => ({
        isExpanded: !prevState.isExpanded,
        isCollapsed: false,
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

  disableExpanded() {
    const { disableFixView } = this.props;
    this.setState(
      {
        isExpanded: false,
        // isCollapsed: false,
      },
      () => disableFixView(),
    );
  }

  toggleCollapsed() {
    this.setState(prevState => ({
      isCollapsed: !prevState.isCollapsed,
    }));
  }

  render() {
    const { isExpanded, isCollapsed } = this.state;
    const { title, nav, useCount, count, useCollapsed, mainbody, subbody } = this.props;

    return (
      <ContainerWrapper>
        <TitleWrap>
          <div className="big">{title}</div>
          <div className="navigation">
            <span className="icon icon_home">HOME</span>
            {nav.map(item => (
              <React.Fragment key={item.title}>
                <span style={{ margin: '0 6px' }}>/</span>
                <span style={{ color: '#777777' }}>{item.title}</span>
              </React.Fragment>
            ))}
          </div>
        </TitleWrap>
        <BodyWrap className={`${isExpanded ? 'expanded' : ''}`}>
          <div className="sub_tit2">
            <span className="sub_title">{nav.length > 0 ? nav[nav.length - 1].title : ''}</span>
            {useCount && (
              <>
                <span className="line" />
                <span className="count">{count}건</span>
              </>
            )}
            <div className="btn_wrap">
              <button type="button" className={`icon_expanded ${isExpanded ? 'active' : ''}`} onClick={this.toggleExpanded}>
                축소/확대
              </button>
              {useCollapsed && (
                <button type="button" className={`icon_opener ${isCollapsed ? 'active' : ''}`} onClick={this.toggleCollapsed} disabled={isExpanded}>
                  열기/닫기
                </button>
              )}
            </div>
          </div>
          <div className={`sub_con ${isCollapsed ? 'collapsed' : ''}`}>{mainbody}</div>
        </BodyWrap>
        {subbody}
      </ContainerWrapper>
    );
  }
}

TitleContainerWithSub.propTypes = {
  title: PropTypes.string,
  nav: PropTypes.arrayOf(PropTypes.object),
  useCollapsed: PropTypes.bool,
  count: PropTypes.number,
  enableFixView: PropTypes.func,
  disableFixView: PropTypes.func,
  useCount: PropTypes.bool,
  mainbody: PropTypes.element,
  subbody: PropTypes.element,
};

TitleContainerWithSub.defaultProps = {
  title: null,
  nav: [],
  useCollapsed: false,
  useCount: false,
  count: 0,
  enableFixView: () => {},
  disableFixView: () => {},
  mainbody: null,
  subbody: null,
};

export default TitleContainerWithSub;
