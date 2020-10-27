/* eslint-disable */
import React from 'react';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import UUID from 'uuid-js';
import jsonToQueryString from '../../../utils/jsonToQueryString';

import StyledUploader from './StyledUploader';
import alertMessage from '../../Notification/Alert';
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
      files: [],
    };
    this.onDrop = this.onDrop.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    if (this.props.files.length > 0) {
      const { files } = this.props;
      const uploaded = [...files];
      this.setState({ uploaded: uploaded, files });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { files } = this.props;
    if (files.length > 0 && files !== prevProps.files) {
      const uploaded = [...files];
      this.setState({ uploaded, files });
    }
  }

  componentWillUnmount() {
    this.setState({ uploaded: [] });
  }

  onDrop(acceptedFiles = [], rejectedFiles = []) {
    if (acceptedFiles.length > 0) {
      // const fileObj = files[0];
      const { rejectFiles, limitCount } = this.props;
      const uploadedfiles = this.state.files;
      let isLimit = false;
      acceptedFiles.forEach(fileObj => {
        if (limitCount !== 0 && limitCount <= uploadedfiles.length) {
          isLimit = true;
        } else if (rejectFiles.findIndex(item => fileObj.name.indexOf(item) > -1) > -1) {
          alert('제한된 형식의 파일입니다.');
        } else {
          this.uploadFile(fileObj);
        }
      });

      if (isLimit) alert(`최대 ${limitCount}개까지 업로드 가능합니다.`);
    }

    if (rejectedFiles.length > 0) {
      if (rejectedFiles.length > 0) {
        const message = `[${fileExtensions.map(text => text.toLowerCase()).join(', ')}] 확장자만 업로드 가능합니다.`;
        window.alert(message);
      }
    }
  }

  async uploadFile(fileObj) {
    const formData = new FormData();
    formData.append('files[]', fileObj);
    const requestQuery = {
      sysId: process.env.REACT_APP_SYSTEM_ID,
      conserveym: '29991231',
      uid: `upload-${UUID.create(1).toString()}`,
    };
    const queryString = jsonToQueryString(requestQuery);
    // const url = `/upload?${queryString}`;
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
      // const { docNo, docNm, extension, down, link, seq, uid } = response;
      const tempFiles = response.map(({ code, fileName, fileType, fileExt, size, fileSize, seq, img, link, down }) => ({
        docNo: seq,
        docNm: fileName,
        extension: fileExt,
        down,
        link: down,
        seq,
        uid: seq,
        id: seq,
        name: fileName,
        code,
        fileType,
        size,
        fileSize,
        img,
      }));
      this.setState(prevState => {
        const { uploaded, files } = prevState;
        // uploaded.push(tempFiles);
        // files.push(tempFiles);
        // uploaded.push({ docNm, extension, down, link, seq, uid });
        // [
        //   {
        //     code: 300,
        //     fileName: '1.PNG',
        //     fileType: 2,
        //     fileExt: 'png',
        //     size: 33685,
        //     fileSize: 33685,
        //     seq: '303595',
        //     img: '/img/thumb/0x0/303595',
        //     link: '/img/thumb/200x200/303595',
        //     down: '/down/file/303595',
        //   },
        // ];
        // uploaded.push({
        //   docNo,
        //   docNm,
        //   extension,
        //   link: down,
        //   seq,
        //   uid,
        //   name: docNm,
        // });
        // files.push(response);
        return {
          uploaded: [...uploaded, ...tempFiles],
          files: [...files, ...tempFiles],
        };
      });
    } else {
      console.debug('# file upload error', error);
      alertMessage.alert('Server Error');
    }
  }

  removeItem(docNo) {
    this.setState(prevState => {
      const { uploaded, files } = prevState;
      console.debug('remove', docNo, uploaded, files);
      const index = uploaded.findIndex(file => file.docNo === docNo);
      const filesIndex = files.findIndex(file => file.docNo === docNo);
      if (index > -1) {
        uploaded.splice(index, 1);
        this.setState({ uploaded });
      }
      if (filesIndex > -1) {
        files.splice(filesIndex, 1);
        this.setState({ files });
      }
    });
  }

  render() {
    const { uploaded, files } = this.state;
    const { previewMode, preName, readOnly } = this.props;
    return (
      <StyledUploader>
        <section>
          <div className="dropzone">
            {!readOnly ? (
              <React.Fragment>
                <Dropzone onDrop={previewMode ? () => false : this.onDrop} multiple={true} maxSize={100000000} accept={extensionsStr}>
                  <p>Drag and drop file</p>
                </Dropzone>
                {console.debug('@ files', files)}
                <input
                  type="hidden"
                  name={`${preName}_UPLOADED_FILES`}
                  value={JSON.stringify(
                    files.map(({ docNo, seq }) => ({
                      docNo,
                      seq: seq ? seq.toString() : undefined,
                    })),
                  )}
                />
                <input type="hidden" name={`${preName}_FILE_PATH`} value={uploaded.map(file => file.link).join(':::')} />
                <input type="hidden" name={`${preName}_FILE`} value={uploaded.map(file => `${file.name}`).join(':::')} />
                <input type="hidden" name={`${preName}_DCONO`} value={uploaded.map(file => `${file.docNo}`).join(':::')} />
                <ul className="upload_list">
                  {uploaded.length === 0 && <li>첨부 파일이 없습니다.</li>}
                  {uploaded.map((file, index) => (
                    <li key={file.id} style={{ minHeight: 30, height: 30, lineHeight: '30px' }}>
                      <a href={file.link} download>
                        <i className="fas fa-paperclip" /> {file.name}
                      </a>
                      <button type="button" className="remove" onClick={() => this.removeItem(file.docNo)}>
                        <i className="fas fa-times" style={{ color: 'red' }} />
                      </button>
                    </li>
                  ))}
                </ul>
              </React.Fragment>
            ) : (
              <ul>
                {uploaded.length === 0 && <li>첨부 파일이 없습니다.</li>}
                {uploaded.map(file => (
                  <li key={file.id} style={{ minHeight: 30, height: 30, lineHeight: '30px' }}>
                    <a href={file.link} download>
                      <i className="fas fa-paperclip" /> {file.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </StyledUploader>
    );
  }
}

Uploader.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object),
  rejectFiles: PropTypes.array,
  limitCount: PropTypes.number,
};

Uploader.defaultProps = {
  files: [],
  rejectFiles: [],
  limitCount: 0,
};

export default Uploader;
