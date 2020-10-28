import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ProtectionItemList from 'apps/eshs/user/safety/protectionItem/protectionItemList';

import { Input, DatePicker, InputNumber, Modal, Table, message, Popover, Popconfirm } from 'antd';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledPicker from 'commonStyled/Form/StyledPicker';
// import StyledInputNumber from 'commonStyled/Form/StyledInputNumber';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledLineTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import ContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import { WORKFLOW_OPT_SEQ } from 'components/BizBuilder/Common/Constants';
import { saveProcessRule } from 'apps/eshs/common/workProcessRule';

import WorkProcess from 'apps/Workflow/WorkProcess';
import SignLine from 'apps/Workflow/SignLine';
import CustomWorkProcess from 'apps/Workflow/CustomWorkProcess';

const AntdModal = StyledContentsModal(Modal);
const AntdPicker = StyledPicker(DatePicker);
const AntdInput = StyledInput(Input);
const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdTable = StyledLineTable(Table);
class ModalContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      requestValue: [],
    };
  }

  componentDidMount() {
    this.getLastReqCd();
    this.setFormData();
    // this.getDataSource();
  }

  setFormData = () => {
    const { sagaKey, changeFormData, profile } = this.props;
    changeFormData(sagaKey, 'COMPANY_CD', profile.COMP_CD);
    changeFormData(sagaKey, 'REQ_EMPNO', profile.USER_ID);
    changeFormData(sagaKey, 'REQ_DT', moment());
    changeFormData(sagaKey, 'DEPT_ID', profile.DEPT_ID);
    changeFormData(sagaKey, 'TARGET_DT', moment());
  };

  getLastReqCd = () => {
    const { sagaKey: id, getExtraApiData } = this.props;
    const apiArr = [
      {
        key: 'lastReqCd',
        type: 'GET',
        url: `/api/eshs/v1/common/protection-reqcd`,
      },
    ];

    getExtraApiData(id, apiArr, this.setReqCd);
  };

  setReqCd = () => {
    const { extraApiData, sagaKey, changeFormData } = this.props;
    changeFormData(sagaKey, 'REQ_CD', (extraApiData.lastReqCd && extraApiData.lastReqCd.list && extraApiData.lastReqCd.list.REQ_CD) || '');
  };

  handleSubModalVisible = () => {
    this.setState({ modalVisible: true });
  };

  handleSubModalClose = () => {
    this.setState({ modalVisible: false });
  };

  handleRowClick = rowData => {
    const { handleSubModalClose } = this;
    const { sagaKey: id, changeFormData } = this.props;

    this.setState(prevState => {
      const tempData = prevState.requestValue;
      if (tempData[prevState.selectedIndex]) {
        tempData[prevState.selectedIndex] = rowData;
      } else {
        tempData.push(rowData);
      }
      changeFormData(id, 'requestValue', tempData);
      return { requestValue: tempData };
    });

    handleSubModalClose();
  };

  handleInputChange = (key, value) => {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, key, value);
  };

  handleDateChange = date => {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, 'TARGET_DT', date);
  };

  saveAfterFunc = () => {
    const { getDataSource, handleModalClose } = this.props;
    // const REQ_CD = (extraApiData.lastReqCd && extraApiData.lastReqCd.list && extraApiData.lastReqCd.list.REQ_CD) || '';
    getDataSource();
    handleModalClose();

    // submitExtraHandler(sagaKey, 'POST', '/api/eshs/v1/common/protection-req-detail', { PARAM: { list: param } }, submitCallbackFunc);
  };

  handleListAddClick = () => {
    this.setState(prevState => ({
      requestValue: prevState.requestValue.concat({}),
    }));
  };

  handleListDeleteClick = (index, reqCd) => {
    this.setState(prevState => {
      const tempData = prevState.requestValue.filter((data, i) => data.REQ_CD !== reqCd || i !== index);
      return { requestValue: tempData };
    });
  };

  handleRequestChange = (key, value, index) => {
    const { sagaKey: id, changeFormData } = this.props;
    const valueObj = { [key]: value };
    this.setState(prevState => {
      const tempData = prevState.requestValue;
      tempData[index] = Object.assign(tempData[index], valueObj);
      changeFormData(id, 'requestValue', tempData);
      return { requestValue: tempData };
    });
  };

  columns = [
    {
      title: '품명',
      align: 'center',
      width: '10%',
      render: (text, record, index) =>
        this.props.isModified ? (
          <Popover content={<span>{record.KIND}</span>} title={null} trigger="hover">
            <span>{record.KIND}</span>
          </Popover>
        ) : (
          <Popover content={<span>{(this.state.requestValue[index] && this.state.requestValue[index].KIND) || ''}</span>} title={null} trigger="hover">
            <AntdInput
              className="ant-input-sm"
              value={(this.state.requestValue[index] && this.state.requestValue[index].KIND) || ''}
              onClick={() => this.setState({ modalVisible: true, selectedIndex: index })}
            />
          </Popover>
        ),
    },
    {
      title: '모델',
      align: 'center',
      width: '10%',
      render: (text, record, index) =>
        this.props.isModified ? (
          <Popover content={<span>{record.MODEL}</span>} title={null} trigger="hover">
            <span>{record.MODEL}</span>
          </Popover>
        ) : (
          <Popover content={<span>{(this.state.requestValue[index] && this.state.requestValue[index].MODEL) || ''}</span>} title={null} trigger="hover">
            <AntdInput className="ant-input-sm" value={(this.state.requestValue[index] && this.state.requestValue[index].MODEL) || ''} />
          </Popover>
        ),
    },
    {
      title: '사이즈',
      align: 'center',
      width: '10%',
      render: (text, record, index) =>
        this.props.isModified ? (
          <span>{record.SIZE1}</span>
        ) : (
          <AntdInput className="ant-input-sm" value={(this.state.requestValue[index] && this.state.requestValue[index].SIZE1) || ''} />
        ),
    },
    {
      title: '신청수량',
      align: 'center',
      width: '10%',
      render: (text, record, index) =>
        this.props.isModified ? (
          <span>{record.QTY}</span>
        ) : (
          <AntdInputNumber
            className="ant-input-number-sm"
            min={0}
            value={this.state.requestValue[index] && this.state.requestValue[index].QTY}
            onChange={this.props.isModified ? null : value => this.handleRequestChange('QTY', value, index)}
          />
        ),
    },
    {
      title: '신청사유',
      align: 'center',
      width: this.props.isModified ? '13%' : '30%',
      render: (text, record, index) =>
        this.props.isModified ? (
          <Popover content={<span>{record.REQ_COMMENTS}</span>} title={null} trigger="hover">
            <span>{record.REQ_COMMENTS}</span>
          </Popover>
        ) : (
          <Popover content={<span>{this.state.requestValue[index] && this.state.requestValue[index].REQ_COMMENTS}</span>} title={null} trigger="focus">
            <AntdInput
              className="ant-input-sm"
              maxLength={500}
              value={this.state.requestValue[index] && this.state.requestValue[index].REQ_COMMENTS}
              onChange={e => this.handleRequestChange('REQ_COMMENTS', e.target.value, index)}
            />
          </Popover>
        ),
    },
    {
      title: '사용장소',
      align: 'center',
      width: this.props.isModified ? '10%' : '20%',

      render: (text, record, index) =>
        this.props.isModified ? (
          <Popover content={<span>{record.PLACE}</span>} title={null} trigger="hover">
            <span>{record.PLACE}</span>
          </Popover>
        ) : (
          <Popover content={<span>{this.state.requestValue[index] && this.state.requestValue[index].PLACE}</span>} title={null} trigger="focus">
            <AntdInput
              className="ant-input-sm"
              maxLength={500}
              value={this.state.requestValue[index] && this.state.requestValue[index].PLACE}
              onChange={e => this.handleRequestChange('PLACE', e.target.value, index)}
            />
          </Popover>
        ),
    },
    this.props.isModified
      ? {
          title: '출고수량',
          dataIndex: '',
          align: 'center',
          width: '7%',
        }
      : {
          width: 0,
        },
    this.props.isModified
      ? {
          title: '출고일',
          dataIndex: '',
          align: 'center',
          width: '10%',
        }
      : {
          width: 0,
        },
    this.props.isModified
      ? {
          title: '상태',
          dataIndex: 'CONF_STATUS',
          align: 'center',
          width: '10%',
        }
      : {
          width: 0,
        },
    this.props.isModified
      ? {
          title: 'Comment',
          dataIndex: 'CONF_COMMENTS',
          align: 'center',
          width: '10%',
          render: (text, record) => (
            <Popover content={<span>{text || ''}</span>} title={null} trigger="hover">
              <span>{text || ''}</span>
            </Popover>
          ),
        }
      : {
          title: '',
          width: '10%',
          render: (text, record, index) => (
            <StyledButton className="btn-light" onClick={() => this.handleListDeleteClick(index, record.REQ_CD)}>
              삭제
            </StyledButton>
          ),
        },
  ];

  beforeSaveTask = () => {
    const { requestValue } = this.state;
    const { sagaKey: id, changeFormData, saveTask } = this.props;
    changeFormData(id, 'TARGET_DT', moment());
    const hasEmptyValue = requestValue.findIndex(value => !value.PLACE || !value.QTY || !value.REQ_COMMENTS || !value.HITEM_CD);

    if (!requestValue.length) {
      return message.error('신청할 보호구를 선택하세요.');
    }

    if (hasEmptyValue !== -1) {
      return message.error('입력 항목을 모두 입력해주세요.');
    }

    return saveTask(id, id, this.saveAfterFunc);
  };

  saveProcessRule = () => {
    const { rowData, relKey, relKey2, workSeq } = this.props;

    saveProcessRule({
      ...rowData?.processRule,
      DRAFT_DATA: {},
      REL_KEY: relKey,
      REL_KEY2: rowData[relKey2],
      DRAFT_TITLE: `신청번호(${rowData[relKey2]})`,
      TASK_SEQ: rowData?.TASK_SEQ,
      WORK_SEQ: workSeq,
    });
  };

  render() {
    const { handleRowClick, handleSubModalClose, beforeSaveTask, handleListAddClick, handleDateChange } = this;
    const { modalVisible, requestValue } = this.state;
    const {
      sagaKey: id,
      viewLayer,
      workFlowConfig,
      viewPageData,
      changeViewPage,
      workInfo,
      handleModalClose,
      isModified,
      result,
      profile,
      modalDataSource,
      rowData,
      prcId,
      handleChangeRowData,
    } = this.props;
    const appFlag = (rowData?.APP_STATUS === '저장' && rowData?.REG_USER_ID === profile?.USER_ID) || false;
    return (
      <ContentsWrapper>
        {isModified ? (
          <CustomWorkProcess
            PRC_ID={prcId}
            colLength={5}
            setProcessRule={(_, prcRule) => handleChangeRowData({ ...rowData, processRule: prcRule })}
            processRule={rowData?.processRule}
            draftId={rowData?.DRAFT_ID || -1}
            viewType={rowData?.DRAFT_ID ? 'VIEW' : 'INPUT'}
            appLineBtnVisible={isModified}
            CustomRow={[
              <tr>
                <th>신청일</th>
                <td colSpan={4}>{isModified ? rowData.REQ_DT : moment().format('YYYY-MM-DD')}</td>
              </tr>,
              <tr>
                <th>지급요청일</th>
                <td colSpan={4}>{rowData?.TARGET_DT || ''}</td>
              </tr>,
            ]}
          />
        ) : (
          <StyledHtmlTable>
            <table className="table-border">
              <colgroup>
                <col width="25" />
                <col width="25" />
                <col width="25" />
                <col width="25" />
              </colgroup>
              <thead></thead>
              <tbody>
                <tr>
                  <th>신청일</th>
                  <td>{moment().format('YYYY-MM-DD')}</td>
                  <th>지급요청일</th>
                  <td>
                    <AntdPicker className="ant-picker-sm" defaultValue={moment()} onChange={handleDateChange} />
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
          </StyledHtmlTable>
        )}
        <div style={{ padding: '10px' }}>
          {isModified ? null : (
            <div style={{ textAlign: 'right', marginBottom: '10px' }}>
              <StyledButton className="btn-gray btn-sm" onClick={handleListAddClick}>
                추가
              </StyledButton>
            </div>
          )}
          <AntdTable columns={this.columns} dataSource={isModified ? modalDataSource : requestValue} pagination={false} />
        </div>
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <StyledButton className="btn-primary btn-sm mr5" onClick={isModified ? () => console.debug('@@@@@@PRINT@@@@@@@') : beforeSaveTask}>
            {isModified ? '인쇄' : '저장'}
          </StyledButton>
          {appFlag && (
            <Popconfirm title="상신하시겠습니까?" onConfirm={this.saveProcessRule} okText="Yes" cancelText="No">
              <StyledButton className="btn-primary btn-sm mr5">상신</StyledButton>
            </Popconfirm>
          )}
          <StyledButton className="btn-light  btn-sm mr5" onClick={handleModalClose}>
            닫기
          </StyledButton>
        </div>
        <AntdModal visible={modalVisible} title="보호구 목록" onCancel={handleSubModalClose} footer={null} width="80%">
          <ProtectionItemList handleRowClick={handleRowClick} />
        </AntdModal>
      </ContentsWrapper>
    );
  }
}

ModalContents.propTypes = {
  handleModalClose: PropTypes.func,
  sagaKey: PropTypes.string,
  changeFormData: PropTypes.func,
  saveTask: PropTypes.func,
  getDataSource: PropTypes.func,
  rowData: PropTypes.object,
  isModified: PropTypes.bool,
  extraApiData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  profile: PropTypes.object,
  modalDataSource: PropTypes.arrayOf('object'),
  prcId: PropTypes.number,
  relKey: PropTypes.string,
  relKey2: PropTypes.string,
  handleChangeRowData: PropTypes.func,
};

ModalContents.defaultProps = {
  handleModalClose: null,
  saveTask: null,
  getDataSource: null,
  isModified: false,
  handleChangeRowData: () => undefined,
};

export default ModalContents;
