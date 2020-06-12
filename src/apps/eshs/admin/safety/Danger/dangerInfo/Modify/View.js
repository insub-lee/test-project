import React from 'react';
import { Input, InputNumber, Select, Checkbox } from 'antd';

import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

import moment from 'moment';

moment.locale('ko');
const AntdSearchInput = StyledSearchInput(Input.Search);
const AntdInput = StyledInput(Input);
const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdSelect = StyledSelect(Select);

const { Option } = Select;

const tagArray = (onChangeData, formData) => [
  <>
    <th>재해발생 사례</th>
    <td colSpan={2}>
      <AntdInputNumber
        className="ant-input-number-sm ant-input-number-inline"
        onChange={value => onChangeData(`JAEHAE`, value)}
        style={{ width: 100 }}
        defaultValue={formData.JAEHAE}
      />
      건
    </td>
  </>,
  <>
    <th>앗차사고 사례</th>
    <td colSpan={2}>
      <AntdInputNumber
        className="ant-input-number-sm ant-input-number-inline"
        onChange={value => onChangeData(`ACHA`, value)}
        style={{ width: 100 }}
        defaultValue={formData.ACHA}
      />
      건
    </td>
  </>,
  <th colSpan={3}>근로자 구성 및 경력특성</th>,
  <>
    <td colSpan={3} rowSpan={1}>
      <Checkbox defaultChecked={formData.EMP_WOMAN} onChange={e => onChangeData(`EMP_WOMAN`, e.target.checked)}>
        여성근로자
      </Checkbox>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Checkbox defaultChecked={formData.EMP_NEW} onChange={e => onChangeData(`EMP_NEW`, e.target.checked)}>
        1년 미만 미숙련자
      </Checkbox>
    </td>
  </>,
  <>
    <td colSpan={3} rowSpan={1}>
      <Checkbox defaultChecked={formData.EMP_OLD} onChange={e => onChangeData(`EMP_OLD`, e.target.checked)}>
        고령근로자
      </Checkbox>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Checkbox defaultChecked={formData.EMP_TEMP} onChange={e => onChangeData(`EMP_TEMP`, e.target.checked)}>
        비정규직 근로자
      </Checkbox>
    </td>
  </>,
  <>
    <td colSpan={3} rowSpan={1}>
      <Checkbox defaultChecked={formData.EMP_FOREIGN} onChange={e => onChangeData(`EMP_FOREIGN`, e.target.checked)}>
        외국인 근로자
      </Checkbox>
      <Checkbox defaultChecked={formData.EMP_DISABLE} onChange={e => onChangeData(`EMP_DISABLE`, e.target.checked)}>
        장애 근로자
      </Checkbox>
    </td>
  </>,
  <>
    <th>교대작업 유무</th>
    <td colSpan={2}>
      <Checkbox defaultChecked={Boolean(formData.WORK_Y)} onChange={e => onChangeData(`WORK_Y`, e.target.checked)}>
        유
      </Checkbox>
      <Checkbox defaultChecked={Boolean(formData.WORK_N)} onChange={e => onChangeData(`WORK_N`, e.target.checked)}>
        무
      </Checkbox>
    </td>
  </>,
  <>
    <th>운반수단 유무</th>
    <td colSpan={2}>
      <Checkbox defaultChecked={Boolean(formData.MOVE_Y)} onChange={e => onChangeData(`MOVE_Y`, e.target.checked)}>
        기계
      </Checkbox>
      <Checkbox defaultChecked={Boolean(formData.MOVE_N)} onChange={e => onChangeData(`MOVE_N`, e.target.checked)}>
        인력
      </Checkbox>
    </td>
  </>,
  <>
    <th>안전작업허가 필요작업 유무</th>
    <td colSpan={2}>
      <Checkbox defaultChecked={Boolean(formData.AGREE_Y)} onChange={e => onChangeData(`AGREE_Y`, e.target.checked)}>
        유
      </Checkbox>
      <Checkbox defaultChecked={Boolean(formData.AGREE_N)} onChange={e => onChangeData(`AGREE_N`, e.target.checked)}>
        무
      </Checkbox>
    </td>
  </>,
  <>
    <th rowSpan={2}>중량물 인력취급시 단위중량( kg예상) 및 형태</th>
    <td colSpan={2} rowSpan={2}>
      <AntdInputNumber
        className="ant-input-number-sm"
        style={{ width: 100 }}
        onChange={value => onChangeData(`WEIGHT_KG`, value)}
        defaultValue={formData.WEIGHT_KG}
      />
      <Checkbox defaultChecked={Boolean(formData.WEIGHT_UP)} onChange={e => onChangeData(`WEIGHT_UP`, e.target.checked)}>
        들기
      </Checkbox>
      <Checkbox defaultChecked={Boolean(formData.WEIGHT_PUSH)} onChange={e => onChangeData(`WEIGHT_PUSH`, e.target.checked)}>
        밀기
      </Checkbox>
      <Checkbox defaultChecked={Boolean(formData.WEIGHT_PULL)} onChange={e => onChangeData(`WEIGHT_PULL`, e.target.checked)}>
        끌기
      </Checkbox>
      <Checkbox defaultChecked={Boolean(formData.WEIGHT_ETC)} onChange={e => onChangeData(`WEIGHT_ETC`, e.target.checked)}>
        기타
      </Checkbox>
    </td>
  </>,
  <></>,
  <>
    <th>작업환경측정 측정유무</th>
    <td colSpan={2}>
      <Checkbox defaultChecked={Boolean(formData.ENV_Y)} onChange={e => onChangeData(`ENV_Y`, e.target.checked)}>
        측정
      </Checkbox>
      <Checkbox defaultChecked={Boolean(formData.ENV_N)} onChange={e => onChangeData(`ENV_N`, e.target.checked)}>
        미측정
      </Checkbox>
      <Checkbox defaultChecked={Boolean(formData.ENV_Z)} onChange={e => onChangeData(`ENV_Z`, e.target.checked)}>
        해당무
      </Checkbox>
    </td>
  </>,
  <>
    <th>소음측정 기준 (기준:85dB)</th>
    <td colSpan={2}>
      <AntdInputNumber
        className="ant-input-number-sm ant-input-number-inline"
        style={{ width: 100 }}
        onChange={value => onChangeData(`ENV_NOISE`, value)}
        defaultValue={formData.ENV_NOISE}
      />
      dB
    </td>
  </>,
  <>
    <th>작업에 대한 특별안전보건교육 필요유무</th>
    <td colSpan={2}>
      <Checkbox defaultChecked={Boolean(formData.EDU_Y)} onChange={e => onChangeData(`EDU_Y`, e.target.checked)}>
        유
      </Checkbox>
      <Checkbox defaultChecked={Boolean(formData.EDU_N)} onChange={e => onChangeData(`EDU_N`, e.target.checked)}>
        무
      </Checkbox>
    </td>
  </>,
];

