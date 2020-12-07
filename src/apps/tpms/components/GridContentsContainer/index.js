import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

class GridContentsContainer extends Component {
  constructor(props) {
    super(props);

    this.btnClickHandler = this.btnClickHandler.bind(this);
    this.getOffSetTop = this.getOffSetTop.bind(this);
  }

  getOffSetTop(scrollDuration) {
    const scrollHeight = window.scrollY;

    const scrollStep = Math.PI / (scrollDuration / 15);

    const cosParameter = scrollHeight / 2;
    let scrollCount = 0;

    let scrollMargin;

    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        scrollCount += 1;
        scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
        window.scrollTo(0, scrollHeight - scrollMargin);
      } else clearInterval(scrollInterval);
    }, 15);
  }

  btnClickHandler() {
    const { keyValue, expanded } = this.props;
    this.props.stateChangeFunc(expanded ? -1 : keyValue);
    this.getOffSetTop(500);
  }

  render() {
    const { title, count, children, tableSize, icons, buttons, expanded, limitedSmallView } = this.props;
    return (
      <Wrapper className="small_wrap" limitedSmallView={limitedSmallView}>
        <div className="sub_tit2">
          <span className="icon icon_docu" />
          <span className="big">{title}</span>
          <span className="line" />
          <span className="small">{count}건</span>
          <div className="btn_wrap">
            {buttons.map(button => (
              <button key={button.key} type="button" className="btn small border_w" onClick={button.onClick}>
                {button.name}
              </button>
            ))}
            <button type="button" className={`icon ${expanded ? 'icon_arr_small' : 'icon_arr_big'}`} onClick={this.btnClickHandler}>
              {tableSize === 'large' ? '축소' : '확대'}
            </button>
          </div>
          <ul className="sub_ing">
            {icons.map(icon => (
              <li key={icon.key}>
                <span className={`icon ${icon.class}`} /> {icon.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="sub_con">{children}</div>
      </Wrapper>
    );
  }
}

GridContentsContainer.propTypes = {
  keyValue: PropTypes.number,
  title: PropTypes.string,
  count: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  tableSize: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.object),
  icons: PropTypes.arrayOf(PropTypes.object),
  expanded: PropTypes.bool,
  stateChangeFunc: PropTypes.func,
  limitedSmallView: PropTypes.bool,
};

GridContentsContainer.defaultProps = {
  keyValue: 0,
  title: '',
  count: 0,
  children: [],
  tableSize: '',
  buttons: [],
  icons: [],
  expanded: false,
  stateChangeFunc: () => false,
  limitedSmallView: false,
};

export default GridContentsContainer;
