import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ProtectionItemList from 'apps/eshs/user/safety/protectionItem/protectionItemList';

import { Input, DatePicker, InputNumber, Modal, Table, message } from 'antd';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledPicker from 'commonStyled/Form/StyledPicker';
// import StyledInputNumber from 'commonStyled/Form/StyledInputNumber';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledLineTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import ContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';

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
      width: '15%',
      render: (text, record, index) =>
        this.props.isModified ? (
          <span>{record.KIND}</span>
        ) : (
          <AntdInput
            className="ant-input-sm"
            value={(this.state.requestValue[index] && this.state.requestValue[index].KIND) || ''}
            onClick={() => this.setState({ modalVisible: true, selectedIndex: index })}
          />
        ),
    },
    {
      title: '모델',
      align: 'center',
      width: '15%',
      render: (text, record, index) =>
        this.props.isModified ? (
          <span>{record.MODEL}</span>
        ) : (
          <AntdInput className="ant-input-sm" value={(this.state.requestValue[index] && this.state.requestValue[index].MODEL) || ''} />
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
      width: '20%',
      render: (text, record, index) =>
        this.props.isModified ? (
          <span>{record.REQ_COMMENTS}</span>
        ) : (
          <AntdInput
            className="ant-input-sm"
            maxLength={500}
            value={this.state.requestValue[index] && this.state.requestValue[index].REQ_COMMENTS}
            onChange={e => this.handleRequestChange('REQ_COMMENTS', e.target.value, index)}
          />
        ),
    },
    {
      title: '사용장소',
      align: 'center',
      width: '20%',
      render: (text, record, index) =>
        this.props.isModified ? (
          <span>{record.PLACE}</span>
        ) : (
          <AntdInput
            className="ant-input-sm"
            maxLength={500}
            value={this.state.requestValue[index] && this.state.requestValue[index].PLACE}
            onChange={e => this.handleRequestChange('PLACE', e.target.value, index)}
          />
        ),
    },
    this.props.isModified
      ? {
          title: '출고수량',
          dataIndex: '',
          align: 'center',
        }
      : {
          width: 0,
        },
    this.props.isModified
      ? {
          title: '출고일',
          dataIndex: '',
          align: 'center',
        }
      : {
          width: 0,
        },
    this.props.isModified
      ? {
          title: '상태',
          dataIndex: 'CONF_STATUS',
          align: 'center',
        }
      : {
          width: 0,
        },
    this.props.isModified
      ? {
          title: 'Comment',
          dataIndex: 'CONF_COMMENTS',
          align: 'center',
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
    const { handleModalClose, isModified, profile, modalDataSource, rowData } = this.props;
    return (
      <>
        <ContentsWrapper>
          {/* <div className="tableWrapper"> */}
          <StyledHtmlTable>
            <div style={{ padding: '10px' }}>
              <table>
                <colgroup>
                  <col width="20%" />
                  <col width="20%" />
                  <col width="20%" />
                  <col width="20%" />
                  <col width="20%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>신청일</th>
                    <th>신청팀</th>
                    <th>신청자</th>
                    <th>결재자</th>
                    <th>지급요청일</th>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'center' }}>{isModified ? rowData.REQ_DT : moment().format('YYYY-MM-DD')}</td>
                    <td style={{ textAlign: 'center' }}>{isModified ? rowData.DEPT_NAME_KOR : profile.DEPT_NAME_KOR}</td>
                    <td style={{ textAlign: 'center' }}>{isModified ? rowData.NAME_KOR : profile.NAME_KOR}</td>
                    <td style={{ textAlign: 'center' }}></td>
                    <td style={{ textAlign: 'center' }}>
                      {isModified ? rowData.TARGET_DT : <AntdPicker className="ant-picker-sm" defaultValue={moment()} onChange={handleDateChange} />}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </StyledHtmlTable>
          {/* </div> */}
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
      </>
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
};

ModalContents.defatulProps = {
  handleModalClose: null,
  saveTask: null,
  getDataSource: null,
  isModified: false,
};

export default ModalContents;
