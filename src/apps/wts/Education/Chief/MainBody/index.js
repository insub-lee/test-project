import React from 'react';
import moment from 'moment';

import { Icon, Spin } from 'antd';
import { exportExcel, jsonToQueryString } from 'utils/helpers';
import Button from 'components/Button';
import Checkbox from 'apps/wts/components/CheckboxGroup/Checkbox';
// import alertMessage from 'apps/wts/components/Notification/Alert';
import SendEduMail from '../../Modals/SendEduMail';
import service from '../../service';
import Wrapper from './Wrapper';
import JobEvaluationModal from '../../Modals/JobEvaluation';
import NewEmployeeTraining from './NewEmployeeTraining';
import EduAcceptModal from '../../Modals/EduAcceptModal';

class MainBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentYear: new Date().getFullYear(),
      isLoading: true,
      checkedList: [],
      historyList: [],
    };

    this.initData = this.initData.bind(this);
    this.fetchEducations = this.fetchEducations.bind(this);
    this.renderSelectableYears = this.renderSelectableYears.bind(this);
    this.selectorStatus = this.selectorStatus.bind(this);
    this.handleChangeCurrentYear = this.handleChangeCurrentYear.bind(this);
    this.downloadExcel = this.downloadExcel.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.handleChangeAll = this.handleChangeAll.bind(this);
    this.handleOpenSendMail = this.handleOpenSendMail.bind(this);
    this.handleOpenJobEvaluation = this.handleOpenJobEvaluation.bind(this);
    this.fetchEduHistory = this.fetchEduHistory.bind(this);
    this.handleSetTarget = this.handleSetTarget.bind(this);
    this.postEduHistory = this.postEduHistory.bind(this);
    this.applyButtonsRenderer = this.applyButtonsRenderer.bind(this);
    this.handleOpenAcceptEdu = this.handleOpenAcceptEdu.bind(this);
    this.applyHistory = this.applyHistory.bind(this);

    this.sendEduMailRef = React.createRef();
    this.jobEvaluationRef = React.createRef();
    this.eduAcceptModal = React.createRef();
    this.eduList = React.createRef();
  }

  componentDidMount() {
    this.initData();
  }

  initData() {
    const { empno, manInfo } = this.props;
    const { currentYear } = this.state;
    this.setState({ isLoading: true }, () => {
      this.fetchEducations(empno, currentYear).then(({ data, isError }) => {
        if (isError) {
          this.setState({
            data: [],
            isLoading: false,
          });
        } else {
          this.setState({ data, isLoading: true }, () => {
            this.fetchEduList(manInfo.site, currentYear).then(({ eduList }) => {
              this.setState(prevState => {
                const prevData = prevState.data;
                let maxEduCount = 0;
                const nextData = prevData.map(info => {
                  const nextInfo = { ...info };
                  if (!nextInfo.edu) nextInfo.edu = {};
                  eduList.forEach(edu => {
                    if (!nextInfo.edu[edu.study]) nextInfo.edu[edu.study] = [];
                    nextInfo.edu[edu.study].push(edu);
                    if (nextInfo.edu[edu.study].length > maxEduCount) {
                      maxEduCount = nextInfo.edu[edu.study].length;
                    }
                  });
                  return nextInfo;
                });
                this.setState({ data: nextData, isLoading: true, eduList }, () => {
                  this.applyHistory(empno, currentYear);
                });
              });
            });
          });
        }
      });
    });
  }

  applyHistory(empno, currentYear) {
    this.fetchEduHistory(empno, currentYear).then(({ historyList }) => {
      this.setState({ historyList, isLoading: false });
    });
  }

  // Todo - handle by code api???
  selectorStatus(key) {
    switch (key) {
      case '01':
        return '사용자교육미수료';
      case '10':
        return '교육대상';
      case '11':
        return '사용자교육수료';
      case '00':
      default:
        return '교육없음';
    }
  }

  handleChangeCurrentYear(e) {
    const { value } = e.target;
    this.setState({ currentYear: value });
  }

  handleOpenAcceptEdu(type) {
    const { checkedList, data, eduList } = this.state;
    const currentDate = moment(new Date()).format('YYYYMMDD');
    const acceptableEduList = eduList.filter(edu => currentDate <= edu.collecedt && edu.group_study !== 'O');
    switch (type) {
      case 'all': {
        const nextData = data.map(({ empno, usrnm }) => ({ empno, usrnm }));
        this.eduAcceptModal.current.handleOpenModal(acceptableEduList, nextData);
        break;
      }
      case 'selected':
        this.eduAcceptModal.current.handleOpenModal(acceptableEduList, checkedList);
        break;
      case 'solo':
        break;
      default:
        break;
    }
  }

  handleOpenSendMail(type, target = []) {
    const { checkedList, data } = this.state;
    switch (type) {
      case 'all': // 전체 메일
        this.sendEduMailRef.current.handleOpenModal(data.map(row => row.empno));
        break;
      case 'selected': // 선택된 대상자만 메일
        this.sendEduMailRef.current.handleOpenModal(checkedList);
        break;
      case 'solo': // 솔로
        this.sendEduMailRef.current.handleOpenModal(target);
        break;
      default:
        break;
    }
  }

  handleOpenJobEvaluation(type, rowData, collseq, create) {
    this.jobEvaluationRef.current.handleOpenModal(type, rowData, collseq, create);
  }

  handleChangeCheck(info) {
    this.setState(prevState => {
      const { checkedList } = prevState;
      const index = checkedList.findIndex(target => target.empno === info.empno);
      if (index > -1) {
        checkedList.splice(index, 1);
      } else {
        checkedList.push(info);
      }
      return { checkedList };
    });
  }

  handleChangeAll(e) {
    const { checked } = e.target;
    this.setState(prevState => {
      const { data } = prevState;
      return { checkedList: checked ? data.map(({ empno, usrnm }) => ({ empno, usrnm })) : [] };
    });
  }

  downloadExcel() {
    const { data, currentYear } = this.state;
    const rows = data.map(row => ({
      '작업자(사번)': row.empno,
      '직무능력평가(MASK)': this.selectorStatus(row.job_mask),
      '직무능력평가(MASK) 수료날짜': row.job_mask === '11' ? moment(row.job_maskdt, 'YYYYMMDD') : '',
      '직무능력평가(계측기)': this.selectorStatus(row.job_meter),
      '직무능력평가(계측기) 수료날짜': row.job_meter === '11' ? moment(row.job_meterdt, 'YYYYMMDD') : '',
      'Handling 평가표': this.selectorStatus(row.job_handling),
      'Handling 평가표 수료날짜': row.job_handling === '11' ? moment(row.job_handlingdt, 'YYYYMMDD') : '',
      '공정 교육': this.selectorStatus(row.job_proc),
      '공정 교육 수료날짜': row.job_proc === '11' ? moment(row.job_procdt, 'YYYYMMDD') : '',
      '청정도 교육': this.selectorStatus(row.job_clean),
      '청정도 교육 수료날짜': row.job_clean === '11' ? moment(row.job_cleandt, 'YYYYMMDD') : '',
      '장비 교육인증': this.selectorStatus(row.job_mashine),
      '장비 교육인증 수료날짜': row.job_mashine === '11' ? moment(row.job_mashinedt, 'YYYYMMDD') : '',
    }));
    exportExcel(rows, `${currentYear}_edu_list.xlsx`);
  }

  handleSetTarget(rowData, target) {
    let targetName = '';
    switch (target) {
      case 'job':
        targetName = '직무능력평가';
        break;
      case 'job_mask':
        targetName = '직무능력평가(MASK)';
        break;
      case 'job_meter':
        targetName = '직무능력평가(계측기)';
        break;
      case 'job_handling':
        targetName = 'HANDLING 평가표';
        break;
      case 'job_proc':
        targetName = '공정 교육';
        break;
      case 'job_clean':
        targetName = '청정도 교육';
        break;
      case 'job_mashine':
        targetName = '장비 교육인증';
        break;
      default:
        targetName = '';
        break;
    }
    const confirmMessage = `${rowData.usrnm}님을 ${targetName} 교육대상 지정하시겠습니까?`;
    if (targetName !== '' && window.confirm(confirmMessage)) {
      // const { currentYear } = this.state;
      this.postEduHistory(rowData.site, rowData.empno, target, '10').then(result => {
        if (result) {
          this.reloadData();
        } else {
          alert('Server Error');
        }
      });
    }
  }

  async postEduHistory(site, empno, target, status) {
    const payload = {
      type: 'insJobEdu',
      searchSite: site,
      searchDt: moment(new Date()).format('YYYYMM'),
      empNo: empno,
    };
    payload[target] = status;
    const { response, error } = await service.manage.post(payload);
    if (response && !error) {
      const { insertyn } = response;
      return insertyn;
    }
    return false;
  }

  async fetchEducations(empno, date) {
    const requestQuery = {
      type: 'manList',
      usrId: empno,
      searchDt: date,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manage.get(queryString);
    if (response && !error) {
      const { manList } = response;
      return {
        data: manList,
        isError: false,
      };
    }
    return {
      data: [],
      isError: true,
    };
  }

  async fetchEduList(site, date) {
    const requestQuery = {
      type: 'collectiveEduList',
      searchSite: site,
      colldt: date,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manage.get(queryString);
    if (response && !error) {
      const { collectiveEduList } = response;
      return {
        eduList: collectiveEduList || [],
      };
    }
    return { eduList: [] };
  }

  async fetchEduHistory(empno, date) {
    const requestQuery = {
      type: 'eduHisList',
      usrId: empno,
      searchDt: date,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manage.get(queryString);
    if (response && !error) {
      const { eduHisList } = response;
      return {
        historyList: eduHisList,
        isError: false,
      };
    }
    return {
      historyList: [],
      isError: true,
    };
  }

  renderSelectableYears() {
    const options = [];
    let maxYear = new Date().getFullYear();
    while (maxYear >= 2019) {
      options.push(<option key={maxYear} value={maxYear}>{`${maxYear}년`}</option>);
      maxYear -= 1;
    }
    return options;
  }

  applyButtonsRenderer(rowData, target) {
    const { historyList } = this.state;
    const list = rowData.edu ? rowData.edu[target] || [] : [];
    return list.map(edu => {
      const { coll_seq: collSeq, times } = edu;
      const targetIndex = historyList.findIndex(history => history.coll_seq === edu.coll_seq && history.empno === rowData.empno);
      const eduResult = targetIndex > -1 ? historyList[targetIndex].edu_result : '';
      if (edu.group_study === 'O') {
        return eduResult === 'O' ? (
          <button key={collSeq} type="button" className="cateWrap" disabled>
            <span className="cateIcon cate03" />
            <span className="cateTxt">{`${times}차 (${moment(historyList[targetIndex].eduhisdt, 'YYYYMMDD').format('MM.DD')})`}</span>
          </button>
        ) : null;
      }
      switch (eduResult) {
        case 'X':
          return (
            <button
              key={collSeq}
              type="button"
              className="cateWrap"
              onClick={() => this.handleOpenJobEvaluation(target, rowData, edu.coll_seq, eduResult !== 'O')}
              disabled={target === 'job_clean'}
            >
              <span className="cateIcon cate02" />
              <span className="cateTxt">
                {`${times}차`} <br /> {`(${moment(edu.collecsdt, 'YYYYMMDD').format('MM.DD')} - ${moment(edu.collecedt, 'YYYYMMDD').format('MM.DD')}까지)`}
              </span>
            </button>
          );
        case 'O':
          return (
            <button
              key={collSeq}
              type="button"
              className="cateWrap"
              onClick={() => this.handleOpenJobEvaluation(target, rowData, edu.coll_seq, eduResult !== 'O')}
              disabled={target === 'job_clean'}
            >
              <span className="cateIcon cate01" />
              <span className="cateTxt">{`${times}차 (${moment(historyList[targetIndex].eduhisdt, 'YYYYMMDD').format('MM.DD')})`}</span>
            </button>
          );
        default:
          return null;
      }
    });
  }

  render() {
    const { data, currentYear, isLoading, checkedList } = this.state;
    const { empno, manInfo } = this.props;
    return (
      <Wrapper>
        <div className="title">
          <span>근무조 교육이력</span>
        </div>
        <div className="">
          <div className="search_div" style={{ position: 'relative', width: '100%', textAlign: 'center' }}>
            <select name="searchDate" defaultValue={currentYear} onChange={this.handleChangeCurrentYear}>
              {this.renderSelectableYears()}
            </select>
          </div>
          <div className="search_div" style={{ position: 'relative', width: '100%' }}>
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
            <div className="btn_wrap" style={{ position: 'absolute', bottom: '0px', right: '0px', textAlign: 'right' }}>
              <Button type="button" color="grayTwo" size="small" onClick={this.reloadData}>
                재호출
              </Button>
              {/*
              <Button type="button" color="default" size="small" onClick={this.downloadExcel}>
                <i className="far fa-file-excel" /> Excel
              </Button>
              */}
              {/*
              <Button type="button" size="small" color="default" onClick={() => this.handleOpenAcceptEdu('selected')}>
                <i className="fa fa-pen-square" /> 선택대상 교육 신청
              </Button>
              <Button type="button" size="small" color="default" onClick={() => this.handleOpenAcceptEdu('all')}>
                <i className="fa fa-pen-square" /> 전체대상 교육 신청
              </Button>
              */}
              <Button type="button" size="small" color="gray" onClick={() => this.handleOpenSendMail('selected')}>
                선택대상 교육 메일
              </Button>
              <Button type="button" size="small" color="primary" onClick={() => this.handleOpenSendMail('all')}>
                전체 교육 메일
              </Button>
            </div>
          </div>
          <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
            <div className="tb_wrap">
              <table className="tb02 tbCateTable">
                <colgroup>
                  <col width="4%" />
                  <col width="8.5%" />
                  <col width="12.5%" />
                  <col width="12.5%" />
                  <col width="12.5%" />
                  <col width="12.5%" />
                  <col width="12.5%" />
                  <col width="12.5%" />
                  <col width="12.5%" />
                </colgroup>
                <tbody>
                  <tr className="bd">
                    <th>
                      <Checkbox
                        id="chk-all"
                        name="chk-all"
                        labelText=""
                        value="all"
                        noPadding
                        fitting
                        onChange={this.handleChangeAll}
                        checked={checkedList.length > 0 && data.length === checkedList.length}
                      />
                    </th>
                    <th>작업자</th>
                    <th>직무능력평가</th>
                    <th>직무능력평가(MASK)</th>
                    <th>직무능력평가(계측기)</th>
                    <th>HANDLING 평가표</th>
                    <th>공정 교육</th>
                    <th>청정도 교육</th>
                    <th>복직자 교육</th>
                  </tr>
                  {data.map(rowData => (
                    <tr className="bd" key={rowData.empno}>
                      <td className="alignMid">
                        <Checkbox
                          id={`chk-${rowData.empno}`}
                          name={`chk-${rowData.empno}`}
                          labelText=""
                          value={rowData.empno}
                          noPadding
                          fitting
                          onChange={() => this.handleChangeCheck({ empno: rowData.empno, usrnm: rowData.usrnm })}
                          checked={checkedList.findIndex(info => info.empno === rowData.empno) > -1}
                        />
                      </td>
                      <td className="alignMid">
                        <span style={{ lineHeight: 'normal' }}>
                          {rowData.usrnm}
                          <br />({rowData.empno})
                        </span>
                      </td>
                      <td>{this.applyButtonsRenderer(rowData, 'job')}</td>
                      <td>{this.applyButtonsRenderer(rowData, 'job_mask')}</td>
                      <td>{this.applyButtonsRenderer(rowData, 'job_meter')}</td>
                      <td>{this.applyButtonsRenderer(rowData, 'job_handling')}</td>
                      <td>{this.applyButtonsRenderer(rowData, 'job_proc')}</td>
                      <td>{this.applyButtonsRenderer(rowData, 'job_clean')}</td>
                      <td>{this.applyButtonsRenderer(rowData, 'job_return')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Spin>
        </div>
        <hr
          style={{
            border: '1px solid #eaecee',
            marginTop: 40,
            marginBottom: 40,
          }}
        />
        <NewEmployeeTraining empno={empno} list={data} site={manInfo.site} />
        <SendEduMail ref={this.sendEduMailRef} empno={empno} />
        <JobEvaluationModal ref={this.jobEvaluationRef} site={manInfo.site} empno={empno} callbackHandler={this.initData} />
        <EduAcceptModal ref={this.eduAcceptModal} callbackHandler={this.initData} site={manInfo.site} />
      </Wrapper>
    );
  }
}

export default MainBody;
