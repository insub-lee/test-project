import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Select, Input, Modal } from 'antd';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import MailPush from './mailPush';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledContentsModal(Modal);
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const { Option } = Select;

const columns = [
  {
    title: '사번',
    key: 'EMP_NO',
    dataIndex: 'EMP_NO',
    width: '10%',
    align: 'center',
  },
  {
    title: '성명',
    key: 'EMP_NAME',
    dataIndex: 'EMP_NAME',
    width: '20%',
    align: 'center',
  },
  {
    title: '직책',
    key: 'PSTN_NAME',
    width: '15%',
    dataIndex: 'PSTN_NAME',
    align: 'center',
  },
  {
    title: '부서명',
    key: 'DEPT_NAME',
    dataIndex: 'DEPT_NAME',
    width: '30%',
    align: 'center',
  },
  {
    title: '상태',
    key: 'ANSWER_YN',
    dataIndex: 'ANSWER_YN',
    width: '10%',
    align: 'center',
    render: data => {
      if (data === 'Y') {
        return <span style={{ color: '#1FB5AD' }}>응답</span>;
      }
      return <span style={{ color: '#FF7F29' }}>미응답</span>;
    },
  },
  {
    title: '응답일자',
    key: 'ANSWER_DT',
    width: '15%',
    dataIndex: 'ANSWER_DT',
    align: 'center',
  },
];

// 설문조사 리스트 테이블
class PollAnswerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchAfter: false,
      answerYn: 'A',
      keyword: '',
      filterListData: [],
      modalVisible: false,
    };
  }

  componentDidMount() {
    const { getInit } = this.props;
    getInit();
  }

  // 검색액션
  searchHandler = () => {
    const { listData } = this.props;
    const { answerYn, keyword } = this.state;
    const nextListData = listData
      .filter(item => {
        if (answerYn === 'A') return true;
        return item.ANSWER_YN === answerYn;
      })
      .filter(row => {
        if (keyword === '') return true;
        const { EMP_NAME, EMP_NO } = row;
        return EMP_NAME.includes(keyword) || EMP_NO.includes(keyword);
      });
    this.setState({
      searchAfter: true,
      filterListData: nextListData,
    });
  };

  // Input 키 누를 때
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.searchHandler();
    }
  };

  modalHandler = bool => {
    this.setState({
      modalVisible: bool,
    });
  };

  render() {
    const { sagaKey, getCallDataHandlerReturnRes, listData, modalData } = this.props;
    const { searchAfter, filterListData, modalVisible } = this.state;
    return (
      <div>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            <span className="text-label">응답여부</span>
            <AntdSelect defaultValue="A" className="select-sm" style={{ width: '100px' }} onChange={val => this.setState({ answerYn: val })}>
              <Option value="A">전체</Option>
              <Option value="Y">응답</Option>
              <Option value="N">미응답</Option>
            </AntdSelect>
            <span className="text-label">검색어</span>
            <AntdInput
              className="ant-input-sm ant-input-inline"
              placeholder="성명 혹은 사번으로 조회"
              style={{ width: '200px' }}
              defaultValue=""
              onKeyPress={this.handleKeyPress}
              onChange={e => this.setState({ keyword: e.target.value })}
            />
            <StyledButton className="btn-gray btn-sm btn-first ml5" onClick={() => this.searchHandler()}>
              검색
            </StyledButton>
          </div>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <StyledButton className="btn-primary btn-sm ml5" onClick={() => this.setState({ modalVisible: true })}>
            메일발송
          </StyledButton>
        </StyledButtonWrapper>
        <AntdTable pagination columns={columns} dataSource={searchAfter ? filterListData : listData} />
        <AntdModal
          className="modal-table-pad"
          title="설문조사 안내메일 발송"
          width={650}
          visible={modalVisible}
          footer={null}
          destroyOnClose
          maskClosable={false}
          onOk={() => this.setState({ modalVisible: false })}
          onCancel={() => this.setState({ modalVisible: false })}
        >
          {modalVisible && (
            <MailPush
              sagaKey={sagaKey}
              getCallDataHandlerReturnRes={getCallDataHandlerReturnRes}
              listData={listData || []}
              pollStatus={modalData.STATUS}
              modalHandler={this.modalHandler}
            />
          )}
        </AntdModal>
      </div>
    );
  }
}

PollAnswerDetail.propTypes = {
  modalData: PropTypes.object,
  listData: PropTypes.array,
  getInit: PropTypes.func,
  sagaKey: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
};

PollAnswerDetail.defaultProps = {
  sagaKey: '',
  modalData: {},
  listData: [],
  getInit: () => false,
  getCallDataHandlerReturnRes: () => false,
};

export default PollAnswerDetail;
