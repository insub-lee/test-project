import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Modal, Upload } from 'antd';

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const UploadButton = () => (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">Upload</div>
  </div>
);

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
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
    const { previewVisible, previewImage } = this.state;
    const { handleChange, fileList, customRequest, action, accept } = this.props;
    return (
      <div className="clearfix">
        <Upload
          accept="image/jpeg, image/png"
          action={action}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={handleChange}
          customRequest={customRequest}
        >
          {fileList.length >= 3 ? null : <UploadButton />}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

ImageUploader.propTypes = {
  action: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  customRequest: PropTypes.func,
  fileList: PropTypes.arrayOf(PropTypes.object),
};

ImageUploader.defaultProps = {
  fileList: [],
  handleChange: () => {},
  customRequest: () => {},
};

export default ImageUploader;
