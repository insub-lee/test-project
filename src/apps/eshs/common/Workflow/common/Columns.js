import moment from 'moment';
import React from 'react';

import request from 'utils/request';

import BizBuilderBase from 'components/BizBuilderBase';

import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
/* view  --start--*/
import SafetyWorkView from 'apps/eshs/user/safety/safetyWork/safetyWorkAccept'; // 안전작업허가(운전부서) view
import SafetyWorkWrite from 'apps/eshs/user/safety/safetyWork/safetyWorkWrite'; // 안전작업허가(작업부서) view
import WasteWaterDiaryView from 'apps/eshs/admin/environment/wasteWater/diary/view'; // 용폐수일지 view
/* 환경영향평가  --start--*/
import EiMaterial from 'apps/eshs/user/environment/eia/eiMaterial'; // 원부재료
import EiStatement from 'apps/eshs/user/environment/eia/eiStatement'; // 환경영향평가서
import EiImportantAssesment from 'apps/eshs/user/environment/eia/eiImportantAssesment'; // 중대환경영향등록부
/* 환경영향평가  --end--*/
import JournalManagement from 'apps/eshs/user/health/medicalManagement/journalManangement'; // 의료일지

/* view  --end--*/

const getView = (record, spinningOn, spinningOff, handleModal) => {
  // builder view 생성
  if (record?.WORK_SEQ) {
    switch (record?.WORK_SEQ) {
      case 4821:
        // 야외행사승인신청 view 같은 builder 결재 2개
        if (record?.REL_KEY === '야외행사신청')
          return [<BizBuilderBase sagaKey="WORK_PROCESS_VIEW" workSeq={record?.WORK_SEQ} taskSeq={record?.TASK_SEQ} viewMetaSeq={5108} viewType="VIEW" />];
        if (record?.REL_KEY === '야외행사승인')
          return [<BizBuilderBase sagaKey="WORK_PROCESS_VIEW" workSeq={record?.WORK_SEQ} taskSeq={record?.TASK_SEQ} viewType="VIEW" />];
        return [];
      case 4981:
      case 4781:
        return [
          // 폐기물 처리 요청서, 반출증관리
          <BizBuilderBase sagaKey="WORK_PROCESS_VIEW" workSeq={record?.WORK_SEQ} taskSeq={record?.TASK_SEQ} viewType="VIEW" viewCustomButtons={() => []} />,
        ];
      default:
        return [<BizBuilderBase sagaKey="WORK_PROCESS_VIEW" workSeq={record?.WORK_SEQ} taskSeq={record?.TASK_SEQ} viewType="VIEW" />];
    }
  }

  //  SI view 생성
  switch (record?.REL_KEY) {
    case '용폐수일지':
      return [<WasteWaterDiaryView opDt={record?.REL_KEY2} />];
    case '안전작업허가(작업부서)':
      return [<SafetyWorkWrite workNo={record?.REL_KEY2} isWorkFlow key="안전작업허가 VIEW" />];
    case '안전작업허가(운전부서)':
      return [<SafetyWorkView workNo={record?.REL_KEY2} isWorkFlow key="안전작업허가 VIEW" />];
    case '환경영향평가':
      return [
        <div style={{ margin: '20px', height: '50px' }} key="환경영향평가 VIEW">
          <StyledButtonWrapper className="btn-wrap-center">
            <StyledButton
              className="btn-light btn-sm mr5"
              onClick={() => {
                // spinningOn();
                // getCallData('GET', `/api/eshs/v1/common/EshsGetEiMaterial?REQ_NO=${record?.REL_KEY2}`, {}, result => {
                // spinningOff();
                handleModal(true, [
                  <div key="환경영향평가 SUB VIEW">
                    <EiMaterial reqNo={record?.REL_KEY2} deptSearchBarVisible={false} />
                    <div style={{ margin: '20px', height: '50px' }} key="환경영향평가 VIEW">
                      <StyledButtonWrapper className="btn-wrap-center">
                        <StyledButton
                          className="btn-light btn-sm mr5"
                          onClick={() => {
                            handleModal(true, getView(record, spinningOn, spinningOff, handleModal));
                          }}
                        >
                          뒤로
                        </StyledButton>
                      </StyledButtonWrapper>
                    </div>
                  </div>,
                ]);
                // });
              }}
            >
              원부재료
            </StyledButton>
            <StyledButton
              className="btn-light btn-sm mr5"
              onClick={() => {
                // spinningOn();
                // getCallData('GET', `/api/eshs/v1/common/EshsGetEiMaterial?REQ_NO=${record?.REL_KEY2}`, {}, result => {
                //   spinningOff();
                handleModal(true, [
                  <div key="환경영향평가 SUB VIEW">
                    <EiStatement reqNo={record?.REL_KEY2} deptSearchBarVisible={false} />
                    <div style={{ margin: '20px', height: '50px' }} key="환경영향평가 VIEW">
                      <StyledButtonWrapper className="btn-wrap-center">
                        <StyledButton
                          className="btn-light btn-sm mr5"
                          onClick={() => {
                            handleModal(true, getView(record, spinningOn, spinningOff, handleModal));
                          }}
                        >
                          뒤로
                        </StyledButton>
                      </StyledButtonWrapper>
                    </div>
                  </div>,
                ]);
                // });
              }}
            >
              환경영향평가서
            </StyledButton>
            <StyledButton
              className="btn-light btn-sm mr5"
              onClick={() => {
                // spinningOn();
                // getCallData('GET', `/api/eshs/v1/common/EshsGetEiMaterial?REQ_NO=${record?.REL_KEY2}`, {}, result => {
                //   spinningOff();
                handleModal(true, [
                  <div key="환경영향평가 SUB VIEW">
                    <EiImportantAssesment reqNo={record?.REL_KEY2} deptSearchBarVisible={false} />
                    <div style={{ margin: '20px', height: '50px' }} key="환경영향평가 VIEW">
                      <StyledButtonWrapper className="btn-wrap-center">
                        <StyledButton
                          className="btn-light btn-sm mr5"
                          onClick={() => {
                            handleModal(true, getView(record, spinningOn, spinningOff, handleModal));
                          }}
                        >
                          뒤로
                        </StyledButton>
                      </StyledButtonWrapper>
                    </div>
                  </div>,
                ]);
                // });
              }}
            >
              중대환경영향등록부
            </StyledButton>
          </StyledButtonWrapper>
        </div>,
      ];
    case '의료일지':
      const relArray = record.REL_KEY2.split('_');
      return [<JournalManagement SITE_NODE_ID={relArray[0] ? Number(relArray[0]) : null} JRNL_DT={relArray[1]} />];
    default:
      return [];
  }
};

