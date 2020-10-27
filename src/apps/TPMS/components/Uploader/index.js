import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import UUID from 'uuid-js';
import StyledUploader from './StyledUploader';
import jsonToQueryString from '../../utils/jsonToQueryString';
import service from './service';

const fileExtensions = [
  '.GIF',
  '.BMP',
  '.JPG',
  '.PNG',
  '.XLS',
  '.XLSX',
  '.DOC',
  '.DOCX',
  '.PPT',
  '.PPTX',
  '.TXT',
  '.PDF',
  '.LOG',
  '.CSV',
  '.DAT',
  '.MSG',
  '.ZIP',
  '.RAR',
];
const extensionsStr = fileExtensions.map(extension => `${extension.toLowerCase()}`).join(',');

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploaded: [],
    };
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    const { filePath, fileName, readOnly } = this.props.option;
    const { handleUpload } = this.props;
    if (!readOnly && filePath && fileName) {
      const splittedFilePath = filePath.split('/');
      const fileObj = {
        seq: splittedFilePath[splittedFilePath.length - 1],
        docNo: splittedFilePath[splittedFilePath.length - 2],
        down: filePath,
        docNm: fileName,
      };
      this.setState({ uploaded: [fileObj] });
    }
  }

  async onDrop(acceptedFiles = [], rejectedFiles = []) {
    const { handleUpload } = this.props;
    handleUpload(false);
    console.debug('@ Check handleUpload', handleUpload);
    if (acceptedFiles.length > 0) {
      const fileObj = acceptedFiles[0];
      const formData = new FormData();
      formData.append('files[]', fileObj);
      const requestQuery = {
        sysId: process.env.REACT_APP_SYSTEM_ID,
        conserveym: '29991231',
        uid: `upload-${UUID.create(1).toString()}`,
      };
      const queryString = jsonToQueryString(requestQuery);
      // const url = `/upload/file?${queryString}`;
      // const { response, error } = await axios
      //   .post(url, formData)
      //   .then(res => {
      //     if (res.statusText !== 'OK') {
      //       return Promise.reject(res.data);
      //     }
      //     return res.data;
      //   })
      //   .then(data => ({ response: data }))
      //   .catch(() => ({ error }));
      const { response, error } = await service.post(queryString, formData);
      if (response && !error) {
        const { docNm, extension, down, link, seq, uid, docNo } = response;
        this.setState(
          {
            uploaded: [{ docNm, extension, down, link, seq, uid, docNo }],
          },
          () => handleUpload(true),
        );
      } else {
        // alertMessage.alert('Server Error');
        console.debug('upload error');
      }
    }
    if (rejectedFiles.length > 0) {
      const message = `[${fileExtensions.map(text => text.toLowerCase()).join(', ')}] 확장자만 업로드 가능합니다.`;
      window.alert(message);
    }
  }

  render() {
    const { uploaded } = this.state;
    const { option } = this.props;
    return (
      <StyledUploader>
        <section>
          <div className="dropzone">
            {!option.readOnly ? (
              <React.Fragment>
                <Dropzone onDrop={this.onDrop} multiple={false} maxSize={100000000} accept={extensionsStr}>
                  <p>Drag and drop file</p>
                </Dropzone>
                <input
                  type="hidden"
                  name={`${option.name}_UPLOADED_FILES`}
                  value={JSON.stringify(uploaded.map(({ docNo, seq }) => ({ docNo, seq: seq.toString() })))}
                />
                <ul>
                  {uploaded.map(file => (
                    <li key={file.seq}>
                      <input type="hidden" name={`${option.name}_FILE_PATH`} value={file.down} />
                      <input type="hidden" name={`${option.name}_FILE`} value={`${file.docNm}`} />
                      {/* 
                      <input type="hidden" name={`${option.name}_FILE`} value={`${file.docNm}.${file.extension}`} />
                      */}
                      <a href={file.down} download>
                        {/* 
                        <i className="fas fa-paperclip" /> {`${file.docNm}.${file.extension}`}
                        */}
                        <i className="fas fa-paperclip" /> {`${file.docNm}`}
                      </a>
                    </li>
                  ))}
                </ul>
              </React.Fragment>
            ) : (
              <ul>
                {option.filePath !== undefined && option.fileName !== undefined && (
                  <li>
                    <a href={option.filePath} download>
                      <i className="fas fa-paperclip" /> {option.fileName}
                    </a>
                  </li>
                )}
              </ul>
            )}
          </div>
        </section>
      </StyledUploader>
    );
  }
}

Uploader.propTypes = {
  option: PropTypes.object,
  handleUpload: PropTypes.func,
};

Uploader.defaultProps = {
  option: {},
  handleUpload: () => false,
};

export default Uploader;
