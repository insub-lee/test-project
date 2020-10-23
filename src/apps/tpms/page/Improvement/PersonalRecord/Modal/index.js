import React from 'react';
// import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import StyledModalContent from 'apps/tpms/components/CommonStyledElement/StyledModalContent';
import StyledCommonForm from 'apps/tpms/components/CommonStyledElement/StyledCommonForm';
// import LoadingOverlayWrapper from 'components/LoadingOverlayWrapper';
import { Icon, Spin } from 'antd';
import moment from 'moment';
import service from '../service';
import StyledProjectInfoModal from './StyledProjectInfoModal';

class ProjectInfoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      signitemPrc1: {},
      signitemPrc2: {},
      signitemPrc3: {},
      teamsharing: [],
      signPrclistInfo: [],
      EQUIPMENTS: [],
      isLoading: false,
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
    this.setState({ isOpen: true }, () => this.fetchData(prjId));
  }

  handleCloseModal() {
    this.setState({
      isOpen: false,
      signitemPrc1: {},
      signitemPrc2: {},
      signitemPrc3: {},
      teamsharing: [],
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
        {(index + 1) % 4 === 0 && <br />}
      </>
    );
  }

  async fetchData(prjId) {
    this.setState({ isLoading: true });
    const url = `/apigate/v1/portal/sign/task?sysid=TPMS&mnuid=PROJECT&prj_id=${prjId}`;
    const { response, error } = await service.board.get(url);
    if (response && !error) {
      const { list } = response;
      const { signitemPrc1, signitemPrc2, signitemPrc3, teamsharing, signPrclistInfo, EQUIPMENTS } = list;
      this.setState({
        signitemPrc1,
        signitemPrc2,
        signitemPrc3,
        teamsharing: teamsharing || [],
        signPrclistInfo: signPrclistInfo || [],
        EQUIPMENTS: EQUIPMENTS || [],
        isLoading: false,
      });
    } else {
      console.debug('fetchData err');
    }
  }

  render() {
    const { isOpen, isLoading, signitemPrc1, signitemPrc2, signitemPrc3, teamsharing, signPrclistInfo, EQUIPMENTS } = this.state;
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

    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="fade"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{ width: 1000 }}
        bodyStyle={{ padding: 0 }}
        closable={false}
        destroyOnClose
      >
        <StyledModalContent>
          <div className="pop_tit">
            상세 내용보기
            <button
              type="button"
              className="icon icon_pclose"
              onClick={() => {
                // this.handleCloseModal;
              }}
            />
          </div>
          <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
            <div className="pop_con">
              <StyledCommonForm className="middle_wrap">
                <StyledProjectInfoModal>
                  <ul className="sub_form small2">
                    <li className="">
                      <label htmlFor="prj_title" className="title">
                        Project 명
                      </label>
                      <input type="text" className="input" name="prj_title" value={signitemPrc1.prj_title} readOnly />
                    </li>
                    <li className="">
                      <label htmlFor="prj_leader_name" className="title">
                        Project Leader
                      </label>
                      <input type="text" className="input" name="prj_leader_name" value={signitemPrc1.prj_leader_name} readOnly />
                    </li>
                    <li className="" style={{ minHeight: '48px', paddingTop: '13px' }}>
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
                    <li className="">
                      <label htmlFor="prj_type" className="title">
                        Project Type
                      </label>
                      <input type="text" className="input" name="prj_type" value={signitemPrc1.prj_type} readOnly />
                    </li>
                    <li className="">
                      <label htmlFor="prj_level" className="title">
                        Level
                      </label>
                      <input type="text" className="input" name="prj_level" value={signitemPrc1.prj_level} readOnly />
                    </li>
                    <li className="">
                      <label htmlFor="perform_type" className="title">
                        Performance Type
                      </label>
                      <input type="text" className="input" name="perform_type" value={signitemPrc1.perform_type} readOnly />
                    </li>
                    <li className="">
                      <label htmlFor="ctq" className="title">
                        핵심성과지표
                      </label>
                      <input type="text" className="input" name="ctq" value={signitemPrc1.ctq} readOnly />
                    </li>
                    <li className="">
                      <label htmlFor="y_val" className="title">
                        현재상태
                      </label>
                      <input type="text" className="input" name="y_val" value={signitemPrc1.y_val} readOnly />
                    </li>
                    <li className="">
                      <label htmlFor="baseline_val" className="title">
                        목표
                      </label>
                      <input type="text" className="input" name="baseline_val" value={signitemPrc1.baseline_val} readOnly />
                    </li>
                    <li className="">
                      <label htmlFor="target_val" className="title">
                        적용 대상
                      </label>
                      <input type="text" className="input" name="target_val" value={signitemPrc1.target_val} readOnly />
                    </li>
                    <li className="">
                      <label htmlFor="remark" className="title">
                        비고
                      </label>
                      <input type="text" className="input" name="remark" value={signitemPrc1.remark} readOnly />
                    </li>
                    <li className="">
                      <label htmlFor="prj_back_desc" className="title">
                        프로젝트 시작배경
                      </label>
                      <textarea name="prj_back_desc" value={signitemPrc1.prj_back_desc} readOnly />
                    </li>
                    <li className="">
                      <label htmlFor="problem_desc" className="title">
                        문제점/개선
                      </label>
                      <textarea name="problem_desc" value={signitemPrc1.problem_desc} readOnly />
                    </li>
                    <li className="">
                      <label htmlFor="how_to_desc" className="title">
                        해결방법
                      </label>
                      <textarea name="how_to_desc" value={signitemPrc1.how_to_desc} readOnly />
                    </li>
                    <li className="">
                      <label htmlFor="scope_desc" className="title">
                        범위
                      </label>
                      <textarea name="scope_desc" value={signitemPrc1.scope_desc} readOnly />
                    </li>
                    <li className="">
                      <label htmlFor="define_date" className="title">
                        현상파악 스케쥴
                      </label>
                      <input
                        type="text"
                        className="input"
                        name="define_due_date"
                        value={`${signitemPrc1.start_date && signitemPrc1.start_date !== '' ? moment(signitemPrc1.start_date).format('YYYY.MM.DD') : null} ~ ${
                          signitemPrc1.define_due_date && signitemPrc1.define_due_date !== '' ? moment(signitemPrc1.define_due_date).format('YYYY.MM.DD') : null
                        }`}
                        readOnly
                      />
                    </li>
                    <li className="">
                      <label htmlFor="measure_due_date" className="title">
                        원인분석 스케쥴
                      </label>
                      <input
                        type="text"
                        className="input"
                        name="measure_due_date"
                        value={`${
                          signitemPrc1.measure_due_date && signitemPrc1.measure_due_date !== ''
                            ? moment(signitemPrc1.measure_due_date).format('YYYY.MM.DD')
                            : null
                        }`}
                        readOnly
                      />
                    </li>
                    <li className="">
                      <label htmlFor="analyze_due_date" className="title">
                        대책수립 스케쥴
                      </label>
                      <input
                        type="text"
                        className="input"
                        name="analyze_due_date"
                        value={`${
                          signitemPrc1.analyze_due_date && signitemPrc1.analyze_due_date !== ''
                            ? moment(signitemPrc1.analyze_due_date).format('YYYY.MM.DD')
                            : null
                        }`}
                        readOnly
                      />
                    </li>
                    <li className="">
                      <label htmlFor="improve_due_date" className="title">
                        개선 스케쥴
                      </label>
                      <input
                        type="text"
                        className="input"
                        name="improve_due_date"
                        value={`${
                          signitemPrc1.improve_due_date && signitemPrc1.improve_due_date !== ''
                            ? moment(signitemPrc1.improve_due_date).format('YYYY.MM.DD')
                            : null
                        }`}
                        readOnly
                      />
                    </li>
                    <li className="">
                      <label htmlFor="control_due_date" className="title">
                        완료/공유 스케쥴
                      </label>
                      <input
                        type="text"
                        className="input"
                        name="control_due_date"
                        value={`${
                          signitemPrc1.control_due_date && signitemPrc1.control_due_date !== ''
                            ? moment(signitemPrc1.control_due_date).format('YYYY.MM.DD')
                            : null
                        }`}
                        readOnly
                      />
                    </li>
                  </ul>
                  {signitemPrc2 && (
                    <ul className="sub_form small2">
                      <li className="" style={{ border: '1px solid', borderRadius: '10px', borderColor: '#d9e0e7', paddingBottom: '5px' }}>
                        <label htmlFor="define" className="title" style={{ marginTop: '50px' }}>
                          현상파악
                        </label>
                        <span style={{ display: 'inline-block', width: '30%' }}>리더 코멘트</span>
                        <textarea style={{ width: '70%' }} name="define_leader_comment" value={signitemPrc2.define_leader_comment} readOnly />
                        <span style={{ display: 'inline-block', width: '30%' }}>파일첨부</span>
                        <input
                          style={{ width: '70%' }}
                          type="text"
                          className="input"
                          name="define_attach_file"
                          value={signitemPrc2.define_attach_file}
                          readOnly
                        />
                        <span style={{ display: 'inline-block', width: '30%' }}>완료일자</span>
                        <input
                          style={{ width: '70%' }}
                          type="text"
                          className="input"
                          name="define_approval_date"
                          value={
                            signitemPrc2.define_approval_date && signitemPrc2.define_approval_date !== ''
                              ? moment(signitemPrc2.define_approval_date).format('YYYY.MM.DD')
                              : null
                          }
                          readOnly
                        />
                      </li>
                      <li className="" style={{ border: '1px solid', borderRadius: '10px', borderColor: '#d9e0e7', paddingBottom: '5px' }}>
                        <label htmlFor="measure" className="title" style={{ marginTop: '50px' }}>
                          원인분석
                        </label>
                        <span style={{ display: 'inline-block', width: '30%' }}>리더 코멘트</span>
                        <textarea style={{ width: '70%' }} name="measure_leader_comment" value={signitemPrc2.measure_leader_comment} readOnly />
                        <span style={{ display: 'inline-block', width: '30%' }}>파일첨부</span>
                        <input
                          style={{ width: '70%' }}
                          type="text"
                          className="input"
                          name="measure_attach_file"
                          value={signitemPrc2.measure_attach_file}
                          readOnly
                        />
                        <span style={{ display: 'inline-block', width: '30%' }}>완료일자</span>
                        <input
                          style={{ width: '70%' }}
                          type="text"
                          className="input"
                          name="measure_approval_date"
                          value={
                            signitemPrc2.measure_approval_date && signitemPrc2.measure_approval_date !== ''
                              ? moment(signitemPrc2.measure_approval_date).format('YYYY.MM.DD')
                              : null
                          }
                          readOnly
                        />
                      </li>
                      <li className="" style={{ border: '1px solid', borderRadius: '10px', borderColor: '#d9e0e7', paddingBottom: '5px' }}>
                        <label htmlFor="analyze" className="title" style={{ marginTop: '50px' }}>
                          대책수립
                        </label>
                        <span style={{ display: 'inline-block', width: '30%' }}>리더 코멘트</span>
                        <textarea style={{ width: '70%' }} name="analyze_leader_comment" value={signitemPrc2.analyze_leader_comment} readOnly />
                        <span style={{ display: 'inline-block', width: '30%' }}>파일첨부</span>
                        <input
                          style={{ width: '70%' }}
                          type="text"
                          className="input"
                          name="analyze_attach_file"
                          value={signitemPrc2.analyze_attach_file}
                          readOnly
                        />
                        <span style={{ display: 'inline-block', width: '30%' }}>완료일자</span>
                        <input
                          style={{ width: '70%' }}
                          type="text"
                          className="input"
                          name="analyze_approval_date"
                          value={
                            signitemPrc2.analyze_approval_date && signitemPrc2.analyze_approval_date !== ''
                              ? moment(signitemPrc2.analyze_approval_date).format('YYYY.MM.DD')
                              : null
                          }
                          readOnly
                        />
                      </li>
                      <li className="" style={{ border: '1px solid', borderRadius: '10px', borderColor: '#d9e0e7', paddingBottom: '5px' }}>
                        <label htmlFor="improve" className="title" style={{ marginTop: '50px' }}>
                          개선
                        </label>
                        <span style={{ display: 'inline-block', width: '30%' }}>리더 코멘트</span>
                        <textarea style={{ width: '70%' }} name="improve_leader_comment" value={signitemPrc2.improve_leader_comment} readOnly />
                        <span style={{ display: 'inline-block', width: '30%' }}>파일첨부</span>
                        <input
                          style={{ width: '70%' }}
                          type="text"
                          className="input"
                          name="improve_attach_file"
                          value={signitemPrc2.improve_attach_file}
                          readOnly
                        />
                        <span style={{ display: 'inline-block', width: '30%' }}>완료일자</span>
                        <input
                          style={{ width: '70%' }}
                          type="text"
                          className="input"
                          name="improve_approval_date"
                          value={
                            signitemPrc2.improve_approval_date && signitemPrc2.improve_approval_date !== ''
                              ? moment(signitemPrc2.improve_approval_date).format('YYYY.MM.DD')
                              : null
                          }
                          readOnly
                        />
                      </li>
                      <li className="" style={{ border: '1px solid', borderRadius: '10px', borderColor: '#d9e0e7', paddingBottom: '5px' }}>
                        <label htmlFor="control" className="title" style={{ marginTop: '50px' }}>
                          완료/공유
                        </label>
                        <span style={{ display: 'inline-block', width: '30%' }}>리더 코멘트</span>
                        <textarea style={{ width: '70%' }} name="control_leader_comment" value={signitemPrc2.control_leader_comment} readOnly />
                        <span style={{ display: 'inline-block', width: '30%' }}>파일첨부</span>
                        <input
                          style={{ width: '70%' }}
                          type="text"
                          className="input"
                          name="control_attach_file"
                          value={signitemPrc2.control_attach_file}
                          readOnly
                        />
                        <span style={{ display: 'inline-block', width: '30%' }}>완료일자</span>
                        <input
                          style={{ width: '70%' }}
                          type="text"
                          className="input"
                          name="control_approval_date"
                          value={
                            signitemPrc2.control_approval_date && signitemPrc2.control_approval_date !== ''
                              ? moment(signitemPrc2.control_approval_date).format('YYYY.MM.DD')
                              : null
                          }
                          readOnly
                        />
                      </li>
                    </ul>
                  )}
                  {signitemPrc3 && (
                    <ul className="sub_form small2">
                      <li className="">
                        <label htmlFor="improve_content" className="title">
                          개선사항
                        </label>
                        <textarea name="control_date" value={signitemPrc3.improve_content} readOnly />
                      </li>
                      <li className="">
                        <label htmlFor="success_reason" className="title">
                          성공요인
                        </label>
                        <textarea name="control_date" value={signitemPrc3.success_reason} readOnly />
                      </li>
                    </ul>
                  )}
                  <ul className="sub_form small2">
                    <li className="" style={{ marginTop: '10px' }}>
                      <label htmlFor="improve_content" className="title">
                        기안자
                      </label>
                      <p style={{ minHeight: '48px', paddingTop: '13px' }}>
                        {signPrclistInfo ? signPrclistInfo.filter(item => item.rownum === 3).map(item => this.combineTexterRenderer(item)) : ''}
                      </p>
                    </li>
                    <li className="">
                      <label htmlFor="improve_content" className="title">
                        1차 결재권자
                      </label>
                      <p style={{ minHeight: '48px', paddingTop: '13px' }}>
                        {signPrclistInfo ? signPrclistInfo.filter(item => item.rownum === 2).map(item => this.combineTexterRenderer(item)) : ''}
                      </p>
                    </li>
                    <li className="">
                      <label htmlFor="improve_content" className="title">
                        최종결재권자
                      </label>
                      <p style={{ minHeight: '48px', paddingTop: '13px' }}>
                        {signPrclistInfo ? signPrclistInfo.filter(item => item.rownum === 1).map(item => this.combineTexterRenderer(item)) : ''}
                      </p>
                    </li>
                    <li className="">
                      <label htmlFor="improve_content" className="title">
                        팀원
                      </label>
                      <p style={{ minHeight: '48px', paddingTop: '13px' }}>
                        {teamsharing ? teamsharing.map((item, index) => this.teamTexterRenderer(index, item)) : ''}
                      </p>
                    </li>
                  </ul>
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
