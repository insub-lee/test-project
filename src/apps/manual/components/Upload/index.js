import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Upload from './ImageUploader';

class DefaultUploader extends Component {
  state = {
    fileData: {},
  };

  onRemove = file => {
    console.debug('Removed, file', file);
  };

  handleChange = ({ file, fileList }) => {
    console.debug('# change~~~~~', file, fileList);
    const { response } = file;
    if (response && response.code === 300) {
      this.setState({ fileData: response });
    }
  };

  customRequest = ({ action, data, file, filename, headers, onError, onProgress, onSuccess, withCredentials }) => {
    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
    }
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
      })
      .catch(onError);

    return {
      abort() {
        console.log('upload progress is aborted.');
      },
    };
  };

  render() {
    const { fileData } = this.state;
    const { name, readOnly } = this.props;
    return (
      <div>
        <Upload
          fileData={fileData}
          handleChange={this.handleChange}
          customRequest={this.customRequest}
          action="/upload"
          onRemove={this.onRemove}
          disabled={readOnly}
        />
        <input type="hidden" name={name} value={`/img/thumb/0x0/${fileData.seq}`} />
      </div>
    );
  }
}

DefaultUploader.propTypes = {
  name: PropTypes.string,
  readOnly: PropTypes.bool,
};

DefaultUploader.defaultProps = {
  name: '',
  readOnly: false,
};

export default DefaultUploader;
