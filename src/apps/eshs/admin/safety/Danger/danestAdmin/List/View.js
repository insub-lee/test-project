import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber, Radio, Modal } from 'antd';

import StyledAntdModalPad from 'components/BizBuilder/styled//Modal/StyledAntdModalPad';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import UserSearchModal from 'apps/eshs/common/userSearchModal';
import DangerInfoModify from 'apps/eshs/admin/safety/Danger/danestAdmin/DangerInfoModify';

import moment from 'moment';

moment.locale('ko');

const AntdModalPad = StyledAntdModalPad(Modal);
const AntdInputNumber = StyledInputNumber(InputNumber);

const View = ({ formData, dangerInfo, onDangerInfoModal, dangerInfoModal, onChangeAdmin, onChangeManager, dangerInfoModalData, dangerInfoSelect }) => (
  <>
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
      <td colSpan="4" align="center">
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
        {dangerInfo && dangerInfoModalData && dangerInfoSelect && (
          <>
            <StyledButton className="btn-light btn-first btn-xs" onClick={() => onDangerInfoModal(dangerInfo.TASK_SEQ)}>
              위험정보
            </StyledButton>
            <AntdModalPad width={1000} visible={dangerInfoModal} title="위험성 평가 검색" onCancel={onDangerInfoModal} destroyOnClose footer={null}>
              {dangerInfoModal && (
                <StyledHtmlTable>
                  <DangerInfoModify
                    formData={formData}
                    INFO_DATA={JSON.parse(dangerInfo.INFO_DATA)}
                    modalData={dangerInfoModalData}
                    selectData={dangerInfoSelect}
                  />
                </StyledHtmlTable>
              )}
            </AntdModalPad>
          </>
        )}
      </td>
      <th align="center">소속</th>
      <td colSpan="4" align="center">
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
      <td align="center" colSpan="4">{`${formData.REG_EMPNM}(${formData.REG_EMPNO})`}</td>
    </tr>
    <tr>
      <th align="center" colSpan="1">
        부서장
      </th>
      <td align="center" colSpan="4">
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
      <th colSpan="2" rowSpan="2">
        개선 첨부파일
      </th>
    </tr>
    <tr>
      <th>빈도</th>
      <th>강도</th>
      <th>위험등급</th>
      <th>개선대책</th>
      <th>완료예정일</th>
    </tr>
  </>
);

View.propTypes = {
  formData: PropTypes.object,
  dangerInfo: PropTypes.object,
  dangerInfoModal: PropTypes.bool,
  onDangerInfoModal: PropTypes.func,
  onChangeAdmin: PropTypes.func,
  onChangeManager: PropTypes.func,
  dangerInfoModalData: PropTypes.array,
  dangerInfoSelect: PropTypes.array,
};

export default React.memo(View);
