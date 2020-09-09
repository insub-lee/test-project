import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ProtectionItemList from 'apps/eshs/user/safety/protectionItem/protectionItemList';

import { Input, DatePicker, InputNumber, Modal, Table, message, Popover } from 'antd';
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
      psrule: {},
    };
  }

  componentDidMount() {
    this.getProcessData();
    this.getLastReqCd();
    this.setFormData();
    // this.getDataSource();
  }

  getProcessData = () => {
    const { sagaKey: id, getProcessRule, workInfo, workPrcProps, relType, setRelType } = this.props;
    const isWorkflowUsed = !!(workInfo && workInfo.OPT_INFO && workInfo.OPT_INFO.findIndex(opt => opt.OPT_SEQ === WORKFLOW_OPT_SEQ) !== -1);
    const workflowOpt = workInfo && workInfo.OPT_INFO && workInfo.OPT_INFO.filter(opt => opt.OPT_SEQ === WORKFLOW_OPT_SEQ);
    const prcId = workflowOpt && workflowOpt.length > 0 ? workflowOpt[0].OPT_VALUE : -1;

    if (isWorkflowUsed && prcId !== -1) {
      const payload = {
        PRC_ID: Number(prcId),
        DRAFT_DATA: {
          ...workPrcProps,
        },
      };
      getProcessRule(id, payload);
      setRelType(id, relType);
    }
  };

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
      setProcessRule,
      processRule,
      getProcessRule,
      relType,
      setRelType,
    } = this.props;

    return (
      <ContentsWrapper>
        {/* {JSON.stringify(processRule) !== '{}' && <WorkProcess id={id} PRC_ID={109} processRule={processRule} setProcessRule={setProcessRule} />} */}
        <CustomWorkProcess
          id={id}
          PRC_ID={109}
          colLength={5}
          relType={relType}
          setRelType={setRelType}
          setProcessRule={setProcessRule}
          processRule={processRule}
          viewType="INPUT"
          CustomRow={[
            <tr>
              <th>신청일</th>
              <td colSpan={4}>{isModified ? rowData.REQ_DT : moment().format('YYYY-MM-DD')}</td>
            </tr>,
            <tr>
              <th>지급요청일</th>
              <td colSpan={4}>
                {isModified ? rowData.TARGET_DT : <AntdPicker className="ant-picker-sm" defaultValue={moment()} onChange={handleDateChange} />}
              </td>
            </tr>,
          ]}
        />
        <CustomWorkProcess
          id={id}
          relType={relType}
          setRelType={setRelType}
          PRC_ID={109}
          setProcessRule={setProcessRule}
          processRule={processRule}
          draftId={rowData.DRAFT_ID}
          viewType="VIEW"
          colLength={5}
          CustomRow={[
            <tr>
              <th>신청일</th>
              <td colSpan={4}>{isModified ? rowData.REQ_DT : moment().format('YYYY-MM-DD')}</td>
            </tr>,
            <tr>
              <th>지급요청일</th>
              <td colSpan={4}>
                {isModified ? rowData.TARGET_DT : <AntdPicker className="ant-picker-sm" defaultValue={moment()} onChange={handleDateChange} />}
              </td>
            </tr>,
          ]}
        />
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
          <StyledButton className="btn-primary mr5" onClick={isModified ? () => console.debug('@@@@@@PRINT@@@@@@@') : beforeSaveTask}>
            {isModified ? '인쇄' : '저장'}
          </StyledButton>
          <StyledButton className="btn-light" onClick={handleModalClose}>
            취소
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
  setProcessRule: PropTypes.func,
};

ModalContents.defatulProps = {
  handleModalClose: null,
  saveTask: null,
  getDataSource: null,
  isModified: false,
};

export default ModalContents;
