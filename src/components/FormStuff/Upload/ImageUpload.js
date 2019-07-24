import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, Modal } from 'antd';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const UploadButton = () => (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">Upload</div>
  </div>
);

class ImageUpload extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
  };

  handlePreview = async file => {
    console.debug('@@@@ hanlePreview', file);
    let previewImage = file.preview;
    if (!file.url && !file.preview) {
      previewImage = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || previewImage,
      previewVisible: true,
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  render() {
    const { uploadProps, fileList, limit } = this.props;
    const { previewVisible, previewImage } = this.state;
    return (
      <div className="clearfix">
        <Upload {...uploadProps} fileList={fileList} listType="picture-card" onPreview={this.handlePreview}>
          {fileList.length >= limit ? null : <UploadButton />}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

ImageUpload.propTypes = {
  fileList: PropTypes.arrayOf(PropTypes.object),
  uploadProps: PropTypes.object,
  limit: PropTypes.number,
};

ImageUpload.defaultProps = {
  fileList: [],
  uploadProps: {},
  limit: 3,
};

export default ImageUpload;
