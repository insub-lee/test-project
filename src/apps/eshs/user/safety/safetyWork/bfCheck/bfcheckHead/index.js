import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Input, DatePicker, Radio, Modal } from 'antd';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import UserSelect from 'components/UserSelect';

const AntdModal = StyledModalWrapper(Modal);
const AntdInput = StyledInput(Input);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdDatePicker = StyledDatePicker(DatePicker);

class BfcheckHead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: '',
      modalTitle: '',
      modalVisible: false,
    };
  }

  // 모달 핸들러
  handleModal = (type, visible) => {
    let title = '';
    switch (type) {
      case 'userSelect':
        title = '점검자 선택';
        break;
      default:
        title = '';
        break;
    }
    this.setState({
      modalType: type,
      modalTitle: title,
      modalVisible: visible,
    });
  };

  // 내부강사 선택
  onSelectedComplete = result => {
    const { allChangeFormData, formData } = this.props;
    if (result.length > 0) {
      const userInfo = result[0];
      this.setState(
        {
          modalTitle: '',
          modalType: '',
          modalVisible: false,
        },
        () =>
          allChangeFormData('BFCHECK_HEAD', {
            ...formData,
            CHECK_CMPNY_CD: 'M000',
            CHECK_CMPNY_NM: 'MAGNACHIP반도체',
            CHECK_EMP_NO: userInfo.EMP_NO,
            CHECK_EMP_NM: userInfo.NAME_KOR,
          }),
      );
      return;
    }
    this.setState({
      modalTitle: '',
      modalType: '',
      modalVisible: false,
    });
  };

  render() {
    const { formData, onChangeFormData } = this.props;
    const { modalType, modalTitle, modalVisible } = this.state;
    return (
      <>
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
                <th colSpan={3}>
                  <span>점검일자</span>
                </th>
                <td colSpan={2}>
                  <AntdDatePicker
                    className="ant-picker-xs"
                    value={(formData.CHECK_DT && moment(formData.CHECK_DT)) || undefined}
                    onChange={date => {
                      if (date === null) {
                        onChangeFormData('CHECK_DT', date);
                        return;
                      }
                      onChangeFormData('CHECK_DT', date.format('YYYY-MM-DD'));
                    }}
                  />
                </td>
                <th colSpan={2}>
                  <span>점검장소</span>
                </th>
                <td colSpan={3}>
                  <AntdInput
                    className="ant-input-xs"
                    maxLength={30}
                    value={(formData.CHECK_LOC && formData.CHECK_LOC) || ''}
                    onChange={e => onChangeFormData('CHECK_LOC', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th rowSpan={3} colSpan={1}>
                  <span>점검구분</span>
                </th>
                <th colSpan={1}>
                  <Radio checked={formData.CHECK_HOST_GB && formData.CHECK_HOST_GB === 1} onClick={() => onChangeFormData('CHECK_HOST_GB', 1)} />
                  내부점검
                </th>
                <th colSpan={1}>
                  <span>성명(교육회사)</span>
                </th>
                <td colSpan={7}>
                  <AntdSearch
                    className="input-search-xs"
                    style={{ width: '200px' }}
                    value={(formData.CHECK_EMP_NM && formData.CHECK_EMP_NM) || ''}
                    onClick={() => this.handleModal('userSelect', true)}
                    onSearch={() => this.handleModal('userSelect', true)}
                  />
                  {formData.CHECK_CMPNY_NM && formData.CHECK_CMPNY_NM !== '' && (
                    <span style={{ marginLeft: '5px' }}>{`(점검회사 : ${formData.CHECK_CMPNY_NM})`}</span>
                  )}
                </td>
              </tr>
              <tr>
                <th rowSpan={2} colSpan={1}>
                  <Radio checked={formData.CHECK_HOST_GB && formData.CHECK_HOST_GB === 2} onClick={() => onChangeFormData('CHECK_HOST_GB', 2)} />
                  외부점검
                </th>
                <th colSpan={1}>
                  <span>생년월일</span>
                </th>
                <td colSpan={7}>
                  <AntdInput
                    className="ant-input-xs"
                    style={{ width: '200px' }}
                    vlaue={(formData.OUT_CHECK_SSN && formData.OUT_CHECK_SSN) || ''}
                    maxLength={13}
                    onChange={e => onChangeFormData('OUT_CHECK_SSN', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th colSpan={1}>
                  <span>성명</span>
                </th>
                <td colSpan={7}>
                  <AntdInput
                    className="ant-input-xs"
                    style={{ width: '200px' }}
                    vlaue={(formData.OUT_CHECK_NM && formData.OUT_CHECK_NM) || ''}
                    maxLength={20}
                    onChange={e => onChangeFormData('OUT_CHECK_NM', e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <AntdModal
          title={modalTitle}
          width="80%"
          visible={modalVisible}
          footer={null}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          {modalType === 'userSelect' && <UserSelect onUserSelectHandler={undefined} onUserSelectedComplete={this.onSelectedComplete} onCancel={undefined} />}
        </AntdModal>
      </>
    );
  }
}

BfcheckHead.propTypes = {
  formData: PropTypes.object,
  onChangeFormData: PropTypes.func,
  allChangeFormData: PropTypes.func,
};

BfcheckHead.defaultProps = {};

export default BfcheckHead;
