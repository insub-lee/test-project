import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContainerWrapper from './ContainerWrapper';
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
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded,
    }));
  }

  toggleCollapsed() {
    this.setState(prevState => ({
      isCollapsed: !prevState.isCollapsed,
    }));
  }

  render() {
    const { isExpanded, isCollapsed } = this.state;
    const { title, children, useCollapsed } = this.props;

    return (
      <ContainerWrapper className="only_body">
        <BodyWrap className={`${isExpanded ? 'expanded' : ''}`}>
          <div className="sub_tit2">
            <span className="sub_title">{title}</span>
            <div className="btn_wrap">
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
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  useCollapsed: PropTypes.bool,
};

ExpandableTitleContainer.defaultProps = {
  title: null,
  children: null,
  useCollapsed: false,
};

export default ExpandableTitleContainer;
