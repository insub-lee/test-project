import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

const tagArray = INFO_DATA => [
  <>
    <th>재해발생 사례</th>
    <td colSpan={2}>{INFO_DATA.JAEHAE} 건</td>
  </>,
  <>
    <th>앗차사고 사례</th>
    <td colSpan={2}>{INFO_DATA.ACHA} 건</td>
  </>,
  <th colSpan={3}>근로자 구성 및 경력특성</th>,
  <>
    <td colSpan={3} rowSpan={1}>
      <Checkbox defaultChecked={INFO_DATA.EMP_WOMAN}>여성근로자</Checkbox>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Checkbox defaultChecked={INFO_DATA.EMP_NEW}>1년 미만 미숙련자</Checkbox>
    </td>
  </>,
  <>
    <td colSpan={3} rowSpan={1}>
      <Checkbox defaultChecked={INFO_DATA.EMP_OLD}>고령근로자</Checkbox>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Checkbox defaultChecked={INFO_DATA.EMP_TEMP}>비정규직 근로자</Checkbox>
    </td>
  </>,
  <>
    <td colSpan={3} rowSpan={1}>
      <Checkbox defaultChecked={INFO_DATA.EMP_FOREIGN}>외국인 근로자</Checkbox>
      <Checkbox defaultChecked={INFO_DATA.EMP_DISABLE}>장애 근로자</Checkbox>
    </td>
  </>,
  <>
    <th>교대작업 유무</th>
    <td colSpan={2}>
      <Checkbox defaultChecked={Boolean(INFO_DATA.WORK_Y)}>유</Checkbox>
      <Checkbox defaultChecked={Boolean(INFO_DATA.WORK_N)}>무</Checkbox>
    </td>
  </>,
  <>
    <th>운반수단 유무</th>
    <td colSpan={2}>
      <Checkbox defaultChecked={Boolean(INFO_DATA.MOVE_Y)}>기계</Checkbox>
      <Checkbox defaultChecked={Boolean(INFO_DATA.MOVE_N)}>인력</Checkbox>
    </td>
  </>,
  <>
    <th>안전작업허가 필요작업 유무</th>
    <td colSpan={2}>
      <Checkbox defaultChecked={Boolean(INFO_DATA.AGREE_Y)} A>
        유
      </Checkbox>
      <Checkbox defaultChecked={Boolean(INFO_DATA.AGREE_N)} A>
        무
      </Checkbox>
    </td>
  </>,
  <>
    <th>중량물 인력취급시 단위중량( kg예상)</th>
    <td colSpan={2}>{INFO_DATA.WEIGHT_KG} KG</td>
  </>,
  <>
    <th>중량물 인력취급시 형태</th>
    <td colSpan={2}>
      <Checkbox defaultChecked={Boolean(INFO_DATA.WEIGHT_UP)}>들기</Checkbox>
      <Checkbox defaultChecked={Boolean(INFO_DATA.WEIGHT_PUSH)}>밀기</Checkbox>
      <Checkbox defaultChecked={Boolean(INFO_DATA.WEIGHT_PULL)}>끌기</Checkbox>
      <Checkbox defaultChecked={Boolean(INFO_DATA.WEIGHT_ETC)}>기타</Checkbox>
    </td>
  </>,
  <>
    <th>작업환경측정 측정유무</th>
    <td colSpan={2}>
      <Checkbox defaultChecked={Boolean(INFO_DATA.ENV_Y)}>측정</Checkbox>
      <Checkbox defaultChecked={Boolean(INFO_DATA.ENV_N)}>미측정</Checkbox>
      <Checkbox defaultChecked={Boolean(INFO_DATA.ENV_Z)}>해당무</Checkbox>
    </td>
  </>,
  <>
    <th>소음측정 기준 (기준:85dB)</th>
    <td colSpan={2}>{INFO_DATA.ENV_NOISE} dB</td>
  </>,
  <>
    <th>작업에 대한 특별안전보건교육 필요유무</th>
    <td colSpan={2}>
      <Checkbox defaultChecked={Boolean(INFO_DATA.EDU_Y)}>유</Checkbox>
      <Checkbox defaultChecked={Boolean(INFO_DATA.EDU_N)}>무</Checkbox>
    </td>
  </>,
];

const View = ({ formData, selectData, INFO_DATA, modalData }) => (
  <table>
    <colgroup>
      <col width="12.5%" />
      <col width="12.5%" />
      <col width="12.5%" />
      <col width="12.5%" />
      <col width="10%" />
      <col width="13%" />
      <col width="13.5%" />
      <col width="13.5%" />
    </colgroup>
    <tbody>
      <tr>
        <th align="center">분류 {`>`} 부서명</th>
        <td colSpan="2" align="center">
          <span>{`${formData.SDIV_NM || ''} > ${formData.DIV_NM || ''}`}</span>
        </td>
        <td rowSpan="2" colSpan="3" align="center">
          <font size="5">안전보건상 위험정보</font>
        </td>
        <th align="center">생산품</th>
        <td align="center">{INFO_DATA.PRODUCT}</td>
      </tr>
      <tr>
        <th>공정 {`>`} 세부공정명</th>
        <td colSpan="2" align="center">
          <span>{`${formData.PLACE_NM || ''} > ${formData.PROCESS_NM || ''}`}</span>
        </td>
        <th align="center">근로자수</th>
        <td align="center">{INFO_DATA.EMP_CNT}</td>
      </tr>
      <tr>
        <th colSpan="3" align="center">
          설비.장비
        </th>
        <th colSpan="2" align="center">
          유해화학물질
        </th>
        <td rowSpan="2" colSpan="3" align="center">
          <font size="3">기타안전보건상 건강정보</font>
        </td>
      </tr>
      <tr>
        <th colSpan="2" align="center">
          설비장비명
        </th>
        <th align="center">수량</th>
        <th align="center">유해화학물질명</th>
        <th align="center">등급</th>
      </tr>
      {tagArray(INFO_DATA).map((tag, index) => (
        <tr>
          <td align="center" colSpan="2">
            {selectData &&
              selectData.find(item => item.NODE_ID === Number(INFO_DATA[`M_CD${index + 1}`])) &&
              selectData.find(item => item.NODE_ID === Number(INFO_DATA[`M_CD${index + 1}`])).NAME_KOR}
          </td>
          <td align="center">{Number(INFO_DATA[`M_QTY${index + 1}`]) || ''}</td>
          <td align="center">
            {(modalData &&
              modalData.find(item => item.MINOR_CD === INFO_DATA[`C_NM${index + 1}`]) &&
              modalData.find(item => item.MINOR_CD === INFO_DATA[`C_NM${index + 1}`]).CD_NM) ||
              undefined}
          </td>
          <td align="center">
            <span>{INFO_DATA[`C_GR${index + 1}`] || ''}</span>
          </td>
          {tag}
        </tr>
      ))}
    </tbody>
  </table>
);

View.propTypes = {
  formData: PropTypes.object,
  selectData: PropTypes.array,
  INFO_DATA: PropTypes.object,
  modalData: PropTypes.array,
};

View.defaultProps = {};

export default React.memo(View);
