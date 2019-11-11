import React, { Component } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { Modal } from 'antd';

import BizBuilderBase from 'apps/mdcs/components/BizBuilderBase';

import IconCollection from '../../../components/IconCollection';
import Styled from './Styled';
import View from '../View';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workSeq: -1,
      taskSeq: -1,
      visibleModal: false,
    };
  }

  componentDidMount() {}

  onTimelineClick = notify => {
    console.debug('notify >> ', notify);
    if (notify.hasOwnProperty('PARAM')) {
      const notifyParam = notify.PARAM;
      if (notifyParam && notifyParam !== '' && notifyParam.startsWith('{')) {
        const param = JSON.parse(notifyParam);
        this.setState({
          workSeq: param.WORK_SEQ,
          taskSeq: param.TASK_SEQ,
          visibleModal: true,
        });
      }
    }
  };

  onCancel = () => {
    this.setState({
      workSeq: -1,
      taskSeq: -1,
      visibleModal: false,
    });
  };

  render() {
    const { notify } = this.props;
    const { workSeq, taskSeq, visibleModal } = this.state;

    let elapsedTime = `${notify.SECOND}초전`;
    if (notify.SECOND > 60) {
      if (notify.MINUTE > 60) {
        if (notify.HOUR > 24) {
          if (notify.DAY > 60) {
            elapsedTime = `${notify.MONTH}달전`;
          } else {
            elapsedTime = `${notify.DAY}일전`;
          }
        } else {
          elapsedTime = `${notify.HOUR}시간전`;
        }
      } else {
        elapsedTime = `${notify.MINUTE}분전`;
      }
    }

    return (
      <Styled>
        <div
          className="timeline-wrap"
          onClick={() => this.onTimelineClick(notify)}
          style={{ cursor: `${notify.PARAM.startsWith('{') ? 'pointer' : 'default'}` }}
        >
          <div className="timeline-title">
            <p>{notify.TITLE_KOR}</p>
          </div>
          <div className="timeline-content">
            <p>
              {parse(notify.CONTENT_KOR)}
              {/* 담당 주요 업무 진행 사항 보고드립니다. 담당 주요 업무 진행 사항 보고드립니다. 담당 주요 업무 진행 사항 보고드립니다. 담당 주요 업무 진행 사항
              보고드립니다. 담당 주요 업무 진행 사항 보고드립니다. 담당 주요 업무 진행 사항 보고드립니다. 담당 주요 업무 진행 사항 보고드립니다. 담당 주요 업무
              진행 사항 보고드립니다. 담당 주요 업무 진행 사항 보고드립니다. 담당 주요 업무 진행 사항 보고드립니다. 담당 주요 업무 진행 사항 보고드립니다. 담당
              주요 업무 진행 사항 보고드립니다. 담당 주요 업무 진행 사항 보고드립니다. 담당 주요 업무 진행 사항 보고드립니다. 담당 주요 업무 진행 사항
              보고드립니다. 담당 주요 업무 진행 사항 보고드립니다. 담당 주요 업무 진행 사항 보고드립니다. 담당 주요 업무 진행 사항 보고드립니다. 담당 주요 업무
              진행 사항 보고드립니다. 담당 주요 업무 진행 사항 보고드립니다. */}
            </p>
          </div>
          <div className="timeline-info">
            <ul className="timeline-info-left">
              {/* <li>
                <span>업무매뉴얼</span>
              </li> */}
              <li>
                <span>{elapsedTime}</span>
              </li>
              <li>
                <span>by {notify.USER_NAME_KOR}</span>
              </li>
            </ul>
            {/* <ul className="timeline-info-right">
              <li>
                <IconCollection className="icon-heart" />
                <span>좋아요 3</span>
              </li>
              <li>
                <IconCollection className="icon-read" />
                <span>읽음 3</span>
              </li>
              <li>
                <IconCollection className="icon-comment" />
                <span>댓글 3</span>
              </li>
              <li>
                <IconCollection className="icon-reply" />
                <span>답글 4</span>
              </li>
            </ul> */}
          </div>
        </div>
        <Modal
          visible={visibleModal}
          width={800}
          height={550}
          bodyStyle={{ padding: '49px 8px 10px 8px' }}
          footer={[]}
          onCancel={() => this.onCancel('VIEW')}
          destroyOnClose
        >
          <BizBuilderBase id="notifyView" workSeq={workSeq} taskSeq={taskSeq} component={View} viewType="VIEW" {...this.props} isCustom />
        </Modal>
      </Styled>
    );
  }
}

Timeline.propTypes = {
  notify: PropTypes.object,
};

export default Timeline;
