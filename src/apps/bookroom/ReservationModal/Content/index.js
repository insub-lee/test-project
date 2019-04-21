import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';

const { TextArea } = Input;

class Content extends React.PureComponent {
  setMeetTitle = (e) => {
    this.props.setMeetTitle(e.target.value);
  }

  setMeetContent = (e) => {
    this.props.setMeetContent(e.target.value);
  }

  setLimitCount = (e) => {
    this.props.setLimitCount(e.target);
  }

  render() {
    return (
      <section className="rsv-form">
        <ul className="rsv-input">
          <li><Input onChange={this.setMeetTitle} value={this.props.meetTitle} defaultValue={this.props.meetTitle} placeholder={this.props.meetTitle} maxLength={50}/></li>
          <li><TextArea rows={3} placeholder="회의 내용을 입력하세요" onChange={this.setMeetContent} value={this.props.meetContent} maxLength={50} /></li>
        </ul>
        <ul className="rsv-info">
          <li className="date">{this.props.startTimeTop}</li>
          <li className="time">{`${this.props.frTimeString} ~ ${this.props.toTimeString}`}
            {/* 시간 선택 */}
            <div className="use-time-select">
              {
                this.props.isMinusBtnShow &&
                  <Button className="down" onClick={this.setLimitCount}><span value="S">-</span></Button>
              }
              <span className="use-time-input">{this.props.em} </span>
              {
                this.props.isPlusBtnShow &&
                  <Button className="up" onClick={this.setLimitCount}><span value="A">+</span></Button>
              }
              <span className="notice">{this.props.limitTimeBottom}까지 예약 가능</span>
            </div>
          </li>
          <li className="location">
            <dl>
              {this.props.location}
            </dl>
          </li>
        </ul>
        {
          this.props.rrNotiYn === 'Y' &&
          <div className="use-guide">
            <h4>회의실 이용안내</h4>
            <p>{this.props.rrNotiDesc}</p>
          </div>
        }
      </section>
    );
  }
}

Content.propTypes = {
  startTimeTop: PropTypes.string,
  location: PropTypes.string,
  meetTitle: PropTypes.string,
  meetContent: PropTypes.string.isRequired,
  setMeetTitle: PropTypes.func.isRequired,
  setMeetContent: PropTypes.func.isRequired,
  limitTimeBottom: PropTypes.string,
  rrNotiYn: PropTypes.string,
  rrNotiDesc: PropTypes.string,
  em: PropTypes.string.isRequired,
};

export default Content;
