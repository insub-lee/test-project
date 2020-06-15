import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';
import { Icon, Spin } from 'antd';
import XLSX from 'xlsx';
import moment from 'moment';

import Button from 'components/Button';
import { SheetJSFT } from 'utils/helpers';

import CommonEvaluationList from 'apps/wts/Education/Admin/EduPrograms/CommonEvaluationList';
import StyledContent from './StyledContent';
import excelSample from '../sampleExcel';
import service from '../service';

const styles = {
  excelViewer: {
    position: 'relative',
    margin: '30px',
    border: '1px solid #DDD',
    boxShadow: '0 0 6px #ccc',
  },
  excelDropText: {
    position: 'absolute',
    width: 220,
    height: 60,
    textAlign: 'center',
    top: 'calc(50% - 30px)',
    left: 'calc(50% - 110px)',
  },
  sheetOption: {
    margin: '30px',
    overflow: 'auto',
    display: 'block',
    padding: 0,
    marginTop: 20,
  },
};

class ExcelUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      site: '',
      type: '',
      data: [],
      isLoading: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.renderEvaluationForm = this.renderEvaluationForm.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  handleOpenModal(site, type, area, testType) {
    this.setState({ isOpen: true, site, type, area, testType });
  }

  handleCloseModal() {
    this.setState({ isOpen: false, site: '', type: '', data: [] });
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
      case 'job_return':
        return '복직자 교육 평가';
      default:
        return '';
    }
  }

  onDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    const { files } = e.dataTransfer;
    if (files && files[0]) this.handleFile(files[0]);
  }

  handleChange(e) {
    const { files } = e.target;
    if (files && files[0]) {
      this.handleFile(files[0]);
    }
  }

  suppress(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  handleFile(file) {
    const { type } = this.state;
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      data.shift();
      /* filter data with rebase array */
      const convertedData = data
        .filter(row => !!row[0].trim())
        .map((row, index) => {
          switch (type) {
            case 'job_proc':
              return {
                key: index,
                title: row[0],
                total: row[1],
                answers: [row[2], row[3], row[4], row[5]],
                correctAnswer: row[2],
              };
            default:
              return {
                key: index,
                title: row[0],
                theory: row[1] === '○',
                practice: row[2] === '○',
                total: row[3],
                scoreA: row[3] ? row[4] : '-',
                scoreB: row[3] ? row[5] : '-',
                scoreC: row[3] ? row[6] : '-',
                scoreD: row[3] ? row[7] : '-',
              };
          }
        });
      this.setState({ data: convertedData });
    };
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }

  sendData() {
    const { site, type, data, area, testType } = this.state;
    const { empno } = this.props;
    this.postData(empno, site, type, data, area, testType).then(result => {
      if (result) {
        alert('등록되었습니다.');
        this.handleCloseModal();
        this.props.callbackHandler();
      } else {
        alert('오류로 인해 등록이 실패했습니다.');
      }
    });
  }

  async postData(empNo, site, type, data, area, testType) {
    const payload = {
      type: 'insEduChkListContent',
      empNo,
      searchSite: site,
      area: type === 'job_proc' ? area : undefined,
      testType: type === 'job_proc' ? testType : undefined,
      searchDt: moment(new Date()).format('YYYYMMDD'),
      chk_content: JSON.stringify(data),
      study: type,
    };
    const { response, error } = await service.manage.post(payload);
    if (response && !error) {
      const { insertyn } = response;
      return insertyn;
    }
    return false;
  }

  render() {
    const { isOpen, site, type, isLoading, data } = this.state;
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
              {`${site} ${this.renderEvaluationForm(type)} 문항 올리기`}
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <div style={{ padding: '10px 0' }}>
                <a
                  href={excelSample[type]}
                  download
                  style={{
                    borderBottom: '1px solid',
                    color: '#333',
                    margin: 10,
                  }}
                >
                  <i className="fa fa-paperclip" />
                  {` Sample 양식`}
                </a>
              </div>
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
                <div
                  onDrop={this.onDrop}
                  onDragEnter={this.suppress}
                  onDragOver={this.suppress}
                  style={{
                    height: 50,
                    ...styles.excleDropText,
                    border: '2px dashed black',
                    borderRadius: 5,
                  }}
                >
                  <form autoComplete="off">
                    <div
                      style={{
                        textAlign: 'center',
                        marginTop: 13,
                      }}
                    >
                      <label
                        htmlFor="excelUpload"
                        style={{
                          color: '#fff',
                          background: '#1fb5ad',
                          borderRadius: 30,
                          border: '1px solid #1fb5ad',
                          cursor: 'pointer',
                          padding: 5,
                        }}
                      >
                        Excel Drag and Drop 혹은 선택
                      </label>
                      <input
                        type="file"
                        id="excelUpload"
                        accept={SheetJSFT}
                        onChange={this.handleChange}
                        style={{
                          display: 'none',
                        }}
                      />
                    </div>
                  </form>
                </div>
                <div style={{ paddingTop: 10 }}>{data.length > 0 && <CommonEvaluationList type={type} isLoading={isLoading} data={data} />}</div>
              </Spin>
              <div className="btn_wrap">
                <Button type="button" size="small" color="primary" onClick={this.sendData}>
                  제출하기
                </Button>
              </div>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

ExcelUploader.propTypes = {
  callbackHandler: PropTypes.func,
  empno: PropTypes.string,
};

ExcelUploader.defaultProps = {
  callbackHandler: () => false,
  empno: '',
};

export default ExcelUploader;
