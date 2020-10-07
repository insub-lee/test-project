import moment from 'moment';
import React from 'react';

import request from 'utils/request';

import BizBuilderBase from 'components/BizBuilderBase';

import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

/* view  --start--*/
import SafetyWorkView from 'apps/eshs/user/safety/safetyWork/safetyWorkAccept'; // 안전작업허가 view
/* 환경영향평가  --start--*/
import EiMaterial from 'apps/eshs/user/environment/eia/eiMaterial'; // 원부재료
import EiStatement from 'apps/eshs/user/environment/eia/eiStatement'; // 환경영향평가서
import EiImportantAssesment from 'apps/eshs/user/environment/eia/eiImportantAssesment'; // 중대환경영향등록부
/* 환경영향평가  --end--*/
import JournalManagement from 'apps/eshs/user/health/medicalManagement/journalManangement'; // 의료일지

/* view  --end--*/

const getView = (record, spinningOn, spinningOff, handleModal) => {
  // builder view 생성
  switch (record.WORK_SEQ) {
    case -1:
      return [<BizBuilderBase sagaKey="WORK_PROCESS_VIEW" workSeq={record.WORK_SEQ} taskSeq={record.TASK_SEQ} viewType="VIEW" />];
    default:
      break;
  }

  //  SI view 생성
  switch (record.REL_KEY) {
    case '안전작업허가':
      return [<SafetyWorkView workNo={record.REL_KEY2} isWorkFlow key="안전작업허가 VIEW" />];
    case '환경영향평가':
      return [
        <div style={{ margin: '20px', height: '50px' }} key="환경영향평가 VIEW">
          <StyledButtonWrapper className="btn-wrap-center">
            <StyledButton
              className="btn-light btn-sm mr5"
              onClick={() => {
                spinningOn();
                getCallData('POST', '/api/eshs/v1/common/eshsEiMaterialApprovalList', { REL_KEY2: record.REL_KEY2 }, result => {
                  spinningOff();
                  handleModal(true, [
                    <div key="환경영향평가 SUB VIEW">
                      <EiMaterial searchData={result && result.list && result.list[0]} deptSearchBarVisible={false} />
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
                });
              }}
            >
              원부재료
            </StyledButton>
            <StyledButton
              className="btn-light btn-sm mr5"
              onClick={() => {
                spinningOn();
                getCallData('POST', '/api/eshs/v1/common/eshsEiMaterialApprovalList', { REL_KEY2: record.REL_KEY2 }, result => {
                  spinningOff();
                  handleModal(true, [
                    <div key="환경영향평가 SUB VIEW">
                      <EiStatement searchData={result && result.list && result.list[0]} deptSearchBarVisible={false} />
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
                });
              }}
            >
              환경영향평가서
            </StyledButton>
            <StyledButton
              className="btn-light btn-sm mr5"
              onClick={() => {
                spinningOn();
                getCallData('POST', '/api/eshs/v1/common/eshsEiMaterialApprovalList', { REL_KEY2: record.REL_KEY2 }, result => {
                  spinningOff();
                  handleModal(true, [
                    <div key="환경영향평가 SUB VIEW">
                      <EiImportantAssesment searchData={result && result.list && result.list[0]} deptSearchBarVisible={false} />
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
                });
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

  return typeof callBack === 'function' ? callBack(result && result.response) : result && result.response;
};

export const columns = (handleModal, type, spinningOn, spinningOff) => [
  {
    title: '종류',
    dataIndex: 'APPVGUBUN',
    key: 'APPVGUBUN',
    width: '15%',
    align: 'center',
    render: (text, record) => {
      let label = '';
      switch (record.REL_TYPE) {
        case 99:
          label = '폐기';
          break;
        case 999:
          label = '일괄폐기';
          break;
        default:
          label = text;
          break;
      }
      if (!label) label = record.REL_KEY;
      return label;
    },
  },
  {
    title: '유형',
    width: type === 'DRAFT' ? '0%' : '15%',
    align: 'center',
    render: (text, record) => (type === 'DRAFT' ? '' : record && record.RULE_CONFIG && record.RULE_CONFIG.Label) || '',
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
      if (APPV_STATUS_NM && APPV_STATUS_NM !== '') {
        return APPV_STATUS_NM;
      }
      switch (text) {
        case 1:
          return '결재중';
        case 2:
          return '결재완료';
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
