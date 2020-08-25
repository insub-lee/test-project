import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Icon, Upload, Modal } from 'antd';

import StyledButton from 'components/CommonStyled/StyledButton';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import message from 'components/Feedback/message';

const { Dragger } = Upload;
const imgExts = ['jpg', 'png', 'gif', 'jpeg'];

const AntdModal = StyledAntdModal(Modal);

class UploadComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      preview: '',
      modalVisible: false,
    };
  }

  componentDidMount() {
    const { file } = this.props;
    if (file && JSON.stringify(file) !== '{}') {
      this.setState({ file, preview: `/down/file/${file.seq}` });
    }
  }

  changeFormDataHanlder = () => {
    const { spinningOff, changeFormData, target } = this.props;
    const { file } = this.state;

    spinningOff();
    changeFormData({ ...file, newFile: true, target });
  };

  onUploadComplete = (response, file) => {
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
    this.setState({ file: { ...file, ...response, type: doctype, down } }, () => {
      this.changeFormDataHanlder();
      this.handlePreview(file);
    });
  };

  customRequest = ({ action, data, file, filename, headers, onError, onProgress, onSuccess, withCredentials }) => {
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
    this.setState({ file: {}, preview: '' });
  };

  onClickDownLoadFile = (e, file) => {
    e.stopPropagation();
    window.location.href = `${file.down}`;
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
      this.setState({
        preview: await this.getBase64(file),
      });
    }
  };

  beforeUpload = file => {
    const { size, name } = file;
    if (size === 0) {
      message.error(`${name} 0 byte 파일은 업로드 할 수 없습니다 `);
      return false;
    }
    const { spinningOn } = this.props;
    spinningOn();
    return true;
  };

  handleModalVisible = () => this.setState(prevState => ({ modalVisible: !prevState.modalVisible }));

  render() {
    const { file, preview, modalVisible } = this.state;
    return (
      <div onDragEnter={e => e.stopPropagation()} onDragOver={e => e.stopPropagation()}>
        <Dragger
          action="/upload"
          onProgress={this.onProgress}
          beforeUpload={this.beforeUpload}
          customRequest={this.customRequest}
          onChange={this.onChangeHandler}
          showUploadList={false}
          multiple={false}
        >
          {JSON.stringify(file) !== '{}' ? (
            <div className="fileZone">
              <div style={{ height: '25px' }}>
                <div style={{ verticalAlign: 'middle', height: '28px', display: 'inline-block', cursor: 'pointer' }}>{file.fileName}</div>
                <Icon
                  onClick={e => {
                    e.stopPropagation();
                    this.onClickRemoveFile(file);
                  }}
                  type="delete"
                  style={{ fontSize: '15px', verticalAlign: 'baseline', marginLeft: '10px' }}
                />
              </div>
              {preview && (
                <img
                  alt="example"
                  style={{ width: '500px', height: '350px' }}
                  src={preview}
                  onClick={e => {
                    e.stopPropagation();
                    return this.handleModalVisible();
                  }}
                />
              )}
            </div>
          ) : (
            <div className="fileZone" style={{ width: '500px', height: '350px', lineHeight: '350px' }}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
                <span>클릭 혹은 드래그로 사진을 Upload 하십시오.</span>
              </p>
            </div>
          )}
        </Dragger>
        <AntdModal
          className="modal-table-pad"
          title={null}
          visible={modalVisible}
          width={800}
          onCancel={this.handleModalVisible}
          footer={
            <StyledButton className="btn-gray btn-sm mr5" onClick={this.handleModalVisible}>
              닫기
            </StyledButton>
          }
          destroyOnClose
        >
          <img alt="example" style={{ width: '100%' }} src={preview} />
        </AntdModal>
      </div>
    );
  }
}

UploadComp.propTypes = {
  file: PropTypes.object,
  spinningOff: PropTypes.func,
  spinningOn: PropTypes.func,
  changeFormData: PropTypes.func,
  target: PropTypes.string,
};

UploadComp.defaultProps = {
  file: {},
  spinningOff: () => {},
  spinningOn: () => {},
  changeFormData: () => {},
  target: '',
};

export default UploadComp;
