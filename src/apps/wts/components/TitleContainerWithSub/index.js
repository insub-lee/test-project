import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ContainerWrapper from './ContainerWrapper';
import TitleWrap from './TitleWrap';
import BodyWrap from './BodyWrap';

class ReportTitleContainer extends Component {
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
    const {
      title,
      nav,
      children,
      useCount,
      count,
      // customElement, 20181116 메뉴 숨김 처리
      useCollapsed,
      mainbody,
      subbody,
    } = this.props;

    return (
      <ContainerWrapper>
        <TitleWrap>
          <div className="big">{title}</div>
          <div className="navigation">
            <span className="icon icon_home">HOME</span>
            {nav.map(item => {
              if (item.link === '#') {
                return (
                  <React.Fragment key={item.link}>
                    <span style={{ margin: '0 6px' }}>/</span>
                    <span style={{ color: '#777777' }}>{item.title}</span>
                  </React.Fragment>
                );
              }
              return (
                <React.Fragment key={item.link}>
                  <span style={{ margin: '0 6px' }}>/</span>
                  <NavLink to={item.link} style={{ color: '#777777' }} activeClassName="here">
                    <span>{item.title}</span>
                  </NavLink>
                </React.Fragment>
              );
            })}
          </div>
        </TitleWrap>
        <BodyWrap className={`${isExpanded ? 'expanded' : ''}`}>
          <div className="sub_tit2">
            <span className="sub_title">{nav.length > 0 ? nav[nav.length - 1].title : ''}</span>
            {useCount && (
              <React.Fragment>
                <span className="line" />
                <span className="count">{count}건</span>
              </React.Fragment>
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

ReportTitleContainer.propTypes = {
  title: PropTypes.string,
  nav: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  useCollapsed: PropTypes.bool,
  count: PropTypes.number,
};

ReportTitleContainer.defaultProps = {
  title: null,
  nav: [],
  children: null,
  useCollapsed: false,
  count: 0,
};

export default ReportTitleContainer;
