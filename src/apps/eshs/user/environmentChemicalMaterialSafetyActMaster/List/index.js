import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Popconfirm } from 'antd';

import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';

import Modal from 'apps/eshs/user/environmentMasterRegistration/InputModal';
import SearchComp from 'apps/eshs/user/environmentMasterRegistration/InputModal/SearchComp';

const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const AntdSearch = StyledSearchInput(Input.Search);
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      requestValue: {
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        IS_EXPOSURE: 'N',
        IS_PERMISSION: 'N',
        IS_ALLOW: 'N',
      },
      subRequestValue: [],
      isModified: false,
      deleteConfirmMessage: '삭제하시겠습니까?',
    };
  }

  mainTableRenderer = () => (
    <>
      <tr>
        <th>화학물질명_국문</th>
        <td>
          <AntdInput className="ant-input-sm" name="NAME_KOR" value={this.state.requestValue.NAME_KOR} onChange={e => this.handleInputChange(e, 'INPUT')} />
        </td>
        <th>화학물질명_영문</th>
        <td>
          <AntdInput className="ant-input-sm" name="NAME_ENG" value={this.state.requestValue.NAME_ENG} onChange={e => this.handleInputChange(e, 'INPUT')} />
        </td>
        <th>CAS NO.</th>
        <td>
          <AntdInput className="ant-input-sm" name="CAS_NO" value={this.state.requestValue.CAS_NO} onChange={e => this.handleInputChange(e, 'INPUT')} />
        </td>
      </tr>
      <tr>
        <th>노출기준설정물질</th>
        <td>
          <AntdSelect
            className="select-sm"
            defaultValue="Y"
            onChange={e => this.handleInputChange(e, 'SELECT', 'IS_EXPOSURE')}
            value={this.state.requestValue.IS_EXPOSURE}
            style={{ width: '100%' }}
          >
            <Select.Option value="Y">해당</Select.Option>
            <Select.Option value="N">비해당</Select.Option>
          </AntdSelect>
        </td>
        <th>허가대상물질</th>
        <td>
          <AntdSelect
            className="select-sm"
            defaultValue="Y"
            onChange={e => this.handleInputChange(e, 'SELECT', 'IS_PERMISSION')}
            value={this.state.requestValue.IS_PERMISSION}
            style={{ width: '100%' }}
          >
            <Select.Option value="Y">해당</Select.Option>
            <Select.Option value="N">비해당</Select.Option>
          </AntdSelect>
        </td>
        <th>허용기준설정물질(제한물질)</th>
        <td>
          <AntdSelect
            className="select-sm"
            defaultValue="Y"
            onChange={e => this.handleInputChange(e, 'SELECT', 'IS_ALLOW')}
            value={this.state.requestValue.IS_ALLOW}
            style={{ width: '100%' }}
          >
            <Select.Option value="Y">해당</Select.Option>
            <Select.Option value="N">비해당</Select.Option>
          </AntdSelect>
        </td>
      </tr>
    </>
  );

  subTableRenderer = () => (
    <>
      <tr>
        <th>하위물질명_국문</th>
        <td>하위물질명_국문</td>
        <th>하위물질명_영문</th>
        <td>하위물질명_영문</td>
        <th>CAS_NO</th>
        <td>CAS_NO</td>
      </tr>
      <tr>
        <th>노출기준설정물질</th>
        <td>
          <AntdInput className="ant-input-sm" name="CAS_NO" value={this.state.requestValue.CAS_NO} onChange={e => this.handleInputChange(e, 'INPUT')} />
        </td>
        <th>허가대상물질</th>
        <td>
          <AntdInput className="ant-input-sm" name="CAS_NO" value={this.state.requestValue.CAS_NO} onChange={e => this.handleInputChange(e, 'INPUT')} />
        </td>
        <th>허용기준설정물질(제한물질)</th>
        <td>
          <AntdInput className="ant-input-sm" name="CAS_NO" value={this.state.requestValue.CAS_NO} onChange={e => this.handleInputChange(e, 'INPUT')} />
        </td>
      </tr>
    </>
  );

  htmlTable = [this.mainTableRenderer(), this.subTableRenderer()];

  handleSearchClick = () => {
    this.setState({
      visible: true,
    });
  };

  handleInputChange = (event, type, name) => {
    if (type.toUpperCase() === 'INPUT') {
      const valueObj = { [event.target.name.toUpperCase()]: event.target.value };
      return this.setState(prevState => ({
        requestValue: Object.assign(prevState.requestValue, valueObj),
      }));
    }

    if (type.toUpperCase() === 'SELECT' && name === 'CATEGORY') {
      const valueObj = { [name.toUpperCase()]: event };
      this.getSubCategories(event);
      return this.setState(prevState => ({
        requestValue: Object.assign(prevState.requestValue, valueObj),
      }));
    }

    if (type.toUpperCase() === 'SELECT') {
      const valueObj = { [name.toUpperCase()]: event };
      return this.setState(prevState => ({
        requestValue: Object.assign(prevState.requestValue, valueObj),
      }));
    }
    return null;
  };

  handleInputClick = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { requestValue, isModified } = this.state;
    if (isModified) {
      this.setState({
        isModified: false,
      });
      return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalsafetymaster`, requestValue, this.getMaterialList);
    }
    this.setState({
      isModified: false,
    });
    return submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshschemicalsafetymaster`, requestValue, this.getMaterialList);
  };

  handleDeleteClick = () => {
    const { requestValue } = this.state;
    if (!requestValue.SAFETY_ID) {
      return this.setState({
        deleteConfirmMessage: '선택된 항목이 없습니다.',
      });
    }
    return this.setState({
      deleteConfirmMessage: '삭제하시겠습니까?',
    });
  };

  handleDeleteConfirm = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { requestValue } = this.state;
    return submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshschemicalsafetymaster`, requestValue, this.getMaterialList);
  };

  getMaterialList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshschemicalsafetymaster',
      },
    ];
    getCallDataHandler(id, apiArr, this.handleResetClick);
  };

  handleResetClick = () => {
    this.setState({
      requestValue: {
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        IS_EXPOSURE: 'N',
        IS_PERMISSION: 'N',
        IS_ALLOW: 'N',
      },
      isModified: false,
    });
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
      handleInputChange,
      handleInputClick,
      handleModalClose,
      setRequestValue,
      handleResetClick,
      handleDeleteConfirm,
      handleDeleteClick,
    } = this;
    const { columns } = this;
    const { requestValue, visible, deleteConfirmMessage } = this.state;
    const { sagaKey, getCallDataHandler, result, changeFormData, formData } = this.props;
    return (
      <>
        <ContentsWrapper>
          <StyledSearchWrap>
            <div className="search-inner">
              <span className="input-label">화학물 추가</span>
              <AntdSearch
                className="ant-search-inline input-search-mid mr5"
                placeHolder="검색"
                onClick={handleSearchClick}
                value=""
                style={{ width: '200px' }}
              />
              <StyledButtonWrapper className="btn-wrap-inline">
                <StyledButton className="btn-primary btn-first" onClick={handleInputClick}>
                  저장/수정
                </StyledButton>
                <StyledButton className="btn-light btn-first" onClick={() => this.subTableRenderer().concat(this.subTableRenderer())}>
                  하위물질추가
                </StyledButton>
                <Popconfirm title={deleteConfirmMessage} onConfirm={handleDeleteConfirm} okText="삭제" cancelText="취소">
                  <StyledButton className="btn-light btn-first" onClick={handleDeleteClick}>
                    삭제
                  </StyledButton>
                </Popconfirm>
                <StyledButton className="btn-light" onClick={handleResetClick}>
                  초기화
                </StyledButton>
              </StyledButtonWrapper>
            </div>
          </StyledSearchWrap>
          <div className="tableWrapper">
            <StyledHtmlTable>
              <table>
                <colgroup>
                  <col width="15%" />
                  <col width="18%" />
                  <col width="15%" />
                  <col width="18%" />
                  <col width="15%" />
                  <col width="18%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>화학물질명_국문</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="NAME_KOR" value={requestValue.NAME_KOR} onChange={e => handleInputChange(e, 'INPUT')} />
                    </td>
                    <th>화학물질명_영문</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="NAME_ENG" value={requestValue.NAME_ENG} onChange={e => handleInputChange(e, 'INPUT')} />
                    </td>
                    <th>CAS NO.</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="CAS_NO" value={requestValue.CAS_NO} onChange={e => handleInputChange(e, 'INPUT')} />
                    </td>
                  </tr>
                  <tr>
                    <th>노출기준설정물질</th>
                    <td>
                      <AntdSelect
                        className="select-sm"
                        defaultValue="Y"
                        onChange={e => handleInputChange(e, 'SELECT', 'IS_EXPOSURE')}
                        value={requestValue.IS_EXPOSURE}
                        style={{ width: '100%' }}
                      >
                        <Select.Option value="Y">해당</Select.Option>
                        <Select.Option value="N">비해당</Select.Option>
                      </AntdSelect>
                    </td>
                    <th>허가대상물질</th>
                    <td>
                      <AntdSelect
                        className="select-sm"
                        defaultValue="Y"
                        onChange={e => handleInputChange(e, 'SELECT', 'IS_PERMISSION')}
                        value={requestValue.IS_PERMISSION}
                        style={{ width: '100%' }}
                      >
                        <Select.Option value="Y">해당</Select.Option>
                        <Select.Option value="N">비해당</Select.Option>
                      </AntdSelect>
                    </td>
                    <th>허용기준설정물질(제한물질)</th>
                    <td>
                      <AntdSelect
                        className="select-sm"
                        defaultValue="Y"
                        onChange={e => handleInputChange(e, 'SELECT', 'IS_ALLOW')}
                        value={requestValue.IS_ALLOW}
                        style={{ width: '100%' }}
                      >
                        <Select.Option value="Y">해당</Select.Option>
                        <Select.Option value="N">비해당</Select.Option>
                      </AntdSelect>
                    </td>
                  </tr>
                  {this.subTableRenderer()}
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
          apiUrl="/api/eshs/v1/common/eshschemicalsafetymaster"
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
  getCallDataHandler: PropTypes.func,
  result: PropTypes.object,
  changeFormData: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  formData: PropTypes.object,
};

List.defaultProps = {
  sagaKey: '',
  getCallDataHandler: () => {},
  result: {},
  changeFormData: () => {},
  submitHandlerBySaga: () => {},
  formData: {},
};

export default List;
