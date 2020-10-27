import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ContainerWrapper from './ContainerWrapper';
import TitleWrap from './TitleWrap';
import BodyWrap from './BodyWrap';

class ExpandableTitleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      isCollapsed: false,
    };
    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
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

  toggleCollapsed() {
    this.setState(prevState => ({
      isCollapsed: !prevState.isCollapsed,
    }));
  }

  render() {
    const { isExpanded, isCollapsed } = this.state;
    const {
      title,
      nav,
      children,
      useCount,
      count,
      // customElement, 20181116 메뉴 숨김 처리
      useCollapsed,
      actionBtns,
    } = this.props;

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
              {actionBtns}
              <button type="button" className={`icon_expanded ${isExpanded ? 'active' : ''}`} onClick={this.toggleExpanded}>
                축소/확대
              </button>
              {useCollapsed && (
                <button type="button" className={`icon_opener ${isCollapsed ? 'active' : ''}`} onClick={this.toggleCollapsed}>
                  열기/닫기
                </button>
              )}
            </div>
            {/* {customElement} 20181116 메뉴 숨김 처리 */}
          </div>
          <div className={`sub_con ${isCollapsed ? 'collapsed' : ''}`}>{children}</div>
        </BodyWrap>
      </ContainerWrapper>
    );
  }
}

ExpandableTitleContainer.propTypes = {
  title: PropTypes.string,
  nav: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  useCollapsed: PropTypes.bool,
  count: PropTypes.number,
  actionBtns: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  useCount: PropTypes.bool,
  enableFixView: PropTypes.func,
  disableFixView: PropTypes.func,
};

ExpandableTitleContainer.defaultProps = {
  title: null,
  nav: [],
  children: null,
  useCollapsed: false,
  count: 0,
  actionBtns: [],
  useCount: false,
  enableFixView: () => false,
  disableFixView: () => false,
};

export default ExpandableTitleContainer;
