import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Select, Modal, Table, message } from 'antd';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledSelect from 'commonStyled/Form/StyledSelect';

import { debounce } from 'lodash';

const AntdModal = StyledContentsModal(Modal);
const AntdLineTable = StyledLineTable(Table);
const AntdSelect = StyledSelect(Select);

const { Option } = Select;

class ConfirmCheckSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      checkList: [],
      TASK_SEQ: '',
      checkTable: [],
      columns: [
        {
          title: 'Item',
          dataIndex: 'ITEM_NM',
          align: 'center',
          width: '20%',
        },
        {
          title: 'SubItem',
          dataIndex: 'SUBITEM_NM',
          align: 'center',
          width: '20%',
        },
        {
          title: 'Check 항목',
          dataIndex: 'CHKDETAIL_NM',
          align: 'center',
          width: '45%',
        },
        {
          title: '결과',
          dataIndex: 'CHKS_RESULT_NM',
          align: 'center',
          width: '15%',
          render: (text, record) => {
            const { viewType } = this.props;
            return viewType === 'INPUT' ? (
              <AntdSelect
                className="selectMid mr5"
                defaultValue={record.CHKS_RESULT || '0'}
                style={{ width: '100%' }}
                onChange={value => this.handleOnChange('CHKS_RESULT', value, record.CHKS_CD)}
              >
                <Option value="0">N/A</Option>
                <Option value="1">승인</Option>
                <Option value="2">조건부승인</Option>
                <Option value="3">불합격</Option>
              </AntdSelect>
            ) : (
              <span>{record.CHKS_RESULT_NM}</span>
            );
          },
        },
      ],
    };
    this.debounceTableGrid = debounce(this.debounceTableGrid, 300);
  }

  componentDidMount() {
    const { sagaKey: id, formData, getExtraApiData } = this.props;
    const TASK_SEQ = (formData && formData.TASK_SEQ) || 0;

    const apiArray = [
      {
        key: 'checkList',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsGetQualChkSheetByTaskSeq/${TASK_SEQ}`,
      },
    ];

    getExtraApiData(id, apiArray, this.appStart);
  }

  appStart = () => {
    const { extraApiData, formData } = this.props;
    const TASK_SEQ = (formData && formData.TASK_SEQ) || 0;
    const checkList = (extraApiData && extraApiData.checkList && extraApiData.checkList.list) || [];
    this.setState({ TASK_SEQ, checkList }, this.debounceTableGrid);
  };

  handleOnChange = (target, value, index) => {
    const { checkList } = this.state;
    this.setState({
      checkList: checkList.map(c => (c.CHKS_CD === index ? { ...c, [target]: value } : c)),
    });
  };

  debounceTableGrid = () => {
    const { checkList, columns } = this.state;
    return this.setState({
      checkTable: [
        <AntdLineTable
          key="checkTable"
          className="tableWrapper"
          rowKey={checkList && checkList.CHKS_CD}
          columns={columns}
          dataSource={checkList || []}
          bordered
          pagination={false}
          scroll={{ y: 392 }}
          footer={() => <span>{`${checkList.length} 건`}</span>}
        />,
      ],
    });
  };

  handleModalVisible = () => {
    const { modalVisible } = this.state;

    this.setState({ modalVisible: !modalVisible });
  };

  handleModalAction = action => {
    const { sagaKey: id, formData, getExtraApiData } = this.props;
    const { checkList } = this.state;
    const REQ_CD = (formData && formData.REQ_CD) || '';
    const TASK_SEQ = (formData && formData.TASK_SEQ) || 0;
    const apiArray = [
      {
        key: 'insertChecks',
        type: 'POST',
        url: '/api/eshs/v1/common/eshsQualChkSheet',
        params: { PARAM: { TASK_SEQ, REQ_CD, checkList } },
      },
    ];
    switch (action) {
      case 'SAVE':
        getExtraApiData(id, apiArray, this.saveAfter);
        break;
      case 'PRINT':
        break;
      default:
        break;
    }
  };

  saveAfter = () => {
    const { extraApiData, handelChangeChkCnt } = this.props;
    const { checkList } = this.state;

    const code = (extraApiData && extraApiData.insertChecks && extraApiData.insertChecks.code) || 500;

    if (code === 500) return message.warning('실패하였습니다.');

    message.success('저장되었습니다.');
    return handelChangeChkCnt(checkList.length);
  };

  render() {
    const { modalVisible, checkTable } = this.state;
    const { viewType, formData } = this.props;
    const REQ_CD = (formData && formData.REQ_CD) || '';

    return (
      <>
        <StyledButton className="btn-primary btn-sm btn-first" onClick={this.handleModalVisible}>
          장비 ESH CheckSheet {viewType === 'INPUT' ? '등록' : '조회'}
        </StyledButton>
        <AntdModal
          title={viewType === 'INPUT' ? '[ESH Qual 확인 Check Sheet 등록] ' : '[ESH Qual 확인 Check Sheet 조회] '}
          visible={modalVisible}
          width={700}
          heigth={500}
          onCancel={this.handleModalVisible}
          footer={[null]}
        >
          <div>
            <StyledButtonWrapper className="btn-wrap-left btn-wrap-mb-10">
              <span>{`신청번호 : ${REQ_CD}  `}</span>
              {viewType === 'INPUT' && (
                <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleModalAction('SAVE')}>
                  저장
                </StyledButton>
              )}
              <StyledButton className={`btn-primary btn-sm ${viewType !== 'INPUT' && 'btn-first'}`} onClick={() => this.handleModalAction('PRINT')}>
                인쇄
              </StyledButton>
            </StyledButtonWrapper>
          </div>
          <span>Check 항목</span>
          {checkTable}
        </AntdModal>
      </>
    );
  }
}
ConfirmCheckSheet.propTypes = {
  formData: PropTypes.object,
  sagaKey: PropTypes.string,
  extraApiData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  viewType: PropTypes.string,
  handelChangeChkCnt: PropTypes.func,
};

ConfirmCheckSheet.defaultProps = {
  handelChangeChkCnt: () => {},
};

export default ConfirmCheckSheet;