const getCallData = async (method, url, param, callBack) => {
  const result = await request({
    method,
    url,
    data: { PARAM: param },
    json: true,
  });

  return typeof callBack === 'function' ? callBack(result?.response) : result?.response;
};

export const columns = (handleModal, type, spinningOn, spinningOff) => [
  {
    title: '종류',
    dataIndex: 'APPVGUBUN',
    key: 'APPVGUBUN',
    width: '15%',
    align: 'center',
    render: (text, record) => {
      switch (record?.REL_TYPE) {
        case 99:
          return '폐기';
        case 999:
          return '일괄폐기';
        case 100: // ESHS 전용 REL_TYPE
          return record?.REL_KEY;
        default:
          return text;
      }
    },
  },
  {
    title: '유형',
    width: type === 'DRAFT' ? '0%' : '15%',
    align: 'center',
    render: (text, record) => (type === 'DRAFT' ? '' : record?.RULE_CONFIG?.Label) || '',
  },
  {
    title: '제목',
    dataIndex: 'DRAFT_TITLE',
    key: 'title',
    width: type === 'DRAFT' ? '50%' : '40%',
    ellipsis: true,
    render: (text, record) => (
      <StyledButton className="btn-link btn-sm" onClick={() => handleModal(true, getView(record, spinningOn, spinningOff, handleModal))}>
        {text}
      </StyledButton>
    ),
  },
  {
    title: '기안일',
    dataIndex: 'REG_DTTM',
    key: 'regDttm',
    width: '10%',
    align: 'center',
    render: (text, record) => moment(text).format('YYYY-MM-DD'),
  },
  {
    title: '상태',
    dataIndex: 'STATUS',
    key: 'STATUS',
    width: '10%',
    align: 'center',
    render: (text, record) => {
      const { APPV_STATUS_NM } = record;
      if (APPV_STATUS_NM) {
        return APPV_STATUS_NM;
      }
      switch (text) {
        case 1:
          return '결재중';
        case 2:
          return '결재완료';
        case 9:
          return '부결';
        default:
          return '결재중';
      }
    },
  },
  {
    title: '기안자',
    dataIndex: 'NAME_KOR',
    key: 'NAME_KOR',
    width: '10%',
    align: 'center',
  },
];
