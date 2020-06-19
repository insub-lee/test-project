import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Input, DatePicker, Radio } from 'antd';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';
import StyledPicker from 'commonStyled/Form/StyledPicker';

const AntdInput = StyledInput(Input);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdDatePicker = StyledPicker(DatePicker);

class IngCheckHead extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { ingCheckHead, handleChangeHeadFormData, handleModal } = this.props;
    return (
      <ContentsWrapper>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan={2}>
                  <span>점검일자</span>
                </th>
                <td colSpan={3}>
                  <AntdDatePicker
                    className="ant-picker-xs"
                    style={{ width: '120px' }}
                    value={ingCheckHead.CHECK_DT && ingCheckHead.CHECK_DT !== '' ? moment(ingCheckHead.CHECK_DT) : undefined}
                    onChange={e => {
                      if (e === null) {
                        handleChangeHeadFormData('CHECK_DT', '');
                      } else {
                        handleChangeHeadFormData('CHECK_DT', e.format('YYYY-MM-DD'));
                      }
                    }}
                  />
                </td>
                <th colSpan={2}>
                  <span>점검장소</span>
                </th>
                <td colSpan={3}>
                  <AntdInput
                    className="ant-input-xs"
                    value={ingCheckHead.CHECK_LOC ? ingCheckHead.CHECK_LOC : ''}
                    onChange={e => handleChangeHeadFormData('CHECK_LOC', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th colSpan={2}>
                  <span>* 주작업</span>
                </th>
                <td colSpan={8}>
                  <Radio.Group
                    value={ingCheckHead.CHECK_STATUS ? ingCheckHead.CHECK_STATUS : ''}
                    onChange={e => handleChangeHeadFormData('CHECK_STATUS', e.target.value)}
                  >
                    <Radio value="양호">양호</Radio>
                    <Radio value="불합리"> 불합리</Radio>
                    <Radio value="제재" disabled>
                      제재
                    </Radio>
                  </Radio.Group>
                </td>
              </tr>
              <tr>
                <th colSpan={2}>
                  <span>점검자</span>
                </th>
                <td colSpan={3}>
                  <AntdSearch
                    className="input-search-xs"
                    style={{ width: '120px' }}
                    value={ingCheckHead.CHECK_EMP_NO ? ingCheckHead.CHECK_EMP_NO : ''}
                    onClick={() => handleModal('userSelect', true)}
                    onSearch={() => handleModal('userSelect', true)}
                  />
                  {ingCheckHead.CHECK_EMP_NM && ingCheckHead.CHECK_EMP_NM !== '' && <span style={{ marginLeft: '5px' }}>{ingCheckHead.CHECK_EMP_NM}</span>}
                </td>
                <th colSpan={2}>
                  <span>점검회사</span>
                </th>
                <td colSpan={3}>
                  <AntdInput
                    className="ant-input-xs ant-input-inline"
                    style={{ width: '100px' }}
                    value={ingCheckHead.CHECK_CMPNY_CD ? ingCheckHead.CHECK_CMPNY_CD : ''}
                    readOnly
                  />
                  {ingCheckHead.CHECK_CMPNY_NM && ingCheckHead.CHECK_CMPNY_NM !== '' && (
                    <span style={{ marginLeft: '5px' }}>{ingCheckHead.CHECK_CMPNY_NM}</span>
                  )}
                </td>
              </tr>
              <tr>
                <th colSpan={2}>
                  <span>점검결과</span>
                </th>
                <td colSpan={8}>
                  <AntdInput
                    className="ant-input-xs ant-input-inline"
                    value={ingCheckHead.CHECK_CONTENT || ''}
                    onChange={e => handleChangeHeadFormData('CHECK_CONTENT', e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
      </ContentsWrapper>
    );
  }
}

IngCheckHead.propTypes = {
  ingCheckHead: PropTypes.object,
  handleChangeHeadFormData: PropTypes.func,
  handleModal: PropTypes.func,
};

IngCheckHead.defaultProps = {};

export default IngCheckHead;