const View = viewData => (
  <StyledHtmlTable>
    <table>
      <colgroup>
        <col width="12.5%" />
        <col width="12.5%" />
        <col width="12.5%" />
        <col width="12.5%" />
        <col width="12.5%" />
        <col width="12.5%" />
        <col width="12.5%" />
        <col width="12.5%" />
      </colgroup>
      <tbody>
        <tr>
          <th align="center">분류 {`>`} 부서명</th>
          <td colSpan="2" align="center">
            <span>{`${(viewData && viewData.sdivNm) || ''} > ${(viewData && viewData.divNm) || ''}`}</span>
          </td>
          <td rowSpan="2" colSpan="3" align="center">
            <font size="5">안전보건상 위험정보</font>
          </td>
          <th align="center">생산품</th>
          <td align="center">
            <AntdInput
              className="ant-input-sm ant-input-inline"
              style={{ width: 80 }}
              defaultValue={viewData && viewData.formData && viewData.formData.INFO_DATA && viewData.formData.INFO_DATA.PRODUCT}
              onChange={e => viewData && viewData.onChangeData('PRODUCT', e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <th>공정 {`>`} 세부공정명</th>
          <td colSpan="2" align="center">
            <span>{`${(viewData && viewData.placeNm) || ''} > ${(viewData && viewData.processNm) || ''}`}</span>
          </td>
          <th align="center">근로자수</th>
          <td align="center">
            <AntdInputNumber
              className="ant-input-number-sm ant-input-number-inline"
              style={{ width: 80 }}
              defaultValue={viewData && viewData.formData && viewData.formData.INFO_DATA && viewData.formData.INFO_DATA.EMP_CNT}
              onChange={value => viewData && viewData.onChangeData('EMP_CNT', value)}
            />
          </td>
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
        {tagArray(viewData && viewData.onChangeData, viewData && viewData.formData && viewData.formData.INFO_DATA).map((tag, index) =>
          viewData && viewData.formData ? (
            <tr>
              <td align="center" colSpan="2">
                <AntdSelect
                  className="select-sm"
                  style={{ width: '100%' }}
                  defaultValue={(viewData.formData.INFO_DATA && Number(viewData.formData.INFO_DATA[`M_CD${index + 1}`])) || ''}
                  onChange={value => viewData && viewData.onChangeData(`M_CD${index + 1}`, value)}
                >
                  {viewData &&
                    viewData.selectData &&
                    viewData &&
                    viewData.selectData.map(item => (
                      <Option key={item.NODE_ID} value={item.NODE_ID}>
                        {item.NAME_KOR}
                      </Option>
                    ))}
                </AntdSelect>
              </td>
              <td align="center">
                <AntdInputNumber
                  className="ant-input-number-sm"
                  style={{ width: 100 }}
                  defaultValue={(viewData.formData.INFO_DATA && Number(viewData.formData.INFO_DATA[`M_QTY${index + 1}`])) || ''}
                  onChange={value => viewData && viewData.onChangeData(`M_QTY${index + 1}`, value)}
                />
              </td>
              <td align="center">
                <AntdSearchInput
                  className="input-search-sm"
                  defaultValue={
                    (viewData &&
                      viewData.modalData &&
                      viewData.formData &&
                      viewData.formData.INFO_DATA &&
                      viewData.modalData.find(item => item.MINOR_CD === viewData.formData.INFO_DATA[`C_NM${index + 1}`]) &&
                      viewData.modalData.find(item => item.MINOR_CD === viewData.formData.INFO_DATA[`C_NM${index + 1}`]).CD_NM) ||
                    undefined
                  }
                  readOnly
                  onClick={viewData && viewData.onChangeModal}
                />
              </td>
              <td align="center">
                <span>{(viewData.formData.INFO_DATA && viewData.formData.INFO_DATA[`C_GR${index + 1}`]) || ''}</span>
              </td>
              {tag}
            </tr>
          ) : (
            ''
          ),
        )}
      </tbody>
    </table>
  </StyledHtmlTable>
);

export default React.memo(View);
