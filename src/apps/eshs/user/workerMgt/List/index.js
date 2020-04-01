import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Table, Column, AutoSizer } from 'react-virtualized';
import { Input, Modal, Table, Button } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
// import debounce from 'lodash/debounce';
// import StyledVirtualizedTable from 'components/CommonStyled/StyledVirtualizedTable';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledAntdTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
// import StyledButton from 'components/BizBuilder/styled/StyledButton';
import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';
import Styled from './Styled';
const AntdTable = StyledAntdTable(Table);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: {
        WRK_CMPNY_NM: '',
        WRK_CMPNY_CD: '',
      },
      workerList: [
        {
          eduComplete: '',
          workerNm: '',
          workerSsn: '',
          mTel: '',
          tel: '',
        },
      ],
      visibleModal: false,
      validList: ['WORKER_NM', 'WORKER_SSN', 'M_TEL'],
    };
  }

  componentDidMount() {
    this.resetFormData();
  }

  // formData Reset func
  resetFormData = () => {
    const { sagaKey: id, setFormData } = this.props;
    const defaultFormData = {
      WORKER_SSN: '',
      WORKER_NM: '',
      WRK_CMPNY_CD: 'N/A',
      TEL: '',
      M_TEL: '',
    };
    setFormData(id, defaultFormData);
  };

  // Visible Modal Control Func
  handleSearchCmpnyBtn = bool => {
    this.setState({
      visibleModal: bool,
    });
  };

  // Cmpny Select Func
  handleSelectCmpny = (companyInfo, COMP_FIELD) => {
    const { sagaKey: id, changeFormData } = this.props;
    this.setState({
      searchValue: {
        WRK_CMPNY_NM: companyInfo.WRK_CMPNY_NM,
        WRK_CMPNY_CD: companyInfo.WRK_CMPNY_CD,
      },
    });
    changeFormData(id, COMP_FIELD, companyInfo.WRK_CMPNY_CD);
    this.handleSearchCmpnyBtn(false);
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
    const inputItem = [
      {
        eduComplete: '',
        workerNm: '',
        workerSsn: '',
        mTel: '',
        tel: '',
      },
    ];

    let nextWorkerList = [];
    if (workerList.length > 0) {
      nextWorkerList = inputItem.concat(workerList);
    }

    this.setState({
      workerList: nextWorkerList,
    });
  };

  // add New Worker Func
  handleAddWorker = () => {
    const { sagaKey: id, formData, submitHandlerBySaga } = this.props;
    const submitData = { PARAM: formData };
    const validResult = this.checkValidation(formData);
    if (validResult) {
      submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsWorker', submitData, this.resetFormData);
    }
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

    const ssn = formData.WORKER_SSN;
    const validSsn = this.ssnCheck(ssn);
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

  // render Input Columns
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

  // render Action Buttons
  renderActionButtons = type => (
    <StyledButtonWrapper>
      {type === 'input' ? (
        <Button className="btn-primary btn-sm btn-first customBtn" onClick={this.handleAddWorker}>
          추가
        </Button>
      ) : (
        <>
          <Button className="btn-primary btn-sm btn-first customBtn" onClick={() => console.debug('수정')}>
            수정
          </Button>
          <Button className="btn-primary btn-sm btn-first customBtn" onClick={() => console.debug('삭제')}>
            삭제
          </Button>
        </>
      )}
    </StyledButtonWrapper>
  );

  render() {
    const { formData } = this.props;
    const { searchValue, workerList, visibleModal } = this.state;
    const columns = [
      {
        title: '교육이수여부',
        dataIndex: 'eduComplete',
        key: 'eduComplete',
        width: '10%',
        render: (value, row, index) => {
          switch (index) {
            case 0:
              return '';
            default:
              if (value === undefined) return <span>X</span>;
              return <span>{value}</span>;
          }
        },
      },
      {
        title: '성명',
        dataIndex: 'workerNm',
        key: 'workerNm',
        width: '15%',
        render: (value, row, index) => {
          switch (index) {
            case 0:
              return this.renderInputColumns('WORKER_NM', formData.WORKER_NM);
            default:
              return <span>{value}</span>;
          }
        },
      },
      {
        title: '생년월일',
        dataIndex: 'workerSsn',
        key: 'workerSsn',
        width: '20%',
        render: (value, row, index) => {
          switch (index) {
            case 0:
              return this.renderInputColumns('WORKER_SSN', formData.WORKER_SSN);
            default:
              return <span>{value}</span>;
          }
        },
      },
      {
        title: '핸드폰(연락처)',
        dataIndex: 'mTel',
        key: 'mTel',
        width: '20%',
        render: (value, row, index) => {
          switch (index) {
            case 0:
              return this.renderInputColumns('M_TEL', formData.M_TEL);
            default:
              return <span>{value}</span>;
          }
        },
      },
      {
        title: '긴급연락처',
        dataIndex: 'tel',
        key: 'tel',
        width: '20%',
        render: (value, row, index) => {
          switch (index) {
            case 0:
              return this.renderInputColumns('TEL', formData.TEL);
            default:
              return <span>{value}</span>;
          }
        },
      },
      {
        title: '편집도구',
        dataIndex: '',
        key: '',
        width: '15%',
        align: 'center',
        render: (value, row, index) => {
          switch (index) {
            case 0:
              return this.renderActionButtons('input');
            default:
              return this.renderActionButtons('list');
          }
        },
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
                onClick={() => this.handleSearchCmpnyBtn(true)}
                value={searchValue.WRK_CMPNY_NM}
              />
            </label>
            <div
              className="searchCmpnyBtn"
              tabIndex={0}
              onClick={() => this.handleSearchCmpnyBtn(true)}
              onKeyPress={() => this.handleSearchCmpnyBtn(true)} // esLint
              role="button" // esLint
            >
              <CaretDownOutlined />
            </div>
            <Button className="btn-primary btn-sm btn-first customBtn" onClick={this.handleGetWorkers}>
              검색
            </Button>
            {workerList.length === 0 && (
              <Button className="btn-primary btn-sm customBtn" onClick={this.handleGetExcel}>
                엑셀받기
              </Button>
            )}
          </div>
        </StyledSearchWrap>
        <>
          <AntdTable columns={columns} dataSource={workerList} />
        </>
        <Modal
          width={810}
          height={600}
          visible={visibleModal}
          footer={null}
          onOk={() => this.handleSearchCmpnyBtn(false)}
          onCancel={() => this.handleSearchCmpnyBtn(false)}
        >
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
        </Modal>
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
