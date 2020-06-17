import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import { Icon, Spin } from 'antd';
import { fromJS } from 'immutable';

import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';
import Button from 'components/Button';
import { jsonToQueryString } from 'utils/helpers';
import StyledEvaluationForm from 'apps/wts/components/CommonStyledElement/StyledEvaluationForm';
import service from '../service';
import StyledContent from './StyledContent';
import { sampleQuestion } from './sampleData';

class MentorEvaluationFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: false,
      questions: fromJS([]),
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.handleChangeFormInfo = this.handleChangeFormInfo.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.updateData = this.updateData.bind(this);
    this.postData = this.postData.bind(this);
    this.saveData = this.saveData.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  handleOpenModal(empno, type) {
    this.setState({ isOpen: true, empno, type });
    this.getQuestions();
  }

  getQuestions() {
    this.setState({ isLoading: true }, () => {
      this.setState({ questions: fromJS(sampleQuestion), isLoading: false });
    });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  handleAfterOpen() {
    const { id } = this.state;
  }

  handleChangeFormInfo(key, value) {
    this.setState(prevState => {
      const { formInfo } = prevState;
      return { formInfo: formInfo.set(key, value) };
    });
  }

  saveData(e) {
    e.preventDefault();
    const { formInfo, create, site, fab } = this.state;
    const formData = new FormData(e.target);
    const payload = {
      type: 'troubleSheet',
      site,
      fab,
      fabInfo: fab,
    };
    formData.forEach((value, key) => {
      payload[key] = value;
      if (key === 'occurdt') {
        payload.searchDt = formInfo.get('occurdt');
      }
    });
    if (create) {
      this.postData(payload).then(result => {
        if (result) {
          const { callbackHandler } = this.props;
          this.handleCloseModal();
          callbackHandler();
        } else {
          alert('Server Error');
        }
      });
    } else {
      this.updateData(payload).then(result => {
        if (result) {
          const { callbackHandler } = this.props;
          this.handleCloseModal();
          callbackHandler();
        } else {
          alert('Server Error');
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
    const { response, error } = await service.gcsChemDaily.put(payload);
    if (response && !error) {
      const { updateyn } = response;
      return updateyn;
    }
    return false;
  }

  async postData(payload) {
    const { response, error } = await service.gcsChemDaily.post(payload);
    if (response && !error) {
      const { insertyn } = response;
      return insertyn;
    }
    return false;
  }

  handleClickSubmit() {
    if (window.confirm('제출하시겠습니까?')) {
      console.debug('## => 제출');
    }
  }

  render() {
    const { isOpen, empno, type, isLoading, create, questions } = this.state;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 750,
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
              평가 수행
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
                <StyledCommonForm onSubmit={this.saveData} autoComplete="off">
                  <StyledEvaluationForm>
                    <div className="assessment">
                      <ul className="assessWrap">
                        {questions.map((question, index) => (
                          <li key={question.get('seq')}>
                            <div className="question">
                              <span className="point">Q</span>
                              {`${index + 1}. ${question.get('q_content')} `}
                              <span>{`(${question.get('q_score') || 0}점)`}</span>
                            </div>
                            <div className="text">
                              <textarea name={`a${index}_content`} rows="5" placeholder="내용을 작성해주세요." maxLength={300} />
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="btn_wrap">
                        <Button type="button" size="small" color="primary" onClick={this.handleClickSubmit}>
                          제출하기
                        </Button>
                      </div>
                    </div>
                  </StyledEvaluationForm>
                </StyledCommonForm>
              </Spin>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

MentorEvaluationFormModal.propTypes = {
  callbackHandler: PropTypes.func,
};

MentorEvaluationFormModal.defaultProps = {
  callbackHandler: () => false,
};

export default MentorEvaluationFormModal;
