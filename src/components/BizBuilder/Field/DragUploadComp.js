import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Icon, Progress, Upload, Button, Tooltip } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

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
    options: {
      MULTIPLE_UPLOAD: 'N', // 복수 업로드 여부
      MULTIPLE_SELECT: 'N', // 복수 파일 선택 여부
      FILTER_EXTENSION: 'N', // 파일 확장자 검열
      EXTENSION_LIST: undefined, // 검열 대상 확장자 목록
    },
    uploadedFiles: '',
  };

  componentDidMount() {
    const { WORK_SEQ, COMP_FIELD, COMP_TAG, colData, CONFIG } = this.props;
    const initfiles = {
      WORK_SEQ,
      TASK_SEQ: -1,
      CONT_SEQ: -1,
      FIELD_NM: COMP_FIELD,
      TYPE: COMP_TAG,
      DETAIL: colData && colData.DETAIL ? colData.DETAIL : [],
    };

    const { MULTIPLE_UPLOAD, MULTIPLE_SELECT, FILTER_EXTENSION, EXTENSION_LIST } = CONFIG.property;
    this.setState({ fileInfo: initfiles, options: { MULTIPLE_UPLOAD, MULTIPLE_SELECT, FILTER_EXTENSION, EXTENSION_LIST } });
  }

  changeFormDataHanlder = () => {
    const { sagaKey, changeFormData, COMP_FIELD, WORK_SEQ } = this.props;
    const { fileInfo } = this.state;
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

    const fileItem = { uid: file.uid, seq: 0, fileName: file.name, fileType: 1, size: file.size, fileExt: '', down: '', percent: 0, type: 'LoadingOutlined' };
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

  preProcessor = value => {
    const { name, size } = value.file;

    if (size > 0 && typeof name === 'string' && name !== '') {
      const {
        options,
        fileInfo: { DETAIL: fileList },
      } = this.state;

      const { MULTIPLE_UPLOAD } = options;

      // 단일 업로드인 경우
      if (MULTIPLE_UPLOAD === 'N' && fileList.length > 0) {
        return;
      }

      const { FILTER_EXTENSION } = options;
      if (FILTER_EXTENSION === 'Y') {
        let uploadable = false;
        const { EXTENSION_LIST } = options;
        const allowExtensions = EXTENSION_LIST.split(',');
        const originName = name.toUpperCase();

        allowExtensions.forEach(extension => {
          if (originName.indexOf(extension) > -1) {
            uploadable = true;
          }
        });

        if (uploadable) {
          this.customRequest(value);
        } else {
          alert(`${allowExtensions} ${originName}`);
        }
      } else {
        this.customRequest(value);
      }
    }
  };

  render() {
    const {
      fileInfo: { DETAIL: fileList },
      options,
    } = this.state;

    const { MULTIPLE_SELECT, MULTIPLE_UPLOAD, FILTER_EXTENSION, EXTENSION_LIST } = options;
    const IS_MULTIPLE_UPLOAD_AVAILBE = MULTIPLE_UPLOAD === 'Y';

    return (
      <div onDragEnter={e => e.stopPropagation()} onDragOver={e => e.stopPropagation()}>
        <Dragger
          action="/upload/mdcs"
          onProgress={this.onProgress}
          customRequest={this.preProcessor}
          onChange={this.onChangeDragger}
          showUploadList={false}
          multiple={MULTIPLE_SELECT === 'Y'}
        >
          {fileList && fileList.length > 0 ? (
            <div className="fileZone">
              {fileList.map((file, idx) => (
                <div key={`DragUploadComp > FileList > ${idx}`} style={{ height: '25px' }}></div>
              ))}
            </div>
          ) : (
            <div className="fileZone">
              {IS_MULTIPLE_UPLOAD_AVAILBE && (
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
              )}
              <p className={IS_MULTIPLE_UPLOAD_AVAILBE ? `ant-upload-text` : ''}>
                {IS_MULTIPLE_UPLOAD_AVAILBE
                  ? FILTER_EXTENSION === 'Y'
                    ? `복수개의 ${EXTENSION_LIST} 파일만 업로드 가능합니다.`
                    : `단일 ${EXTENSION_LIST} 파일만 업로드 가능합니다.`
                  : '클릭 혹은 드래그하세요.'}
              </p>
            </div>
          )}
        </Dragger>
        {fileList && fileList.length > 0 && (
          <div className="fileZone" style={{ position: 'absolute', top: '10px', marginLeft: '10px' }}>
            {fileList.map(file => (
              <div style={{ height: '25px' }}>
                {file.type === 'LoadingOutlined' ? (
                  <LoadingOutlined style={{ fontSize: '18px', marginRight: '5px' }} />
                ) : (
                  <Icon type={file.type} style={{ fontSize: '18px', marginRight: '5px' }} />
                )}
                <div style={{ verticalAlign: 'middle', height: '28px', display: 'inline-block', cursor: 'pointer' }}>{file.fileName}</div>
                <Icon onClick={() => this.onClickRemoveFile(file)} type="delete" style={{ fontSize: '15px', verticalAlign: 'baseline', marginLeft: '10px' }} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

DragUploadComp.propTypes = {
  CONFIG: PropTypes.objectOf(PropTypes.object),
};

DragUploadComp.defaultProps = {
  CONFIG: {
    info: {},
    property: { MULTIPLE_UPLOAD: 'N', MULTIPLE_SELECT: 'N', FILTER_EXTENSION: 'N', EXTENSION_LIST: '' },
    option: {},
  },
};

export default DragUploadComp;
