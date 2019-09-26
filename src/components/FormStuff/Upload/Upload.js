import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Upload as AntdUpload, Icon, Modal } from 'antd';

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

class Upload extends Component {
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

  render() {
    const { handleChange, fileList, customRequest, action, limit } = this.props;
    const { previewVisible, previewImage } = this.state;
    return (
      <div className="clearfix">
        <AntdUpload
          action={action}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={handleChange}
          customRequest={customRequest}
        >
          {fileList.length >= limit ? null : <UploadButton />}
        </AntdUpload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

Upload.propTypes = {
  action: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  customRequest: PropTypes.func,
  fileList: PropTypes.arrayOf(PropTypes.object),
};

Upload.defaultProps = {
  fileList: [],
  handleChange: () => {},
  customRequest: () => {},
  limit: 3,
};

export default Upload;
