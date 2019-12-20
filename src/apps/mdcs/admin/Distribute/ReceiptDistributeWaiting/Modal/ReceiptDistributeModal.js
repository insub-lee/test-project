/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Descriptions } from 'antd';
// import * as selectors from '../selectors';
import Styled from './Styled';

export class ReceiptDistributeModal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { visible } = this.props;
    return (
      <Styled>
        <Modal
          title="접수/완료"
          visible={visible}
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          okText="접수완료"
          cancelText="닫기"
          width={900}
        >
          <Descriptions vertical bordered size="small">
            <Descriptions.Item label="문서종류">업무표준</Descriptions.Item>
            <Descriptions.Item label="문서번호">MABL-S00004</Descriptions.Item>
            <Descriptions.Item label="REV.">21</Descriptions.Item>
            <Descriptions.Item label="제목">제품제품제품제품제품제품제품제품제품</Descriptions.Item>
            <Descriptions.Item label="기안부서">SC 기획팀</Descriptions.Item>
            <Descriptions.Item label="기안자">김영숙</Descriptions.Item>
            <Descriptions.Item label="표지보기">버튼</Descriptions.Item>
            <Descriptions.Item label="본문내용">버튼</Descriptions.Item>
            <Descriptions.Item label="별점#1"></Descriptions.Item>
            <Descriptions.Item label="별점#1"></Descriptions.Item>
            <Descriptions.Item label="담당DCC">QE팀 선임 박영미</Descriptions.Item>
            <Descriptions.Item label="배포일">2019-01-11</Descriptions.Item>
            <Descriptions.Item label="접수완료일">2019-01-11</Descriptions.Item>
          </Descriptions>
        </Modal>
      </Styled>
    );
  }
}

ReceiptDistributeModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default ReceiptDistributeModal;
