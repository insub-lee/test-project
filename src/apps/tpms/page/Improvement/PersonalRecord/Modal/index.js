import React from 'react';
// import PropTypes from 'prop-types';
import Modal from 'rc-dialog';
import moment from 'moment';
import { Icon, Spin } from 'antd';

import StyledModalContent from 'apps/tpms/components/CommonStyledElement/StyledModalContent';
import StyledCommonForm from 'apps/tpms/components/CommonStyledElement/StyledCommonForm';
// import LoadingOverlayWrapper from 'components/LoadingOverlayWrapper';

import ALinkButton from 'apps/tpms/components/ALinkButton';

import SignPrcListInfo from 'apps/tpms/components/SignPrcListInfo';
import service from '../service';
import StyledProjectInfoModal from './StyledProjectInfoModal';
import SignItemAddon from './SignItemAddon';

const jaspoerUrl =
  'http://10.100.22.102:4488/jasperserver-pro/rest_v2/reports/organizations/organization_1/reports/projectViewRepo.pdf?j_username=superuser&j_password=superuser&prj_id=';

class ProjectInfoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      signitemPrc1: {},
      signitemPrc2: {},
      signitemPrc3: {},
      teamsharing: [],
      member: [],
      signPrclistInfo: [],
      EQUIPMENTS: [],
      isLoading: false,
      prjId: '',
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.combineTexterRenderer = this.combineTexterRenderer.bind(this);
    this.teamTexterRenderer = this.teamTexterRenderer.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    console.debug('on dead');
  }

  handleOpen(prjId) {
    console.debug('prjId', prjId);
    this.setState({ isOpen: true, prjId }, () => this.fetchData(prjId));
  }

  handleCloseModal() {
    this.setState({
      isOpen: false,
      signitemPrc1: {},
      signitemPrc2: {},
      signitemPrc3: {},
      teamsharing: [],
      member: [],
      signPrclistInfo: [],
      EQUIPMENTS: [],
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

  async fetchData(prjId) {
    this.setState({ isLoading: true });
    const url = `/apigate/v1/portal/sign/task?sysid=TPMS&mnuid=PROJECT&prj_id=${prjId}`;
    const { response, error } = await service.board.get(url);
    if (response && !error) {
      const { list } = response;
      const { signitemPrc1, signitemPrc2, signitemPrc3, teamsharing, member, signPrclistInfo, EQUIPMENTS } = list;
      this.setState({
        signitemPrc1,
        signitemPrc2,
        signitemPrc3,
        teamsharing: teamsharing || [],
        member: member || [],
        signPrclistInfo: signPrclistInfo || [],
        EQUIPMENTS: EQUIPMENTS || [],
        isLoading: false,
      });
    } else {
      console.debug('fetchData err');
    }
  }

  render() {
    const { isOpen, isLoading, signitemPrc1, signitemPrc2, signitemPrc3, teamsharing, member, signPrclistInfo, EQUIPMENTS, prjId } = this.state;
    const option = {
      values:
        EQUIPMENTS.map(item => {
          const itemValues = item.itemvalue.split(':');
          console.debug(itemValues);
          return {
            fab: itemValues[0],
            area: itemValues[1],
            keyno: itemValues[2],
            model: itemValues[3],
          };
        }) || [],
    };

    const url = `${jaspoerUrl}${prjId}`;

    let ctq = '핵심성과지표';
    let yval = '현재 상태';
    let baselineval = '목표';
    let targetval = '적용 대상';
    let remark = '비고';

    if (signitemPrc1.prj_type === 'Wafer Loss') {
      ctq = 'FAB';
      yval = 'Area';
      baselineval = '피해장수(수량)';
      targetval = '요인(부서)';
      remark = '발생일';
    }

    const ctqLable = ctq;
    const yvalLable = yval;
    const baselinevalLable = baselineval;
    const targetvalLable = targetval;
    const remarkLable = remark;

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
              <SignPrcListInfo list={signPrclistInfo} noPadding />
              <br />
              <StyledCommonForm className="middle_wrap">
                <StyledProjectInfoModal>
                  <ul className="sub_form small2">
                    <li className="">
                      <label htmlFor="prj_id" className="title">
                        Project ID
                      </label>
                      <input type="text" className="input" name="prj_id" value={prjId} readOnly />
                    </li>
                    <li className="flCustom width50">
                      <label htmlFor="prj_title" className="title">
                        Project 명
                      </label>
                      <input type="text" className="input" name="prj_title" value={signitemPrc1.prj_title} readOnly />
                    </li>
                    <li className="frCustom width50">
                      <label htmlFor="prj_leader_name" className="title">
                        Project Leader
                      </label>
                      <input type="text" className="input" name="prj_leader_name" value={signitemPrc1.prj_leader_name} readOnly />
                    </li>
                    <li className="equipmentCustom" style={{ minHeight: '48px' }}>
                      <label htmlFor="equipment" className="title">
                        EQUIPMENTS
                      </label>
                      <ul>
                        {option.values.map(value => (
                          <li key={value.keyno} style={{ display: 'inline-block', position: 'relative', width: '245px' }}>
                            <span>{`${value.fab}:${value.area}:${value.keyno}:${value.model}`}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="flCustom width50">
                      <label htmlFor="prj_type" className="title">
                        Project Type
                      </label>
                      <input type="text" className="input" name="prj_type" value={signitemPrc1.prj_type} readOnly />
                    </li>
                    <li className="frCustom width50">
                      <label htmlFor="prj_level" className="title">
                        Level
                      </label>
                      <input type="text" className="input" name="prj_level" value={signitemPrc1.prj_level} readOnly />
                    </li>
                    <li className="flCustom width50">
                      <label htmlFor="perform_type" className="title">
                        Performance Type
                      </label>
                      <input type="text" className="input" name="perform_type" value={signitemPrc1.perform_type} readOnly />
                    </li>
                    <li className="frCustom width50">
                      <label htmlFor="ctq" className="title">
                        {ctqLable}
                      </label>
                      <input type="text" className="input" name="ctq" value={signitemPrc1.ctq} readOnly maxLength={1000} />
                    </li>
                    <li className="flCustom width50">
                      <label htmlFor="y_val" className="title">
                        {yvalLable}
                      </label>
                      <input type="text" className="input" name="y_val" value={signitemPrc1.y_val} readOnly maxLength={1000} />
                    </li>
                    <li className="frCustom width50">
                      <label htmlFor="baseline_val" className="title">
                        {baselinevalLable}
                      </label>
                      <input type="text" className="input" name="baseline_val" value={signitemPrc1.baseline_val} readOnly maxLength={1000} />
                    </li>
                    <li className="flCustom width50">
                      <label htmlFor="target_val" className="title">
                        {targetvalLable}
                      </label>
                      <input type="text" className="input" name="target_val" value={signitemPrc1.target_val} readOnly maxLength={1000} />
                    </li>
                    <li className="frCustom width50">
                      <label htmlFor="remark" className="title">
                        {remarkLable}
                      </label>
                      <input type="text" className="input" name="remark" value={signitemPrc1.remark} readOnly maxLength={1000} />
                    </li>
                    <li className="flCustom width50">
                      <label htmlFor="prj_back_desc" className="title">
                        프로젝트 시작배경
                      </label>
                      <textarea name="prj_back_desc" value={signitemPrc1.prj_back_desc} readOnly maxLength={1000} />
                    </li>
                    <li className="frCustom width50">
                      <label htmlFor="problem_desc" className="title">
                        문제점/개선
                      </label>
                      <textarea name="problem_desc" value={signitemPrc1.problem_desc} readOnly maxLength={1000} />
                    </li>
                    <li className="flCustom width50 mb0">
                      <label htmlFor="how_to_desc" className="title">
                        해결방법
                      </label>
                      <textarea name="how_to_desc" value={signitemPrc1.how_to_desc} readOnly maxLength={1000} />
                    </li>
                    <li className="frCustom width50">
                      <label htmlFor="scope_desc" className="title">
                        범위
                      </label>
                      <textarea name="scope_desc" value={signitemPrc1.scope_desc} readOnly maxLength={1000} />
                    </li>
                  </ul>
                  <div className="sub_form_wrapper">
                    <ul className="sub_form small2 sub_form sub_form_left">
                      <li>
                        <label htmlFor="define_date" className="title">
                          현상파악 일정
                        </label>
                        <input
                          type="text"
                          className="input"
                          name="define_due_date"
                          value={`${
                            signitemPrc1.start_date && signitemPrc1.start_date !== ''
                              ? moment(signitemPrc1.start_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD')
                              : null
                          } ~ ${
                            signitemPrc1.define_due_date && signitemPrc1.define_due_date !== ''
                              ? moment(signitemPrc1.define_due_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD')
                              : null
                          }`}
                          readOnly
                        />
                      </li>
                      <li>
                        <label htmlFor="measure_due_date" className="title">
                          원인분석 일정
                        </label>
                        <input
                          type="text"
                          className="input"
                          name="measure_due_date"
                          value={`${
                            signitemPrc1.measure_due_date && signitemPrc1.measure_due_date !== ''
                              ? moment(signitemPrc1.measure_due_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD')
                              : null
                          }`}
                          readOnly
                        />
                      </li>
                      <li>
                        <label htmlFor="analyze_due_date" className="title">
                          대책수립 일정
                        </label>
                        <input
                          type="text"
                          className="input"
                          name="analyze_due_date"
                          value={`${
                            signitemPrc1.analyze_due_date && signitemPrc1.analyze_due_date !== ''
                              ? moment(signitemPrc1.analyze_due_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD')
                              : null
                          }`}
                          readOnly
                        />
                      </li>
                      <li>
                        <label htmlFor="improve_due_date" className="title">
                          개선 일정
                        </label>
                        <input
                          type="text"
                          className="input"
                          name="improve_due_date"
                          value={`${
                            signitemPrc1.improve_due_date && signitemPrc1.improve_due_date !== ''
                              ? moment(signitemPrc1.improve_due_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD')
                              : null
                          }`}
                          readOnly
                        />
                      </li>
                      <li>
                        <label htmlFor="control_due_date" className="title">
                          완료/공유 일정
                        </label>
                        <input
                          type="text"
                          className="input"
                          name="control_due_date"
                          value={`${
                            signitemPrc1.control_due_date && signitemPrc1.control_due_date !== ''
                              ? moment(signitemPrc1.control_due_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD')
                              : null
                          }`}
                          readOnly
                        />
                      </li>
                    </ul>
                    <ul className="sub_form small2 sub_form sub_form_right">
                      {/* 
                      <li className="frCustom width50">
                        <label htmlFor="improve_content" className="title">
                          기안자
                        </label>
                        <p className="desc_p">
                          {signPrclistInfo ? signPrclistInfo.filter(item => item.rownum === 1).map(item => this.combineTexterRenderer(item)) : ''}
                        </p>
                      </li> */}
                      <li>
                        <label htmlFor="improve_content" className="title">
                          1차 결재권자
                        </label>
                        <p className="desc_p desc_p_scroll">
                          {signPrclistInfo ? signPrclistInfo.filter(item => item.rownum === 2).map(item => this.combineTexterRenderer(item)) : ''}
                          {signPrclistInfo ? signPrclistInfo.filter(item => item.rownum === 5).map(item => this.combineTexterRenderer(item)) : ''}
                        </p>
                      </li>
                      <li>
                        <label htmlFor="improve_content" className="title">
                          최종결재권자
                        </label>
                        <p className="desc_p desc_p_scroll">
                          {signPrclistInfo ? signPrclistInfo.filter(item => item.rownum === 3).map(item => this.combineTexterRenderer(item)) : ''}
                          {signPrclistInfo ? signPrclistInfo.filter(item => item.rownum === 6).map(item => this.combineTexterRenderer(item)) : ''}
                        </p>
                      </li>
                      <li className="row_50_custom">
                        <div className="col_50 col_left">
                          <label htmlFor="improve_content" className="title">
                            팀원
                          </label>
                          <p className="desc_p desc_p_scroll_3">{member ? member.map((item, index) => this.teamTexterRenderer(index, item)) : ''}</p>
                        </div>
                        <div className="col_50 col_right">
                          <label htmlFor="improve_content" className="title">
                            공유
                          </label>
                          <p className="desc_p desc_p_scroll_3">{teamsharing ? teamsharing.map((item, index) => this.teamTexterRenderer(index, item)) : ''}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  {signitemPrc2 && <SignItemAddon signProcess={signitemPrc2} />}
                  {signitemPrc3 && (
                    <ul className="sub_form small2">
                      <li className="flCustom width50">
                        <label htmlFor="improve_content" className="title">
                          개선사항
                        </label>
                        <textarea name="control_date" value={signitemPrc3.improve_content} readOnly />
                      </li>
                      <li className="frCustom width50">
                        <label htmlFor="success_reason" className="title">
                          성공요인
                        </label>
                        <textarea name="control_date" value={signitemPrc3.success_reason} readOnly />
                      </li>
                      <li className="mergeSubWrap">
                        <span className="mergeSpan">파일첨부</span>
                        {signitemPrc3.attach_file ? (
                          <a href={signitemPrc3.attach_file_path} style={{ padding: 10, background: '#e7e7e7', color: '#111b27' }} download>
                            <i className="fas fa-paperclip" /> {signitemPrc3.attach_file}
                          </a>
                        ) : (
                          <input type="text" className="input mergeInput" name="control_attach_file" value={signitemPrc3.attach_file} readOnly />
                        )}
                      </li>
                      <li>
                        <span className="mergeSpan">완료일자</span>
                        <input
                          type="text"
                          className="input mergeInput"
                          name="control_approval_date"
                          value={
                            signitemPrc3.approval_date && signitemPrc3.approval_date !== ''
                              ? moment(signitemPrc3.approval_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD')
                              : null
                          }
                          readOnly
                        />
                      </li>
                    </ul>
                  )}
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
