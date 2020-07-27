import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Select, Spin, Input, InputNumber, Checkbox } from 'antd';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import UnitSelectTable from '../unitSelect';
import CheckTypeSelect from '../checkTypeSelect';

const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdModal = StyledContentsModal(Modal);
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const AntdSearch = StyledSearchInput(Input.Search);

const { Option } = Select;

class formDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      site: '청주',
      keyword: '',
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      formData: {},
    };
  }

  // 모달 핸들러
  handleModal = (type, visible) => {
    let title = '';
    switch (type) {
      case 'UNIT':
        title = '단위 선택';
        this.setState({
          modalType: type,
          modalTitle: title,
          modalVisible: visible,
        });
        break;
      case 'CHECK_TYPE':
        title = '측정값 종류 선택';
        this.setState({
          modalType: type,
          modalTitle: title,
          modalVisible: visible,
        });
        break;
      default:
        this.setState({
          modalType: type,
          modalTitle: title,
          modalVisible: false,
        });
        break;
    }
  };

  onChangeCheckbox = (field, bool) => {
    const { onChangeFormData } = this.props;
    if (bool) {
      onChangeFormData(field, '1');
    } else {
      onChangeFormData(field, '0');
    }
  };

  // 단위 선택
  onClickItem = item => {
    const { onChangeFormData } = this.props;
    this.setState(
      {
        modalTitle: '',
        modalVisible: false,
      },
      () => onChangeFormData('ITEM_UNIT', item),
    );
  };

  renderInputNumber = (unitNm, point, field) => {
    const { formData, onChangeFormData } = this.props;
    const target = formData.toJS().find(form => form.GROUP_UNIT_NM === unitNm && form.MEASUREMENT_POINT === point);
    return (
      <AntdInputNumber
        className="ant-input-number-sm"
        value={(target && target[field] && Number(target[field])) || 0}
        onChange={e => onChangeFormData(unitNm, point, field, e)}
      />
    );
  };

  render() {
    const { formData, onChangeFormData } = this.props;
    const { site, keyword, modalType, modalTitle, modalVisible } = this.state;
    return (
      <>
        <StyledCustomSearchWrapper>
          <Spin tip="검색중 ..." spinning={false}>
            <div className="search-input-area">
              <span className="text-label">지역</span>
              <AntdSelect className="select-sm" style={{ width: '100px' }} defaultValue={site} onChange={val => this.setState('SITE', val)}>
                <Option value="청주">청주</Option>
                <Option value="구미">구미</Option>
              </AntdSelect>
              <span className="text-label">측정항목명</span>
              <AntdSearch className="ant-search-inline input-search-sm" style={{ width: '200px', marginRight: '10px' }} defaultValue={keyword} />
              <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.handlerSearch()}>
                검색
              </StyledButton>
            </div>
          </Spin>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <StyledButton className="btn-primary btn-sm ml5" onClick={() => console.debug('신규등록')}>
            신규등록
          </StyledButton>
        </StyledButtonWrapper>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="10%" />
              <col />
              <col width="10%" />
              <col />
              <col width="10%" />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan={1}>
                  <span>지역</span>
                </th>
                <td colSpan={5}>
                  <AntdSelect
                    value={formData.SITE || '청주'}
                    className="select-sm"
                    style={{ width: '100px' }}
                    onChange={value => onChangeFormData('SITE', value)}
                  >
                    <Option value="청주">청주</Option>
                    <Option value="구미">구미</Option>
                  </AntdSelect>
                </td>
              </tr>
              <tr>
                <th colSpan={1}>
                  <span>항목명</span>
                </th>
                <td colSpan={3}>
                  <AntdInput
                    value={formData.ITEM_NM || ''}
                    className="ant-input-sm"
                    style={{ width: '100%' }}
                    onChange={e => onChangeFormData('ITEM_NM', e.target.value)}
                  />
                </td>
                <th colSpan={1}>
                  <span>단위</span>
                </th>
                <td colSpan={1}>
                  <AntdSearch
                    value={formData.ITEM_UNIT || ''}
                    className="input-search-sm"
                    style={{ width: '100%' }}
                    onClick={() => this.handleModal('UNIT', true)}
                    onSearch={() => this.handleModal('UNIT', true)}
                  />
                </td>
              </tr>
              <tr>
                <th colSpan={1}>
                  <span>항목명</span>
                </th>
                <td colSpan={5}>
                  <>
                    <Checkbox
                      value="1"
                      checked={formData.IS_USE_WATER && formData.IS_USE_WATER === '1'}
                      onChange={e => this.onChangeCheckbox('IS_USE_WATER', e.target.checked)}
                    >
                      용수
                    </Checkbox>
                    <Checkbox
                      value="1"
                      checked={formData.IS_DAILY && formData.IS_DAILY === '1'}
                      onChange={e => this.onChangeCheckbox('IS_DAILY', e.target.checked)}
                    >
                      Daily
                    </Checkbox>
                    <Checkbox
                      value="1"
                      checked={formData.IS_IMPURITY && formData.IS_IMPURITY === '1'}
                      onChange={e => this.onChangeCheckbox('IS_IMPURITY', e.target.checked)}
                    >
                      Impurity
                    </Checkbox>
                    <Checkbox
                      value="1"
                      checked={formData.IS_WASTE_WATER && formData.IS_WASTE_WATER === '1'}
                      onChange={e => this.onChangeCheckbox('IS_WASTE_WATER', e.target.checked)}
                    >
                      폐수
                    </Checkbox>
                    <Checkbox
                      value="1"
                      checked={formData.IS_POKGIJO && formData.IS_POKGIJO === '1'}
                      onChange={e => this.onChangeCheckbox('IS_POKGIJO', e.target.checked)}
                    >
                      폭기조
                    </Checkbox>
                    <Checkbox
                      value="1"
                      checked={formData.IS_DERELICT && formData.IS_DERELICT === '1'}
                      onChange={e => this.onChangeCheckbox('IS_DERELICT', e.target.checked)}
                    >
                      유기물
                    </Checkbox>
                  </>
                </td>
              </tr>
              <tr>
                <th colSpan={1}>
                  <span>항목명</span>
                </th>
                <td colSpan={3}>
                  <AntdSearch
                    value={formData.CHECK_VALUE_LIST || ''}
                    className="input-search-sm"
                    style={{ width: '100%' }}
                    onClick={() => this.handleModal('CHECK_TYPE', true)}
                    onSearch={() => this.handleModal('CHECK_TYPE', true)}
                  />
                </td>
                <th colSpan={1}>
                  <span>단위</span>
                </th>
                <td colSpan={1}>
                  <AntdSelect value={formData.IS_DEL || '0'} className="select-sm" style={{ width: '100%' }}>
                    <Option value="0">사용</Option>
                    <Option value="1">미사용</Option>
                  </AntdSelect>
                </td>
              </tr>
              <tr>
                <th colSpan={6}>
                  <span>폐수 법기준</span>
                </th>
              </tr>
              <tr>
                <th colSpan={1}>
                  <span>상한값</span>
                </th>
                <td colSpan={1}>
                  <AntdInputNumber min={0} value={formData.LAW_SPEC_HIGH || 0.0} className="ant-input-number-sm" />
                </td>
                <th colSpan={1}>
                  <span>하한값</span>
                </th>
                <td colSpan={1}>
                  <AntdInputNumber value={formData.LAW_SPEC_LOW || 0.0} className="ant-input-number-sm" />
                </td>
                <th colSpan={1}>
                  <span>기준값</span>
                </th>
                <td colSpan={1}>
                  <AntdInputNumber value={formData.LAW_SPEC_BASE || 0.0} className="ant-input-number-sm" />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <AntdModal
          className="modal-table-pad"
          title={modalTitle}
          width={modalType === 'UNIT' ? '93%' : '40%'}
          visible={modalVisible}
          footer={null}
          destroyOnClose
          maskClosable={false}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          {modalType === 'UNIT' && <UnitSelectTable onClickItem={this.onClickItem} />}
          {modalType === 'CHECK_TYPE' && <CheckTypeSelect />}
        </AntdModal>
      </>
    );
  }
}

formDataTable.propTypes = {
  formData: PropTypes.array,
  onChangeFormData: PropTypes.func,
};

formDataTable.defaultProps = {
  formData: [],
};

export default formDataTable;
