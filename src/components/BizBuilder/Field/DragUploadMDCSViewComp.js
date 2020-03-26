import React, { Component } from 'react';
import { Icon } from 'antd';
import base64 from 'base-64';

class DragUploadMDCSViewComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }

  download = (sagaKey, response) => {
    console.debug(response);
  };

  onClickDownLoad = url => {
    const {
      CONFIG: {
        property: { selectedValue },
      },
      COMP_FIELD,
    } = this.props;
    const { drmInfo } = selectedValue;
    console.debug('selectedValue', this.props, selectedValue, drmInfo);

    const acl = base64.encode(JSON.stringify(selectedValue));
    // window.location.href = `${url}/${acl}`;
    const downarea = document.querySelector(`#${COMP_FIELD}`);
    const iframe = document.createElement('iframe');
    iframe.style = 'display: none';
    iframe.src = `${url}/${acl}`;
    downarea.appendChild(iframe);
  };

  componentDidMount() {
    const { colData, CONFIG } = this.props;
    console.debug('config', CONFIG);
    const attachList = colData && colData.DETAIL ? colData.DETAIL : [];
    const tmpList = attachList.map(file => {
      let doctype = 'file-unknown';
      switch (file.fileExt) {
        case 'pdf':
          doctype = 'file-pdf';
          break;
        case 'xls':
          doctype = 'file-excel';
          break;
        case 'xlsx':
          doctype = 'file-excel';
          break;
        case 'txt':
          doctype = 'file-text';
          break;
        case 'doc':
          doctype = 'file-word';
          break;
        case 'docx':
          doctype = 'file-word';
          break;
        case 'ppt':
          doctype = 'file-ppt';
          break;
        case 'pptx':
          doctype = 'file-ppt';
          break;
        case 'zip':
          doctype = 'file-zip';
          break;
        default:
          break;
      }
      return { ...file, icon: <Icon type={doctype} style={{ fontSize: '18px', marginRight: '5px' }} /> };
    });
    this.setState({ fileList: tmpList });
  }

  render() {
    const { COMP_FIELD } = this.props;
    const { fileList } = this.state;

    return (
      <div id={COMP_FIELD}>
        <ul>
          {fileList.map(file => (
            <li className={file.fileExt} onClick={() => this.onClickDownLoad(file.down)}>
              {file.icon}
              {file.fileName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default DragUploadMDCSViewComp;
