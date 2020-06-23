import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Input, Modal, Table } from 'antd';
import BizMicroDevBase from 'components/BizMicroDevBase';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import SafetyWorkViewer from '../../safetyWorkView';
import WorkerSelector from '../workerSearch';

const AntdModal = StyledContentsModal(Modal);
const AntdTable = StyledAntdTable(Table);
const AntdInput = StyledInput(Input);
const AntdSearch = StyledSearchInput(Input.Search);

class workerTrByPersonalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      workerSeq: '',
      workerNm: '',
      workerData: [],
      selectedWork: '',
    };
  }

  // 페이지 랜더링 후 불러올 데이터
  componentDidMount() {}

  init = () => {
    const { workNo } = this.props;
    const { init } = this.state;
    if (init) {
      this.setState(
        {
          init: false,
        },
        () => this.handleGetSafetyWork(workNo),
      );
    }
  };

  handleGetSafetyWork = () => {
    const { workerSeq } = this.state;
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'getWorkerTrPersonal',
      type: 'GET',
      url: `/api/eshs/v1/common/eshsWorkerTrPersonal/${workerSeq}`,
    };
    if (workerSeq === '') {
      message.error(<MessageContent>선택된 작업자가 없습니다.</MessageContent>);
      return;
    }
    getCallDataHandlerReturnRes(id, apiInfo, this.getSafetyWorkCallback);
  };

  getSafetyWorkCallback = (id, response) => {
    const workerPersonalData = (response && response.list) || [];
    if (workerPersonalData.length === 0) {
      message.error(<MessageContent>작업자의 투입정보가 없습니다.</MessageContent>);
    }
    this.setState({
      workerData: workerPersonalData,
    });
  };

  // 작업자 선택
  onRowSelect = record => {
    this.setState({
      modalTitle: '',
      modalType: '',
      modalVisible: false,
      workerSeq: record.WORKER_SEQ,
      workerNm: record.WORKER_NM,
    });
  };

  // 모달 핸들러
  handleModal = (type, visible, workNo) => {
    let title = '';
    const selectedWork = workNo || '';
    switch (type) {
      case 'worker':
        title = '작업자 선택';
        break;
      case 'safetyWorkView':
        title = '안전작업 상세정보';
        break;
      default:
        break;
    }

    this.setState({
      modalType: type,
      modalTitle: title,
      modalVisible: visible,
      selectedWork,
    });
  };

  render() {
    const { modalType, modalTitle, modalVisible, workerData, selectedWork, workerSeq, workerNm } = this.state;
    const columns = [
      {
        title: '지역',
        dataIndex: 'SITE',
        key: 'SITE',
        align: 'center',
      },
      {
        title: '작업번호',
        dataIndex: 'WORK_NO',
        align: 'center',
        render: value => (
          <span
            onClick={() => this.handleModal('safetyWorkView', true, value)}
            role="button"
            tabIndex="0"
            onKeyPress={() => this.handleModal('safetyWorkView', true, value)}
            style={{ cursor: 'pointer', color: '#1fb5ad' }}
          >
            {value}
          </span>
        ),
      },
      {
        title: '작업명',
        dataIndex: 'TITLE',
        align: 'center',
      },
      {
        title: '직책',
        dataIndex: 'POSITION',
        align: 'center',
      },
      {
        title: '투입일',
        dataIndex: 'FROM_DT',
        align: 'center',
        render: value => <span>{moment(value).format('YYYY-MM-DD')}</span>,
      },
      {
        title: '발주사',
        dataIndex: 'REQ_CMPNY_NM',
        align: 'center',
      },
      {
        title: '발주팀',
        dataIndex: 'REQ_DEPT_NM',
        align: 'center',
      },
    ];
    return (
      <>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            <span className="text-label">거래처</span>
            <AntdSearch
              className="ant-search-inline input-search-sm mr5"
              onClick={() => this.handleModal('worker', true)}
              onSearch={() => this.handleModal('worker', true)}
              value={workerSeq}
              style={{ width: '200px', marginRight: '5px' }}
            />
            <AntdInput className="ant-input-sm" style={{ width: '150px', marginRight: '10px' }} readOnly value={workerNm} />
            <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.handleGetSafetyWork()}>
              검색
            </StyledButton>
          </div>
        </StyledCustomSearchWrapper>
        <ContentsWrapper>
          <AntdTable
            pagination={false}
            columns={columns}
            dataSource={workerData}
            footer={() => <div style={{ textAlign: 'center' }}>{`총 ${workerData.length === 0 ? 0 : workerData.length} 건`}</div>}
          />
        </ContentsWrapper>
        <AntdModal
          className="modal-table-pad"
          title={modalTitle}
          width={modalType === 'cmpny' || modalType === 'equip' ? '790px' : '70%'}
          visible={modalVisible}
          footer={null}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          {modalType === 'worker' && <BizMicroDevBase component={WorkerSelector} sagaKey="worker_search" onRow={this.onRowSelect} />}
          {modalType === 'safetyWorkView' && <SafetyWorkViewer workNo={selectedWork} pageType="modal" />}
        </AntdModal>
      </>
    );
  }
}

workerTrByPersonalPage.propTypes = {
  workNo: PropTypes.string,
  sagaKey: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
};

export default workerTrByPersonalPage;
