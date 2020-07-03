import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, Select, Radio, DatePicker, Icon, Popover, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import Upload from 'components/Upload';
import UserSearchModal from 'apps/eshs/common/userSearchModal';

import moment from 'moment';

moment.locale('ko');
const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdSelect = StyledSelect(Select);
const AntdTextArea = StyledTextarea(Input.TextArea);
const AntdDatePicker = StyledDatePicker(DatePicker);

const { Option } = Select;

const dangerRank = value => {
  let returnValue;
  if (value >= 16) returnValue = 'A';
  else if (value >= 12) returnValue = 'B';
  else if (value >= 9) returnValue = 'C';
  else if (value === 8) returnValue = 'D';
  else if (value >= 4) returnValue = 'E';
  else returnValue = 'F';
  return returnValue;
};

const View = ({ formData, dagerInfo, SUB_LIST, onChangeAdmin, onChangeManager, onChangeAdminSub, onFileUploadTemp, UploadFilesDel }) => (
  <StyledHtmlTable>
    {formData && (
      <table>
        <colgroup>
          <col width="8%" />
          <col width="8%" />
          <col width="12%" />
          <col width="8%" />
          <col width="12%" />
          <col width="6%" />
          <col width="6%" />
          <col width="5%" />
          <col width="12%" />
          <col width="13%" />
          <col width="5%" />
          <col width="5%" />
        </colgroup>
        <tbody>
          <tr>
            <th colSpan="2" align="center">
              분류 {`>`} 부서명
            </th>
            <td colSpan="2" align="center">
              <span>{`${formData.SDIV_NM || ''} > ${formData.DIV_NM || ''}`}</span>
            </td>
            <td rowSpan="4" colSpan="4" align="center">
              <font size="5">위험성평가표</font>
            </td>
            <th align="center">근무인원</th>
            <td colSpan="3" align="center">
              남/여(&nbsp;
              <AntdInputNumber
                className="ant-input-number-inline ant-input-number-xs mr5"
                style={{ width: 50 }}
                defaultValue={formData.WORKMAN_MALE || 0}
                onChange={e => onChangeAdmin('WORKMAN_MALE', e, formData)}
              />
              /&nbsp;
              <AntdInputNumber
                className="ant-input-number-inline ant-input-number-xs mr5"
                style={{ width: 50 }}
                defaultValue={formData.WORKMAN_FEMALE || 0}
                onChange={e => onChangeAdmin('WORKMAN_FEMALE', e, formData)}
              />
              ){Number(formData.WORKMAN_MALE) + Number(formData.WORKMAN_FEMALE)}&nbsp;명
            </td>
          </tr>
          <tr>
            <th colSpan="2">공정 {`>`} 세부공정명</th>
            <td colSpan="2" align="center">
              <span>{`${formData.PLACE_NM || ''} > ${formData.PROCESS_NM || ''}`}</span>
              {dagerInfo && <StyledButton>dagerInfo</StyledButton>}
            </td>
            <th align="center">소속</th>
            <td colSpan="3" align="center">
              <Radio.Group onChange={e => onChangeAdmin('POST', e.target.value, formData)} defaultValue={Number(formData.POST)}>
                <Radio value={1}>자체</Radio>
                <Radio value={2}>용역</Radio>
                <Radio value={3}>기타</Radio>
              </Radio.Group>
            </td>
          </tr>
          <tr>
            <th colSpan="2" rowSpan="2">
              작성일자
            </th>
            <td colSpan="2" rowSpan="2" align="center">
              <span>{moment(formData.REG_DATE).format('YYYY-MM-DD')}</span>
            </td>
            <th align="center" colSpan="1">
              작성자
            </th>
            <td align="center" colSpan="3">{`${formData.REG_EMPNM}(${formData.REG_EMPNO})`}</td>
          </tr>
          <tr>
            <th align="center" colSpan="1">
              부서장
            </th>
            <td align="center" colSpan="3">
              <UserSearchModal
                customWidth="100%"
                colData={formData.DEPT_MANAGER && formData.DEPT_MANAGER_NM ? `${formData.DEPT_MANAGER_NM}(${formData.DEPT_MANAGER})` : ''} // --  InputSearch 초기값
                onClickRow={record => onChangeManager(record, formData)} // --  [필수] userList rowClick시 record를 리턴받는 함수
                modalOnCancel={() => null} // -- modal onCancel event (props 없을 경우 AntdSearchInput 값 비워주고 props 로 들어온 onClickRow({EMP_NO:'', USER_ID:''}) 호출 )
                className="input-search-sm ant-search-inline mr5" // -- AntdSearchInput className
              />
            </td>
          </tr>
          <tr>
            <th rowSpan="2">설비(장비)</th>
            <th rowSpan="2">작업조건</th>
            <th rowSpan="2">작업단계 위험요인</th>
            <th rowSpan="2">발생형태</th>
            <th rowSpan="2">현재 안전조치(대책)</th>
            <th colSpan="3">위험도</th>
            <th colSpan="2">개선계획 개선계획 번호 span</th>
            <th rowSpan="2">개선계획 첨부</th>
            <th rowSpan="2">개선결과 첨부</th>
          </tr>
          <tr>
            <th>빈도</th>
            <th>강도</th>
            <th>위험등급</th>
            <th>개선대책</th>
            <th>완료예정일</th>
          </tr>
          {/*
  		LEGALST 법적기준 (화면상에 안나옴)
  		DANGRAD 위험등급 (화면상에 안나옴)
      ADAPTEDEXAM 적합성검토 (화면상에 안나옴)
  		EDIT_YN 수정 가능 불가능
      */}
          {SUB_LIST &&
            SUB_LIST.map(subItem => (
              <tr>
                <td>{subItem.EQUIP_NM}</td>
                <td>
                  <AntdSelect className="select-xs" defaultValue={Number(subItem.WOKRCND)} onChange={value => onChangeAdminSub('WOKRCND', value, subItem)}>
                    {/* 작업조건 */}
                    <Option value={0}>정상</Option>
                    <Option value={1}>비정상</Option>
                  </AntdSelect>
                </td>
                <td>
                  <AntdTextArea defaultValue={subItem.DANGFACT} onChange={e => onChangeAdminSub('DANGFACT', e.target.value, subItem)} />
                  {/* 작업단계 위험요인 */}
                </td>
                <td>{subItem.AOT_NM}</td>
                {/* 발생형태 */}
                <td>
                  <AntdTextArea defaultValue={subItem.SAFEACTION} onChange={e => onChangeAdminSub('SAFEACTION', e.target.value, subItem)} />
                  {/* 현재 안전조치(대책) */}
                </td>
                <td>
                  <AntdSelect className="select-xs" defaultValue={Number(subItem.DAN_FREQC)} onChange={value => onChangeAdminSub('DAN_FREQC', value, subItem)}>
                    {/* 위험빈도 */}
                    <Option value={1}>1</Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                    <Option value={4}>4</Option>
                    <Option value={5}>5</Option>
                  </AntdSelect>
                </td>
                <td>
                  <AntdSelect className="select-xs" defaultValue={Number(subItem.DAN_STRGT)} onChange={value => onChangeAdminSub('DAN_STRGT', value, subItem)}>
                    {/* 위험강도 */}
                    <Option value={1}>1</Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                    <Option value={4}>4</Option>
                  </AntdSelect>
                </td>
                {/* DAN_LEVEL 위험수준 */}
                <td>{dangerRank(Number(subItem.DAN_FREQC || 1) * Number(subItem.DAN_STRGT || 1))}</td>
                <td>
                  <AntdTextArea defaultValue={subItem.AP_IMPROVE} onChange={e => onChangeAdminSub('AP_IMPROVE', e.target.value, subItem)} /> {/* 개선대책 */}
                </td>
                <td>
                  <AntdDatePicker
                    defaultValue={moment(subItem.AP_ENDDATE)}
                    onChange={(date, dateString) => onChangeAdminSub('AP_ENDDATE', dateString, subItem)}
                  />
                  {/* 완료예정일 */}
                </td>
                <td>
                  {console.debug('subItem.file : ', subItem.file)}
                  <Upload
                    onFileUploaded={obj => onFileUploadTemp('file', obj, subItem)}
                    // multiple={false} // default true
                    width="100%"
                    height="100%"
                    borderStyle="none"
                    serviceEnv="dev"
                    serviceKey="KEY"
                  >
                    <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
                      <StyledButton className="btn-light btn-first btn-xs">파일첨부</StyledButton>
                    </div>
                  </Upload>
                  {subItem.file &&
                    Array.isArray(subItem.file) &&
                    subItem.file.map((file, index) => (
                      <Popover
                        content={
                          <ul>
                            <li key={file.fileName}>
                              <a href={file.down.replace('/file/', '/tempfile/')}>{file.fileName}</a> - {file.fileSize} bytes
                            </li>
                            <DeleteOutlined onClick={e => UploadFilesDel(e, index)} />
                          </ul>
                        }
                        trigger="hover"
                        placement="right"
                      >
                        <button type="button" className="attachDownCompIconBtn" style={{ width: '100%', height: '100%', textAlign: 'center' }}>
                          <Icon className="attachDownCompIcon" type="file-markdown" />
                        </button>
                      </Popover>
                    ))}
                </td>
                {/* FILE_ATTACH 개선계획 첨부파일 */}
                <td>개선결과 첨부파일</td> {/* FILE_ATTACH2 개선결과 첨부파일 */}
              </tr>
            ))}
        </tbody>
      </table>
    )}
  </StyledHtmlTable>
);

View.propTypes = {
  formData: PropTypes.object,
  dagerInfo: PropTypes.object,
  SUB_LIST: PropTypes.array,
  onChangeAdmin: PropTypes.func,
  onChangeManager: PropTypes.func,
  onChangeAdminSub: PropTypes.func,
};

export default React.memo(View);
