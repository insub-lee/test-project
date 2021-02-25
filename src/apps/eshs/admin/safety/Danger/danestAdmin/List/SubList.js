import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select, DatePicker } from 'antd';

import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import moment from 'moment';
import FileUpload from '../FileUpload';

moment.locale('ko');
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

const dangerRankImprve = value => {
  let returnValue;
  if (value === 'A'  || value === 'B' || value === 'C' ) returnValue = '개선 대책 기록 필요';
  else if (value === 'D'  || value === 'E' || value === 'F') returnValue = '현상태 유지관리';
  else returnValue = '';
  return returnValue;
};



const SubList = ({ subItem, onChangeAdminSub, onFileUploadTemp, UploadFilesDel, UploadTempFilesDel, dangerDanestAdminSubFile }) => (
  <tr>
    <td align="center">{subItem.EQUIP_NM}</td>
    <td align="center">
      <AntdSelect
        className="select-xs"
        style={{ width: '100%' }}
        defaultValue={Number(subItem.WOKRCND)}
        onChange={value => onChangeAdminSub('WOKRCND', value, subItem)}
      >
        {/* 작업조건 */}
        <Option value={1}>정상</Option>
        <Option value={2}>비정상</Option>
      </AntdSelect>
      {/* {console.debug('subItem : ', subItem)} */}
    </td>
    <td align="center">
      <AntdTextArea defaultValue={subItem.DANGFACT} onChange={e => onChangeAdminSub('DANGFACT', e.target.value, subItem)} />
      {/* 작업단계 위험요인 */}
    </td>
    <td align="center">{subItem.AOT_NM}</td>
    {/* 발생형태 */}
    <td align="center">
      <AntdTextArea defaultValue={subItem.SAFEACTION} onChange={e => onChangeAdminSub('SAFEACTION', e.target.value, subItem)} />
      {/* 현재 안전조치(대책) */}
    </td>
    <td align="center">
      <AntdSelect
        className="select-xs"
        style={{ width: '100%' }}
        defaultValue={Number(subItem.DAN_FREQC)}
        onChange={value => onChangeAdminSub('DAN_FREQC', value, subItem)}
      >
        {/* 위험빈도 */}
        <Option value={1}>1</Option>
        <Option value={2}>2</Option>
        <Option value={3}>3</Option>
        <Option value={4}>4</Option>
        <Option value={5}>5</Option>
      </AntdSelect>
    </td>
    <td align="center">
      <AntdSelect
        className="select-xs"
        style={{ width: '100%' }}
        defaultValue={Number(subItem.DAN_STRGT)}
        onChange={value => onChangeAdminSub('DAN_STRGT', value, subItem)}
      >
        {/* 위험강도 */}
        <Option value={1}>1</Option>
        <Option value={2}>2</Option>
        <Option value={3}>3</Option>
        <Option value={4}>4</Option> 
      </AntdSelect>
    </td>
    {/* DAN_LEVEL 위험수준 */}
    <td align="center" >
       {dangerRank(Number(subItem.DAN_FREQC || 1) * Number(subItem.DAN_STRGT || 1))}  
    </td>
    <td>
      <AntdTextArea   defaultValue={subItem.AP_IMPROVE}  
      onChange={e => onChangeAdminSub('AP_IMPROVE', e.target.value, subItem) }  
      /> {/* 개선대책 */}
    </td>
    <td align="center">
    {dangerRank(Number(subItem.DAN_FREQC || 1) * Number(subItem.DAN_STRGT || 1)) === 'D' || dangerRank(Number(subItem.DAN_FREQC || 1) * Number(subItem.DAN_STRGT || 1))  === 'E'  || dangerRank(Number(subItem.DAN_FREQC || 1) * Number(subItem.DAN_STRGT || 1))  === 'F'? (
     <span></span>
      ) : (
        <AntdDatePicker
        defaultValue={subItem.AP_ENDDATE ? moment(subItem.AP_ENDDATE) : null}
        onChange={(date, dateString) => onChangeAdminSub('AP_ENDDATE', dateString, subItem)}
      />
      )}
      {/* 완료예정일 */}
    </td>
    <td colSpan={2} align="center">
      <FileUpload
        subItem={subItem}
        onFileUploadTemp={onFileUploadTemp}
        UploadFilesDel={UploadFilesDel}
        UploadTempFilesDel={UploadTempFilesDel}
        dangerDanestAdminSubFile={dangerDanestAdminSubFile}
      />
    </td>
    {/* FILE_ATTACH 첨부파일 */}
  </tr>
);

SubList.propTypes = {
  subItem: PropTypes.object,
  dangerDanestAdminSubFile: PropTypes.array,
  onChangeAdminSub: PropTypes.func,
  onFileUploadTemp: PropTypes.func,
  UploadFilesDel: PropTypes.func,
  UploadTempFilesDel: PropTypes.func,
};

export default SubList;
