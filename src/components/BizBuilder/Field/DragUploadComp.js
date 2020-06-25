import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Icon, Upload } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { isJSON } from 'utils/helpers';
import StyledDragger from 'components/CommonStyled/StyledDragger';
import StyledButton from 'components/CommonStyled/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const { Dragger } = Upload;
const imgExts = ['jpg', 'png', 'gif', 'jpeg'];

class DragUploadComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileInfo: [],
      options: {
        MULTIPLE_UPLOAD: 'N', // 복수 업로드 여부
        MULTIPLE_SELECT: 'N', // 복수 파일 선택 여부
        FILTER_EXTENSION: 'N', // 파일 확장자 검열
        EXTENSION_LIST: undefined, // 검열 대상 확장자 목록
      },
      previewImage: [],
      previewVisible: false,
    };
  }

  componentDidMount() {
    const { WORK_SEQ, COMP_FIELD, COMP_TAG, colData, CONFIG } = this.props;
    const initfiles = {
      WORK_SEQ,
      TASK_SEQ: (colData && colData.TASK_SEQ) || -1,
      CONT_SEQ: (colData && colData.CONT_SEQ) || -1,
      FIELD_NM: COMP_FIELD,
      TYPE: COMP_TAG,
      DETAIL: colData && colData.DETAIL ? colData.DETAIL : [],
    };

    const { MULTIPLE_UPLOAD, MULTIPLE_SELECT, FILTER_EXTENSION, EXTENSION_LIST, PREVIEW_SETTING } = CONFIG.property;
    this.setState({
      fileInfo: initfiles,
      options: {
        MULTIPLE_UPLOAD: MULTIPLE_UPLOAD || 'N',
        MULTIPLE_SELECT: MULTIPLE_SELECT || 'N',
        FILTER_EXTENSION: FILTER_EXTENSION || 'N',
        EXTENSION_LIST: EXTENSION_LIST || 'N',
        PREVIEW_SETTING: PREVIEW_SETTING || 'N',
      },
    });
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.colData !== nextProps.colData) {
      const { fileInfo } = this.state;
      this.setState({
        fileInfo: {
          ...fileInfo,
          DETAIL: nextProps.colData.DETAIL,
        },
      });
    }
    return true;
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
    this.setState({ fileInfo: tmpFileInfo }, () => {
      this.changeFormDataHanlder();
      this.handlePreview(file);
    });
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
    const { fileInfo, previewImage } = this.state;
    const { DETAIL: fileList } = fileInfo;
    const idx = fileList.indexOf(file);
    const newFileList = fileList.slice();
    const temp = [...previewImage];
    newFileList.splice(idx, 1);
    temp.splice(idx, 1);
    const newFileInfo = { ...fileInfo, DETAIL: newFileList };
    this.setState({ fileInfo: newFileInfo, previewImage: temp }, () => {
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
        if (this.extensionChecker(name)) {
          this.customRequest(value);
        }
      } else {
        this.customRequest(value);
      }
    }
  };

  extensionChecker = name => {
    const { EXTENSION_LIST } = this.state.options;
    const allowExtensions = EXTENSION_LIST.split(',');
    const originName = name.toUpperCase();

    let uploadable = false;

    allowExtensions.forEach(extension => {
      if (originName.indexOf(extension) > -1) {
        uploadable = true;
      }
    });
    return uploadable;
  };

  getBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file);
    }
    const { previewImage } = this.state;
    const temp = [...previewImage];
    temp.push(file.url || file.preview);
    this.setState({
      previewImage: [...temp],
      previewVisible: true,
    });
  };

  beforeUpload = (file, fileList) => {
    const { size, name } = file;
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
      options,
      previewVisible,
      previewImage,
    } = this.state;

    const { MULTIPLE_SELECT, MULTIPLE_UPLOAD, FILTER_EXTENSION, EXTENSION_LIST, PREVIEW_SETTING } = options;
    const IS_MULTIPLE_UPLOAD_ON = MULTIPLE_UPLOAD === 'Y';
    const IS_PREVIEW_ON = PREVIEW_SETTING === 'Y';
    return (
      <div onDragEnter={e => e.stopPropagation()} onDragOver={e => e.stopPropagation()}>
        <Dragger
          action="/upload"
          onProgress={this.onProgress}
          beforeUpload={this.beforeUpload}
          customRequest={this.preProcessor}
          onChange={this.onChangeHandler}
          showUploadList={false}
          multiple={MULTIPLE_SELECT === 'Y'}
        >
          {fileList && fileList.length > 0 ? (
            <div className="fileZone">
              {fileList.map((file, idx) => (
                <div key={`DragUploadComp > FileList > ${idx}`} style={IS_PREVIEW_ON ? { height: '25px', display: 'inline' } : { height: '25px' }}>
                  <div style={{ verticalAlign: 'middle', height: '28px', display: 'inline-block', cursor: 'pointer' }}>{file.fileName}</div>
                  <Icon
                    onClick={e => {
                      e.stopPropagation();
                      this.onClickRemoveFile(file);
                    }}
                    type="delete"
                    style={{ fontSize: '15px', verticalAlign: 'baseline', marginLeft: '10px' }}
                  />
                  {IS_PREVIEW_ON &&
                    previewVisible &&
                    !IS_MULTIPLE_UPLOAD_ON &&
                    previewImage.length > 0 &&
                    previewImage.map((url, idx) => <img key={idx + url.substring(0, 15)} alt="example" style={{ width: '100%' }} src={url} />)}
                </div>
              ))}
            </div>
          ) : (
            <div className="fileZone">
              {IS_MULTIPLE_UPLOAD_ON && (
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
              )}
              <p className={IS_MULTIPLE_UPLOAD_ON ? `ant-upload-text` : ''}>
                {IS_MULTIPLE_UPLOAD_ON
                  ? FILTER_EXTENSION === 'Y'
                    ? `복수의 ${EXTENSION_LIST} 파일만 업로드 가능합니다.`
                    : `복수의 파일 업로드가 가능합니다.`
                  : FILTER_EXTENSION === 'Y'
                  ? `단일 ${EXTENSION_LIST} 파일만 업로드 가능합니다.`
                  : '클릭 혹은 드래그하세요.'}
              </p>
            </div>
          )}
        </Dragger>
      </div>
    );
  }
}

DragUploadComp.propTypes = {
  CONFIG: PropTypes.objectOf(PropTypes.object),
  changeIsLoading: PropTypes.func,
};

DragUploadComp.defaultProps = {
  changeIsLoading: () => false,
  CONFIG: {
    info: {},
    property: { MULTIPLE_UPLOAD: 'N', MULTIPLE_SELECT: 'N', FILTER_EXTENSION: 'N', EXTENSION_LIST: '' },
    option: {},
  },
};

export default DragUploadComp;
