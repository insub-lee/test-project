import React from 'react';
import PropTypes from 'prop-types';

import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledButton from 'commonStyled/Buttons/StyledButton';

import { Popconfirm, Input, InputNumber, Select } from 'antd';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      deleteConfirmMessage: '삭제하시겠습니까?',
      requestValue: {},
    };
  }

  componentDidMount() {
    console.debug('wee');
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

  render() {
    const { handleSearchClick, handleInputClick, handleDeleteConfirm, handleDeleteClick, handleResetClick, handleInputChange } = this;
    const { deleteConfirmMessage, requestValue } = this.state;
    return (
      <>
        <ContentsWrapper>
          <StyledSearchWrap>
            <span className="input-label">화학물 추가</span>
            <Input.Search className="search-item input-width160" placeHolder="검색" onClick={handleSearchClick} value="" />
          </StyledSearchWrap>
          <div className="selSaveWrapper">
            <StyledButton className="btn-primary btn-first" onClick={handleInputClick}>
              저장/수정
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
                  <col width="8%" />
                  <col width="17%" />
                  <col width="8%" />
                  <col width="17%" />
                  <col width="8%" />
                  <col width="17%" />
                  <col width="8%" />
                  <col width="17%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th colSpan={1}>분류</th>
                    <td colSpan={3}>
                      <Select defaultValue="사고대비물질 검색(함량기준 판단)">
                        <Select.Option value="ee" />
                        <Select.Option value="ee" />
                        <Select.Option value="ee" />
                        <Select.Option value="ee" />
                        <Select.Option value="ee" />
                      </Select>
                    </td>
                    <th colSpan={1}>CAS_NO.</th>
                    <td colSpan={3}>
                      <AntdInput className="ant-input-sm" name="CAS_NO" value={requestValue.CAS_NO} onChange={handleInputChange} />
                    </td>
                  </tr>
                  <tr>
                    <th>화학물질명_국문</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="NAME_KOR" value={requestValue.NAME_KOR} onChange={handleInputChange} />
                    </td>
                    <th>화학물질명_영문</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="NAME_ENG" value={requestValue.NAME_ENG} onChange={handleInputChange} />
                    </td>
                    <th>화학물질명_SAP</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="NAME_SAP" value={requestValue.NAME_SAP} onChange={handleInputChange} />
                    </td>
                    <th>관용명 및 이명</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="NAME_ETC" value={requestValue.NAME_ETC} onChange={handleInputChange} />
                    </td>
                  </tr>
                  <tr rowSpan={5}>
                    <th>고유번호</th>
                    <tr rowSpan={1}>
                      <th>기존화학물질</th>
                    </tr>
                  </tr>
                </tbody>
              </table>
              <div className="div-comment">kg환산계수: 단위환산1 * 단위환산2</div>
            </StyledHtmlTable>
          </div>
        </ContentsWrapper>
      </>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
};
List.defaultProps = {};

export default List;
