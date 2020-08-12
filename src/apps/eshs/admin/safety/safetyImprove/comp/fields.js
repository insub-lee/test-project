import React, { Component } from 'react';

import moment from 'moment';

const today = moment(new Date()).format('YYYY-MM-DD');

export const fields = profile => ({
  REQ_NO: { NAME: '발행번호', REQUIRED: false, DEFAULT_VALUE: '', FIELD: 'REQ_NO' },
  REQ_DT: { NAME: '발행일자', REQUIRED: false, DEFAULT_VALUE: today, FIELD: 'REQ_DT' },
  REQ_DEPT_NAME: { NAME: '요청부서', REQUIRED: false, DEFAULT_VALUE: profile.DEPT_NAME_KOR, FIELD: 'REQ_DEPT_NAME' },
  REQ_DEPT_CD: { NAME: '요청부서코드', REQUIRED: false, DEFAULT_VALUE: '', FIELD: 'REQ_DEPT_CD' },
  REQ_DEPT_ID: { NAME: '요청부서ID', REQUIRED: false, DEFAULT_VALUE: profile.DEPT_ID, FIELD: 'REQ_DEPT_ID' },
  REQ_EMP_NAME: { NAME: '요청자', REQUIRED: false, DEFAULT_VALUE: profile.NAME_KOR, FIELD: 'REQ_EMP_NAME' },
  REQ_EMP_NO: { NAME: '요청자 사번', REQUIRED: false, DEFAULT_VALUE: profile.EMP_NO, FIELD: 'REQ_EMP_NO' },
  REQ_EMP_ID: { NAME: '요청자 ID', REQUIRED: false, DEFAULT_VALUE: profile.USER_ID, FIELD: 'REQ_EMP_ID' },
  REQ_PHONE: { NAME: '요청자 전화번호', REQUIRED: false, DEFAULT_VALUE: profile.OFFICE_TEL_NO, FIELD: 'REQ_PHONE' },
  TITLE: { NAME: '제목', REQUIRED: false, DEFAULT_VALUE: '', FIELD: 'TITLE' },
  LOC: { NAME: '위치', REQUIRED: true, DEFAULT_VALUE: '', FIELD: 'LOC' },
  LOC_DETAIL: { NAME: '상세위치', REQUIRED: true, DEFAULT_VALUE: '', FIELD: 'LOC_DETAIL' },
  MM: { NAME: '4M', REQUIRED: false, DEFAULT_VALUE: '', FIELD: 'MM' },
  EACH_TYPE: { NAME: '유형별', REQUIRED: true, DEFAULT_VALUE: '', FIELD: 'EACH_TYPE' },
  ACP_DEPT: { NAME: '조치부서코드', REQUIRED: true, DEFAULT_VALUE: '', FIELD: 'ACP_DEPT' },
  ACP_EMP_NO: { NAME: '조치사원', REQUIRED: true, DEFAULT_VALUE: '', FIELD: 'ACP_EMP_NO' },
  ACP_EMP_NAME: { NAME: '조치사원 이름', REQUIRED: true, DEFAULT_VALUE: '', FIELD: 'ACP_EMP_NAME' },
  ACP_EMP_ID: { NAME: '조치사원 ID', REQUIRED: false, DEFAULT_VALUE: '', FIELD: 'ACP_EMP_ID' },
  GRADE: { NAME: '등급', REQUIRED: true, DEFAULT_VALUE: '', FIELD: 'GRADE' },
  PIC: { NAME: '개선전 사진', REQUIRED: true, DEFAULT_VALUE: '', FIELD: 'PIC' },
  DANGERYN: { NAME: '위험성평가 실시여부', REQUIRED: true, DEFAULT_VALUE: '', FIELD: 'DANGERYN' },
  DANGERCAUSE: { NAME: '사고의 발생원인', REQUIRED: false, DEFAULT_VALUE: '', FIELD: 'DANGERCAUSE' },
  DANGERTYPE: { NAME: '사고의 발생유형', REQUIRED: false, DEFAULT_VALUE: '', FIELD: 'DANGERTYPE' },
  SDIV_CD: { NAME: '분류', REQUIRED: false, DEFAULT_VALUE: '', FIELD: 'SDIV_CD' },
  DIV_CD: { NAME: '부서', REQUIRED: false, DEFAULT_VALUE: '', FIELD: 'DIV_CD' },
  PLACE_CD: { NAME: '공정(장소)', REQUIRED: false, DEFAULT_VALUE: '', FIELD: 'PLACE_CD' },
  PROCESS_CD: { NAME: '세부공정', REQUIRED: false, DEFAULT_VALUE: '', FIELD: 'PROCESS_CD' },
  EQUIP_CD: { NAME: '장비(설비)', REQUIRED: false, DEFAULT_VALUE: '', FIELD: 'EQUIP_CD' },
  UPD_DT: { NAME: '수정일', REQUIRED: false, DEFAULT_VALUE: today, FIELD: 'UPD_DT' },
});
