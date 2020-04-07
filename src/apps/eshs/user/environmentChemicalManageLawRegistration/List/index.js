import React from 'react';
import PropTypes from 'prop-types';

import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import { Popconfirm, Input, Select } from 'antd';

import Modal from 'apps/eshs/user/environmentMasterRegistration/InputModal';
import SearchComp from '../SearchComp';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      deleteConfirmMessage: '삭제하시겠습니까?',
      requestValue: {
        CATEGORY: '',
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        NAME_ETC: '',
        EXISTING_MATERIAL: '',
        HARMFUL_MATERIAL: '',
        EMPHASIS_MANAGE: '',
        CANCER_MATERIAL: '',
        ACCIDENT_MATERIAL: '',
        LIMIT_CONTENT: '',
        CONTENT_FACTOR: '',
        ETC: '',
        EXPRESSION: '',
        LIMIT_NO: 0,
        PROHIBITION_NO: 0,
      },
    };
  }

  componentDidMount() {
  }

  handleSearchClick = () => {
    this.setState({
      visible: true,
    });
  };

  handleInputClick = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { requestValue, isModified } = this.state;
    if (isModified) {
      this.setState({
        isModified: false,
      });
      return submitHandlerBySaga(id, 'PUT', ``, { requestValue }, this.getMaterialList);
    }
    this.setState({
      isModified: false,
    });
    return submitHandlerBySaga(id, 'POST', ``, requestValue, this.getMaterialList);
  };

  handleDeleteConfirm = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { requestValue } = this.state;
    return submitHandlerBySaga(id, 'DELETE', ``, requestValue, this.getMaterialList);
  };

  handleDeleteClick = () => {
    const { requestValue } = this.state;
    if (!requestValue.MASTER_ID) {
      return this.setState({
        deleteConfirmMessage: '선택된 항목이 없습니다.',
      });
    }
    return this.setState({
      deleteConfirmMessage: '삭제하시겠습니까?',
    });
  };

  handleResetClick = () => {
    console.debug('reset');
  };

  handleInputChange = e => {
    let valueObj = {};
    if (!!e && typeof e === 'object') {
      valueObj = { [e.target.name]: e.target.value };
    }
    if (typeof e === 'string') {
      valueObj = { IS_IMPORT: e };
    }
    return this.setState(prevState => ({
      requestValue: Object.assign(prevState.requestValue, valueObj),
    }));
  };

  handleModalClose = () => {
    this.setState({
      visible: false,
    });
  };

  setRequestValue = record => {
    this.setState({
      requestValue: record,
      visible: false,
      isModified: true,
    });
  };

  columns = [
    {
      title: 'CAS_NO',
      dataIndex: 'CAS_NO',
      key: 'CAS_NO',
      align: 'center',
    },
    {
      title: '화학물질명_국문',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      align: 'center',
    },
    {
      title: '화학물질명_영문',
      dataIndex: 'NAME_ENG',
      key: 'NAME_ENG',
      align: 'center',
    },
    {
      title: '화학물질명_SAP',
      dataIndex: 'NAME_SAP',
      key: 'NAME_SAP',
      align: 'center',
    },
    {
      title: '관용명 및 이명',
      dataIndex: 'NAME_ETC',
      key: 'NAME_ETC',
      align: 'center',
    },
  ];

  render() {
    const {
      handleSearchClick,
      handleInputClick,
      handleDeleteConfirm,
      handleDeleteClick,
      handleResetClick,
      handleInputChange,
      handleModalClose,
      setRequestValue,
      columns,
    } = this;
    const { visible, deleteConfirmMessage, requestValue } = this.state;
    const { sagaKey, getCallDataHandler, result, changeFormData, formData } = this.props;
    return (
      <>
        <ContentsWrapper>
          <StyledSearchWrap>
            <span className="input-label">화학물 추가</span>
            <Input.Search className="search-item input-width160" placeholder="검색" onClick={handleSearchClick} value="" />
          </StyledSearchWrap>
          <div className="selSaveWrapper">
            <StyledButton className="btn-primary btn-first" onClick={handleInputClick}>
              신규등록
            </StyledButton>
            <StyledButton className="btn-primary btn-first" onClick={handleInputClick}>
              수정
            </StyledButton>
            <Popconfirm title={deleteConfirmMessage} onConfirm={handleDeleteConfirm} okText="삭제" cancelText="취소">
              <StyledButton className="btn-light btn-first" onClick={handleDeleteClick}>
                삭제
              </StyledButton>
            </Popconfirm>
            <StyledButton className="btn-light" onClick={handleResetClick}>
              초기화
            </StyledButton>
          </div>
          <div className="tableWrapper">
            <StyledHtmlTable>
              <table>
                <colgroup>
                  <col width="10%" />
                  <col width="15%" />
                  <col width="10%" />
                  <col width="15%" />
                  <col width="10%" />
                  <col width="15%" />
                  <col width="10%" />
                  <col width="15%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th colSpan={1}>분류</th>
                    <td colSpan={3}>
                      <AntdSelect className="select-sm" defaultValue="사고대비물질 검색(함량기준 판단)">
                        <Select.Option value="ee" />
                        <Select.Option value="ee" />
                        <Select.Option value="ee" />
                        <Select.Option value="ee" />
                        <Select.Option value="ee" />
                      </AntdSelect>
                    </td>
                    <th colSpan={1}>CAS_NO.</th>
                    <td colSpan={3}>{requestValue.CAS_NO}</td>
                  </tr>
                  <tr>
                    <th>화학물질명_국문</th>
                    <td>{requestValue.NAME_KOR}</td>
                    <th>화학물질명_영문</th>
                    <td>{requestValue.NAME_ENG}</td>
                    <th>화학물질명_SAP</th>
                    <td>{requestValue.NAME_SAP}</td>
                    <th>관용명 및 이명</th>
                    <td>{requestValue.NAME_ETC}</td>
                  </tr>
                  <tr>
                    <th rowSpan={5}>고유번호</th>
                    <th>기존화학물질</th>
                    <td colSpan={2}>
                      <AntdInput className="ant-input-sm" name="NAME_ETC" value={requestValue.NAME_ETC} onChange={handleInputChange} />
                    </td>
                    <th rowSpan={3}>제한내용</th>
                    <td rowSpan={3}>
                      <Input.TextArea autoSize={{ minRows: 4, maxRows: 4 }} />
                    </td>
                    <th rowSpan={3}>함량정보</th>
                    <td rowSpan={3}>
                      <Input.TextArea autoSize={{ minRows: 4, maxRows: 4 }} />
                    </td>
                  </tr>
                  <tr>
                    <th>유해화학물질</th>
                    <td colSpan={2}>
                      <AntdInput className="ant-input-sm" name="NAME_ETC" value={requestValue.NAME_ETC} onChange={handleInputChange} />
                    </td>
                  </tr>
                  <tr>
                    <th>중점관리물질</th>
                    <td colSpan={2}>
                      <AntdInput className="ant-input-sm" name="NAME_ETC" value={requestValue.NAME_ETC} onChange={handleInputChange} />
                    </td>
                  </tr>
                  <tr>
                    <th>암, 돌연변이성물질</th>
                    <td colSpan={2}>
                      <AntdInput className="ant-input-sm" name="NAME_ETC" value={requestValue.NAME_ETC} onChange={handleInputChange} />
                    </td>
                    <th rowSpan={2}>비고</th>
                    <td rowSpan={2}>
                      <AntdInput className="ant-input-sm" name="NAME_ETC" value={requestValue.NAME_ETC} onChange={handleInputChange} />
                    </td>
                    <th rowSpan={2}>수식</th>
                    <td rowSpan={2}>
                      <AntdInput className="ant-input-sm" name="NAME_ETC" value={requestValue.NAME_ETC} onChange={handleInputChange} />
                    </td>
                  </tr>
                  <tr>
                    <th>사고대비물질</th>
                    <td colSpan={2}>
                      <AntdInput className="ant-input-sm" name="NAME_ETC" value={requestValue.NAME_ETC} onChange={handleInputChange} />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="div-comment">kg환산계수: 단위환산1 * 단위환산2</div>
            </StyledHtmlTable>
          </div>
        </ContentsWrapper>
        <Modal
          sagaKey={sagaKey}
          visible={visible}
          modalClose={handleModalClose}
          getCallDataHandler={getCallDataHandler}
          result={result}
          setRequestValue={setRequestValue}
          apiUrl="/api/eshs/v1/common/eshschemicalmaterialMaster"
          tableColumns={columns}
          SearchComp={SearchComp}
          changeFormData={changeFormData}
          formData={formData}
        />
      </>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.object,
  changeFormData: PropTypes.func,
  formData: PropTypes.object,
};

List.defaultProps = {};

export default List;
