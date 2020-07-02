import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, Select, Radio, DatePicker } from 'antd';

import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import UserSearchModal from 'apps/eshs/common/userSearchModal';

import moment from 'moment';

moment.locale('ko');
const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdSelect = StyledSelect(Select);
const AntdTextArea = StyledTextarea(Input.TextArea);
const AntdDatePicker = StyledDatePicker(DatePicker);

const { Option } = Select;

const dangerRank = value => {
  console.debug('value : ', value);
  switch (value) {
    case value >= 16 && value <= 20:
      return 'A';
    case value >= 12 && value <= 15:
      return 'B';
    case value >= 9 && value <= 12:
      return 'C';
    case value === 8:
      return 'D';
    case value >= 4 && value <= 6:
      return 'E';
    case value >= 1 && value <= 3:
      return 'F';
    default:
      return '';
  }
};

const View = ({ formData, dagerInfo, SUB_LIST }) => (
  <StyledHtmlTable>
    {formData && (
      <table>
        <colgroup>
          <col width="8.33%" />
          <col width="8.33%" />
          <col width="8.33%" />
          <col width="8.33%" />
          <col width="8.33%" />
          <col width="8.33%" />
          <col width="8.33%" />
          <col width="8.33%" />
          <col width="8.33%" />
          <col width="8.33%" />
          <col width="8.33%" />
          <col width="8.33%" />
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
              <AntdInputNumber className="ant-input-number-inline ant-input-number-xs mr5" style={{ width: 50 }} defaultValue={formData.WORKMAN_MALE || 0} />
              /&nbsp;
              <AntdInputNumber className="ant-input-number-inline ant-input-number-xs mr5" style={{ width: 50 }} defaultValue={formData.WORKMAN_FEMALE || 0} />)
              {Number(formData.WORKMAN_MALE) + Number(formData.WORKMAN_FEMALE)}&nbsp;명
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
              <Radio.Group onChange={undefined} value={Number(formData.POST)}>
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
                // onClickRow={record => ()}                             //--  [필수] userList rowClick시 record를 리턴받는 함수
                // modalOnCancel={() => ()}                              //-- modal onCancel event (props 없을 경우 AntdSearchInput 값 비워주고 props 로 들어온 onClickRow({EMP_NO:'', USER_ID:''}) 호출 )
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

          {console.debug('SUB_LIST : ', SUB_LIST)}
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
                  <AntdSelect className="select-xs" defaultValue={Number(subItem.WOKRCND)}>
                    {/* 작업조건 */}
                    <Option value={0}>정상</Option>
                    <Option value={1}>비정상</Option>
                  </AntdSelect>
                </td>
                <td>
                  <AntdTextArea defaultValue={subItem.DANGFACT} />
                  {/* 작업단계 위험요인 */}
                </td>
                <td>{subItem.AOT_NM}</td>
                {/* 발생형태 */}
                <td>
                  <AntdTextArea defaultValue={subItem.SAFEACTION} />
                  {/* 현재 안전조치(대책) */}
                </td>
                <td>
                  <AntdSelect className="select-xs" style={{ width: 40 }} defaultValue={Number(subItem.DAN_FREQC || 1)}>
                    {/* 위험빈도 */}
                    <Option value={1}>1</Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                    <Option value={4}>4</Option>
                    <Option value={5}>5</Option>
                  </AntdSelect>
                </td>
                <td>
                  <AntdSelect className="select-xs" style={{ width: 40 }} defaultValue={Number(subItem.DAN_STRGT || 1)}>
                    {/* 위험강도 */}
                    <Option value={1}>1</Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                    <Option value={4}>4</Option>
                  </AntdSelect>
                </td>
                <td>{dangerRank(Number(subItem.WOKRCND || 1) * Number(subItem.WOKRCND || 1))}</td> {/* DAN_LEVEL 위험수준 */}
                <td>
                  <AntdTextArea defaultValue={subItem.AP_IMPROVE} /> {/* 개선대책 */}
                </td>
                <td>
                  <AntdDatePicker defaultValue={subItem.AP_ENDDATE} /> {/* 완료예정일 */}
                </td>
                <td>개선계획 첨부파일</td> {/* FILE_ATTACH 개선계획 첨부파일 */}
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
};

export default React.memo(View);
