import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Icon, Progress, Upload, Button, Tooltip } from 'antd';

import { isJSON } from 'utils/helpers';
import StyledDragger from 'components/CommonStyled/StyledDragger';
import StyledButton from 'components/CommonStyled/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const { Dragger } = Upload;
const imgExts = ['jpg', 'png', 'gif', 'jpeg'];

class DragUploadComp extends Component {
  state = {
    fileInfo: [],
  };

  componentDidMount() {
    console.debug('componentDidMount');
    const { WORK_SEQ, COMP_FIELD, COMP_TAG, colData } = this.props;
    const initfiles = {
      WORK_SEQ,
      TASK_SEQ: -1,
      CONT_SEQ: -1,
      FIELD_NM: COMP_FIELD,
      TYPE: COMP_TAG,
      DETAIL: colData && colData.DETAIL ? colData.DETAIL : [],
    };
    this.setState({ fileInfo: initfiles });
  }

  onProgress = (step, file) => {
    const { fileInfo } = this.state;
    const { DETAIL: fileList } = fileInfo;
    const tmpDetail = fileList.map(fObj => (fObj.uid === file.uid ? { ...fObj, percent: step } : { ...fObj }));
    const tmpFileInfo = { ...fileInfo, DETAIL: tmpDetail };
    this.setState({ fileInfo: tmpFileInfo });
  };

  changeFormDataHanlder = () => {
    const { sagaKey, changeFormData, COMP_FIELD, WORK_SEQ } = this.props;
    const { fileInfo } = this.state;
    changeFormData(sagaKey, COMP_FIELD, fileInfo);
  };

  onUploadComplete = (response, file) => {
    const { fileInfo } = this.state;
    const { DETAIL: fileList } = fileInfo;
    const { fileExt } = response;
    let doctype = 'file-unknown';
    switch (fileExt) {
      case 'pdf':
        doctype = 'file-pdf';
        break;
      case 'xls':
        doctype = 'file-excel';
        break;
      case 'xlsx':
        doctype = 'file-excel';
        break;
      case 'txt':
        doctype = 'file-text';
        break;
      case 'doc':
        doctype = 'file-word';
        break;
      case 'docx':
        doctype = 'file-word';
        break;
      case 'ppt':
        doctype = 'file-ppt';
        break;
      case 'pptx':
        doctype = 'file-ppt';
        break;
      case 'zip':
        doctype = 'file-zip';
        break;
      default:
        break;
    }
    const tmpDetail = fileList.map(fl => (fl.uid === file.uid ? { ...fl, ...response, type: doctype } : fl));
    const tmpFileInfo = { ...fileInfo, DETAIL: tmpDetail };
    this.setState({ fileInfo: tmpFileInfo }, () => this.changeFormDataHanlder());
  };

  customRequest = ({ action, data, file, filename, headers, onError, onProgress, onSuccess, withCredentials }) => {
    const { fileInfo } = this.state;
    const { DETAIL: fileList } = fileInfo;

    const fileItem = { uid: file.uid, seq: 0, fileName: file.name, fileType: 1, size: file.size, fileExt: '', down: '', percent: 0, type: '' };
    fileList.push(fileItem);
    const tmpFileInfo = { ...fileInfo, DETAIL: fileList };
    this.setState({ fileInfo: tmpFileInfo });
    const formData = new FormData();
    formData.append(file.uid, file);

    axios
      .post(action, formData, {
        withCredentials,
        headers,
        onUploadProgress: ({ total, loaded }) => {
          const step = Math.round((loaded * 100) / total);
          onProgress(step, file);
        },
      })
      .then(({ data: response }) => {
        onSuccess(response, file);
        this.onUploadComplete(response, file);
      })
      .catch(onError);
  };

  render() {
    const {
      fileInfo: { DETAIL: fileList },
    } = this.state;

    return (
      <div onDragEnter={e => e.stopPropagation()} onDragOver={e => e.stopPropagation()}>
        <Dragger
          action="/upload/mdcs"
          // beforeUpload={this.beforeUpload}
          onProgress={this.onProgress}
          customRequest={this.customRequest}
          onChange={this.onChangeDragger}
          showUploadList={false}
          multiple
        >
          {fileList && fileList.length > 0 ? (
            <div className="fileZone">
              {fileList.map(file => (
                <div style={{ height: '25px' }}>
                  {file.percent === 100 ? (
                    <Icon type={file.type} style={{ fontSize: '20px', marginRight: '5px' }} />
                  ) : (
                    <Progress type="circle" width={23} percent={file.percent} style={{ marginRight: '10px' }}></Progress>
                  )}
                  {fileList.length > 0 && (
                    <div className="uploadList" style={{ margin: 0, padding: 20, height: 80, overflowY: 'auto' }}>
                      {fileList.map((file, index) => (
                        <div className="uploadFileRow" style={{ position: 'absolute', height: '25px' }}>
                          <div className="uploadFileInfo" style={{ position: 'absolute', top: 1, left: 10, fontSize: '0.8rem' }}>
                            <Icon type="paper-clip" /> {file.name} ({this.bytesToSize(file.size)})
                          </div>
                          {file.status === 'done' ? (
                            <div className="uploadFileBtn" style={{ position: 'absolute', top: 0, right: 10 }}>
                              <StyledButton className="btn-primary btn-xs btn-first" onClick={() => (window.location.href = `${file.down}`)}>
                                <Icon type="download" />
                              </StyledButton>
                              <StyledButton className="btn-light btn-xs" onClick={e => this.onRemove(index, e)}>
                                <Icon type="close" />
                              </StyledButton>
                            </div>
                          ) : (
                            <>
                              {file.status === 'error' ? (
                                <div className="uploadFileStatus" style={{ position: 'absolute', top: 4, right: 10 }}>
                                  <sapn style={{ color: 'red' }}>업로드 실패</sapn>
                                  {'  '}
                                  <StyledButton className="btn-light btn-xs" onClick={() => this.onRemove(index)}>
                                    <Icon type="close" />
                                  </StyledButton>
                                </div>
                              ) : (
                                <div className="uploadFileStatus" style={{ position: 'absolute', top: '0px', right: '15px', width: '35%' }}>
                                  <Progress percent={this.state.percent} status="active" />
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              </Dragger>
            </div>
          </>
        )}
        {view && (
          <div className="uploadFileList">
            {fileList.length > 0 ? (
              fileList.map((file, index) => (
                <div className="uploadFileRow" style={{ padding: '10px 10px 10px', position: 'relative', height: '25px' }}>
                  <div className="uploadFileInfo" style={{ position: 'absolute', top: 1, left: 10, fontSize: '0.8rem' }}>
                    <Tooltip placement="topLeft" title={`${file.name}(${this.bytesToSize(file.size)})`} trigger="hover">
                      <Icon type="paper-clip" />
                      {file.name} ({this.bytesToSize(file.size)})
                    </Tooltip>
                  </div>
                  <div className="uploadFileBtn" style={{ position: 'absolute', top: 0, right: 10 }}>
                    <StyledButton
                      className="btn-primary btn-xs btn-first"
                      onClick={e => {
                        e.stopPropagation();
                        window.location.href = `${file.down}`;
                      }}
                    >
                      <Icon type="download" />
                    </StyledButton>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </div>
          )}
        </Dragger>
      </div>
    );
  }
}

DragUploadComp.propTypes = {};

DragUploadComp.defaultProps = {};

export default DragUploadComp;
