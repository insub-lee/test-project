import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import { Upload, Icon, message, Progress } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

class DragUploadMDCSComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileInfo: {
        WORK_SEQ: -1,
        TASK_SEQ: -1,
        CONT_SEQ: -1,
        FIELD_NM: undefined,
        TYPE: undefined,
        DETAIL: [],
        isUsePDF: undefined,
        extList: undefined,
      },
    };
  }

  componentDidMount() {
    const { sagaKey, changeFormData, WORK_SEQ, COMP_FIELD, COMP_TAG, CONFIG, colData, isRemoveFile } = this.props;
    const initfiles = {
      WORK_SEQ,
      TASK_SEQ: (colData && colData.TASK_SEQ) || -1,
      CONT_SEQ: (colData && colData.CONT_SEQ) || -1,
      FIELD_NM: COMP_FIELD,
      TYPE: COMP_TAG,
      DETAIL: colData && colData.DETAIL ? colData.DETAIL : [],
      isUsePDF: CONFIG && CONFIG.property && CONFIG.property.isUsePDF,
      extList: CONFIG && CONFIG.property && CONFIG.property.fileExt,
    };

    const emptyFiles = {
      WORK_SEQ,
      TASK_SEQ: (colData && colData.TASK_SEQ) || -1,
      CONT_SEQ: (colData && colData.CONT_SEQ) || -1,
      FIELD_NM: COMP_FIELD,
      TYPE: COMP_TAG,
      DETAIL: [],
      isUsePDF: CONFIG && CONFIG.property && CONFIG.property.isUsePDF,
      extList: CONFIG && CONFIG.property && CONFIG.property.fileExt,
    };
    this.setState({ fileInfo: isRemoveFile ? emptyFiles : initfiles });
    if (isRemoveFile) {
      changeFormData(sagaKey, COMP_FIELD, isRemoveFile ? emptyFiles : initfiles);
    }
  }

  changeFormDataHanlder = () => {
    const { sagaKey, changeFormData, COMP_FIELD, WORK_SEQ, changeIsLoading } = this.props;
    const { fileInfo } = this.state;
    changeIsLoading(false);
    changeFormData(sagaKey, COMP_FIELD, fileInfo);
  };

  onUploadComplete = (response, file) => {
    const { fileInfo } = this.state;
    const { DETAIL: fileList } = fileInfo;
    const { fileExt, down } = response;

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
    const tmpDetail = fileList.map(fl => (fl.uid === file.uid ? { ...fl, ...response, type: doctype, down } : fl));
    const tmpFileInfo = { ...fileInfo, DETAIL: tmpDetail };
    this.setState({ fileInfo: tmpFileInfo }, () => this.changeFormDataHanlder());
  };

  customRequest = ({ action, data, file, filename, headers, onError, onProgress, onSuccess, withCredentials }) => {
    const { fileInfo } = this.state;
    const { DETAIL: fileList } = fileInfo;
    const fileItem = {
      isUsePDF: fileInfo.isUsePDF,
      uid: file.uid,
      seq: 0,
      fileName: file.name,
      fileType: 1,
      size: file.size,
      fileExt: '',
      down: '',
      percent: 0,
      type: 'LoadingOutlined',
    };
    fileList.push(fileItem);
    const tmpFileInfo = { ...fileInfo, DETAIL: fileList };
    this.setState({ fileInfo: tmpFileInfo });
    const formData = new FormData();
    formData.append(file.uid, file);
    axios
      .post(action, formData, {
        withCredentials,
        headers,
      })
      .then(({ data: response }) => {
        onSuccess(response, file);
        this.onUploadComplete(response, file);
      })
      .catch(onError);
  };

  onClickRemoveFile = file => {
    const { fileInfo } = this.state;
    const { DETAIL: fileList } = fileInfo;
    const idx = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(idx, 1);
    const newFileInfo = { ...fileInfo, DETAIL: newFileList };
    this.setState({ fileInfo: newFileInfo }, () => {
      const { sagaKey, changeFormData, COMP_FIELD } = this.props;
      const { fileInfo } = this.state;
      changeFormData(sagaKey, COMP_FIELD, fileInfo);
    });
  };

  onClickDownLoadFile = (e, file) => {
    e.stopPropagation();
    window.location.href = `${file.down}`;
  };

  findExt = (fileName, strExtList) => {
    if (strExtList && strExtList !== '') {
      const posIdx = fileName.lastIndexOf('.');
      const ext = fileName.toUpperCase().substring(posIdx + 1);
      const aryExt = strExtList.toUpperCase().split(',');
      return aryExt.includes(ext);
    }
    return true;
  };

  beforeUpload = (file, fileList) => {
    const {
      fileInfo: { extList },
    } = this.state;
    const { size, name } = file;
    const isPossible = this.findExt(name, extList);

    if (!isPossible) {
      message.error(`${name}는 등록할 수 없는 종류의 문서입니다.`);
      return false;
    }

    if (size === 0) {
      message.error(`${name} 0 byte 파일은 업로드 할 수 없습니다 `);
      return false;
    }
    const { changeIsLoading } = this.props;
    changeIsLoading(true);
    return true;
  };

  render() {
    const {
      fileInfo: { DETAIL: fileList },
    } = this.state;

    return (
      <div onDragEnter={e => e.stopPropagation()} onDragOver={e => e.stopPropagation()}>
        <Dragger
          action="/upload/mdcs"
          onProgress={this.onProgress}
          beforeUpload={this.beforeUpload}
          customRequest={this.customRequest}
          onChange={this.onChangeDragger}
          showUploadList={false}
          multiple
        >
          {fileList && fileList.length > 0 ? (
            <div className="fileZone">
              {fileList.map(file => (
                <div style={{ height: '25px' }}></div>
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
        {fileList && fileList.length > 0 && (
          <div className="fileZone" style={{ position: 'absolute', top: '10px', marginLeft: '10px' }}>
            {fileList.map(file => (
              <div style={{ height: '25px' }}>
                {file.type === 'LoadingOutlined' ? (
                  <LoadingOutlined style={{ fontSize: '18px', marginRight: '5px', verticalAlign: 'middle' }} />
                ) : (
                  <Icon type={file.type} style={{ fontSize: '18px', marginRight: '5px', verticalAlign: 'middle' }} />
                )}
                <div style={{ verticalAlign: 'middle', height: '28px', display: 'inline', cursor: 'pointer' }}>{file.fileName}</div>
                <Icon onClick={() => this.onClickRemoveFile(file)} type="delete" style={{ fontSize: '15px', marginLeft: '10px', verticalAlign: 'middle' }} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

DragUploadMDCSComp.propTypes = {
  detail: PropTypes.array,
};

DragUploadMDCSComp.defaultProps = {
  detail: [],
};

export default DragUploadMDCSComp;
