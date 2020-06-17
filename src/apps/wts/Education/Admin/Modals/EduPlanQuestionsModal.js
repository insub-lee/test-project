import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';
import moment from 'moment';

import { Icon, Spin } from 'antd';
import { exportExcel, jsonToQueryString } from 'utils/helpers';
import Wrapper from 'apps/wts/Education/Admin/EduPrograms/Wrapper';
import Button from 'components/Button';
import StyledContent from './StyledContent';
import service from '../../service';
import EduPlanExcelUploder from './EduPlanExcelUploder';
import CommonEduPlanQuestions from '../EduPrograms/CommonEduPlanQuestions';

class EduPlanQuestionsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      site: '',
      isLoading: false,
      data: [],
      currentStep: '1',
      currentJobType: 'job_common',
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.loadData = this.loadData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.reloadData = this.reloadData.bind(this);
    this.downloadExcel = this.downloadExcel.bind(this);
    this.openUploadModal = this.openUploadModal.bind(this);
    this.handleChangeStep = this.handleChangeStep.bind(this);
    this.handleChangeJobType = this.handleChangeJobType.bind(this);

    this.excelUploaderModal = React.createRef();
  }

  handleOpenModal() {
    this.setState({ isOpen: true }, () => {
      this.loadData();
    });
  }

  handleCloseModal() {
    this.setState({ isOpen: false, data: [], site: '' });
  }

  reloadData() {
    this.loadData();
  }

  loadData() {
    this.setState({ isLoading: true }, () => {
      const { site } = this.props;
      const { currentStep, currentJobType } = this.state;
      this.fetchData(site, currentStep, currentJobType).then(({ data }) => {
        this.setState({ data, isLoading: false });
      });
    });
  }

  handleChangeStep(e) {
    const { value } = e.target;
    this.setState({ currentStep: value }, () => {
      this.loadData();
    });
  }

  handleChangeJobType(e) {
    const { value } = e.target;
    this.setState({ currentJobType: value }, () => {
      this.loadData();
    });
  }

  async fetchData(site, step, jobType) {
    const requestQuery = {
      type: 'eduPlanQuestion',
      searchSite: site,
      searchStep: Number(step),
      jobType: Number(step) === 3 ? jobType : 'job_common',
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manage.get(queryString);
    if (response && !error) {
      const { contents } = response;
      return {
        data: JSON.parse(contents ? contents.q_content || '[]' : '[]'),
      };
    }
    alert('데이터를 불러오는 과정에서 오류가 발생했습니다.');
    return {
      data: [],
    };
  }

  downloadExcel() {
    const { data } = this.state;
    const rows = data.map(row => ({
      문제: row.q_content,
      점수: row.q_score,
      단계: row.q_step,
    }));
    if (rows.length > 0) {
      exportExcel(rows, `신입전배교육문항${moment(new Date()).format('YYYYMMDD')}.xlsx`);
    } else {
      alert('Excel로 받을 내용이 없습니다.');
    }
  }

  openUploadModal() {
    const { currentEduType } = this.state;
    const { site } = this.props;
    this.excelUploaderModal.current.handleOpenModal(site, currentEduType);
  }

  render() {
    const { isOpen, isLoading, data, currentStep, currentJobType } = this.state;
    const { site, empno } = this.props;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 800,
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
              신입/전배 문항 관리
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <Wrapper>
                <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
                  <div style={{ position: 'relative', padding: '15px 0', textAlign: 'right' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0 }}>
                      <select defaultValue={currentStep} style={{ display: 'inline-block', width: 100 }} onChange={this.handleChangeStep}>
                        <option value="1">1단계</option>
                        <option value="2">2단계</option>
                        <option value="3">3단계</option>
                      </select>
                      {Number(currentStep) === 3 && (
                        <select
                          defaultValue={currentJobType}
                          style={{ display: 'inline-block', width: 100, marginLeft: 20 }}
                          onChange={this.handleChangeJobType}
                        >
                          <option value="job_common">일반</option>
                          <option value="job_meter">계측기</option>
                          <option value="job_mask">MASK</option>
                        </select>
                      )}
                    </div>
                    <Button type="button" color="gray" size="small" onClick={this.downloadExcel} style={{ marginRight: 10 }}>
                      Excel 다운로드
                    </Button>
                    <Button type="button" color="primary" size="small" onClick={this.openUploadModal}>
                      Excel 업로드
                    </Button>
                  </div>
                  <CommonEduPlanQuestions data={data} isLoading={isLoading} />
                </Spin>
              </Wrapper>
            </div>
          </StyledContent>
        </div>
        <EduPlanExcelUploder
          ref={this.excelUploaderModal}
          empno={empno}
          site={site}
          step={currentStep}
          jobType={currentJobType}
          callbackHandler={this.reloadData}
        />
      </Modal>
    );
  }
}

EduPlanQuestionsModal.propTypes = {
  site: PropTypes.string,
};

EduPlanQuestionsModal.defaultProps = {
  site: '',
};

export default EduPlanQuestionsModal;
