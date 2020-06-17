import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';
import { DatePicker } from 'antd';
import moment from 'moment';
import locale from 'antd/es/locale/ko_KR';

import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';
import Checkbox from 'apps/wts/components/CheckboxGroup/Checkbox';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContent from './StyledContent';
import service from '../../service';

const { RangePicker } = DatePicker;

const disabledDate = current =>
  moment()
    .endOf('day')
    .diff(current.startOf('day'), 'days') > 0;

class EduProgramFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      eduType: [
        { value: 'job', label: '직무교육' },
        { value: 'job_mask', label: '직무교육(MASK)' },
        { value: 'job_meter', label: '직무교육(계측기)' },
        { value: 'job_handling', label: 'HANDLING 교육' },
        { value: 'job_proc', label: '공정 교육' },
        { value: 'job_clean', label: '청정도 교육' },
        { value: 'job_return', label: '복직자 교육' },
        { value: 'job_training', label: '신입/전배 교육' },
      ],
      useGroupStudy: false,
      times: 1,
      currentEduType: '',
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.saveData = this.saveData.bind(this);
    this.handleUseGroupStudy = this.handleUseGroupStudy.bind(this);
    this.dateOptionRenderer = this.dateOptionRenderer.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.postData = this.postData.bind(this);
    this.handleChangeCurrentEduType = this.handleChangeCurrentEduType.bind(this);
  }

  handleOpenModal() {
    this.setState({ isOpen: true });
    // this.getFormData();
  }

  handleCloseModal() {
    this.setState({
      isOpen: false,
      useGroupStudy: false,
      times: 1,
      currentEduType: '',
    });
  }

  handleUseGroupStudy() {
    this.setState(prevState => ({ useGroupStudy: !prevState.useGroupStudy }));
  }

  handleChangeCurrentEduType(e) {
    const { value } = e.target;
    this.setState({ currentEduType: value });
  }

  handleChangeTime(e) {
    const { value } = e.target;
    let result = 0;
    if (value > 9) {
      result = 9;
    } else if (value < 1) {
      result = 1;
    } else {
      result = value;
    }
    this.setState({ times: result });
  }

  dateOptionRenderer() {
    const currentYear = new Date().getFullYear();
    const options = [];
    options.push({ value: currentYear, label: `${currentYear}년` });
    options.push({ value: currentYear + 1, label: `${currentYear + 1}년` });
    return options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));
  }

  onChangeDate(date) {
    if (date.length === 2) {
      // const dateRange = date[1].diff(date[0], 'days');
      this.setState({ date });
    } else {
      this.setState({ date: [] });
    }
  }

  saveData(e) {
    e.preventDefault();
    const { site } = this.props;
    const { date, useGroupStudy } = this.state;

    if (!date || date.length !== 2) {
      alert('교육기간을 지정해주세요.');
    } else {
      const formData = new FormData(e.target);
      const payload = {
        type: 'insCollective',
        searchSite: site,
        collecsdt: date[0].format('YYYYMMDD'),
        collecedt: date[1].format('YYYYMMDD'),
        group_study: useGroupStudy ? 'O' : 'X',
      };
      formData.forEach((value, key) => {
        payload[key] = value;
      });
      if (!payload.study || payload.study === '') {
        alert('교육종류를 선택해주세요.');
      } else if (useGroupStudy && (!payload.title || payload.title === '')) {
        alert('집체교육시 제목을 입력해주세요.');
      } else if (payload.study === 'job_proc' && !useGroupStudy && (!payload.testType || payload.testType === '')) {
        alert('문항타입을 선택해주세요.');
      } else if (payload.study === 'job_training' && (!payload.testType || payload.testType === '')) {
        alert('교육시작단계를 선택해주세요.');
      } else if (payload.study === 'job_return' && !useGroupStudy && (!payload.testType || payload.testType === '')) {
        alert('교육시간을 선택해주세요.');
      } else if (!date) {
        alert('교육기간을 지정해주세요.');
      } else {
        this.postData(payload).then(result => {
          if (result) {
            this.handleCloseModal();
            this.props.callbackHandler();
          } else {
            alert('입력하는 과정에서 에러가 발생했습니다.');
          }
        });
      }
    }
  }

  async postData(payload) {
    const { response, error } = await service.manage.post(payload);
    if (response && !error) {
      return response.insertyn;
    }
    return false;
  }

  render() {
    const { isOpen, eduType, useGroupStudy, times, currentEduType } = this.state;
    const { site } = this.props;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 500,
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
              교육 추가하기
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <StyledCommonForm onSubmit={this.saveData} autoComplete="off">
                <input type="hidden" name="searchSite" value={site} />
                {/*
                <div className="sub_form_tit cr">기본정보</div>
                */}
                <ul className="sub_form small2 has_margin">
                  <li>
                    <label htmlFor="study" className="title">
                      교육종류
                    </label>
                    <select name="study" id="study" defaultValue="" onChange={this.handleChangeCurrentEduType}>
                      <option value="" disabled>
                        교육을 선택해주세요.
                      </option>
                      {eduType.map(edu => (
                        <option key={edu.value} value={edu.value}>
                          {edu.label}
                        </option>
                      ))}
                    </select>
                  </li>
                  {currentEduType !== 'job_training' && (
                    <li>
                      <label htmlFor="groupStudy" className="title">
                        집체교육여부
                      </label>
                      <div>
                        <Checkbox
                          id="groupStudy"
                          name="groupStudy"
                          className="checkbox"
                          labelText=""
                          value=""
                          noPadding
                          fitting
                          onChange={this.handleUseGroupStudy}
                          checked={useGroupStudy}
                        />
                      </div>
                    </li>
                  )}
                  {currentEduType === 'job_training' && (
                    <li>
                      <label htmlFor="testType" className="title">
                        교육단계
                      </label>
                      <select name="testType" id="testType" defaultValue="">
                        <option value="" disabled>
                          교육단계를 선택해주세요.
                        </option>
                        <option value="A">1단계 교육부터</option>
                        <option value="B">2단계 교육부터</option>
                      </select>
                    </li>
                  )}
                  {!useGroupStudy && currentEduType === 'job_proc' && (
                    <li>
                      <label htmlFor="testType" className="title">
                        문항타입
                      </label>
                      <select name="testType" id="testType" defaultValue="">
                        <option value="" disabled>
                          문항타입을 선택해주세요.
                        </option>
                        <option value="A">A형</option>
                        <option value="B">B형</option>
                        <option value="C">C</option>
                      </select>
                    </li>
                  )}
                  {!useGroupStudy && currentEduType === 'job_return' && (
                    <li>
                      <label htmlFor="testType" className="title">
                        교육시간 선택
                      </label>
                      <select name="testType" id="testType" defaultValue="">
                        <option value="" disabled>
                          교육시간을 선택해주세요.
                        </option>
                        <option value="A">16시간 (휴직기간 3개월 ~ 1년 미만)</option>
                        <option value="B">40시간 (휴직기간 1년 이상)</option>
                      </select>
                    </li>
                  )}
                  {useGroupStudy && (
                    <li>
                      <label htmlFor="title" className="title">
                        집체교육제목
                      </label>
                      <input type="text" id="title" className="input" name="title" />
                    </li>
                  )}
                  <li>
                    <label htmlFor="colldt" className="title">
                      교육년도
                    </label>
                    <select name="colldt" id="colldt" defaultValue={new Date().getFullYear()}>
                      {this.dateOptionRenderer()}
                    </select>
                  </li>
                  <li>
                    <label htmlFor="times" className="title">
                      교육회차
                    </label>
                    <input type="number" className="input" id="times" name="times" value={times} onChange={this.handleChangeTime} min="1" max="9" />
                  </li>
                  <li>
                    <label htmlFor="study" className="title">
                      교육기간
                    </label>
                    <RangePicker
                      onChange={this.onChangeDate}
                      disabledDate={disabledDate}
                      format="YYYY-MM-DD"
                      style={{ display: 'inline-block', marginTop: 7 }}
                      locale={locale}
                    />
                  </li>
                </ul>
                <div className="btn_wrap">
                  <StyledButton type="submit" className="btn-primary btn-sm mr5">
                    확인
                  </StyledButton>
                  <StyledButton type="button" className="btn-light btn-sm" onClick={this.handleCloseModal}>
                    취소
                  </StyledButton>
                </div>
              </StyledCommonForm>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

EduProgramFormModal.propTypes = {
  callbackHandler: PropTypes.func,
};

EduProgramFormModal.defaultProps = {
  callbackHandler: () => false,
};

export default EduProgramFormModal;
