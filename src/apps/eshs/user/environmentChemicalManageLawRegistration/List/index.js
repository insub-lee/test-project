import React from 'react';
import PropTypes from 'prop-types';

import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import { Popconfirm, Input, InputNumber, Select } from 'antd';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';
import StyledInputNumber from 'commonStyled/Form/StyledInputNumber';

import Modal from 'apps/eshs/user/environmentMasterRegistration/InputModal';
import SearchComp from '../SearchComp';

const AntdSearch = StyledSearchInput(Input.Search);
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdInputNumber = StyledInputNumber(InputNumber);
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      deleteConfirmMessage: '삭제하시겠습니까?',
      requestValue: {
        CATEGORY_ID: 1977,
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        NAME_ETC: '',
        EXISTING_MATERIAL: '',
        HARMFUL_MATERIAL: '',
        EMPHASIS_MANAGE: '',
        CANCER_MATERIAL: '',
        ACCIDENT_MATERIAL: '',
        RESTRICT_DETAIL: '',
        CONTENT_FACTOR: '',
        ETC: '',
        EXPRESSION: '',
        RESTRICT_NO: 0,
        PROHIBITION_NO: 0,
      },
      getCategorys: [],
      isModified: false,
    };
  }

  componentDidMount() {
    this.getCategoryList();
  }

  handleSearchClick = () => {
    this.setState({
      visible: true,
    });
  };

  getCategoryList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'harmfulList',
        type: 'POST',
        url: `/api/admin/v1/common/categoryMapList`,
        params: { PARAM: { NODE_ID: 1976 } },
      },
    ];

    getCallDataHandler(id, apiArr, this.setCategoryList);
  };

  setCategoryList = () => {
    const { result } = this.props;
    this.setState({
      getCategorys: (result.harmfulList && result.harmfulList.categoryMapList && result.harmfulList.categoryMapList.slice(1)) || [],
    });
  };

  handleInputClick = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { requestValue } = this.state;
    return submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshschemicalmaterialmanageactharmful`, requestValue, this.getMaterialList);
  };

  handleModifyClick = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { requestValue } = this.state;
    return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalmaterialmanageactharmful`, requestValue, this.getMaterialList);
  };

  handleDeleteConfirm = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { requestValue } = this.state;
    return submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshschemicalmaterialmanageactharmful`, requestValue, this.getMaterialList);
  };

  getMaterialList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshschemicalmaterialmanageactharmful',
      },
    ];
    getCallDataHandler(id, apiArr, this.handleResetClick);
  };

  handleDeleteClick = () => {
    const { requestValue } = this.state;
    if (!requestValue.HARMFUL_ID) {
      return this.setState({
        deleteConfirmMessage: '선택된 항목이 없습니다.',
      });
    }
    return this.setState({
      deleteConfirmMessage: '삭제하시겠습니까?',
    });
  };

  handleResetClick = () => {
    this.setState({
      requestValue: {
        CATEGORY_ID: 1977,
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        NAME_ETC: '',
        EXISTING_MATERIAL: '',
        HARMFUL_MATERIAL: '',
        EMPHASIS_MANAGE: '',
        CANCER_MATERIAL: '',
        ACCIDENT_MATERIAL: '',
        RESTRICT_DETAIL: '',
        CONTENT_FACTOR: '',
        ETC: '',
        EXPRESSION: '',
        RESTRICT_NO: 0,
        PROHIBITION_NO: 0,
      },
      isModified: false,
    });
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

  handleInputNumberChange = (value, name) => {
    if (typeof value !== 'number') {
      const valueObj = { [name]: '' };
      this.setState(prevState => ({
        requestValue: Object.assign(prevState.requestValue, valueObj),
      }));
    }
    const valueObj = { [name]: value };
    this.setState(prevState => ({
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
  ];

  render() {
    const {
      handleSearchClick,
      handleInputClick,
      handleDeleteConfirm,
      handleDeleteClick,
      handleResetClick,
      handleInputChange,
      handleInputNumberChange,
      handleModalClose,
      setRequestValue,
      handleModifyClick,
    } = this;
    const { columns } = this;
    const { visible, deleteConfirmMessage, requestValue, getCategorys, isModified } = this.state;
    const { sagaKey, getCallDataHandler, result, changeFormData, formData } = this.props;
    return (
      <>
        <ContentsWrapper>
          <StyledSearchWrap>
            <span className="input-label">화학물 추가</span>
            <AntdSearch className="ant-search-inline input-search-mid mr5" placeholder="검색" onClick={handleSearchClick} value="" style={{ width: '200px' }} />
            <StyledButtonWrapper className="btn-wrap-inline">
              <StyledButton className="btn-primary btn-first" onClick={handleInputClick}>
                신규등록
              </StyledButton>
              <StyledButton className="btn-primary btn-first" onClick={handleModifyClick}>
                수정
              </StyledButton>
              <Popconfirm
                title={deleteConfirmMessage}
                onConfirm={isModified ? handleDeleteConfirm : null}
                okText={isModified ? '삭제' : '확인'}
                cancelText="취소"
              >
                <StyledButton className="btn-light btn-first" onClick={handleDeleteClick}>
                  삭제
                </StyledButton>
              </Popconfirm>
              <StyledButton className="btn-light" onClick={handleResetClick}>
                초기화
              </StyledButton>
            </StyledButtonWrapper>
          </StyledSearchWrap>
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
                      <AntdSelect
                        className="select-sm"
                        defaultValue={1977}
                        value={Number(requestValue.CATEGORY_ID)}
                        onChange={value => this.setState(prevState => ({ requestValue: Object.assign(prevState.requestValue, { CATEGORY_ID: value }) }))}
                        style={{ width: '40%' }}
                      >
                        {getCategorys.map(item => (
                          <Select.Option value={item.NODE_ID}>{item.NAME_KOR}</Select.Option>
                        ))}
                      </AntdSelect>
                    </td>
                    <th colSpan={1}>CAS_NO.</th>
                    <td colSpan={3}>
                      <AntdInput className="ant-input-sm" name="CAS_NO" value={requestValue.CAS_NO} onChange={handleInputChange} />
                    </td>
                  </tr>
                  <tr>
                    <th colSpan={1}>화학물질명_국문</th>
                    <td colSpan={3}>
                      <AntdInput className="ant-input-sm" name="NAME_KOR" value={requestValue.NAME_KOR} onChange={handleInputChange} />
                    </td>
                    <th colSpan={1}>화학물질명_영문</th>
                    <td colSpan={3}>
                      <AntdInput className="ant-input-sm" name="NAME_ENG" value={requestValue.NAME_ENG} onChange={handleInputChange} />
                    </td>
                  </tr>
                  <tr>
                    <th rowSpan={5}>고유번호</th>
                    <th>기존화학물질</th>
                    <td colSpan={2}>
                      <AntdInput className="ant-input-sm" name="EXISTING_MATERIAL" value={requestValue.EXISTING_MATERIAL} onChange={handleInputChange} />
                    </td>
                    <th rowSpan={3}>제한내용</th>
                    <td rowSpan={3}>
                      <Input.TextArea
                        name="RESTRICT_DETAIL"
                        value={requestValue.RESTRICT_DETAIL}
                        onChange={handleInputChange}
                        autoSize={{ minRows: 4, maxRows: 4 }}
                      />
                    </td>
                    <th rowSpan={3}>함량정보</th>
                    <td rowSpan={3}>
                      <Input.TextArea
                        name="CONTENT_FACTOR"
                        value={requestValue.CONTENT_FACTOR}
                        onChange={handleInputChange}
                        autoSize={{ minRows: 4, maxRows: 4 }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>유해화학물질</th>
                    <td colSpan={2}>
                      <AntdInput className="ant-input-sm" name="HARMFUL_MATERIAL" value={requestValue.HARMFUL_MATERIAL} onChange={handleInputChange} />
                    </td>
                  </tr>
                  <tr>
                    <th>중점관리물질</th>
                    <td colSpan={2}>
                      <AntdInput className="ant-input-sm" name="EMPHASIS_MANAGE" value={requestValue.EMPHASIS_MANAGE} onChange={handleInputChange} />
                    </td>
                  </tr>
                  <tr>
                    <th>암, 돌연변이성물질</th>
                    <td colSpan={2}>
                      <AntdInput className="ant-input-sm" name="CANCER_MATERIAL" value={requestValue.CANCER_MATERIAL} onChange={handleInputChange} />
                    </td>
                    <th rowSpan={1}>비고</th>
                    <td rowSpan={1}>
                      <AntdInput className="ant-input-sm" name="ETC" value={requestValue.ETC} onChange={handleInputChange} />
                    </td>
                    <th rowSpan={1}>수식</th>
                    <td rowSpan={1}>
                      <AntdInput className="ant-input-sm" name="EXPRESSION" value={requestValue.EXPRESSION} onChange={handleInputChange} />
                    </td>
                  </tr>
                  <tr>
                    <th>사고대비물질</th>
                    <td colSpan={2}>
                      <AntdInput className="ant-input-sm" name="ACCIDENT_MATERIAL" value={requestValue.ACCIDENT_MATERIAL} onChange={handleInputChange} />
                    </td>
                    <th>제한물질 NO.</th>
                    <td>
                      <AntdInputNumber
                        value={requestValue.RESTRICT_NO}
                        onChange={value => handleInputNumberChange(value, 'RESTRICT_NO')}
                        className="input-number-sm"
                      />
                    </td>
                    <th>금지물질 NO.</th>
                    <td>
                      <AntdInputNumber
                        value={requestValue.PROHIBITION_NO}
                        onChange={value => handleInputNumberChange(value, 'PROHIBITION_NO')}
                        className="input-number-sm"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
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
          apiUrl="/api/eshs/v1/common/eshschemicalmaterialmanageactharmful"
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
