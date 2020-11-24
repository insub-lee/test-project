import React from 'react';
import { fromJS } from 'immutable';
import Modal from 'rc-dialog';

import XLSX from 'xlsx';
import { Spin, Icon } from 'antd';
import { SheetJSFT } from 'utils/helpers';
import Button from '../../../../components/Button';
import alertMessage from '../../../../components/Notification/Alert';

import StyledContent from './StyledContent';
import service from './service';
import DataTable from '../AreaParser/DataTable';
import sampleExcelFile from './sample/statusofaction_sample.xls';

const styles = {
  excelViewer: {
    position: 'relative',
    // padding: 15,
    margin: '30px',
    // width: 500,
    // maxWidth: 300,
    // minHeight: 400,
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
    // margin: '30px auto 0px auto',
    margin: '30px',
    // width: 500,
    // maxWidth: 300,
    // minHeight: 400,
    overflow: 'auto',
    // backgroundColor: '#e3aa33',
    display: 'block',
    padding: 0,
    // boxShadow: '0 0 6px #ccc',
    // margin: 'auto',
    marginTop: 20,
  },
};

class RegistAreaModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      list: fromJS([]),
      isSubmitting: false,
      file: null,
      isLoading: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.postStatus = this.postStatus.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  async postStatus(url, payload) {
    const { response, error } = await service.status.post(url, payload);
    const { callback } = this.state;
    if (response && !error) {
      this.setState(
        {
          isOpen: false,
          callback: () => false,
          isSubmitting: false,
        },
        () => {
          callback();
        },
      );
      console.debug(response);
    } else {
      console.debug(error);
      alertMessage.alert('Server Error');
      this.setState({ isSubmitting: false });
    }
  }

  handleOpen(callback) {
    console.debug('@@ callback :', callback);
    this.setState({
      isOpen: true,
      list: fromJS([]),
      callback: () => callback(),
    });
  }

  handleClose(useCallback = false) {
    console.debug('@@useCallback ??', useCallback);
    if (useCallback) {
      let cbFunc = () => {};
      this.setState(
        prevState => {
          const { callback } = prevState;
          cbFunc = () => callback();
          return { isOpen: false, list: fromJS([]), callback: () => false, isLoading: false };
        },
        () => cbFunc(),
      );
    } else {
      this.setState({ isOpen: false, list: fromJS([]), callback: () => false, isLoading: false });
    }
  }

  onDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    const { files } = e.dataTransfer;
    if (files && files[0]) {
      this.handleFile(files[0]);
      this.setState({ file: files[0] });
    }
  }

  handleChange(e) {
    const { files } = e.target;
    if (files && files[0]) {
      this.handleFile(files[0]);
      this.setState({ file: files[0] });
    }
  }

  suppress(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  handleFile(file) {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '', raw: false });
      data.shift();
      const filterData = data.filter(item => item[0] !== '');
      const convertedData = filterData.map(row => ({
        date: row[0],
        area: row[1],
        type: row[2],
        shift: row[3],
        content: row[4],
        usernm: row[5],
        userid: row[6],
        status: row[7],
        actContent: row[8],
        actUsernm: row[9],
        actUserid: row[10],
        actDate: row[11],
      }));
      this.setState({ list: fromJS(convertedData) });
    };
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }

  sendData() {
    const { list, file } = this.state;
    const { handleClose } = this;

    if (list.size < 1) {
      alert('먼저 엑셀 파일을 올려주십시오.');
      return;
    }

    if (list.size > 500) {
      alert('500건 이상은 업로드가 불가합니다.');
      return;
    }

    this.setState({ isLoading: true });
    const formData = new FormData();
    formData.append('fileUpload', file);
    formData.append('boardCode', 'request');
    this.sendSingleData(formData).then(resultCnt => {
      console.debug('@@ result', resultCnt);
      if (resultCnt > -1) {
        alertMessage.notice('입력이 성공했습니다.');
      } else if (resultCnt === -1) {
        alertMessage.alert(`사번과 이름이 일치하지 않거나 존재하지 않는 사번입니다. `);
        handleClose();
      } else if (resultCnt === -3) {
        alertMessage.alert(`area 입력칸에는 PHOTO, ETCH, DIFF, IMP,CVD ,END, FQC 만 입력하실수 있습니다. `);
        handleClose();
      } else if (resultCnt === -4) {
        alertMessage.alert(`유형 입력칸에는 전산, 작업방법, 장비, 계측, 공정, 물류, 기타, FAB4 만 입력하실수 있습니다. `);
        handleClose();
      } else if (resultCnt === -5) {
        alertMessage.alert(`shift 입력칸에는 A,B,C,D 만 입력하실수 있습니다. `);
        handleClose();
      } else if (resultCnt === -6) {
        alertMessage.alert(`조치상태 입력칸에는 진행중, 완료, 불가 만 입력하실수 있습니다. `);
        handleClose();
      } else if (resultCnt === -7) {
        alertMessage.alert(`조치내용이 있는 경우 조치상태 입력칸에는 완료, 불가 만 입력하실수 있습니다. `);
        handleClose();
      } else {
        alertMessage.alert(`Server Eerror`);
        handleClose();
      }
    });
  }

  async sendSingleData(payload) {
    const { response, error } = await service.status.post(payload);
    const { resultcnt, insertyn } = response;
    const { callback } = this.state;
    console.debug('sendSingleData_response', response);
    if (response && !error) {
      if (insertyn) {
        this.setState(
          {
            isOpen: false,
            isLoading: false,
            callback: () => false,
          },
          () => {
            callback();
          },
        );
        return 0;
      }
      return resultcnt;
    }
    return -6;
  }

  render() {
    const { isOpen, isSubmitting, list, isLoading } = this.state;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={() => this.handleClose(false)}
        style={{
          width: 1000,
        }}
        bodyStyle={{
          padding: 0,
        }}
        closable={false}
        destroyOnClose
      >
        <div id="modal-content">
          <StyledContent>
            <div>
              <div className="pop_tit">
                엑셀로 AREA별 등록하기
                <button type="button" className="icon icon_pclose" onClick={() => this.handleClose(false)} />
              </div>
              <div className="pop_con">
                <div
                  style={{
                    backgroundColor: 'rgba(217, 226, 249, 0.6)',
                    textAlign: 'right',
                  }}
                >
                  <span style={{ color: 'red' }}>
                    * 셀 속성을 전부 텍스트로 작성해 주세요., Excel 97 - 2003 통합문서로 저장 올려주세요. 500건 이상은 업로드가 불가합니다.
                  </span>
                  <a
                    href={sampleExcelFile}
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
                <div
                  style={{
                    padding: 10,
                    backgroundColor: 'rgba(217, 226, 249, 0.6)',
                    height: 70,
                  }}
                >
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
                </div>
                <div className="btn_wrap" style={{ paddingBottom: 20 }}>
                  <Button htmlType="button" size="small" color="primary" disabled={isSubmitting} onClick={this.sendData}>
                    {isSubmitting && <i className="fas fa-spinner fa-spin" />} 저장하기
                  </Button>
                </div>
                {list.size > 0 && (
                  <Spin tip="저장중입니다." indicator={<Icon type="loading" spin />} spinning={isLoading}>
                    <DataTable list={list.toJS().reverse()} />
                  </Spin>
                )}
              </div>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

export default RegistAreaModal;
