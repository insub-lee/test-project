import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';
import { fromJS } from 'immutable';
import { Icon, Spin } from 'antd';
import moment from 'moment';

import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';
import { jsonToQueryString } from 'utils/helpers';
import DatePicker from 'apps/wts/components/DatePicker';
import Button from 'components/Button';
import service from '../service';
import StyledContent from './StyledContent';

const datePicker = fromJS({
  edudt: {
    values: [
      {
        name: 'edudt',
        value: moment(new Date()).format('YYYY.MM.DD'),
      },
    ],
  },
});

class EduReportModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: false,
      eduPlanInfo: {},
      stepLevel: 0,
      report: null,
      readOnly: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.updateData = this.updateData.bind(this);
    this.postData = this.postData.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  handleOpenModal({ readOnly = false, eduPlanInfo, stepLevel, report }) {
    if (readOnly) {
      this.setState({ isOpen: true, report, readOnly });
    } else {
      this.setState({ isOpen: true, eduPlanInfo, stepLevel, readOnly });
    }
    // this.getFormData();
  }

  handleCloseModal() {
    this.setState({
      isOpen: false,
      isLoading: false,
      eduPlanInfo: {},
      stepLevel: 0,
      report: null,
      readOnly: false,
    });
  }

  saveData(e) {
    e.preventDefault();
    const checkKeys = ['curriculum', 'edudt', 'study_content', 'study_feel'];
    const alertMessages = ['과정명은 필수 입력값입니다.', '교육일자은 필수 입력값입니다.', '교육내용은 필수 입력값입니다.', '소감은 필수 입력값입니다.'];
    const { eduPlanInfo, stepLevel } = this.state;
    const formData = new FormData(e.target);
    const payload = {
      type: 'insDailyReport',
      empNo: eduPlanInfo.empno,
      planseq: eduPlanInfo.plan_seq,
      searchStep: stepLevel,
    };
    formData.forEach((value, key) => {
      if (key === 'edudt') {
        payload[key] = moment(value, 'YYYY.MM.DD').format('YYYYMMDD');
      } else {
        payload[key] = value;
      }
    });
    const hasNoValue = checkKeys.some((key, index) => {
      if (!payload[key] || payload[key].trim() === '') {
        alert(alertMessages[index]);
        return true;
      }
      return false;
    });
    if (!hasNoValue) {
      this.postData(payload).then(result => {
        if (result) {
          this.handleCloseModal();
          this.props.callbackHandler();
        } else {
          alert('등록하는 과정에서 오류가 발생했습니다.');
        }
      });
    }
  }

  async fetchData(site) {
    const requestQuery = {
      type: 'troubleSheet',
      searchSite: site,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.gcsChemDaily.get(queryString);
    if (response && !error) {
      const { troubleSheet } = response;
      return {
        create: troubleSheet === null,
        formInfo: troubleSheet || {},
      };
    }
    return {
      failFetch: true,
    };
  }

  async updateData(payload) {
    const { response, error } = await service.user.put(payload);
    if (response && !error) {
      const { updateyn } = response;
      return updateyn;
    }
    return false;
  }

  async postData(payload) {
    const { response, error } = await service.user.post(payload);
    if (response && !error) {
      const { insertyn } = response;
      return insertyn;
    }
    return false;
  }

  render() {
    const { isOpen, isLoading, readOnly, report } = this.state;
    console.debug('# ReadOnly', report);
    let datePickerOption = datePicker.getIn(['edudt', 'values']);
    if (readOnly) {
      datePickerOption = datePickerOption.setIn([0, 'value'], moment(report.edudt, 'YYYYMMDD').format('YYYY.MM.DD')).setIn([0, 'readOnly'], true);
    }
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 700,
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
              교육내용 레포트
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
                <StyledCommonForm onSubmit={this.saveData} autoComplete="off">
                  <ul className="sub_form small2 has_margin">
                    <li>
                      <label className="title" htmlFor="form-curriculum">
                        과정명
                      </label>
                      <input
                        type="text"
                        className="input"
                        name="curriculum"
                        id="form-curriculum"
                        defaultValue={report ? report.curriculum : ''}
                        readOnly={readOnly}
                      />
                    </li>
                    <li>
                      <label className="title" htmlFor="form-edudt">
                        교육일자
                      </label>
                      <div style={{ width: 150 }}>
                        <DatePicker values={datePickerOption} single />
                      </div>
                    </li>
                    <li style={{ padding: 0 }}>
                      <label className="" htmlFor="form-study_content">
                        교 육 내 용
                      </label>
                      <div style={{ padding: '10px 0' }}>
                        <textarea
                          name="study_content"
                          id="form-study_content"
                          cols="30"
                          rows="10"
                          maxLength={3000}
                          placeholder="교육내용을 작성하세요.(3000자 내)"
                          defaultValue={report ? report.study_content : ''}
                          readOnly={readOnly}
                        />
                      </div>
                    </li>
                    <li style={{ padding: 0 }}>
                      <label className="" htmlFor="form-study_feel">
                        소감
                      </label>
                      <div style={{ padding: '10px 0' }}>
                        <textarea
                          name="study_feel"
                          id="form-study_feel"
                          cols="30"
                          rows="10"
                          maxLength={200}
                          placeholder="소감을 작성하세요.(200자 내)"
                          defaultValue={report ? report.study_feel : ''}
                          readOnly={readOnly}
                        />
                      </div>
                    </li>
                  </ul>
                  {!readOnly && (
                    <div className="btn_wrap">
                      <Button type="submit" color="primary" size="small">
                        확인
                      </Button>
                      <Button type="button" color="gray" size="small" onClick={this.handleCloseModal}>
                        취소
                      </Button>
                    </div>
                  )}
                </StyledCommonForm>
              </Spin>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

EduReportModal.propTypes = {
  callbackHandler: PropTypes.func,
};

EduReportModal.defaultProps = {
  callbackHandler: () => false,
};

export default EduReportModal;
