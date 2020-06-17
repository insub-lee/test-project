import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';
import { exportExcel, jsonToQueryString } from 'utils/helpers';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContent from './StyledContent';
import CommonEvaluationList from '../EduPrograms/CommonEvaluationList';
import service from '../../service';
import ExcelUploader from '../../Modals/ExcelUploader';

const noSelectedStyle = {
  height: '48px',
  lineHeight: '48px',
};

class EduProgramManageEvaluation extends React.Component {
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
        { value: 'job_return', label: '복직자 교육' },
      ],
      site: '',
      area: [
        { value: 'PHOTO', label: 'PHOTO' },
        { value: 'MCVD', label: 'MCVD' },
        { value: 'IMP', label: 'IMP' },
        { value: 'ETCH', label: 'ETCH' },
        { value: 'EPI', label: 'EPI' },
        { value: 'END', label: 'END' },
        { value: 'DIFF', label: 'DIFF' },
        { value: 'LAST', label: 'LAST' },
        { value: 'CVD', label: 'CVD' },
      ],
      currentEduType: '',
      currentArea: '',
      currentTestType: '',
      isLoading: false,
      data: [],
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.saveData = this.saveData.bind(this);
    this.handleChangeEvaluationForm = this.handleChangeEvaluationForm.bind(this);
    this.handleChangeArea = this.handleChangeArea.bind(this);
    this.renderEvaluationForm = this.renderEvaluationForm.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.reloadData = this.reloadData.bind(this);
    this.downloadExcel = this.downloadExcel.bind(this);
    this.openUploadModal = this.openUploadModal.bind(this);
    this.handleChangeTestType = this.handleChangeTestType.bind(this);

    this.excelUploaderModal = React.createRef();
  }

  handleOpenModal() {
    this.setState({ isOpen: true });
  }

  handleCloseModal() {
    this.setState({ isOpen: false, data: [], site: '', currentEduType: '', currentTestType: '', currentArea: '' });
  }

  handleChangeEvaluationForm(e) {
    const { value } = e.target;
    const { site } = this.props;
    this.setState({ currentEduType: value, currentArea: '', data: [], isLoading: true }, () => {
      if (value !== 'job_proc') {
        this.fetchData(site, value).then(({ data }) => {
          this.setState({ data, isLoading: false });
        });
      }
    });
  }

  handleChangeArea(e) {
    const { value } = e.target;
    // const { currentEduType } = this.state;
    // const { site } = this.props;
    this.setState({ currentArea: value, currentTestType: '', data: [] });
    // this.setState({ currentArea: value, isLoading: true }, () => {
    //   this.fetchData(site, currentEduType, value).then(({ data }) => {
    //     this.setState({ data, isLoading: false });
    //   });
    // });
  }

  handleChangeTestType(e) {
    const { value } = e.target;
    const { currentEduType, currentArea } = this.state;
    const { site } = this.props;
    this.setState({ currentTestType: value, isLoading: true }, () => {
      this.fetchData(site, currentEduType, currentArea, value).then(({ data }) => {
        this.setState({ data, isLoading: false });
      });
    });
  }

  reloadData() {
    const { currentEduType, currentArea } = this.state;
    const { site } = this.props;
    this.setState({ isLoading: true }, () => {
      this.fetchData(site, currentEduType, currentEduType === 'job_proc' ? currentArea : undefined).then(({ data }) => {
        this.setState({ data, isLoading: false });
      });
    });
  }

  renderEvaluationForm(eduType) {
    switch (eduType) {
      case 'job':
        return '직무교육 평가';
      case 'job_mask':
        return '직무교육(MASK) 평가';
      case 'job_meter':
        return '직무교육(계측기) 평가';
      case 'job_handling':
        return 'Handling 평가';
      default:
        return '';
    }
  }

  saveData() {
    console.debug('# save Data');
  }

  async fetchData(site, type, area, testType) {
    const requestQuery = {
      type: 'eduJobList',
      searchSite: site,
      searchStudy: type,
      area,
      testType,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manage.get(queryString);
    if (response && !error) {
      const { eduJobList } = response;
      return {
        data: eduJobList.length > 0 ? JSON.parse(eduJobList[0].chk_content) : [],
      };
    }
    return {
      data: [],
    };
  }

  downloadExcel() {
    const { data, currentEduType } = this.state;
    let rows = [];
    switch (currentEduType) {
      case 'job':
      case 'job_mask':
      case 'job_meter':
      case 'job_proc':
      case 'job_return':
        rows = data.map(row => ({
          '평가 항목': row.title,
          이론: row.theory ? 'O' : '',
          실기: row.practice ? 'O' : '',
        }));
        break;
      case 'job_handling':
        rows = data.map(row => ({
          '평가 항목': row.title,
          점수: row.score,
          감점점수: row.minusPer,
        }));
        break;
      default:
        break;
    }
    if (rows.length > 0) {
      exportExcel(rows, `${currentEduType}_edu_evaluation.xlsx`);
    } else {
      alert('Excel로 받을 내용이 없습니다.');
    }
  }

  openUploadModal() {
    const { currentEduType, currentArea, currentTestType } = this.state;
    const { site } = this.props;
    this.excelUploaderModal.current.handleOpenModal(site, currentEduType, currentArea, currentTestType);
  }

  render() {
    const { isOpen, eduType, currentEduType, isLoading, data, area, currentArea, currentTestType } = this.state;
    const { empno } = this.props;
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
              교육 평가 문항 관리
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <StyledCommonForm autoComplete="off">
                <div className="sub_form_tit cr">교육선택</div>
                <ul className="sub_form small2 has_margin">
                  <li>
                    <label htmlFor="study" className="title">
                      교육종류
                    </label>
                    <select name="" id="" defaultValue="" onChange={this.handleChangeEvaluationForm}>
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
                  {currentEduType === 'job_proc' && (
                    <li>
                      <label htmlFor="area" className="title">
                        AREA
                      </label>
                      <select name="" id="" defaultValue="" onChange={this.handleChangeArea}>
                        <option value="" disabled>
                          AREA를 선택해주세요.
                        </option>
                        {area.map(item => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </li>
                  )}
                  {currentEduType === 'job_proc' && (
                    <li>
                      <label htmlFor="study_type" className="title">
                        문항타입
                      </label>
                      {currentEduType === 'job_proc' && currentArea === '' ? (
                        <div style={{ paddingTop: 12 }}>AREA를 선택해주세요.</div>
                      ) : (
                        <select name="" id="" defaultValue="" onChange={this.handleChangeTestType}>
                          <option value="" disabled>
                            문항타입을 선택해주세요.
                          </option>
                          <option value="A">A형</option>
                          <option value="B">B형</option>
                          <option value="C">C형</option>
                        </select>
                      )}
                    </li>
                  )}
                  <li>
                    <label htmlFor="study" className="title">
                      교육문항
                    </label>
                    {currentEduType === '' && <div style={noSelectedStyle}>교육종류을 선택해주세요.</div>}
                    {currentEduType === 'job_proc' && currentArea === '' && <div style={noSelectedStyle}>AREA를 선택해주세요.</div>}
                    {currentEduType === 'job_proc' && currentArea !== '' && currentTestType === '' && <div style={noSelectedStyle}>AREA를 선택해주세요.</div>}
                    {((currentEduType !== '' && currentEduType !== 'job_proc') ||
                      (currentEduType === 'job_proc' && currentArea !== '' && currentTestType !== '')) && (
                      <div style={{ paddingTop: 5 }}>
                        <div className="btn_wrap" style={{ textAlign: 'right' }}>
                          <StyledButton type="button" className="btn-gray btn-sm mr5" onClick={this.reloadData} disabled={isLoading}>
                            재호출
                          </StyledButton>
                          <StyledButton type="button" className="btn-gray btn-sm mr5" onClick={this.downloadExcel}>
                            Excel 다운로드
                          </StyledButton>
                          <StyledButton type="button" className="btn-primary btn-sm" onClick={this.openUploadModal}>
                            Excel 업로드
                          </StyledButton>
                        </div>
                        <CommonEvaluationList type={currentEduType} isLoading={isLoading} data={data} />
                      </div>
                    )}
                  </li>
                </ul>
              </StyledCommonForm>
            </div>
          </StyledContent>
        </div>
        <ExcelUploader ref={this.excelUploaderModal} empno={empno} callbackHandler={this.reloadData} />
      </Modal>
    );
  }
}

EduProgramManageEvaluation.propTypes = {
  empno: PropTypes.string,
};

EduProgramManageEvaluation.defaultProps = {
  empno: '',
};

export default EduProgramManageEvaluation;
