import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Select, DatePicker, Modal, TreeSelect } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';

import UserSearchModal from 'apps/eshs/common/userSearchModal';
import DangerHazard from 'apps/eshs/admin/safety/safetyImprove/comp/DangerHazard';
import { getTreeFromFlatData } from 'react-sortable-tree';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import moment from 'moment';

const AntdSearchInput = StyledSearchInput(Input.Search);
const AntdDatePicker = StyledDatePicker(DatePicker);
const AntdSelect = StyledSelect(Select);
const AntdModal = StyledAntdModal(Modal);
const AntdInput = StyledInput(Input);
const AntdTextarea = StyledTextarea(Input.TextArea);

class InputTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempFormData: this.props.formData,
      modalObj: {
        title: '',
        visible: false,
        content: [],
      },
    };
  }

  componentDidMount = () => {};

  // defaultValue를 사용할수 없는 값..
  changeTempFormData = (target, value, changeAfter) =>
    this.setState(prevState => ({ tempFormData: { ...prevState.tempFormData, [target]: value } }), changeAfter);

  changeTempSetFormData = (formData, changeAfter) => this.setState({ tempFormData: formData }, changeAfter);

  changeLocSelect = (target, value, changeAfter) => {
    const locLabel = this.setLocLabel(value);
    this.setState(prevState => ({ tempFormData: { ...prevState.tempFormData, [target]: value, locLabel } }), changeAfter);
  };

  setLocLabel = nodeId => {
    const { findTreeDataByNodeId } = this.props;
    const data = findTreeDataByNodeId(nodeId);
    return data ? (data.PARENT_NODE_ID === 1533 ? `${data.NAME_KOR} 전체` : `${data.NAME_KOR}`) : '';
  };

  changeModalObj = (title = '', visible = false, content = []) => this.setState({ modalObj: { title, visible, content } });

  render() {
    const { formData, changeFormData, setFormData, categoryData } = this.props;
    const { tempFormData, modalObj } = this.state;
    const locLabel = (tempFormData && tempFormData.locLabel) || '';
    return (
      <>
        <StyledHtmlTable>
          <table className="table-border">
            <colgroup>
              <col width="12%" />
              <col width="13%" />
              <col width="12%" />
              <col width="13%" />
              <col width="12%" />
              <col width="13%" />
              <col width="12%" />
              <col width="13%" />
            </colgroup>
            <tbody>
              <tr>
                <th>발행일자</th>
                <td>
                  <AntdDatePicker
                    className="ant-picker"
                    style={{ width: '100%' }}
                    defaultValue={formData.REQ_DT ? moment(formData.REQ_DT) : undefined}
                    onChange={(date, strDate) => changeFormData('REQ_DT', strDate)}
                  />
                </td>
                <th>점검부서</th>
                <td>{formData.REQ_DEPT_NAME || ''}</td>
                <th>점검자</th>
                <td>{formData.REQ_EMP_NAME || ''}</td>
                <th>전화번호</th>
                <td>{formData.REQ_PHONE || ''}</td>
              </tr>
              <tr>
                <th>제목</th>
                <td colSpan={7}>
                  <AntdInput
                    className="ant-input-sm"
                    style={{ width: '100%' }}
                    defaultValue={formData.TITLE || ''}
                    onChange={e => changeFormData('TITLE', e.target.value)}
                    allowClear
                  />
                </td>
              </tr>
              <tr>
                <th>위치</th>
                <td colSpan={5}>
                  <TreeSelect
                    style={{ width: '25%' }}
                    value={tempFormData.LOC || undefined}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={categoryData.LOC}
                    onChange={value => this.changeLocSelect('LOC', value, () => changeFormData('LOC', value))}
                    allowClear
                  />
                  {locLabel ? <span style={{ paddingLeft: '5px', fontSize: '12px', fontWeight: '500', color: '#0000ff' }}>{locLabel}</span> : ''}
                </td>
                <th>4M</th>
                <td>
                  <AntdSelect
                    defaultValue={formData.MM || undefined}
                    placeholder="선택"
                    className="select-sm"
                    style={{ width: '100%' }}
                    onChange={val => changeFormData('MM', val)}
                  >
                    {categoryData &&
                      categoryData.MM &&
                      categoryData.MM.map(item => (
                        <AntdSelect.Option key={item.NODE_ID} value={item.NODE_ID}>
                          {item.NAME_KOR}
                        </AntdSelect.Option>
                      ))}
                  </AntdSelect>
                </td>
              </tr>
              <tr>
                <th>상세위치</th>
                <td colSpan={5}>
                  <AntdInput
                    className="ant-input-sm"
                    style={{ width: '50%' }}
                    defaultValue={formData.TITLE || undefined}
                    placeholder="선택"
                    onChange={e => changeFormData('TITLE', e.target.value)}
                    allowClear
                  />
                  <span style={{ paddingLeft: '5px', fontSize: '12px', fontWeight: '500', color: '#0000ff' }}>
                    ※ 기계실, 전실, 옥상, 전기실, CCSS, TGSS, 지하, 외곽(부속동)등
                  </span>
                </td>
                <th>유형별</th>
                <td>
                  <AntdSelect
                    defaultValue={formData.EACH_TYPE || undefined}
                    className="select-sm"
                    style={{ width: '100%' }}
                    placeholder="선택"
                    onChange={val => changeFormData('EACH_TYPE', val)}
                  >
                    {categoryData &&
                      categoryData.EACH_TYPE &&
                      categoryData.EACH_TYPE.map(item => (
                        <AntdSelect.Option key={item.NODE_ID} value={item.NODE_ID}>
                          {item.NAME_KOR}
                        </AntdSelect.Option>
                      ))}
                  </AntdSelect>
                </td>
              </tr>
              <tr>
                <th>조치부서</th>
                <td colSpan={3}></td>
                <th>조치자</th>
                <td></td>
                <th>등급</th>
                <td>
                  <AntdSelect
                    defaultValue={formData.GRADE || undefined}
                    placeholder="선택"
                    className="select-sm"
                    style={{ width: '100%' }}
                    onChange={val => changeFormData('GRADE', val)}
                  >
                    {categoryData &&
                      categoryData.GRADE &&
                      categoryData.GRADE.map(item => (
                        <AntdSelect.Option key={item.NODE_ID} value={item.NODE_ID}>
                          {item.NAME_KOR}
                        </AntdSelect.Option>
                      ))}
                  </AntdSelect>
                </td>
              </tr>
              <tr>
                <th>위험성평가</th>
                <td colSpan={3}>
                  <AntdSelect
                    defaultValue={formData.DANGERYN || undefined}
                    allowClear
                    placeholder="선택"
                    className="select-sm"
                    style={{ width: '20%' }}
                    onChange={val => this.changeTempFormData('DANGERYN', val, () => changeFormData('DANGERYN', val))}
                  >
                    <AntdSelect.Option value="Y">실시</AntdSelect.Option>
                    <AntdSelect.Option value="N">해당없음</AntdSelect.Option>
                  </AntdSelect>
                  <span style={{ paddingLeft: '5px', fontSize: '12px', fontWeight: '500', color: '#0000ff' }}>위험성평가 등록번호 개발중</span>
                </td>
                <th>
                  사고의
                  <br />
                  발생원인
                </th>
                <td>
                  <AntdSelect
                    value={tempFormData.DANGERYN === 'Y' ? tempFormData.DANGERCAUSE : undefined}
                    allowClear
                    disabled={tempFormData.DANGERYN !== 'Y'}
                    placeholder="선택"
                    className="select-sm"
                    style={{ width: '100%' }}
                    onChange={val => this.changeTempFormData('DANGERCAUSE', val, () => changeFormData('DANGERCAUSE', val))}
                  >
                    {categoryData &&
                      categoryData.DANGERCAUSE &&
                      categoryData.DANGERCAUSE.map(item => (
                        <AntdSelect.Option key={item.NODE_ID} value={item.NODE_ID}>
                          {item.NAME_KOR}
                        </AntdSelect.Option>
                      ))}
                  </AntdSelect>
                </td>
                <th>
                  사고의
                  <br />
                  발생유형
                </th>
                <td>
                  <AntdSelect
                    value={tempFormData.DANGERYN === 'Y' ? tempFormData.DANGERTYPE : undefined}
                    allowClear
                    disabled={tempFormData.DANGERYN !== 'Y'}
                    placeholder="선택"
                    className="select-sm"
                    style={{ width: '100%' }}
                    onChange={val => this.changeTempFormData('DANGERTYPE', val, () => changeFormData('DANGERTYPE', val))}
                  >
                    {categoryData &&
                      categoryData.DANGERTYPE &&
                      categoryData.DANGERTYPE.map(item => (
                        <AntdSelect.Option key={item.NODE_ID} value={item.NODE_ID}>
                          {item.NAME_KOR}
                        </AntdSelect.Option>
                      ))}
                  </AntdSelect>
                </td>
              </tr>
              <tr>
                <th>분류</th>
                <td>
                  <AntdSearchInput
                    style={{ width: '100%' }}
                    className="input-search-sm"
                    value={tempFormData.DANGERYN === 'Y' ? tempFormData.SDIV_NM : undefined}
                    readOnly
                    placeholder="세부공정 선택"
                    disabled={tempFormData.DANGERYN !== 'Y'}
                    onClick={() =>
                      this.changeModalObj('세부공정 선택', true, [
                        <DangerHazard
                          key="dangerHazard"
                          onClickRow={data =>
                            this.changeTempSetFormData(
                              {
                                ...tempFormData,
                                SDIV_ID: data.SDIV_ID,
                                DIV_ID: data.DIV_ID,
                                PLACE_ID: data.PLACE_ID,
                                PROCESS_ID: data.PROCESS_ID,
                                EQUIP_ID: data.EQUIP_ID,
                                SDIV_NM: data.SDIV_NM,
                                DIV_NM: data.DIV_NM,
                                PLACE_NM: data.PLACE_NM,
                                PROCESS_NM: data.PROCESS_NM,
                                EQUIP_NM: data.EQUIP_NM,
                              },
                              setFormData({
                                SDIV_ID: data.SDIV_ID,
                                DIV_ID: data.DIV_ID,
                                PLACE_ID: data.PLACE_ID,
                                EQUIP_ID: data.EQUIP_ID,
                                PROCESS_ID: data.PROCESS_ID,
                              }),
                            )
                          }
                          modalVisible={this.changeModalObj}
                        />,
                      ])
                    }
                    onChange={() =>
                      this.changeModalObj('세부공정 선택', true, [
                        <DangerHazard
                          key="dangerHazard"
                          onClickRow={data =>
                            this.changeTempSetFormData(
                              {
                                ...tempFormData,
                                SDIV_ID: data.SDIV_ID,
                                DIV_ID: data.DIV_ID,
                                PLACE_ID: data.PLACE_ID,
                                PROCESS_ID: data.PROCESS_ID,
                                EQUIP_ID: data.EQUIP_ID,
                                SDIV_NM: data.SDIV_NM,
                                DIV_NM: data.DIV_NM,
                                PLACE_NM: data.PLACE_NM,
                                PROCESS_NM: data.PROCESS_NM,
                                EQUIP_NM: data.EQUIP_NM,
                              },
                              setFormData({
                                SDIV_ID: data.SDIV_ID,
                                DIV_ID: data.DIV_ID,
                                PLACE_ID: data.PLACE_ID,
                                EQUIP_ID: data.EQUIP_ID,
                                PROCESS_ID: data.PROCESS_ID,
                              }),
                            )
                          }
                          modalVisible={this.changeModalObj}
                        />,
                      ])
                    }
                  />
                </td>
                <th>부서</th>
                <td>{(tempFormData.DANGERYN === 'Y' && tempFormData.DIV_NM) || ''}</td>
                <th>공정(장소)</th>
                <td>{(tempFormData.DANGERYN === 'Y' && tempFormData.PLACE_NM) || ''}</td>
                <th>세부공정</th>
                <td>{(tempFormData.DANGERYN === 'Y' && tempFormData.PROCESS_NM) || ''}</td>
              </tr>
              <tr>
                <th>장비(설비)</th>
                <td colSpan={7}>{(tempFormData.DANGERYN === 'Y' && tempFormData.EQUIP_NM) || ''}</td>
              </tr>
              <tr>
                <th>개선전</th>
                <td colSpan={7}></td>
              </tr>
              <tr>
                <th>현상</th>
                <td colSpan={7}>
                  <AntdTextarea rows={7} />
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <StyledCustomSearchWrapper className="search-wrapper-inline">
            <span className="text-label">조치후</span>
            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm mr5 ml5">인쇄</StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <table className="table-border">
            <colgroup>
              <col width="20%" />
              <col width="30%" />
              <col width="50%" />
            </colgroup>
            <tbody>
              <tr>
                <th>완료일</th>
                <td></td>
                <td rowSpan={6}></td>
              </tr>
              <tr>
                <th>담당ENG</th>
                <td></td>
              </tr>
              <tr>
                <th>담당TEL</th>
                <td></td>
              </tr>
              <tr>
                <th>조치자</th>
                <td></td>
              </tr>
              <tr>
                <th>조치TEL</th>
                <td></td>
              </tr>
              <tr>
                <th>
                  현상
                  <br />및<br />
                  조치내용
                </th>
                <td>
                  <AntdTextarea rows={10} />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <AntdModal
          className="modal-table-pad"
          title={modalObj.title}
          visible={modalObj.visible}
          width={800}
          onCancel={this.changeModalObj}
          footer={null}
          destroyOnClose
        >
          {modalObj.content}
        </AntdModal>
      </>
    );
  }
}
InputTable.propTypes = {
  formData: PropTypes.object,
  changeFormData: PropTypes.func,
  categoryData: PropTypes.object,
  setFormData: PropTypes.func,
  findTreeDataByNodeId: PropTypes.func,
};
InputTable.defaultProps = {
  formData: {},
  changeFormData: () => {},
  categoryData: {
    LOC: [],
    GRADE: [],
    EACH_TYPE: [],
    MM: [],
    DANGERTYPE: [],
    DANGERCAUSE: [],
  },
  setFormData: () => {},
  findTreeDataByNodeId: () => {},
};

export default InputTable;
