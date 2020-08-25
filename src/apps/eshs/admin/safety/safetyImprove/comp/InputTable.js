import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select, DatePicker, Modal, TreeSelect } from 'antd';

import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';

import UserSearchModal from 'apps/eshs/common/userSearchModal/ModalContent';
import DangerHazard from 'apps/eshs/admin/safety/safetyImprove/comp/DangerHazard';
import AcpEmpComp from 'apps/eshs/admin/safety/safetyImprove/comp/AcpEmpComp';
import DanestAdmin from 'apps/eshs/admin/safety/Danger/danestAdmin';
import Upload from 'apps/eshs/admin/safety/safetyImprove/comp/Upload';
import MultiUserSelectComp from 'apps/eshs/admin/safety/safetyImprove/comp/MultiUserSelectComp';

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
  // props로 넘어오는 formData는 부모컴포넌트 랜더시 처음 한번만 넘어옴
  changeTempFormData = (target, value) => {
    const { changeFormData } = this.props;
    return this.setState(
      prevState => ({ tempFormData: { ...prevState.tempFormData, [target]: value } }),
      () => changeFormData(target, value),
    );
  };

  changeTempSetFormData = (formData, callBack) => {
    const { setFormData } = this.props;

    return this.setState(
      prevState => ({ tempFormData: { ...prevState.tempFormData, ...formData } }),
      () => {
        setFormData(formData);
        return typeof callBack === 'function' && callBack();
      },
    );
  };

  changeLocSelect = (target, value, changeAfter) => {
    const { setFormData, findTreeDataByNodeId } = this.props;
    const LOC_NAME = findTreeDataByNodeId(value);
    this.setState(
      prevState => ({ tempFormData: { ...prevState.tempFormData, [target]: value, LOC_NAME } }),
      () => setFormData({ [target]: value, LOC_NAME }),
    );
  };

  changeModalObj = (title = '', visible = false, content = []) => this.setState({ modalObj: { title, visible, content } });

  getMultiUserSelectSendVisible = () => {
    const { formData, profile } = this.props;

    const userList = formData.MULTI_USERS || [];
    const acpEmpNo = formData.ACP_EMP_NO || '';

    // 담당 ENG가 접근했을경우
    const flag1 = acpEmpNo === profile.EMP_NO;
    // 2차 복수지정자중 수신을한 유저가 있으면 false
    const flag2 = userList.findIndex(user => user.GUBUN === '2' && user.FINAL_FLAG === '1') === -1;
    // 1차 복수지정자중 수신을 한 유저가 접근하면 true
    const flag3 = userList.findIndex(user => user.USER_ID === profile.USER_ID && user.GUBUN === '1' && user.FINAL_FLAG === '1') !== -1;

    return (flag1 && flag2) || flag3;
  };

  render() {
    const { formData, changeFormData, categoryData, spinningOn, spinningOff, acpTableButtons } = this.props;
    const { tempFormData, modalObj } = this.state;
    const locLabel = (tempFormData && tempFormData.LOC_NAME) || '';
    const status = (formData && formData.STTLMNT_STATUS) || '0';
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
                    style={{ width: '30%' }}
                    value={tempFormData.LOC || undefined}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={categoryData.LOC}
                    onChange={value => this.changeLocSelect('LOC', value)}
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
                        <AntdSelect.Option key={item.NODE_ID} value={item.NAME_KOR}>
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
                    style={{ width: '40%' }}
                    defaultValue={formData.LOC_DETAIL || undefined}
                    placeholder="상세위치"
                    onChange={e => changeFormData('LOC_DETAIL', e.target.value)}
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
                        <AntdSelect.Option key={item.NODE_ID} value={item.NAME_KOR}>
                          {item.NAME_KOR}
                        </AntdSelect.Option>
                      ))}
                  </AntdSelect>
                </td>
              </tr>
              <tr>
                <th>조치부서</th>
                <td colSpan={2}>
                  <AntdSearchInput
                    style={{ width: '100%' }}
                    className="input-search-sm"
                    value={tempFormData.ACP_DEPT ? `(${tempFormData.ACP_DEPT || ''}) ${tempFormData.ACP_DEPT_NM || ''}` : undefined}
                    readOnly
                    placeholder="안전 관계자 선택"
                    onClick={() =>
                      this.changeModalObj('안전 관계자', true, [
                        <AcpEmpComp
                          key="dangerHazard"
                          onClickRow={data =>
                            this.changeTempSetFormData({
                              ACP_EMP_NO: data.S3_EMP_NO,
                              ACP_EMP_NM: `${data.S3_NAME} ${data.S3_POSITION}`,
                              ACP_PHONE: data.S3_TEL,
                              ACP_DEPT: data.DEPT_CD,
                              ACP_DEPT_NM: data.DEPT_NAME,
                              S1_EMP_NO: data.S1_EMP_NO,
                              S2_EMP_NO: data.S2_EMP_NO,
                              S3_EMP_NO: data.S3_EMP_NO,
                            })
                          }
                          modalVisible={() => this.changeModalObj()}
                        />,
                      ])
                    }
                    onChange={() =>
                      this.changeModalObj('안전 관계자', true, [
                        <AcpEmpComp
                          key="dangerHazard"
                          onClickRow={data =>
                            this.changeTempSetFormData({
                              ACP_EMP_NO: data.S3_EMP_NO,
                              ACP_EMP_NM: `${data.S3_NAME} ${data.S3_POSITION}`,
                              ACP_PHONE: data.S3_TEL,
                              ACP_DEPT: data.DEPT_CD,
                              ACP_DEPT_NM: data.DEPT_NAME,
                              S1_EMP_NO: data.S1_EMP_NO,
                              S2_EMP_NO: data.S2_EMP_NO,
                              S3_EMP_NO: data.S3_EMP_NO,
                            })
                          }
                          modalVisible={() => this.changeModalObj()}
                        />,
                      ])
                    }
                  />
                </td>
                <th>조치자</th>
                <td colSpan={2}>
                  <AntdInput
                    className="ant-input-sm mr5"
                    style={{ width: '40%' }}
                    value={tempFormData.ACP_EMP_NO || undefined}
                    placeholder="사번"
                    onChange={e => this.changeTempFormData('ACP_EMP_NO', e.target.value)}
                    allowClear
                  />
                  <AntdInput
                    className="ant-input-sm"
                    style={{ width: '55%' }}
                    value={tempFormData.ACP_EMP_NM || undefined}
                    placeholder="이름"
                    // onChange={e => this.changeTempSetFormData({ ACP_EMP_NM: e.target.value, ACP_POSITION: '' })}
                    onChange={e => this.changeTempFormData('ACP_EMP_NM', e.target.value)}
                    allowClear
                  />
                </td>
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
                        <AntdSelect.Option key={item.NODE_ID} value={item.NAME_KOR}>
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
                    style={{ width: '35%' }}
                    onChange={val => this.changeTempFormData('DANGERYN', val, () => changeFormData('DANGERYN', val))}
                  >
                    <AntdSelect.Option value="Y">실시</AntdSelect.Option>
                    <AntdSelect.Option value="N">해당없음</AntdSelect.Option>
                  </AntdSelect>
                  {formData && formData.DA_REG_NO && (
                    <StyledButton
                      className="btn-link btn-sm"
                      onClick={() =>
                        this.changeModalObj('위험성평가표 등록', true, [
                          <DanestAdmin
                            key="DANESTADMIN"
                            improveDanger={{ IMPROVE: true, REG_DTTM: formData.REQ_DT, REG_NO: formData && formData.DA_REG_NO }}
                          />,
                        ])
                      }
                    >
                      <span style={{ paddingLeft: '5px', fontSize: '12px', fontWeight: '500', color: '#0000ff' }}>{formData && formData.DA_REG_NO}</span>
                    </StyledButton>
                  )}
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
                        <DangerHazard key="dangerHazard" onClickRow={data => this.changeTempSetFormData(data)} modalVisible={() => this.changeModalObj()} />,
                      ])
                    }
                    onChange={() =>
                      this.changeModalObj('세부공정 선택', true, [
                        <DangerHazard key="dangerHazard" onClickRow={data => this.changeTempSetFormData(data)} modalVisible={() => this.changeModalObj()} />,
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
                <td colSpan={7} align="center">
                  <div style={{ width: '500px', height: '380px', marginTop: '20px' }}>
                    <Upload
                      target="PIC"
                      spinningOn={spinningOn}
                      spinningOff={spinningOff}
                      file={tempFormData.PIC ? { fileName: tempFormData.PIC_FILE_NM, seq: tempFormData.PIC } : {}}
                      changeFormData={file => changeFormData('PIC_FILE', file)}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th>현상</th>
                <td colSpan={7}>
                  <AntdTextarea rows={7} onChange={e => changeFormData('COMMENTS', e.target.value)} defaultValue={formData.COMMENTS || undefined} />
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <StyledCustomSearchWrapper className="search-wrapper-inline">
            <span className="text-label">조치후</span>
            <div className="btn-area">
              {acpTableButtons
                .filter(btn => btn.visible)
                .map((btn, index) => (
                  <StyledButton key={`btn_${index}`} className={btn.className} onClick={btn.onClick}>
                    {btn.text}
                  </StyledButton>
                ))}
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
                <td>
                  <AntdDatePicker
                    className="ant-picker"
                    style={{ width: '100%' }}
                    defaultValue={formData.C_DATE ? moment(formData.C_DATE) : undefined}
                    onChange={(date, strDate) => changeFormData('C_DATE', strDate)}
                  />
                </td>
                <td rowSpan={6} align="center">
                  <div style={{ width: '500px', height: '380px', marginTop: '20px' }}>
                    <Upload
                      target="ACP_PIC"
                      spinningOn={spinningOn}
                      spinningOff={spinningOff}
                      file={tempFormData.ACP_PIC ? { fileName: tempFormData.ACP_PIC_FILE_NM, seq: tempFormData.ACP_PIC } : {}}
                      changeFormData={file => changeFormData('ACP_PIC_FILE', file)}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th>담당ENG</th>
                <td>{formData.DETAIL_ACP_EMP_NO && `${formData.DETAIL_ACP_DEPT_NM || ''} / ${formData.DETAIL_ACP_EMP_NM || ''}`}</td>
              </tr>
              <tr>
                <th>담당TEL</th>
                <td>{formData.DETAIL_ACP_PHONE}</td>
              </tr>
              <tr>
                <th>조치자</th>
                <td align="center">
                  <p>
                    {tempFormData.ACP1_EMP_NO
                      ? `${tempFormData.ACP1_DEPT_NM || ''} / ${tempFormData.ACP1_EMP_NO || ''} / ${tempFormData.ACP1_EMP_NM || ''}`
                      : ''}
                  </p>
                  <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
                    <StyledButton
                      className="btn-primary btn-sm mr5"
                      onClick={() =>
                        this.changeModalObj('사원 검색', true, [
                          <UserSearchModal
                            key="userSearchModal"
                            visible
                            onClickRow={data =>
                              this.changeTempSetFormData(
                                {
                                  ACP1_EMP_NO: data.EMP_NO,
                                  ACP1_EMP_NM: `${data.NAME_KOR} ${data.PSTN_NAME_KOR}`,
                                  ACP1_USER_ID: data.USER_ID,
                                  ACP1_PHONE: data.MOBILE_TEL_NO,
                                  ACP1_DEPT_NM: data.DEPT_NAME_KOR,
                                  ACP1_DEPT_ID: data.DEPT_ID,
                                },
                                this.changeModalObj,
                              )
                            }
                          />,
                        ])
                      }
                    >
                      단수지정
                    </StyledButton>

                    <StyledButton
                      className="btn-primary btn-sm mr5"
                      onClick={() =>
                        this.changeModalObj('복수 지정', true, [
                          <MultiUserSelectComp
                            key="MultiUserSelectComp"
                            userList={formData.MULTI_USERS}
                            selectedMultiUserSave={this.props.selectedMultiUserSave}
                            profile={this.props.profile}
                            btnVisible={this.getMultiUserSelectSendVisible()}
                          />,
                        ])
                      }
                    >
                      복수지정
                    </StyledButton>
                  </StyledButtonWrapper>
                </td>
              </tr>
              <tr>
                <th>조치TEL</th>
                <td> {tempFormData.ACP1_PHONE || ''}</td>
              </tr>
              <tr>
                <th>
                  현상
                  <br />및<br />
                  조치내용
                </th>
                <td>
                  <AntdTextarea rows={10} defaultValue={formData.ACP_COMMENTS || undefined} onChange={e => changeFormData('ACP_COMMENTS', e.target.value)} />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <AntdModal
          title={modalObj.title || ''}
          visible={modalObj.visible}
          width={1000}
          onCancel={() => this.changeModalObj()}
          footer={
            <StyledButton className="btn-gray btn-sm mr5" onClick={() => this.changeModalObj()}>
              닫기
            </StyledButton>
          }
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
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  acpTableButtons: PropTypes.array,
  selectedMultiUserSave: PropTypes.func,
  profile: PropTypes.object,
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
  acpTableButtons: [],
  selectedMultiUserSave: () => {},
  profile: {},
};

export default InputTable;
