import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Modal, Upload } from 'antd';
import axios from 'axios';
import Profile from 'components/OrganizationPopup/Organization/profile';
import { height } from 'window-size';

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const UploadButton = () => (
  <div className="user-img">
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Photo Upload</div>
    </div>
  </div>
);

class ImageUploader extends Component {
  state = {
    previewVisible: false,
    previewImage: this.props.defaultUserPhoto,
    fileList: [],
  };

  componentDidMount() {}

  customRequest = ({ action, file, filename, headers, onError, onProgress, onSuccess, withCredentials }) => {
    const { changeUserInfo } = this.props;
    const formData = new FormData();
    formData.append(filename, file);
    axios
      .post(action, formData, {
        withCredentials,
        headers,
        onUploadProgress: ({ total, loaded }) => {
          onProgress({ percent: Number(Math.round((loaded / total) * 100).toFixed(2)) }, file);
        },
      })
      .then(({ data: response }) => {
        onSuccess(response, file);
        changeUserInfo('PHOTO', response.link.toString());
        this.setState({
          previewImage: `http://dev.portal.com${response.link.toString()}`,
        });
      })
      .catch(onError);
  };

  handleCancel = () => this.setState({ previewVisible: false });

  render() {
    const { previewVisible, previewImage } = this.state;
    const { fileList } = this.state;
    return (
      <div className="clearfix">
        <Upload
          accept="image/jpeg, image/png"
          action="http://dev.portal.com/upload"
          listType="picture-card"
          multiple={false}
          fileList={fileList}
          showUploadList={false}
          customRequest={this.customRequest}
        >
          {previewImage !== null ? <img src={previewImage} style={{ width: '100%' }} /> : <UploadButton />}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

ImageUploader.propTypes = {};

ImageUploader.defaultProps = {
  fileList: [],
  handleChange: () => {},
  customRequest: () => {},
};

export default ImageUploader;
