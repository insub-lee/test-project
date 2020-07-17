import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { message, Progress } from 'antd';
import * as feed from 'components/Feedback/functions';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropzoneActive: false,
      // isSpinnerShow: false,
      percent: 0,
      progressBarShow: false,
      status: 'normal',
    };
  }

  onDropFiles = (accepted, rejected) =>
    new Promise(() => {
      if (accepted.length > 0) {
        accepted.forEach(item => {
          this.sendFileDirect(item);
        });
      } else {
        console.debug('REJECTED FILES', rejected);
        feed.error('Retected files', 'Check file type or file size');
      }
    });

  onDragEnter = () => {
    this.setState({
      dropzoneActive: true,
    });
  };

  onDragLeave = () => {
    this.setState({
      dropzoneActive: false,
    });
  };

  sendFileDirect = fileObj => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    this.setState({
      // isSpinnerShow: true,
      progressBarShow: true,
      percent: 0,
      status: 'active',
    });
    this.increase();
    formData.append('file', fileObj);
    // console.log(formData);
    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 201) {
        // console.log('UploaderWithBlockList :', xhr.responseText);
        const data = JSON.parse(xhr.response);
        // console.log(data);
        const agent = navigator.userAgent.toLowerCase();
        if ((navigator.appName === 'Netscape' && agent.indexOf('trident') !== -1) || agent.indexOf('msie') !== -1) {
          const tmpFileForIE = data.fileName.split('\\');
          // console.log(tmpFileForIE);
          const localFileName = tmpFileForIE[tmpFileForIE.length - 1];
          // console.log(localFileName);
          data.fileName = localFileName;
        }
        this.handleCallback(data);
      } else {
        this.setState({
          status: 'exception',
        });
        message.error('Uploading failed');
        console.error(xhr.responseText);
      }
    };

    const serviceKey = this.props.serviceKey || '';

    if (this.props.serviceEnv !== 'real') {
      xhr.open('POST', `/upload/?key=${serviceKey}`);
    } else {
      xhr.open('POST', `http://cdn.portal.com/upload/?key=${serviceKey}`);
    }
    xhr.send(formData);
  };

  increase = () => {
    const percent = this.state.percent + 1;
    if (percent > 100) {
      clearTimeout(this.tm);
      return;
    }
    this.setState({ percent });
    this.tm = setTimeout(this.increase, 40);
    if (percent === 100) {
      this.setState({ status: 'success' });
    }
  };

  handleCallback = obj => {
    this.props.onFileUploaded(obj);
    this.setState(
      {
        progressBarShow: false,
      },
      function start() {
        if (this.state.status === 'success') {
          message.success('Uploading finished', 2.5);
          this.setState({
            percent: 0,
          });
        }
      },
    );
  };

  render() {
    const { children, accept, multiple, width, height, borderWidth, borderColor, borderRadius, borderStyle, maxSize } = this.props;
    const { dropzoneActive, progressBarShow, status, percent } = this.state;
    const style = {
      width,
      height,
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
    };
    const overlayStyle = {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      padding: '2.5em 0',
      background: 'rgba(0,0,0,0.5)',
      textAlign: 'center',
      color: '#fff',
      height: '100%',
      width: '100%',
    };
    // const styleSpinner = {
    //   marginTop: '40px',
    //   marginLeft: '-17px',
    //   width: '100%',
    //   position: 'absolute',
    //   zIndex: '100',
    // };
    return (
      <section>
        <div className="dropzone">
          {/* <Spin size="small" style={styleSpinner} spinning={this.state.isSpinnerShow} /> */}
          <Dropzone
            style={style}
            accept={accept || ''}
            onDrop={this.onDropFiles}
            onDragEnter={this.onDragEnter}
            onDragLeave={this.onDragLeave}
            multiple={multiple && true}
            maxSize={maxSize}
          >
            {dropzoneActive && <div style={overlayStyle}>Drop files...</div>}
            {children}
            <Progress type="line" percent={percent} status={status} size="small" showInfo={false} style={{ display: progressBarShow ? 'block' : 'none' }} />
          </Dropzone>
        </div>
      </section>
    );
  }
}
Upload.propTypes = {
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
  borderStyle: PropTypes.string,
  borderRadius: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.object.isRequired,
  multiple: PropTypes.bool, // eslint-disable-line
  accept: PropTypes.string, // eslint-disable-line
  onFileUploaded: PropTypes.func.isRequired,
  serviceEnv: PropTypes.string, // eslint-disable-line
  serviceKey: PropTypes.string, // eslint-disable-line
  maxSize: PropTypes.number,
};

Upload.defaultProps = {
  width: '100%',
  height: '100%',
  borderWidth: 2,
  borderColor: 'rgb(102, 102, 102)',
  borderStyle: 'dashed',
  borderRadius: 5,
  maxSize: 1 / 0,
};

export default Upload;
