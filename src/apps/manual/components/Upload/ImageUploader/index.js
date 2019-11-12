import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Upload } from "antd";

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
  render() {
    const { handleChange, fileData, customRequest, action } = this.props;
    return (
      <div className="clearfix">
        <Upload
          accept="image/jpeg, image/png"
          action={action}
          listType="picture-card"
          onChange={handleChange}
          customRequest={customRequest}
          showUploadList={false}
        >
          {fileData && fileData.link ? (
            <img
              src={`/img/thumb/0x0/${fileData.seq}`}
              alt="avatar"
              style={{ width: "100%" }}
            />
          ) : (
            <UploadButton />
          )}
        </Upload>
      </div>
    );
  }
}

ImageUploader.propTypes = {
  action: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  customRequest: PropTypes.func,
  fileList: PropTypes.arrayOf(PropTypes.object)
};

ImageUploader.defaultProps = {
  fileList: [],
  handleChange: () => {},
  customRequest: () => {}
};

export default ImageUploader;
