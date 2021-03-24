import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Icon, Modal, Input } from 'antd';

import BizBuilderBase from 'components/BizBuilderBase';

import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import DragAntdModal from 'components/DragAntdModal';
import ContentView from './ContentView';

const AntdTable = StyledAntdTable(Table);
const AntdInput = StyledInput(Input);
const AntdModal = StyledAntdModal(Modal);

class PubDocList extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    isShow: false,
    pubDocInfo: {},
    pubDocList: [],
    taskSeq: 0,
    workSeq: 0,
    searchInfo: {},
    coverView: {
      visible: false,
      workSeq: undefined,
      taskSeq: undefined,
      viewMetaSeq: undefined,
    },
  };

  columns = [
    {
      title: '문서종류',
      dataIndex: 'FULLPATH_NM',
      key: 'FULLPATH_NM',
      align: 'center',
      width: '15%',
      ellipsis: true,
    },
    {
      title: 'No.',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      align: 'center',
      width: '10%',
      render: (text, record) => <a onClick={() => this.onOpenDocInfo(record)}>{text}</a>,
    },
    {
      title: 'Rev',
      dataIndex: 'VERSION',
      key: 'VERSION',
      align: 'center',
      width: '7%',
    },
    {
      title: 'Title',
      dataIndex: 'TITLE',
      key: 'TITLE',
      ellipsis: true,
      render: (text, record) => <a onClick={() => this.onOpenDocInfo(record)}>{text}</a>,
    },
    {
      title: '배포일',
      dataIndex: 'REG_DTTM',
      key: 'REG_DTTM',
      width: '10%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
  ];

  onOpenDocInfo = record => {
    this.setState({
      isShow: true,
      taskSeq: record.TASK_SEQ,
      recvId: record.RECV_ID,
      workSeq: record.WORK_SEQ,
      pubDocInfo: record,
    });
  };

  onDataBind = () => {
    const { result, spinningOff } = this.props;
    spinningOff();
    const pubDocList = result.list && result.list.pubDocList;
    this.setState({ pubDocList });
  };

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    const { getCallDataHandler, sagaKey, spinningOn } = this.props;
    const apiArys = [
      {
        key: 'list',
        url: '/api/mdcs/v1/common/mdscPubDocListHandler',
        type: 'POST',
        params: {
          PARAM: {
            STATUS: 0,
            ...this.state.searchInfo,
          },
        },
      },
    ];
    spinningOn();
    getCallDataHandler(sagaKey, apiArys, this.onDataBind);
  };

  onCancel = () => {
    this.setState({ isShow: false });
  };

  onReceltComplete = sagaKey => {
    const { getCallDataHandler, apiArys } = this.props;
    getCallDataHandler(sagaKey, apiArys, this.onDataBind);
    this.setState({ isShow: false });
  };

  onRecept = () => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const param = {
      PARAM: {
        RECV_ID: this.state.recvId,
        STATUS: 1,
      },
    };
    submitHandlerBySaga(sagaKey, 'PUT', '/api/mdcs/v1/common/mdscPubDocListHandler', param, this.onReceltComplete);
  };

  onChangeSearchInfo = (key, val) => {
    this.setState(prevState => {
      const { searchInfo } = prevState;
      searchInfo[key] = val;
      return { searchInfo };
    });
  };

  clickCoverView = (workSeq, taskSeq, viewMetaSeq) => {
    this.setState({ coverView: { visible: true, workSeq, taskSeq, viewMetaSeq } });
  };

  onCloseCoverView = () => {
    this.setState({
      coverView: {
        visible: false,
        workSeq: undefined,
        taskSeq: undefined,
        viewMetaSeq: undefined,
      },
    });
  };

  render() {
    const { coverView } = this.state;
    return (
      <>
        <DragAntdModal
          width={700}
          // title="문서상세"
          visible={this.state.isShow}
          onCancel={this.onCancel}
          destroyOnClose
          footer={[
            <StyledButton className="btn-light btn-sm" onClick={this.onCancel}>
              닫기
            </StyledButton>,
            <StyledButton className="btn-primary btn-sm" onClick={this.onRecept}>
              접수완료
            </StyledButton>,
          ]}
        >
          <ContentView
            workSeq={this.state.workSeq}
            taskSeq={this.state.taskSeq}
            clickCoverView={this.clickCoverView}
            pubDocInfo={this.state.pubDocInfo}
          />
        </DragAntdModal>
        <AntdModal
          className="modalWrapper modalTechDoc"
          title="표지 보기"
          visible={coverView.visible}
          footer={null}
          width={800}
          initialWidth={800}
          okButtonProps={null}
          onCancel={this.onCloseCoverView}
          destroyOnClose
        >
          <div className="SearchContentLayer">
            <BizBuilderBase
              sagaKey="CoverView"
              viewType="VIEW"
              workSeq={coverView.workSeq}
              taskSeq={coverView.taskSeq}
              viewMetaSeq={coverView.viewMetaSeq}
              onCloseCoverView={this.onCloseCoverView}
              ViewCustomButtons={({ onCloseCoverView }) => (
                <StyledButtonWrapper className="btn-wrap-mt-20 btn-wrap-center">
                  <StyledButton className="btn-light btn-sm" onClick={onCloseCoverView}>
                    닫기
                  </StyledButton>
                </StyledButtonWrapper>
              )}
            />
          </div>
        </AntdModal>

        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 접수/배포 대기함
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <AntdInput
                className="ant-input-sm mr5"
                allowClear
                style={{ width: 130 }}
                placeholder="문서번호"
                onChange={e => this.onChangeSearchInfo('DOCNUMBER', e.target.value)}
                onPressEnter={this.getList}
              />
              <AntdInput
                className="ant-input-sm mr5"
                allowClear
                style={{ width: 150 }}
                placeholder="Title"
                onChange={e => this.onChangeSearchInfo('TITLE', e.target.value)}
                onPressEnter={this.getList}
              />
              <StyledButton className="btn-gray btn-sm" onClick={this.getList}>
                검색
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable dataSource={this.state.pubDocList} columns={this.columns} bordered />
        </StyledContentsWrapper>
      </>
    );
  }
}

PubDocList.propTypes = {};

PubDocList.defaultProps = {};

export default PubDocList;
