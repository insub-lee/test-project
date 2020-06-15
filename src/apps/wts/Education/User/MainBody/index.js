import React from 'react';
import moment from 'moment';

import { jsonToQueryString } from 'utils/helpers';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import Wrapper from './Wrapper';
import service from '../../service';
import UserEduManageModal from '../../Modals/UserEduManageModal';
import CleanEduViewer from '../../Modals/CleanEduViewer';
import CommonReportModal from '../../Modals/CommonReportModal';
import EduManageModal from '../../Modals/EduManageModal';
import JobProcEduViewer from '../../Modals/JobProcEduViewer';
import StyledTable from '../../../StyledTable';

const eduButtonStyle = { padding: 5, border: '1px solid black', borderRadius: 5, width: '80%', fontSize: '12px' };

class MainBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        empno: '',
        usrnm: '',
        workjo: '',
        position: '',
        bay: '',
      },
      education: {},
      eduPlanInfo: null,
      eduMentoList: [],
      currentYear: new Date().getFullYear(),
    };

    this.initData = this.initData.bind(this);
    this.fetchInfo = this.fetchInfo.bind(this);
    this.fetchEducation = this.fetchEducation.bind(this);
    this.renderSelectableYears = this.renderSelectableYears.bind(this);
    this.selectorStatus = this.selectorStatus.bind(this);
    this.handleChangeCurrentYear = this.handleChangeCurrentYear.bind(this);
    this.handleEduManageModal = this.handleEduManageModal.bind(this);
    this.handleMentorEduManageModal = this.handleMentorEduManageModal.bind(this);
    this.handleCleanEduView = this.handleCleanEduView.bind(this);
    this.handleCommonModal = this.handleCommonModal.bind(this);
    this.eduStatusButtonRenderer = this.eduStatusButtonRenderer.bind(this);

    this.userEduManageModal = React.createRef();
    this.eduManageModal = React.createRef();
    this.cleanEduViewerRef = React.createRef();
    this.commonReportModal = React.createRef();
    this.jobProcEduViewerRef = React.createRef();
  }

  componentDidMount() {
    this.initData();
  }

  handleCommonModal(type) {
    const { empno } = this.state;
    this.commonReportModal.current.handleOpenModal(empno, type);
  }

  initData() {
    const { empno } = this.props;
    const { currentYear } = this.state;
    this.fetchInfo(empno, currentYear).then(({ info, education, isError, eduPlanInfo, eduMentoList }) => {
      if (isError) {
        this.setState({
          info: {
            empno: '',
            usrnm: '',
            workjo: '',
            position: '',
            bay: '',
          },
          education: {},
          eduPlanInfo,
          eduMentoList,
        });
      } else {
        this.setState({ info, education, eduPlanInfo, eduMentoList });
      }
    });
  }

  // Todo - handle by code api???
  selectorStatus(key) {
    switch (key) {
      case '01':
        return '사용자교육미수료';
      case '10':
        return '교육있음';
      case '11':
        return '사용자교육수료';
      case '00':
      default:
        return '교육없음';
    }
  }

  handleEduManageModal(empno) {
    this.userEduManageModal.current.handleOpenModal(empno);
  }

  handleMentorEduManageModal(planseq, reportAuth) {
    this.eduManageModal.current.handleOpenModal(planseq, reportAuth);
  }

  handleCleanEduView(collseq, empno) {
    this.cleanEduViewerRef.current.handleOpenModal(collseq, empno);
  }

  handleJobProcEduView(collseq, empno) {
    console.debug('@@@ TEst');
    this.jobProcEduViewerRef.current.handleOpenModal(collseq, empno);
  }

  async fetchInfo(empno, date) {
    const requestQuery = {
      type: 'eduHisInfo',
      empNo: empno,
      mentoid: empno,
      searchDt: date,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.user.get(queryString);
    if (response && !error) {
      // eduHistInfo: 사용자 정보, eduBasicHisList: 사용자 직책교육 리스트, eduMentoList: 멘토하고 있는 리스트, eduPlanInfo: 신입 전배 교육 정보
      const { eduHisInfo, eduBasicHisList, eduMentoList, eduPlanInfo } = response;
      const education = {};
      eduBasicHisList.forEach(edu => {
        if (!education[edu.study]) {
          education[edu.study] = [edu];
        } else {
          education[edu.study].push(edu);
        }
      });
      return {
        info: eduHisInfo,
        education,
        eduMentoList: eduMentoList || [],
        eduPlanInfo,
        isError: false,
      };
    }
    return {
      info: null,
      education: {},
      eduMentoList: [],
      eduPlanInfo: null,
      isError: true,
    };
  }

  async fetchEducation(date) {
    const requestQuery = {
      type: 'info',
      searchDt: date,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.user.get(queryString);
    if (response && !error) {
      const { education } = response;
      return {
        education,
        isError: false,
      };
    }
    return {
      education: null,
      isError: true,
    };
  }

  handleChangeCurrentYear(e) {
    const { value } = e.target;
    this.setState({ currentYear: value });
  }

  renderSelectableYears() {
    const options = [];
    let maxYear = new Date().getFullYear();
    while (maxYear >= 2019) {
      options.push(<option value={maxYear} key={maxYear}>{`${maxYear}년`}</option>);
      maxYear -= 1;
    }
    return options;
  }

  eduStatusButtonRenderer(type) {
    const { education } = this.state;
    if (!education[type] || education[type].length === 0) {
      return <div style={{ textAlign: 'center' }}>-</div>;
    }
    return (
      <>
        {education[type].map(history =>
          history.edu_result === 'O' ? (
            <button type="button" className="cateWrap" style={{ cursor: 'default' }} disabled>
              <span className={`cateIcon ${history.group_study === 'O' ? 'cate03' : 'cate01'}`} />
              <span className="cateTxt">{`${history.times}차 (${moment(history.eduhisdt, 'YYYYMMDD').format('MM.DD')})`}</span>
            </button>
          ) : (
            <button
              type="button"
              className="cateWrap"
              style={{ cursor: type === 'job_clean' || type === 'job_proc' ? 'pointer' : 'default' }}
              disabled={type !== 'job_clean' && type !== 'job_proc'}
              onClick={() => {
                if (type === 'job_clean') this.handleCleanEduView(history.coll_seq, history.empno);
                if (type === 'job_proc') this.handleJobProcEduView(history.coll_seq, history.empno);
              }}
            >
              <span className="cateIcon cate02" />
              <span className="cateTxt">{`${history.times}차 (${moment(history.collecsdt, 'YYYYMMDD').format('MM.DD')} - ${moment(
                history.collecedt,
                'YYYYMMDD',
              ).format('MM.DD')}까지)`}</span>
            </button>
          ),
        )}
      </>
    );
  }

  render() {
    const { info, education, currentYear, empno, eduPlanInfo, eduMentoList } = this.state;
    return (
      <Wrapper>
        {info ? (
          <>
            <div className="title">
              <span>기본 정보</span>
            </div>
            <StyledTable className="tb_wrap">
              <div className="btn_wrap" style={{ textAlign: 'right' }}>
                <StyledButton type="button" className="btn-sm btn-primary" onClick={() => this.handleEduManageModal(info.empno)}>
                  신입/전배 사원 교육
                </StyledButton>
              </div>
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
                    <th>사번</th>
                    <th>이름</th>
                    <th>근무조</th>
                    <th>AREA</th>
                    <th>BAY</th>
                  </tr>
                  <tr className="bd">
                    <td>{info.empno}</td>
                    <td>{info.usrnm}</td>
                    <td>{info.workjo}</td>
                    <td>{info.area}</td>
                    <td>{info.bay}</td>
                  </tr>
                </tbody>
              </table>
            </StyledTable>
            <hr
              style={{
                border: '1px solid #eaecee',
                marginTop: 40,
                marginBottom: 40,
              }}
            />
            <div className="title">
              <span>교육 이력</span>
            </div>
            <div className="search_div" style={{ textAlign: 'center' }}>
              <select name="searchDate" defaultValue={currentYear}>
                {this.renderSelectableYears()}
              </select>
            </div>
            <ul className="cateList">
              <li>
                <span className="cateIcon cate01" />
                <span className="cateTxt">수료</span>
              </li>
              <li>
                <span className="cateIcon cate02" />
                <span className="cateTxt">미수료</span>
              </li>
              <li>
                <span className="cateIcon cate03" />
                <span className="cateTxt">집체교육수료</span>
              </li>
            </ul>
            <StyledTable className="tb_wrap">
              <table className="tb02 tbCateTable">
                <colgroup>
                  <col width={`${100 / 7}%`} />
                  <col width={`${100 / 7}%`} />
                  <col width={`${100 / 7}%`} />
                  <col width={`${100 / 7}%`} />
                  <col width={`${100 / 7}%`} />
                  <col width={`${100 / 7}%`} />
                  <col width={`${100 / 7}%`} />
                </colgroup>
                <tbody>
                  <tr className="bd">
                    <th>직무능력평가</th>
                    <th>직무능력평가(MASK)</th>
                    <th>직무능력평가(계측기)</th>
                    <th>Handling 평가</th>
                    <th>공정 교육</th>
                    <th>청정도 교육</th>
                    <th>복직자 교육</th>
                  </tr>
                  <tr className="bd">
                    <td style={{ verticalAlign: 'top' }}>{this.eduStatusButtonRenderer('job')}</td>
                    <td style={{ verticalAlign: 'top' }}>{this.eduStatusButtonRenderer('job_mask')}</td>
                    <td style={{ verticalAlign: 'top' }}>{this.eduStatusButtonRenderer('job_meter')}</td>
                    <td style={{ verticalAlign: 'top' }}>{this.eduStatusButtonRenderer('job_handling')}</td>
                    <td style={{ verticalAlign: 'top' }}>{this.eduStatusButtonRenderer('job_proc')}</td>
                    <td style={{ verticalAlign: 'top' }}>{this.eduStatusButtonRenderer('job_clean')}</td>
                    <td style={{ verticalAlign: 'top' }}>{this.eduStatusButtonRenderer('job_return')}</td>
                  </tr>
                </tbody>
              </table>
            </StyledTable>
            {eduMentoList && eduMentoList.length > 0 && (
              <>
                <hr
                  style={{
                    border: '1px solid #eaecee',
                    marginTop: 40,
                    marginBottom: 40,
                  }}
                />
                <div className="title">
                  <span>신입/전배 사원 교육</span>
                </div>
                <StyledTable className="tb_wrap">
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
                        <th>등록번호</th>
                        <th>사번</th>
                        <th>성명</th>
                        <th>직책</th>
                        <th>성별</th>
                      </tr>
                      {eduMentoList
                        .filter(edu => edu.step3_result !== 'O')
                        .map(edu => (
                          <tr className="bd" key={edu.plan_seq}>
                            <td>{edu.plan_seq}</td>
                            <td>{edu.empno}</td>
                            <td>
                              <button type="button" onClick={() => this.handleMentorEduManageModal(edu.plan_seq, 'mentor')}>
                                {edu.usrnm}
                              </button>
                            </td>
                            <td>{edu.position}</td>
                            <td>{edu.sex}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </StyledTable>
              </>
            )}
            <EduManageModal ref={this.eduManageModal} site={info.site} />
            <UserEduManageModal ref={this.userEduManageModal} site={info.site} />
            <CleanEduViewer searchDt={currentYear} site={info.site} empno={info.empno} ref={this.cleanEduViewerRef} callbackHandler={this.initData} />
            <JobProcEduViewer ref={this.jobProcEduViewerRef} site={info.site} empno={info.empno} callbackHandler={this.initData} />
            <CommonReportModal ref={this.commonReportModal} />
          </>
        ) : (
          <div>현재 사용자는 사용 불가능한 페이지입니다.</div>
        )}
      </Wrapper>
    );
  }
}

export default MainBody;
