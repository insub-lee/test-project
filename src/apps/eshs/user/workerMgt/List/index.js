import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Table, Column, AutoSizer } from 'react-virtualized';
import { Input, Modal, Table, Descriptions } from 'antd';
import { CaretDownOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';
import Styled from './Styled';
import ExcelDownloader from '../Excel';

const AntdModal = StyledModalWrapper(Modal);
const AntdTable = StyledLineTable(Table);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: {
        WRK_CMPNY_NM: '',
        WRK_CMPNY_CD: 'N/A',
      },
      workerList: [],
      modalType: '',
      modalVisible: false,
      validList: ['WORKER_NM', 'WORKER_SSN', 'M_TEL'],
    };
  }

  /* 
    formData Reset func
    특이사항 : formData 초기화시, wrk_cmpny_cd 는 값을 유지한다.
  */
  resetFormData = () => {
    const { searchValue } = this.state;
    const { sagaKey: id, setFormData } = this.props;
    const nextFormData = {
      WORKER_SEQ: -1,
      WORKER_SSN: '',
      WORKER_NM: '',
      WRK_CMPNY_CD: searchValue.WRK_CMPNY_CD || '',
      TEL: '',
      M_TEL: '',
    };
    setFormData(id, nextFormData);
  };

  // Visible Modal Control Func
  handleModal = (type, bool) => {
    if (!bool) this.resetFormData();
    this.setState({
      modalType: type,
      modalVisible: bool,
    });
  };

  // Cmpny Select Func
  handleSelectCmpny = (companyInfo, COMP_FIELD) => {
    const { sagaKey: id, changeFormData } = this.props;
    this.setState(
      {
        searchValue: {
          WRK_CMPNY_NM: companyInfo.WRK_CMPNY_NM,
          WRK_CMPNY_CD: companyInfo.WRK_CMPNY_CD,
        },
      },
      () => {
        changeFormData(id, COMP_FIELD, companyInfo.WRK_CMPNY_CD);
        this.handleModal('', false);
      },
    );
  };

  // List Excel Download Func
  handleGetExcel = () => {
    const { workerList } = this.state;
    const getType = 'excel';
    console.debug('엑셀다운로드', getType, 'workerList', workerList);
  };

  // Search Worker func (GET API)
  handleGetWorkers = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { searchValue } = this.state;
    const type = 'search';
    const apiArr = [
      {
        key: 'getWorkers',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsWorker?type=${type}&keyword=${searchValue.WRK_CMPNY_CD}`,
      },
    ];
    getCallDataHandler(id, apiArr, this.getSearchListData);
  };

  // result setState func
  getSearchListData = () => {
    const { result } = this.props;
    const workerList = (result && result.getWorkers && result.getWorkers.workerList) || [];
    this.setState({
      workerList,
    });
  };

  // handle WorkerData Func
  handleWorkerData = type => {
    const { sagaKey: id, formData, submitHandlerBySaga } = this.props;
    const submitData = { PARAM: formData };
    let validResult = false;
    switch (type) {
      case 'I':
        validResult = this.checkValidation(formData);
        if (validResult) {
          submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsWorker', submitData, this.handleWorkDataCallback);
        }
        break;
      case 'U':
        validResult = this.checkValidation(formData);
        if (validResult) {
          submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsWorker', submitData, this.handleWorkDataCallback);
        }
        break;
      case 'D':
        break;
      default:
        break;
    }
  };

  handleWorkDataCallback = () => {
    const { searchValue } = this.state;
    if (searchValue.WRK_CMPNY_CD !== '') this.handleGetWorkers();
    this.handleModal('', false);
  };

  // validation Check func
  checkValidation = formData => {
    const { validList } = this.state;
    const msgTarget = {
      WORKER_NM: '성명',
      WORKER_SSN: '생년월일',
      M_TEL: '휴대폰 번호(연락처)',
    };
    const validIdx = validList.findIndex(valid => formData[valid] === '');
    if (validIdx !== -1) {
      message.error(<MessageContent>{`${msgTarget[validList[validIdx]]}은(는) 필수 입력사항 입니다.`}</MessageContent>);
      return false;
    }

    // 개발기준으로 주민등록번호 유효성 검사무시
    const ssn = formData.WORKER_SSN;
    const validSsn = ssn.length === 13;
    // const validSsn = this.ssnCheck(ssn);
    if (!validSsn) {
      message.error(<MessageContent>주민등록번호가 유효하지 않습니다.</MessageContent>);
      return false;
    }
    return true;
  };

  // ssn checker (주민등록번호 유효성 검사)
  ssnCheck = ssn => {
    const checkNum = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
    let sum = 0;
    checkNum.forEach((num, index) => {
      const temp = ssn.charAt(index) * num;
      sum += temp;
    });
    let pin = 11 - (sum % 11);
    if (pin >= 10) pin -= 10;
    if (Number(ssn.charAt(12)) === pin) {
      return true;
    }
    return false;
  };

  handleModifyWorker = row => {
    const { sagaKey: id, setFormData } = this.props;
    const modifyFormData = {
      WORKER_SEQ: row.workerSeq,
      WORKER_SSN: row.workerSsn,
      WORKER_NM: row.workerNm,
      WRK_CMPNY_CD: row.wrkCmpnyCd,
      TEL: row.tel,
      M_TEL: row.mTel,
    };
    setFormData(id, modifyFormData);
    this.handleModal('modify', true);
  };

  // render Input Tag
  renderInputColumns = (key, value) => {
    const { sagaKey: id, changeFormData } = this.props;
    const fieldList = [
      { key: 'WORKER_SSN', size: 13 },
      { key: 'WORKER_NM', size: 20 },
      { key: 'TEL', size: 13 },
      { key: 'M_TEL', size: 13 },
    ];
    const keyField = fieldList.find(field => field.key === key);
    return <Input maxLength={keyField.size} value={value} onChange={e => changeFormData(id, key, e.target.value)} />;
  };

  // render Table Action Buttons
  renderActionButtons = row => (
    <StyledButtonWrapper>
      <StyledButton className="btn-light btn-sm btn-first" onClick={() => this.handleModifyWorker(row)}>
        수정
      </StyledButton>
      <StyledButton className="btn-light btn-sm btn-first" onClick={() => console.debug('삭제')}>
        삭제
      </StyledButton>
    </StyledButtonWrapper>
  );

  // Modal Title
  setModalTitle = modalType => {
    switch (modalType) {
      case 'search':
        return '거래처 검색';
      case 'insert':
        return '작업자 신규 등록';
      case 'modify':
        return '작업자 정보 수정';
      default:
        return '';
    }
  };

  render() {
    const { formData } = this.props;
    const { searchValue, workerList, modalType, modalVisible } = this.state;
    const columns = [
      {
        title: '교육이수여부',
        dataIndex: 'eduComplete',
        width: '10%',
        align: 'center',
        render: value => {
          if (value === undefined || value === false) return <CloseOutlined style={{ color: '#ff6666' }} />;
          return <CheckOutlined style={{ color: '#71da71' }} />;
        },
      },
      {
        title: '성명',
        dataIndex: 'workerNm',
        width: '15%',
        align: 'center',
      },
      {
        title: '생년월일',
        dataIndex: 'workerSsn',
        width: '20%',
        align: 'center',
        render: value => <span>{value.substr(0, 6)}</span>,
      },
      {
        title: '핸드폰(연락처)',
        dataIndex: 'mTel',
        width: '20%',
        align: 'center',
      },
      {
        title: '긴급연락처',
        dataIndex: 'tel',
        width: '20%',
        align: 'center',
      },
      {
        title: '편집도구',
        dataIndex: '',
        width: '15%',
        align: 'center',
        render: (value, row) => this.renderActionButtons(row),
      },
    ];

    return (
      <Styled>
        <StyledSearchWrap>
          <div className="search-group-layer">
            <label>
              거래처
              <Input
                className="input-width200 use-label input-first use_addon"
                readOnly
                onClick={() => this.handleModal('search', true)}
                value={searchValue.WRK_CMPNY_NM}
              />
            </label>
            <div
              className="searchCmpnyBtn"
              tabIndex={0}
              onClick={() => this.handleModal('search', true)}
              onKeyPress={() => this.handleModal('search', true)} // esLint
              role="button" // esLint
            >
              <CaretDownOutlined />
            </div>
            <StyledButton className="btn-primary btn-sm btn-first" onClick={this.handleGetWorkers}>
              검색
            </StyledButton>
            <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleModal('insert', true)}>
              작업자 추가
            </StyledButton>
            {workerList.length > 0 && <ExcelDownloader dataList={workerList} wrkCmpnyNm={searchValue.WRK_CMPNY_NM} />}
          </div>
        </StyledSearchWrap>
        <>
          <AntdTable
            columns={columns}
            dataSource={workerList}
            footer={() => <div style={{ textAlign: 'center' }}>{`총 ${workerList.length === 0 ? 0 : workerList.length} 명`}</div>}
          />
        </>
        <AntdModal
          title={this.setModalTitle(modalType)}
          width={790}
          visible={modalVisible}
          footer={null}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          {modalType === 'search' ? (
            <EshsCmpnyComp
              sagaKey={this.props.sagaKey}
              getExtraApiData={this.props.getCallDataHandler}
              extraApiData={this.props.result}
              colData={formData.wrk_cmpny_cd}
              directSearchTable
              visible
              CONFIG={{ property: { isRequired: false } }}
              changeFormData={() => false}
              COMP_FIELD="WRK_CMPNY_CD"
              eshsCmpnyCompResult={(companyInfo, COMP_FIELD) => this.handleSelectCmpny(companyInfo, COMP_FIELD)}
            />
          ) : (
            <>
              <Descriptions size="default" bordered>
                <Descriptions.Item label="거래처" span={4}>
                  {searchValue.WRK_CMPNY_NM === '' ? 'N/A' : searchValue.WRK_CMPNY_NM}
                </Descriptions.Item>
                <Descriptions.Item label="이름" span={4}>
                  {this.renderInputColumns('WORKER_NM', formData.WORKER_NM)}
                </Descriptions.Item>
                <Descriptions.Item label="주민등록번호" span={4}>
                  {this.renderInputColumns('WORKER_SSN', formData.WORKER_SSN)}
                </Descriptions.Item>
                <Descriptions.Item label="휴대폰(연락처)" span={4}>
                  {this.renderInputColumns('M_TEL', formData.M_TEL)}
                </Descriptions.Item>
                <Descriptions.Item label="긴급연락처" span={4}>
                  {this.renderInputColumns('TEL', formData.TEL)}
                </Descriptions.Item>
              </Descriptions>
              <StyledButtonWrapper className="btn-wrap-right">
                {formData.WORKER_SEQ === -1 ? (
                  <StyledButton className="btn-primary btn-first" onClick={() => this.handleWorkerData('I')}>
                    저장
                  </StyledButton>
                ) : (
                  <StyledButton className="btn-primary btn-first" onClick={() => this.handleWorkerData('U')}>
                    수정
                  </StyledButton>
                )}
                <StyledButton className="btn-primary" onClick={() => this.handleModal('', false)}>
                  취소
                </StyledButton>
              </StyledButtonWrapper>
            </>
          )}
        </AntdModal>
      </Styled>
    );
  }
}
List.propTypes = {
  sagaKey: PropTypes.string.isRequired,
  result: PropTypes.object,
  formData: PropTypes.object,
  setFormData: PropTypes.func.isRequired,
  getCallDataHandler: PropTypes.func.isRequired,
  changeFormData: PropTypes.func.isRequired,
  submitHandlerBySaga: PropTypes.func.isRequired,
};

List.defaultProps = {
  formData: {
    WORKER_SSN: '',
    WORKER_NM: '',
    WRK_CMPNY_CD: 'N/A',
    TEL: '',
    M_TEL: '',
  },
};

export default List;
