import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, DatePicker, Select, Modal, Radio } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledInput from 'commonStyled/Form/StyledInput';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'commonStyled/EshsStyled/Select/StyledSelect';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';

const AntdModal = StyledModalWrapper(Modal);
const AntdInput = StyledInput(Input);
const AntdSearch = StyledSearchInput(Input.Search);
const { Option } = Select;

const EduInfoTableStyled = styled.div`
  .hstCmpnyCd {
    margin-left: 5px;
  }
`;

class SafetyWorkInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: '',
      modalVisible: false,
    };
  }

  handleModalVisible = (type, bool) => {
    this.setState({
      modalType: type,
      modalVisible: bool,
    });
  };

  // FormData OnChange - 모달컨트롤
  handleFormDataOnchange = (field, value, modal) => {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, field, value);
    if (modal || false) {
      this.handleModalVisible('', false);
    }
  };

  // FormData OnChange - 모달컨트롤
  handleFormDataOnchange = (field, value, modal) => {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, field, value);
    if (modal || false) {
      this.handleModalVisible('', false);
    }
  };

  // 2006 - 현재년도 까지 Select 생성
  renderEduYearSelect = () => {
    const { formData } = this.props;
    const endYear = Number(moment().format('YYYY'));
    const options = [];
    for (let year = 2006; year <= endYear; year += 1) {
      options.push(year);
    }
    return (
      <StyledSelect>
        <Select style={{ width: '200px' }} value={(formData.EDU_YEAR && formData.EDU_YEAR) || ''} onChange={e => this.handleFormDataOnchange('EDU_YEAR', e)}>
          {options.map(YYYY => (
            <Option value={`${YYYY}`}>{YYYY}</Option>
          ))}
        </Select>
      </StyledSelect>
    );
  };

  render() {
    const { modalType, modalVisible } = this.state;
    return (
      <EduInfoTableStyled>
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
                    <span>신청일</span>
                  </th>
                  <td colSpan={8}>
                    <DatePicker className="ant-input-inline" style={{ width: '200px' }} defaultValue={moment()} />
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 작업지역</span>
                  </th>
                  <td colSpan={8}>
                    <StyledSelect>
                      <Select style={{ width: '200px' }} defaultValue="청주">
                        <Option value="청주">청주</Option>
                        <Option value="구미">구미</Option>
                      </Select>
                    </StyledSelect>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 발주회사</span>
                  </th>
                  <td colSpan={3}>(리드온리)</td>
                  <th colSpan={2}>
                    <span>* 작업부서</span>
                  </th>
                  <td colSpan={3}>(리드온리)</td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 담당자</span>
                  </th>
                  <td colSpan={3}>(본인)</td>
                  <th colSpan={2}>
                    <span>* 감독자</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSearch className="input-search-sm" style={{ width: '200px' }} disable />
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 작업업체</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSearch className="input-search-sm" style={{ width: '200px' }} disable />
                  </td>
                  <th colSpan={2}>
                    <span>서약서번호</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSearch className="input-search-sm" style={{ width: '200px' }} disable />
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 주작업</span>
                  </th>
                  <td colSpan={3}>(주작업)</td>
                  <th colSpan={2}>
                    <span>위험성평가</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSearch className="input-search-sm" style={{ width: '200px' }} disable />
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 보충작업</span>
                  </th>
                  <td colSpan={3}>(보충작업)</td>
                  <th colSpan={2}>
                    <span>* 검토자</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSearch className="input-search-sm" style={{ width: '200px' }} disable />
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 작업명</span>
                  </th>
                  <td colSpan={3}>
                    <AntdInput className="ant-input-sm" style={{ width: '200px' }} />
                  </td>
                  <th colSpan={2}>
                    <span>* 최종검토자</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSearch className="input-search-sm" style={{ width: '200px' }} disable />
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 작업내용</span>
                  </th>
                  <td colSpan={8}>(작업명 인풋)</td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 작업동</span>
                  </th>
                  <td colSpan={3}>
                    {' '}
                    <StyledSelect>
                      <Select style={{ width: '200px' }} defaultValue="청주">
                        <Option value="청주">청주</Option>
                        <Option value="구미">구미</Option>
                      </Select>
                    </StyledSelect>
                  </td>
                  <th colSpan={2}>
                    <span>* 작업장소</span>
                  </th>
                  <td colSpan={3}>
                    <AntdInput className="ant-input-sm ant-input-inline" style={{ width: '200px' }} />
                    <span style={{ color: '#17a9a1', marginLeft: '5px' }}>※ 작업 상세장소 입력</span>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 작업기간</span>
                  </th>
                  <td colSpan={3}>
                    <DatePicker className="ant-input-inline" style={{ width: '200px' }} />
                  </td>
                  <th colSpan={2}>
                    <span>* 작업시간</span>
                  </th>
                  <td colSpan={3}></td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>첨부</span>
                  </th>
                  <td colSpan={8}>(파일업로드)</td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
        </ContentsWrapper>
        <AntdModal
          title={modalType === 'hstCmpny' ? '주관회사 검색' : '주관회사 사원'}
          width={700}
          visible={modalVisible}
          footer={null}
          onOk={() => console.debug('모달닫기')}
          onCancel={() => console.debug('모달닫기')}
        >
          Test
        </AntdModal>
      </EduInfoTableStyled>
    );
  }
}

SafetyWorkInfo.propTypes = {
  sagaKey: PropTypes.string.isRequired,
  result: PropTypes.object,
  formData: PropTypes.object,
  setFormData: PropTypes.func.isRequired,
  getCallDataHandler: PropTypes.func.isRequired,
  changeFormData: PropTypes.func.isRequired,
  submitHandlerBySaga: PropTypes.func.isRequired,
  eshsHstCmpnyList: PropTypes.array,
  eshsHstCmpnyUserList: PropTypes.array,
};

SafetyWorkInfo.defaultProps = {
  eshsHstCmpnyList: [],
  eshsHstCmpnyUserList: [],
};

export default SafetyWorkInfo;
