import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';
import { Icon, Spin } from 'antd';
import XLSX from 'xlsx';

import Button from 'components/Button';
import { SheetJSFT } from 'utils/helpers';

import StyledContent from './StyledContent';
import excelSample from '../../sampleExcel';
import service from '../../service';
import CommonEduPlanQuestions from '../EduPrograms/CommonEduPlanQuestions';

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

class EduPlanExcelUploder extends React.Component {
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
    this.onDrop = this.onDrop.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  handleOpenModal(site, type) {
    this.setState({ isOpen: true, site, type });
  }

  handleCloseModal() {
    this.setState({ isOpen: false, site: '', type: '', data: [] });
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
      const convertedData = data
        .filter(row => !!row[0].trim())
        .map((row, index) => ({
          key: index,
          title: row[0],
          theory: row[1] === '○',
          practice: row[2] === '○',
          total: row[3],
          scoreA: row[3] ? row[4] : '-',
          scoreB: row[3] ? row[5] : '-',
          scoreC: row[3] ? row[6] : '-',
          scoreD: row[3] ? row[7] : '-',
        }));
      this.setState({ data: convertedData });
    };
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }

  sendData() {
    const { site, data } = this.state;
    const { empno, step, jobType } = this.props;
    this.postData(empno, site, data, step, jobType).then(result => {
      if (result) {
        alert('등록되었습니다.');
        this.handleCloseModal();
        this.props.callbackHandler();
      } else {
        alert('오류로 인해 등록이 실패했습니다.');
      }
    });
  }

  async postData(empNo, site, questions, step, jobType) {
    const payload = {
      type: 'insEduPlanQuestions',
      empNo,
      searchSite: site,
      searchStep: Number(step),
      jobType: Number(step) === 3 ? jobType : 'job_common',
      questions: JSON.stringify(questions || []),
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
              신입/전배 문항 올리기
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <div style={{ padding: '10px 0' }}>
                <a
                  href={excelSample.eduPlan}
                  download
                  style={{
                    borderBottom: '1px solid',
                    color: '#333',
                    margin: 10,
                  }}
                >
                  <i className="fas fa-paperclip" />
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
                <div style={{ paddingTop: 10 }}>
                  <CommonEduPlanQuestions data={data} isLoading={isLoading} />
                </div>
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

EduPlanExcelUploder.propTypes = {
  callbackHandler: PropTypes.func,
  site: PropTypes.string,
  empno: PropTypes.string,
};

EduPlanExcelUploder.defaultProps = {
  callbackHandler: () => false,
  site: '',
  empno: '',
};

export default EduPlanExcelUploder;
