import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import { Icon, Spin } from 'antd';
import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import { jsonToQueryString } from 'utils/helpers';
import moment from 'moment';
import service from '../service';
import StyledContent from './StyledContent';
import StyledTable from '../../StyledTable';

import EvaluationFormModal from './EvaluationFormModal';
import EduReportModal from './EduReportModal';
import MentorConfirmModal from './MentorConfirmModal';
import MentorOpinionModal from './MentorOpinion';
import ChiefOpinionModal from './ChiefOpinion';

class ChiefEduManageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: true,
      eduPlanInfo: {},
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleCommonModal = this.handleCommonModal.bind(this);
    this.eduScheduleRenderer = this.eduScheduleRenderer.bind(this);

    this.evaluationFormModal = React.createRef();
    this.eduReportModal = React.createRef();
    this.mentorConfirmModal = React.createRef();
    this.mentorOpinionModal = React.createRef();
    this.chiefOpinionModal = React.createRef();
  }

  handleOpenModal(planseq) {
    console.debug('@@@ Hello');
    this.setState({ isOpen: true, planseq }, () => {
      this.initData();
    });
  }

  initData() {
    const { planseq } = this.state;
    this.fetchData(planseq).then(({ eduPlanInfo }) => {
      if (eduPlanInfo) {
        this.setState({ eduPlanInfo, isLoading: false });
      } else {
        alert('조회가능한 정보가 없습니다.');
        this.handleCloseModal();
      }
    });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  handleCommonModal(type) {
    if (this[type]) {
      this[type].current.handleOpenModal();
    }
  }

  async fetchData(planSeq) {
    const requestQuery = {
      type: 'getEduPlanByPlanSeq',
      planSeq,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manage.get(queryString);
    if (response && !error) {
      const { eduPlanInfo } = response;
      return { eduPlanInfo };
    }
    return { eduPlanInfo: {} };
  }

  eduScheduleRenderer(stepLevel) {
    const { eduPlanInfo } = this.state;
    const currentStepLevel = eduPlanInfo.step_level;
    switch (stepLevel) {
      case 1:
        if (currentStepLevel > stepLevel) {
          return `${moment(eduPlanInfo.step1_edusdt, 'YYYYMMDD').format('YYYY.MM.DD')} ~ ${moment(eduPlanInfo.step1_eduedt, 'YYYYMMDD').format('YYYY.MM.DD')}`;
        }
        if (currentStepLevel === stepLevel) {
          return `${moment(eduPlanInfo.step1_edusdt, 'YYYYMMDD').format('YYYY.MM.DD')} ~ `;
        }
        return '-';

      case 2:
        if (currentStepLevel > stepLevel) {
          return `${moment(eduPlanInfo.step2_edusdt, 'YYYYMMDD').format('YYYY.MM.DD')} ~ ${moment(eduPlanInfo.step2_eduedt, 'YYYYMMDD').format('YYYY.MM.DD')}`;
        }
        if (currentStepLevel === stepLevel) {
          return `${moment(eduPlanInfo.step2_edusdt, 'YYYYMMDD').format('YYYY.MM.DD')} ~ `;
        }
        return '-';

      case 3:
        if (currentStepLevel > stepLevel) {
          return `${moment(eduPlanInfo.step3_edusdt, 'YYYYMMDD').format('YYYY.MM.DD')} ~ ${moment(eduPlanInfo.step3_eduedt, 'YYYYMMDD').format('YYYY.MM.DD')}`;
        }
        if (currentStepLevel === stepLevel) {
          return `${moment(eduPlanInfo.step3_edusdt, 'YYYYMMDD').format('YYYY.MM.DD')} ~ `;
        }
        return '-';

      default:
        return '-';
    }
  }

  render() {
    const { isOpen, isLoading, eduPlanInfo } = this.state;
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
              신입/전배 사원 교육
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
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
                          <td colSpan={3} />
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
                          <th>교육내용</th>
                          <th>교육기간</th>
                          <th>교육일정</th>
                        </tr>
                        <tr className="bd">
                          <th>1단계 (기본 교육)</th>
                          <td>HOUSE KEEPING, 청정실 물품 반입 절차, 반도체 용어설명, 환경/안전 교육, 비상대피 훈련 교육</td>
                          <td>1 ~ 2주 (6~12일)</td>
                          <td>{this.eduScheduleRenderer(1)}</td>
                        </tr>
                        <tr className="bd">
                          <th>2단계 (품질 교육)</th>
                          <td>HANDLING 방법 및 실습, CARRIER & BOX 취급 방법, PARTICLE 관리의 중요성, 실수사례교육</td>
                          <td>1 ~ 2주 (6~12일)</td>
                          <td>{this.eduScheduleRenderer(2)}</td>
                        </tr>
                        <tr className="bd">
                          <th>3단계 (직무 교육)</th>
                          <td>JOB의 공정개요 이론, 작업 진행 방법 교육(SPEC), MAIN장치 사용방법 교육, 전산 PDA교육, 기타 이상연락처리 및 JOB특성교육</td>
                          <td>3 ~ 6주 (18~36일)</td>
                          <td>{this.eduScheduleRenderer(3)}</td>
                        </tr>
                        <tr className="bd">
                          <th>TOTAL 교육기간</th>
                          <td colSpan={4}>5 ~ 10주 (30일 ~ 60일)</td>
                        </tr>
                      </tbody>
                    </table>
                  </StyledTable>
                  <br />
                  <div className="sub_form_tit cr">단계별 교육 일정 및 일일레포트</div>
                  <StyledTable className="ta_wrap">
                    <table className="tb02">
                      <tbody>
                        <tr className="bd">
                          <th rowSpan={2}>단계구분</th>
                          <th colSpan={4}>단계별 교육 일정 및 일일레포트</th>
                          <th colSpan={2}>평가</th>
                          <th colSpan={2}>멘토 및 반장 의견</th>
                        </tr>
                        <tr className="bd">
                          <th>교육일자</th>
                          <th>근무조</th>
                          <th>교육내용</th>
                          <th>멘토확인</th>
                          <th>수행</th>
                          <th>확인</th>
                          <th>멘토의견</th>
                          <th>반장의견</th>
                        </tr>
                        <tr className="bd">
                          <td rowSpan={3}>1단계</td>
                          <td>YYYY.MM.DD</td>
                          <td>1조</td>
                          <td>
                            <StyledButton type="button" className="btn-light btn-sm" onClick={() => this.handleCommonModal('eduReportModal')}>
                              <i className="fa fa-pen" /> 레포트
                            </StyledButton>
                          </td>
                          <td>
                            <StyledButton type="button" className="btn-light btn-sm" onClick={() => this.handleCommonModal('mentorConfirmModal')}>
                              <i className="fa fa-signature" /> 멘토확인
                            </StyledButton>
                          </td>
                          <td>
                            <button type="button" onClick={() => this.handleCommonModal('evaluationFormModal')}>
                              <i className="fa fa-pen-square" />
                            </button>
                          </td>
                          <td>
                            <button type="button" onClick={() => this.handleCommonModal('eduReportModal')}>
                              <i className="fa fa-check" />
                            </button>
                          </td>
                          <td rowSpan={3}>
                            <StyledButton type="button" className="btn-light btn-sm" onClick={() => this.handleCommonModal('mentorOpinionModal')}>
                              <i className="fa fa-pen" /> 멘토의견
                            </StyledButton>
                          </td>
                          <td rowSpan={3}>
                            <StyledButton type="button" className="btn-light btn-sm" onClick={() => this.handleCommonModal('chiefOpinionModal')}>
                              <i className="fa fa-pen" /> 반장의견
                            </StyledButton>
                          </td>
                        </tr>
                        <tr className="bd">
                          <td>YYYY.MM.DD</td>
                          <td>1조</td>
                          <td>
                            <StyledButton type="button" className="btn-light btn-sm">
                              <i className="fa fa-pen" /> 레포트
                            </StyledButton>
                          </td>
                          <td>
                            <StyledButton type="button" className="btn-light btn-sm">
                              <i className="fa fa-signature" /> 멘토확인
                            </StyledButton>
                          </td>
                          <td>
                            <button type="button">
                              <i className="fa fa-pen-square" />
                            </button>
                          </td>
                          <td>
                            <button type="button">
                              <i className="fa fa-check" />
                            </button>
                          </td>
                        </tr>
                        <tr className="bd">
                          <td>YYYY.MM.DD</td>
                          <td>1조</td>
                          <td>
                            <StyledButton type="button" className="btn-light btn-sm">
                              <i className="fa fa-pen" /> 레포트
                            </StyledButton>
                          </td>
                          <td>
                            <StyledButton type="button" className="btn-light btn-sm">
                              <i className="fa fa-signature" /> 멘토확인
                            </StyledButton>
                          </td>
                          <td>
                            <button type="button">
                              <i className="fa fa-pen-square" />
                            </button>
                          </td>
                          <td>
                            <button type="button">
                              <i className="fa fa-check" />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </StyledTable>
                </StyledCommonForm>
              </Spin>
            </div>
          </StyledContent>
        </div>
        <EvaluationFormModal ref={this.evaluationFormModal} callbackHandler={this.initData} site={this.props.site} />
        <EduReportModal ref={this.eduReportModal} />
        <MentorConfirmModal ref={this.mentorConfirmModal} />
        <MentorOpinionModal ref={this.mentorOpinionModal} />
        <ChiefOpinionModal ref={this.chiefOpinionModal} />
      </Modal>
    );
  }
}

ChiefEduManageModal.propTypes = {
  callbackHandler: PropTypes.func,
};

ChiefEduManageModal.defaultProps = {
  callbackHandler: () => false,
};

export default ChiefEduManageModal;
