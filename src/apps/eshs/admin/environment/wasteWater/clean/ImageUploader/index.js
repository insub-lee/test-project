import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Upload } from 'antd';
import StyledImageUploader from './StyledImageUploader';

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleChange, fileList, listType, action, accept, previewImage, imgUrl, imgBool } = this.props;
    return (
      <StyledImageUploader>
        <Upload accept={accept} action={action} listType={listType} fileList={fileList} onChange={handleChange}>
          {fileList.length >= 1 ? null : (
            <Button className="ant-upload-text">
              <Icon type="plus" />
              Image Upload
            </Button>
          )}
        </Upload>
        {imgBool ? (
          <>{fileList && previewImage ? <img alt="uploadImage" style={{ width: '100%' }} src={previewImage} /> : ''}</>
        ) : (
          <>{imgUrl ? <img alt="uploadImage" style={{ width: '100%' }} src={imgUrl} /> : ''}</>
        )}
      </StyledImageUploader>
    );
  }
}

ImageUploader.propTypes = {
  action: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  listType: PropTypes.string,
  accept: PropTypes.string,
  previewImage: PropTypes.any,
  imgUrl: PropTypes.any,
  imgBool: PropTypes.bool,
  fileList: PropTypes.arrayOf(PropTypes.object),
};

ImageUploader.defaultProps = {
  fileList: [],
  handleChange: () => {},
};

export default ImageUploader;
