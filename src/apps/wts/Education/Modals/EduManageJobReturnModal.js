import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';
import moment from 'moment';

import { Icon, Spin, Button } from 'antd';
import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import { jsonToQueryString } from 'utils/helpers';
import service from '../service';
import StyledContent from './StyledContent';
import StyledTable from '../../StyledTable';

import EvaluationFormModal from './EvaluationFormModal';
import EvaluationFormCheckModal from './EvaluationFormCheckModal';
import EduReportModal from './EduReportModal';
import MentorOpinionModal from './MentorOpinion';
import ChiefOpinionModal from './ChiefOpinion';

const StyledButton = StyledAntdButton(Button);

const curriculumButtonStyle = {
  maxWidth: 200,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

class EduManageJobReturnModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: true,
      eduPlanInfo: {},
      report: {},
      eduPlanStep: [],
      reportAuth: 'user',
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.reportTableRowRenderer = this.reportTableRowRenderer.bind(this);
    this.handleEduReportModal = this.handleEduReportModal.bind(this);
    this.handleReviewEduReportModal = this.handleReviewEduReportModal.bind(this);
    this.handleMentorConfirm = this.handleMentorConfirm.bind(this);
    this.initData = this.initData.bind(this);
    this.mentorConfirmRenderer = this.mentorConfirmRenderer.bind(this);
    this.handleReadyExamConfirm = this.handleReadyExamConfirm.bind(this);
    this.handleOpenExamModal = this.handleOpenExamModal.bind(this);
    this.handleOpenExamCheckModal = this.handleOpenExamCheckModal.bind(this);
    this.handleMentorOpinionModal = this.handleMentorOpinionModal.bind(this);
    this.handleAdminOpinionModal = this.handleAdminOpinionModal.bind(this);
    this.handleStepPass = this.handleStepPass.bind(this);

    this.evaluationFormModal = React.createRef();
    this.evaluationFormCheckModal = React.createRef();
    this.eduReportModal = React.createRef();
    this.mentorOpinionModal = React.createRef();
    this.chiefOpinionModal = React.createRef();
  }

  handleOpenModal(planseq, reportAuth) {
    this.setState({ isOpen: true, planseq, reportAuth }, () => {
      this.initData();
    });
  }

  initData() {
    const { planseq } = this.state;
    this.fetchData(planseq).then(({ eduPlanInfo, eduPlanStep, report, isError }) => {
      if (isError || !eduPlanInfo) {
        alert('조회가능한 정보가 없습니다.');
        this.handleCloseModal();
      } else {
        this.setState({ eduPlanInfo, eduPlanStep, report, isLoading: false });
      }
    });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  handleEduReportModal(stepLevel) {
    const { eduPlanInfo } = this.state;
    this.eduReportModal.current.handleOpenModal({ eduPlanInfo, stepLevel });
  }

  handleReviewEduReportModal(row) {
    this.eduReportModal.current.handleOpenModal({ readOnly: true, report: row });
  }

  handleMentorConfirm(row) {
    if (window.confirm(`${moment(row.edudt, 'YYYYMMDD').format('YYYY.MM.DD')} 내용을 확인하셨습니까?`)) {
      const payload = {
        type: 'upddailyReport',
        reportno: row.reportno,
        confirm: 'O',
        planseq: row.plan_seq,
      };
      this.updateData(payload).then(result => {
        if (result) {
          this.initData();
        } else {
          alert('업데이트를 하는 중 오류가 발생했습니다.');
        }
      });
    }
  }

  handleReadyExamConfirm(planseq, empno, step) {
    if (window.confirm('해당 단계의 평가 수행을 진행하시겠습니까?')) {
      const payload = {
        type: 'insertPlanEduStep',
        empNo: empno,
        searchDt: moment(new Date()).format('YYYYMMDD'),
        step_level: step,
        plan_seq: planseq,
        plan_result: 'X',
      };
      this.postData(payload).then(result => {
        if (result) {
          this.initData();
        } else {
          alert('처리과정 중 오류가 발생했습니다.');
        }
      });
    }
  }

  handleStepPass(planseq, step, collseq, empno) {
    if (window.confirm(`교육을 통과 시키겠습니까?`)) {
      const payload = {
        type: 'passStep',
        plan_seq: planseq,
        collseq,
        empno,
      };
      const todayMoment = moment(new Date());

      payload.step3_eduedt = todayMoment.format('YYYYMMDD');
      payload.step3_chkdt = todayMoment.format('YYYYMMDD');
      payload.step3_result = 'O';

      this.updateData(payload).then(result => {
        if (result) {
          alert(`교육을 통과했습니다.`);
          this.initData();
        } else {
          alert('데이터를 처리하는 과정에서 에러가 발생했습니다.');
        }
      });
    }
  }

  handleOpenExamModal(planseq, empno, step, site, studyType, area) {
    this.evaluationFormModal.current.handleOpenModal(planseq, empno, step, site, studyType, area);
  }

  handleOpenExamCheckModal(planseq, empno, step, site, studyType, area) {
    this.evaluationFormModal.current.handleOpenModal(planseq, empno, step, site, studyType, area);
    // this.evaluationFormCheckModal.current.handleOpenModal(planseq, empno, step);
  }

  handleMentorOpinionModal(planseq, empno, step, opinion, writeAble) {
    this.mentorOpinionModal.current.handleOpenModal(planseq, empno, step, opinion, writeAble);
  }

  handleAdminOpinionModal(planseq, empno, step, opinion, writeAble) {
    this.chiefOpinionModal.current.handleOpenModal(planseq, empno, step, opinion, writeAble);
  }

  mentorConfirmRenderer(reportAuth, row) {
    return reportAuth === 'mentor' ? (
      <StyledButton type="button" className="btn-light btn-sm" onClick={() => this.handleMentorConfirm(row)}>
        <i className="fas fa-check" /> 멘토확인
      </StyledButton>
    ) : (
      '미확인'
    );
  }

  mentorAcceptTestRenderer(reportAuth, eduPlanInfo, row, length, confirmed, step, planResult, passButton) {
    const { site } = this.props;

    switch (reportAuth) {
      case 'mentor': {
        return confirmed ? (
          <>
            <td rowSpan={length}>
              <button
                type="button"
                style={{ margin: '10px 0' }}
                onClick={() => this.handleOpenExamCheckModal(row.plan_seq, row.empno, step, site, 'job_return', eduPlanInfo.area)}
              >
                <i className="fa fa-check" /> 직무교육
              </button>
            </td>
            {planResult === 'O' && (
              <td rowSpan={length} style={{ color: '#1fb5ad' }}>
                합격
              </td>
            )}
            {planResult === 'X' && (
              <td rowSpan={length} style={{ color: 'red' }}>
                -
              </td>
            )}
            {planResult !== 'O' && planResult !== 'X' && <td rowSpan={length}>-</td>}
          </>
        ) : (
          <td colSpan={2} rowSpan={length + 1}>
            <StyledButton type="button" className="btn-light btn-sm" onClick={() => this.handleReadyExamConfirm(row.plan_seq, row.empno, step)}>
              평가 시작
            </StyledButton>
          </td>
        );
      }
      case 'readonly':
      case 'user': {
        return confirmed ? (
          <>
            <td rowSpan={length}>
              <button
                type="button"
                style={{ margin: '10px 0' }}
                onClick={() => this.handleOpenExamCheckModal(row.plan_seq, row.empno, step, site, 'job_return', eduPlanInfo.area)}
              >
                <i className="fa fa-check" /> 직무교육
              </button>
            </td>
            {planResult === 'O' && (
              <td rowSpan={length} style={{ color: '#1fb5ad' }}>
                합격
              </td>
            )}
            {planResult === 'X' && (
              <td rowSpan={length} style={{ color: 'red' }}>
                -
              </td>
            )}
            {planResult !== 'O' && planResult !== 'X' && <td rowSpan={length}>-</td>}
          </>
        ) : (
          <td colSpan={2} rowSpan={length + 1}>
            미평가대상
          </td>
        );
      }
      case 'admin': {
        return confirmed ? (
          <>
            <td rowSpan={length}>
              <button
                type="button"
                style={{ margin: '10px 0' }}
                onClick={() => this.handleOpenExamCheckModal(row.plan_seq, row.empno, step, site, 'job_return', eduPlanInfo.area)}
              >
                <i className="fa fa-check" /> 직무교육
              </button>
              {passButton}
            </td>
            {planResult === 'O' && (
              <td rowSpan={length} style={{ color: '#1fb5ad' }}>
                합격
              </td>
            )}
            {planResult === 'X' && (
              <td rowSpan={length} style={{ color: 'red' }}>
                -
              </td>
            )}
            {planResult !== 'O' && planResult !== 'X' && <td rowSpan={length}>-</td>}
          </>
        ) : (
          <td colSpan={2} rowSpan={length + 1}>
            <StyledButton type="button" className="btn-light btn-sm" onClick={() => this.handleReadyExamConfirm(row.plan_seq, row.empno, step)}>
              평가 시작
            </StyledButton>
          </td>
        );
      }
      default: {
        return null;
      }
    }
  }

  async fetchData(planSeq) {
    const requestQuery = {
      type: 'getEduPlanByPlanSeq',
      planSeq,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.user.get(queryString);
    if (response && !error) {
      const { eduPlanInfo, eduPlanStep, eduDailyReport } = response;
      const report = {};
      eduDailyReport.forEach(dailyReport => {
        if (!report[dailyReport.step_level]) {
          report[dailyReport.step_level] = [dailyReport];
        } else {
          report[dailyReport.step_level].push(dailyReport);
        }
      });
      return { eduPlanInfo, eduPlanStep, report };
    }
    return { eduPlanInfo: {}, eduPlanStep: [], report: {}, isError: true };
  }

  async postData(payload) {
    const { response, error } = await service.user.post(payload);
    if (response && !error) {
      const { insertyn } = response;
      return insertyn;
    }
    return false;
  }

  async updateData(payload) {
    const { response, error } = await service.user.put(payload);
    if (response && !error) {
      const { updateyn } = response;
      return updateyn;
    }
    return false;
  }

  eduScheduleRenderer(stepLevel) {
    const { eduPlanInfo } = this.state;
    const currentStepLevel = eduPlanInfo.step_level;

    if (currentStepLevel > stepLevel) {
      return `${moment(eduPlanInfo.step3_edusdt, 'YYYYMMDD').format('YYYY.MM.DD')} ~ ${moment(eduPlanInfo.step3_eduedt, 'YYYYMMDD').format('YYYY.MM.DD')}`;
    }
    if (currentStepLevel === stepLevel) {
      return `${moment(eduPlanInfo.step3_edusdt, 'YYYYMMDD').format('YYYY.MM.DD')} ~ `;
    }
    return '-';
  }

  reportTableRowRenderer(step, currentStep, startStep) {
    const { report, eduPlanStep, reportAuth, eduPlanInfo } = this.state;
    // 현재 스탭의 스타트 날짜가 없으면 안그림 (1단계 Pass 관련)
    if (!startStep) {
      return [];
    }
    // 현재 스탭이 그리려는 스탭보다 앞서 있을때
    if (currentStep < step) {
      return [];
    }
    // 리포트가 작성된게 하나도 없으면,
    if (!report[step] || report[step].length === 0) {
      return (
        <tr className="bd">
          <td colSpan={3}>
            {reportAuth === 'user' ? (
              <StyledButton type="button" className="btn-light btn-sm" onClick={() => this.handleEduReportModal(step)}>
                <i className="fa fa-edit" /> 레포트 작성
              </StyledButton>
            ) : (
              '작성된 레포트가 없습니다.'
            )}
          </td>
          <td colSpan={2} />
          <td colSpan={2} />
        </tr>
      );
    }
    let notReady = report[step].some(data => data.confirm === 'X');
    // 평가 대상자 체크
    if (!notReady) {
      switch (step) {
        case 3:
          notReady = report[step].length < 1;
          break;
        case 1:
        case 2:
          notReady = report[step].length < 1;
          break;
        default:
          notReady = true;
          break;
      }
    }
    const checkIndex = eduPlanStep.findIndex(eduPlan => eduPlan.step_level === step);
    const confirmed = checkIndex > -1;
    let planResult = '';

    if (confirmed) {
      planResult = eduPlanStep[checkIndex].plan_result;
    }
    const finished = false;
    // 리포트 및 기타 tr 을 그리는 부분
    const children = report[step].map((row, index) => (
      <tr className="bd" key={row.reportno}>
        <td>{moment(row.edudt, 'YYYYMMDD').format('YYYY.MM.DD')}</td>
        <td>
          <StyledButton type="button" className="btn-light btn-sm" onClick={() => this.handleReviewEduReportModal(row)} style={curriculumButtonStyle}>
            <i className="fa fa-edit" /> {row.curriculum}
          </StyledButton>
        </td>
        <td>{row.confirm === 'O' ? <i className="fa fa-check" /> : this.mentorConfirmRenderer(reportAuth, row)}</td>
        {index === 0 &&
          !notReady &&
          this.mentorAcceptTestRenderer(
            reportAuth,
            eduPlanInfo,
            row,
            report[step].length,
            confirmed,
            step,
            planResult,
            index === 0 &&
              !notReady &&
              planResult === 'O' &&
              confirmed &&
              reportAuth === 'admin' &&
              currentStep === step &&
              eduPlanStep[checkIndex].step_pass !== 'O' && (
                <>
                  <br />
                  <button
                    type="button"
                    style={{ borderBottom: '1px solid black ' }}
                    onClick={() => this.handleStepPass(row.plan_seq, step, eduPlanInfo.collseq, eduPlanInfo.empno)}
                  >
                    패스하기
                  </button>
                </>
              ),
          )}
        {index === 0 && notReady && (
          <td rowSpan={report[step].length + 1} colSpan={2}>
            평가 미대상자
          </td>
        )}
        {index === 0 && !notReady && planResult === 'O' && confirmed && (
          <>
            <td rowSpan={report[step].length}>
              <StyledButton
                type="button"
                className="btn-light btn-sm"
                onClick={() =>
                  this.handleMentorOpinionModal(
                    row.plan_seq,
                    row.empno,
                    step,
                    eduPlanStep[checkIndex].memto_opinion,
                    reportAuth === 'mentor' || reportAuth === 'admin',
                  )
                }
              >
                {reportAuth === 'mentor' || reportAuth === 'admin' ? <i className="fa fa-edit" /> : '내용'}
              </StyledButton>
            </td>
            <td rowSpan={report[step].length}>
              <StyledButton
                type="button"
                className="btn-light btn-sm"
                onClick={() => this.handleAdminOpinionModal(row.plan_seq, row.empno, step, eduPlanStep[checkIndex].chief_opinion, reportAuth === 'admin')}
              >
                {reportAuth === 'admin' ? <i className="fa fa-edit" /> : '내용'}
              </StyledButton>
            </td>
          </>
        )}
        {index === 0 && !(!notReady && planResult === 'O' && confirmed) && (
          <td colSpan={2} rowSpan={report[step].length + 1}>
            작성된 의견이 없습니다.
          </td>
        )}
      </tr>
    ));
    // User 이고 평가 confirmed(평가 대상자 구분값) 추가 레포트 작성 화면 그리는 곳
    if (reportAuth === 'user' && !confirmed) {
      children.push(
        <tr className="bd" key={-1}>
          <td colSpan={3}>
            <StyledButton type="button" className="btn-light btn-sm" onClick={() => this.handleEduReportModal(step)}>
              <i className="fa fa-edit" /> 레포트 작성
            </StyledButton>
          </td>
        </tr>,
      );
    }
    return children;
  }

  render() {
    const { isOpen, eduPlanInfo, reportAuth } = this.state;
    const { site } = this.props;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 1000,
        }}
        bodyStyle={{
          padding: 0,
        }}
        closable={false}
        destroyOnClose
      >
        <div>
          <StyledContent>
            <div className="pop_tit">
              복직자 교육
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={false}>
                <StyledCommonForm onSubmit={e => e.preventDefault()} autoComplete="off">
                  <div className="sub_form_tit cr">신 상 INFORMATION</div>
                  <StyledTable className="ta_wrap">
                    <table className="tb02">
                      <colgroup>
                        <col width="20%" />
                        <col width="20%" />
                        <col width="20%" />
                        <col width="20%" />
                        <col width="20%" />
                      </colgroup>
                      <tbody>
                        <tr className="bd">
                          <td rowSpan={7}>
                            <img src={`/img/profile/${eduPlanInfo.empno}.jpg`} alt={`${eduPlanInfo.usrnm} 프로필 사진`} style={{ width: '100%' }} />
                          </td>
                          <th>A R E A</th>
                          <td>{eduPlanInfo.area}</td>
                          <th>근무조</th>
                          <td>{eduPlanInfo.workjo}</td>
                        </tr>
                        <tr className="bd">
                          <th>근 무 BAY</th>
                          <td>{eduPlanInfo.bay}</td>
                          <th>사 번</th>
                          <td>{eduPlanInfo.empno}</td>
                        </tr>
                        <tr className="bd">
                          <th>성 명</th>
                          <td>{eduPlanInfo.usrnm}</td>
                          <th>멘 토 사 원</th>
                          <td>{`${eduPlanInfo.mentonm}(${eduPlanInfo.mentoid})`}</td>
                        </tr>
                        <tr className="bd">
                          <th>최 종 확 인</th>
                          <td colSpan={3}>{`${eduPlanInfo.step3_result === 'O' ? '최종합격' : ''}`}</td>
                        </tr>
                      </tbody>
                    </table>
                  </StyledTable>
                  <br />
                  <div className="sub_form_tit cr">교 육 정 보</div>
                  <StyledTable className="ta_wrap">
                    <table className="tb02">
                      <colgroup>
                        <col width="20%" />
                        <col width="30%" />
                        <col width="20%" />
                        <col width="30%" />
                      </colgroup>
                      <tbody>
                        <tr className="bd">
                          <th>교육단계</th>
                          <th>교육시간</th>
                        </tr>
                        <tr className="bd">
                          <th>휴직 기간이 3개월~1년 미만</th>
                          <td>16시간 교육</td>
                        </tr>
                        <tr className="bd">
                          <th>휴직 기간이 1년 이상~</th>
                          <td>40시간 교육</td>
                        </tr>
                        <tr className="bd">
                          <th>TOTAL 교육기간</th>
                          <td colSpan={4}>{this.eduScheduleRenderer(3)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </StyledTable>
                  <br />
                  <div className="sub_form_tit cr">교육 일정 및 일일레포트</div>
                  <StyledTable className="ta_wrap">
                    <table className="tb02">
                      {/* <colgroup> */}
                      {/*  <col width="10%" /> */}
                      {/*  <col width="10%" /> */}
                      {/*  <col width="25%" /> */}
                      {/*  <col width="20%" /> */}
                      {/*  <col width="7.5%" /> */}
                      {/*  <col width="7.5%" /> */}
                      {/*  <col width="10%" /> */}
                      {/*  <col width="10%" /> */}
                      {/* </colgroup> */}
                      <colgroup>
                        <col width="10%" />
                        <col width="26%" />
                        <col width="15%" />
                        <col width="17.5%" />
                        <col width="7.5%" />
                        <col width="12%" />
                        <col width="12%" />
                      </colgroup>
                      <tbody>
                        <tr className="bd">
                          <th colSpan={3}>교육 일정 및 일일레포트</th>
                          <th colSpan={2}>평가</th>
                          <th colSpan={2}>멘토 및 반장 의견</th>
                        </tr>
                        <tr className="bd">
                          <th>교육일자</th>
                          <th>교육내용</th>
                          <th>멘토확인</th>
                          <th>수행</th>
                          <th>합격</th>
                          <th>멘토의견</th>
                          <th>반장의견</th>
                        </tr>
                        {this.reportTableRowRenderer(3, eduPlanInfo.step_level, !!eduPlanInfo.step3_edusdt)}
                      </tbody>
                    </table>
                  </StyledTable>
                </StyledCommonForm>
              </Spin>
            </div>
          </StyledContent>
        </div>
        <EvaluationFormModal ref={this.evaluationFormModal} callbackHandler={this.initData} site={site} readOnly={['user', 'readonly'].includes(reportAuth)} />
        <EvaluationFormCheckModal ref={this.evaluationFormCheckModal} callbackHandler={this.initData} site={site} />
        <EduReportModal ref={this.eduReportModal} callbackHandler={this.initData} eduPlanInfo={eduPlanInfo} />
        <MentorOpinionModal ref={this.mentorOpinionModal} callbackHandler={this.initData} site={site} />
        <ChiefOpinionModal ref={this.chiefOpinionModal} callbackHandler={this.initData} />
      </Modal>
    );
  }
}

EduManageJobReturnModal.propTypes = {
  callbackHandler: PropTypes.func,
};

EduManageJobReturnModal.defaultProps = {
  callbackHandler: () => false,
};

export default EduManageJobReturnModal;
