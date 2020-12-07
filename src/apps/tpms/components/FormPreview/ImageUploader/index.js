/* eslint-disable */
import React from "react";
import { fromJS } from "immutable";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import axios from "axios";
import UUID from "uuid-js";
import jsonToQueryString from "../../../utils/jsonToQueryString";

import StyledUploader from "./StyledUploader";
import alertMessage from "../../Notification/Alert";

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploaded: []
    };
    this.onDrop = this.onDrop.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    this.setState({ uploaded: fromJS(this.props.files).toJS() });
  }

  componentWillUnmount() {
    this.setState({ uploaded: [] });
  }

  onDrop(files) {
    // const fileObj = files[0];
    files.forEach(fileObj => {
      this.uploadFile(fileObj);
    });
  }

  async uploadFile(fileObj) {
    const formData = new FormData();
    formData.append("files[]", fileObj);
    const requestQuery = {
      sysId: process.env.REACT_APP_SYSTEM_ID,
      conserveym: "29991231",
      uid: `upload-${UUID.create(1).toString()}`
    };
    const queryString = jsonToQueryString(requestQuery);
    const url = `/upload?${queryString}`;
    const { response, error } = await axios
      .post(url, formData)
      .then(res => {
        if (res.statusText !== "OK") {
          return Promise.reject(res.data);
        }
        return res.data;
      })
      .then(data => ({ response: data }))
      .catch(() => ({ error }));
    if (response && !error) {
      const { docNm, extension, down, link, seq, uid } = response;
      this.setState(prevState => {
        const { uploaded } = prevState;
        // uploaded.push({ docNm, extension, down, link, seq, uid });
        uploaded.push({
          docNm,
          extension,
          link: down,
          seq,
          uid,
          name: `${docNm}.${extension}`
        });
        return {
          uploaded
        };
      });
    } else {
      console.debug("# file upload error", error);
      alertMessage.alert("Server Error");
    }
  }

  removeItem(fileSeq) {
    this.setState(prevState => {
      const { uploaded } = prevState;
      const index = uploaded.findIndex(file => file.id === fileSeq);
      if (index > -1) {
        uploaded.splice(index, 1);
        this.setState({ uploaded });
      }
    });
  }

  render() {
    const { uploaded } = this.state;
    const { previewMode, preName, readOnly, files } = this.props;
    return (
      <StyledUploader>
        <section>
          <div className="dropzone">
            {!readOnly ? (
              <React.Fragment>
                <Dropzone
                  onDrop={previewMode ? () => false : this.onDrop}
                  multiple={true}
                  maxSize={100000000}
                >
                  <p>Drag and drop file</p>
                </Dropzone>
                <input
                  type="hidden"
                  name={`${preName}_FILE_PATH`}
                  value={uploaded.map(file => file.link).join(":::")}
                />
                <input
                  type="hidden"
                  name={`${preName}_FILE`}
                  value={uploaded
                    .map(file => `${file.docNm}.${file.extension}`)
                    .join(":::")}
                />
                <ul className="upload_list">
                  {uploaded.length === 0 && <li>첨부 파일이 없습니다.</li>}
                  {uploaded.map((file, index) => (
                    <li
                      key={file.id}
                      style={{ minHeight: 30, height: 30, lineHeight: "30px" }}
                    >
                      <a href={file.link} download>
                        <i className="fas fa-paperclip" /> {file.name}
                      </a>
                      <button
                        type="button"
                        className="remove"
                        onClick={() => this.removeItem(file.id)}
                      >
                        <i className="fas fa-times" style={{ color: "red" }} />
                      </button>
                    </li>
                  ))}
                </ul>
              </React.Fragment>
            ) : (
              <ul>
                {uploaded.length === 0 && <li>업로드된 이미지가 없습니다.</li>}
                {uploaded.map(file => (
                  <li
                    key={file.id}
                    style={{ minHeight: 30, height: 30, lineHeight: "30px" }}
                  >
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

ImageUploader.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object)
};

ImageUploader.defaultProps = {
  files: []
};

export default ImageUploader;
