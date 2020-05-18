import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Upload } from 'antd';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
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
            <StyledButton className="btn-sm btn-gray ant-upload-text" style={{ marginBottom: 10 }}>
              <Icon type="plus" style={{ marginRight: 5 }} />
              Image Upload
            </StyledButton>
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
