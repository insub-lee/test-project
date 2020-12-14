/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import React from 'react';
// import PropTypes from 'prop-types';
import Modal from 'rc-dialog';
import moment from 'moment';
import { Icon, Spin } from 'antd';

import request from 'utils/request';

import StyledModalContent from '../../../../components/CommonStyledElement/StyledModalContent';
import StyledCommonForm from '../../../../components/CommonStyledElement/StyledCommonForm';

import ALinkButton from '../../../../components/ALinkButton';

// import SignPrcListInfo from '../../../../components/SignPrcListInfo';
import SignProcessList from '../../SignProcessList';
import StyledProjectInfoModal from './StyledProjectInfoModal';
import SignItemAddon from './SignItemAddon';

const jaspoerUrl =
  'http://10.100.22.102:4488/jasperserver-pro/rest_v2/reports/organizations/organization_1/reports/projectViewRepo.pdf?j_username=superuser&j_password=superuser&prj_id=';

const projectLevel = [
  { key: 1, txt: '본부' },
  { key: 2, txt: '담당' },
  { key: 3, txt: '팀' },
  { key: 4, txt: 'Part' },
];
class ProjectInfoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      EQUIPMENTS: [],
      isLoading: false,
      prjId: '',
      info: {},
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.combineTexterRenderer = this.combineTexterRenderer.bind(this);
    this.teamTexterRenderer = this.teamTexterRenderer.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.ProjectLevelSelector = this.ProjectLevelSelector.bind(this);
  }

  // componentDidMount() {
  //   console.debug('on dead');
  // }

  handleOpen(info) {
    this.setState({ isOpen: true, info, prjId: info?.project_id, EQUIPMENTS: JSON.parse(info?.equipment_model, '[]') }, () => this.fetchData(info));
  }

  handleCloseModal() {
    this.setState({
      isOpen: false,
      EQUIPMENTS: [],
      info: {},
    });
  }

  combineTexterRenderer(item) {
    return (
      <>
        {`${item.sign} ${item.usrid} ${item.usrnm ? item.usrnm : '퇴직자'}`}
        {item.signlinememo ? <span style={{ display: 'block', width: '100%', border: 0 }}>{`의견: ${item.signlinememo}`}</span> : ''}
      </>
    );
  }

  teamTexterRenderer(index, item) {
    return (
      <>
        <span style={{ border: 0, marginRight: 20 }}>{`${item.usrid} ${item.usrnm ? item.usrnm : '퇴직자'}`}</span>
        {/*    {(index + 1) % 4 === 0 && <br />} */}
      </>
    );
  }

  ProjectLevelSelector = ({ project_level }) =>
    projectLevel.map(({ key, txt }) => {
      return <span>{key === project_level ? txt : ''}</span>;
    });

  // todo
  async fetchData(info) {
    // this.setState({ isLoading: true });
    // const url = `/apigate/v1/portal/sign/task?sysid=TPMS&mnuid=PROJECT&prj_id=${info}`;
    // const { response, error } = await request({
    //   url,
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //   },
    //   method: 'GET',
    // });
    // if (response && !error) {
    //   const { list } = response;
    //   const { info?, signitemPrc2, info?, teamsharing, member, signPrclistInfo, EQUIPMENTS } = list;
    //   this.setState({
    //     info?,
    //     signitemPrc2,
    //     info?,
    //     teamsharing: teamsharing || [],
    //     member: member || [],
    //     signPrclistInfo: signPrclistInfo || [],
    //     EQUIPMENTS: EQUIPMENTS || [],
    //     isLoading: false,
    //   });
    // } else {
    //   console.debug('fetchData err');
    // }
  }

  render() {
    const { isOpen, isLoading, EQUIPMENTS, prjId, info } = this.state;
    const option = {
      values: EQUIPMENTS || [],
    };

    const url = `${jaspoerUrl}${prjId}`;

    let key_performance_indicators = '핵심성과지표';
    let yval = '현재 상태';
    let baselineval = '목표';
    let targetval = '적용 대상';
    let note = '비고';

    if (info?.project_type === 'Wafer Loss') {
      key_performance_indicators = 'FAB';
      yval = 'Area';
      baselineval = '피해장수(수량)';
      targetval = '요인(부서)';
      note = '발생일';
    }

    const key_performance_indicatorsLable = key_performance_indicators;
    const yvalLable = yval;
    const baselinevalLable = baselineval;
    const targetvalLable = targetval;
    const noteLable = note;

    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="fade"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{ width: 1260 }}
        bodyStyle={{ padding: 0 }}
        closable={false}
        destroyOnClose
      >
        <StyledModalContent>
          <div className="pop_tit">
            상세 내용보기
            <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
          </div>
          <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
            <div className="pop_con">
              <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                <ALinkButton href={url} color="gray" download>
                  출력
                </ALinkButton>
              </div>
              <SignProcessList info={info} noPadding />
              <br />
              <StyledCommonForm className="middle_wrap">
                <StyledProjectInfoModal>
                  <ul className="sub_form small2">
                    <li className="">
                      <label htmlFor="project_id" className="title">
                        Project ID
                      </label>
                      <input type="text" className="input" name="project_id" value={info?.project_id} readOnly />
                    </li>
                    <li className="flCustom width50">
                      <label htmlFor="title" className="title">
                        Project 명
                      </label>
                      <input type="text" className="input" name="title" value={info?.title} readOnly />
                    </li>
                    <li className="frCustom width50">
                      <label htmlFor="project_leader" className="title">
                        Project Leader
                      </label>
                      <input type="text" className="input" name="project_leader" value={info?.project_leader} readOnly />
                    </li>
                    <li className="equipmentCustom" style={{ minHeight: '48px' }}>
                      <label htmlFor="equipment" className="title">
                        EQUIPMENTS
                      </label>
                      <ul>
                        {option.values.map((value, idx) => (
                          <li key={`${JSON.stringify(value)} ${idx}`} style={{ display: 'inline-block', position: 'relative', width: '245px' }}>
                            <span>{`${value}`}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="flCustom width50">
                      <label htmlFor="project_type" className="title">
                        Project Type
                      </label>
                      <input type="text" className="input" name="project_type" value={info?.project_type} readOnly />
                    </li>
                    <li className="frCustom width50">
                      <label htmlFor="project_level" className="title">
                        {this.ProjectLevelSelector({ project_level: info?.project_level })}
                      </label>
                      <input type="text" className="input" name="project_level" value={info?.project_level} readOnly />
                    </li>
                    <li className="flCustom width50">
                      <label htmlFor="performance_type" className="title">
                        Performance Type
                      </label>
                      <input type="text" className="input" name="performance_type" value={info?.performance_type} readOnly />
                    </li>
                    <li className="frCustom width50">
                      <label htmlFor="key_performance_indicators" className="title">
                        {key_performance_indicatorsLable}
                      </label>
                      <input
                        type="text"
                        className="input"
                        name="key_performance_indicators"
                        value={info?.key_performance_indicators}
                        readOnly
                        maxLength={1000}
                      />
                    </li>
                    <li className="flCustom width50">
                      <label htmlFor="current_status" className="title">
                        {yvalLable}
                      </label>
                      <input type="text" className="input" name="current_status" value={info?.current_status} readOnly maxLength={1000} />
                    </li>
                    <li className="frCustom width50">
                      <label htmlFor="goal" className="title">
                        {baselinevalLable}
                      </label>
                      <input type="text" className="input" name="goal" value={info?.goal} readOnly maxLength={1000} />
                    </li>
                    <li className="flCustom width50">
                      <label htmlFor="apply_target" className="title">
                        {targetvalLable}
                      </label>
                      <input type="text" className="input" name="apply_target" value={info?.apply_target} readOnly maxLength={1000} />
                    </li>
                    <li className="frCustom width50">
                      <label htmlFor="note" className="title">
                        {noteLable}
                      </label>
                      <input type="text" className="input" name="note" value={info?.note} readOnly maxLength={1000} />
                    </li>
                    <li className="flCustom width50">
                      <label htmlFor="project_reason" className="title">
                        프로젝트 시작배경
                      </label>
                      <textarea name="project_reason" value={info?.project_reason} readOnly maxLength={1000} />
                    </li>
                    <li className="frCustom width50">
                      <label htmlFor="problem_improvement" className="title">
                        문제점/개선
                      </label>
                      <textarea name="problem_improvement" value={info?.problem_improvement} readOnly maxLength={1000} />
                    </li>
                    <li className="flCustom width50 mb0">
                      <label htmlFor="solution" className="title">
                        해결방법
                      </label>
                      <textarea name="solution" value={info?.solution} readOnly maxLength={1000} />
                    </li>
                    <li className="frCustom width50">
                      <label htmlFor="scope" className="title">
                        범위
                      </label>
                      <textarea name="scope" value={info?.scope} readOnly maxLength={1000} />
                    </li>
                  </ul>
                  <div className="sub_form_wrapper">
                    <ul className="sub_form small2 sub_form sub_form_left">
                      <li>
                        <label htmlFor="situation_analyze_date" className="title">
                          현상파악 일정
                        </label>
                        <input
                          type="text"
                          className="input"
                          name="situation_analyze_date"
                          value={`${
                            info?.situation_analyze_start_date && info?.situation_analyze_start_date !== ''
                              ? moment(info?.situation_analyze_start_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD')
                              : null
                          } ~ ${
                            info?.situation_analyze_end_date && info?.situation_analyze_end_date !== ''
                              ? moment(info?.situation_analyze_end_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD')
                              : null
                          }`}
                          readOnly
                        />
                      </li>
                      <li>
                        <label htmlFor="cause_analyze_due_date" className="title">
                          원인분석 일정
                        </label>
                        <input
                          type="text"
                          className="input"
                          name="cause_analyze_due_date"
                          value={`${
                            info?.cause_analyze_due_date && info?.cause_analyze_due_date !== ''
                              ? moment(info?.cause_analyze_due_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD')
                              : null
                          }`}
                          readOnly
                        />
                      </li>
                      <li>
                        <label htmlFor="measure_due_date" className="title">
                          대책수립 일정
                        </label>
                        <input
                          type="text"
                          className="input"
                          name="measure_due_date"
                          value={`${
                            info?.measure_due_date && info?.measure_due_date !== ''
                              ? moment(info?.measure_due_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD')
                              : null
                          }`}
                          readOnly
                        />
                      </li>
                      <li>
                        <label htmlFor="improvement_due_date" className="title">
                          개선 일정
                        </label>
                        <input
                          type="text"
                          className="input"
                          name="improvement_due_date"
                          value={`${
                            info?.improvement_due_date && info?.improvement_due_date !== ''
                              ? moment(info?.improvement_due_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD')
                              : null
                          }`}
                          readOnly
                        />
                      </li>
                      <li>
                        <label htmlFor="completion_due_date" className="title">
                          완료/공유 일정
                        </label>
                        <input
                          type="text"
                          className="input"
                          name="completion_due_date"
                          value={`${
                            info?.completion_due_date && info?.completion_due_date !== ''
                              ? moment(info?.completion_due_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD')
                              : null
                          }`}
                          readOnly
                        />
                      </li>
                    </ul>
                    <ul className="sub_form small2 sub_form sub_form_right">
                      {/* 
                      <li className="frCustom width50">
                        <label htmlFor="improvement_point" className="title">
                          기안자
                        </label>
                        <p className="desc_p">
                          {signPrclistInfo ? signPrclistInfo.filter(item => item.rownum === 1).map(item => this.combineTexterRenderer(item)) : ''}
                        </p>
                      </li> */}
                      {/* <li>
                        <label htmlFor="improvement_point" className="title">
                          1차 결재권자
                        </label>
                        <p className="desc_p desc_p_scroll">
                          {signPrclistInfo ? signPrclistInfo.filter(item => item.rownum === 2).map(item => this.combineTexterRenderer(item)) : ''}
                          {signPrclistInfo ? signPrclistInfo.filter(item => item.rownum === 5).map(item => this.combineTexterRenderer(item)) : ''}
                        </p>
                      </li>
                      <li>
                        <label htmlFor="improvement_point" className="title">
                          최종결재권자
                        </label>
                        <p className="desc_p desc_p_scroll">
                          {signPrclistInfo ? signPrclistInfo.filter(item => item.rownum === 3).map(item => this.combineTexterRenderer(item)) : ''}
                          {signPrclistInfo ? signPrclistInfo.filter(item => item.rownum === 6).map(item => this.combineTexterRenderer(item)) : ''}
                        </p>
                      </li> */}

                      {/* todo <li className="row_50_custom">
                        <div className="col_50 col_left">
                          <label htmlFor="team_member" className="title">
                            팀원
                          </label>
                          <p className="desc_p desc_p_scroll_3">{info?.team_member ? team_member.map((item, index) => this.teamTexterRenderer(index, item)) : ''}</p>
                        </div>
                        <div className="col_50 col_right">
                          <label htmlFor="sharer" className="title">
                            공유
                          </label>
                          <p className="desc_p desc_p_scroll_3">{sharer ? sharer.map((item, index) => this.teamTexterRenderer(index, item)) : ''}</p>
                        </div>
                      </li> */}
                    </ul>
                  </div>
                  {/* {signitemPrc2 && <SignItemAddon signProcess={signitemPrc2} />} */}
                  <ul className="sub_form small2">
                    <li className="flCustom width50">
                      <label htmlFor="improvement_point" className="title">
                        개선사항
                      </label>
                      <textarea name="control_date" value={info?.improvement_point} readOnly />
                    </li>
                    <li className="frCustom width50">
                      <label htmlFor="success_point" className="title">
                        성공요인
                      </label>
                      <textarea name="control_date" value={info?.success_point} readOnly />
                    </li>
                    <li className="mergeSubWrap">
                      <span className="mergeSpan">파일첨부</span>
                      {info?.real_complete_file_name ? (
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a href={info?.real_complete_file_path} style={{ padding: 10, background: '#e7e7e7', color: '#111b27' }} download>
                          <i className="fas fa-paperclip" /> {info?.real_complete_file_name}
                        </a>
                      ) : (
                        <input type="text" className="input mergeInput" name="real_complete_file_name" value="" readOnly />
                      )}
                    </li>
                    <li>
                      <span className="mergeSpan">완료일자</span>
                      <input
                        type="text"
                        className="input mergeInput"
                        name="step_five_complete_date"
                        value={
                          info?.step_five_complete_date && info?.step_five_complete_date !== ''
                            ? moment(info?.step_five_complete_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD')
                            : null
                        }
                        readOnly
                      />
                    </li>
                  </ul>
                  {/*                   <ul className="sub_form small2">
                  </ul> */}
                </StyledProjectInfoModal>
              </StyledCommonForm>
            </div>
          </Spin>
        </StyledModalContent>
      </Modal>
    );
  }
}

export default ProjectInfoModal;
