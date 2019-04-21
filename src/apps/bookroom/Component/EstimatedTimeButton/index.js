import React from 'react';
import { Popover, Icon } from 'antd';
import PropTypes from 'prop-types';

import EstimatedTimeButtonWrapper from './styled';
import AddImage from '../../common/images/Add.png';
import RemoveImage from '../../common/images/Remove.png';

class EstimatedTimeButton extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false,

      // 버튼에 표시될 시간 (0.5 = 30분)
      estimatedTime: 0.5,
      estimatedTimeUpdate: 0.5,
      estimatedTimeString: '30분',
      estimatedTimeUpdateString: '30분',

      limitCount: props.limitTime * 2,
      limitCountCurrent: 1,

      content: null,
    };

    // 포탈의 global.css에서 스타일 적용

    this.footer = (
      <div style={{
        width: props.width,
        heigth: 45,
        textAlign: 'right',
      }}
        className="ant-estimated-time-subcontainer"
      >
        <button
          style={{
            background: 'transparent',
          }}
          onClick={this.getTime}
        >
          적용
        </button>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.limitCountCurrent !== prevState.limitCountCurrent) {
      this.setState({
        content: this.getContent(),
      });
    }

    if (this.state.isShow && !prevState.isShow) {
      this.setState({
        estimatedTimeUpdateString: this.state.estimatedTimeString,
        estimatedTime: this.state.estimatedTimeUpdate,
        limitCountCurrent: this.state.estimatedTimeUpdate * 2,
        content: this.getContent(),
      });
    }

    /*
      적용 버튼을 누르지 않고 화면의 다른 부분을 클릭하여
      모달을 종료했을 경우 처리
    */
    if (!this.state.isShow && prevState.isShow) {
      if (this.isSaved) {
        this.isSaved = false;
      } else {
        this.setState({
          estimatedTimeUpdate: this.state.estimatedTime,
          estimatedTimeUpdateString: this.state.estimatedTimeString,
        });
      }
    }
  }

  getContent = () => (
    <div style={{
      width: this.props.width,
      height: this.props.height,
      display: 'table',
      textAlign: 'center',
    }}
      className="ant-estimated-time-subcontainer"
    >
      <div
        style={{
          width: '100%',
          display: 'table-cell',
          verticalAlign: 'middle',
        }}
      >
        <span
          style={{
            cursor: 'pointer',
            marginRight: '20px',
            visibility: this.state.limitCountCurrent > 1 ? 'visible' : 'hidden',
          }}
        >
          <button
            style={{
              background: 'transparent',
            }}
            onClick={this.setLimitCountCurrentMinus}
          >
            <img
              src={RemoveImage}
              style={{
                width: 20,
                height: 20,
                verticalAlign: 'sub',
              }}
            />
          </button>
        </span>
        <span
          style={{
            fontSize: '1vw',
            display: 'inline-block',
            width: '90px',
          }}
        >
          {this.state.estimatedTimeUpdateString}
        </span>
        <span
          style={{
            cursor: 'pointer',
            marginLeft: '20px',
            visibility: this.state.limitCountCurrent < this.state.limitCount ? 'visible' : 'hidden',
          }}
        >
          <button
            style={{
              background: 'transparent',
            }}
            onClick={this.setLimitCountCurrentPlus}
          >
            <img
              src={AddImage}
              style={{
                width: 20,
                height: 20,
                verticalAlign: 'sub',
              }}
            />
          </button>
        </span>
      </div>
    </div>
  )

  getEstimatedTimeString = (t) => {
    const arr = t.toString().split('.');
    let h = '';
    let m = '';

    if (arr[0] !== '0') {
      h = `${arr[0]}시간`;
    }

    if (arr[1] && arr[1] !== '0') {
      m = `${arr[1] * 6}분`
    }

    return `${h} ${m}`;
  }

  getTime = () => {
    this.isSaved = true;
    this.setState({
      estimatedTimeString: this.state.estimatedTimeUpdateString,
      estimatedTime: this.state.estimatedTimeUpdate,
    }, () => {
      this.props.getTime(this.state.estimatedTimeUpdate);
      this.setIsShow();
    });
  }

  setIsShow = () => {
    this.setState({
      isShow: !this.state.isShow,
    });
  }

  setLimitCountCurrentMinus = () => {
    const lc = this.state.limitCountCurrent - 1;
    this.setState({
      limitCountCurrent: lc,
      estimatedTimeUpdate: lc / 2,
      estimatedTimeUpdateString: this.getEstimatedTimeString(lc / 2),
    });
  }

  setLimitCountCurrentPlus = () => {
    const lc = this.state.limitCountCurrent + 1;
    this.setState({
      limitCountCurrent: lc,
      estimatedTimeUpdate: lc / 2,
      estimatedTimeUpdateString: this.getEstimatedTimeString(lc / 2),
    });
  }

  render() {
    return (
      <EstimatedTimeButtonWrapper>
        <Popover
          content={this.footer}
          title={this.state.content}
          trigger="click"
          visible={this.state.isShow}
          onVisibleChange={this.setIsShow}
          placement="bottom"
          overlayClassName="ant-estimated-time-container"
        >
          <button
            style={this.props.btnStyle}
          >
            <div style={{ display: 'inline-block', float: 'left' }}>
              소요시간 {this.state.estimatedTimeString} 
            </div>
            <div style={{ display: 'inline-block', float: 'right' }}>
              <Icon type="caret-down" />
            </div>
          </button>
        </Popover>
      </EstimatedTimeButtonWrapper>
    );
  }
}

EstimatedTimeButton.propTypes = {
  limitTime: PropTypes.string.isRequired,
  onApply: PropTypes.func.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  getTime: PropTypes.func.isRequired,
  btnStyle: PropTypes.object,
};

EstimatedTimeButton.defaultProps = {
  limitTime: '1.5',
  width: 300,
  height: '200px',
  getTime: (t) => { console.log('$$$ getTimeFunction', t)},
  btnStyle: {
    background: '#ffffff',
    width: '250px',
    height: '60px',
    fontSize: '18pt',
  }
};

export default EstimatedTimeButton;
