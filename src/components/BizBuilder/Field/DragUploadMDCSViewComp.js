import React, { Component } from 'react';
import { Icon } from 'antd';
import base64 from 'base-64';
import uuid from 'uuid/v1';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

class DragUploadMDCSViewComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      isOriginDownload: false,
    };
  }

  onClickDownLoad = (url, fileName, isOrigin) => {
    const {
      sagaKey,
      CONFIG: {
        property: { selectedValue },
      },
      getFileDownload,
    } = this.props;
    const tempSelectedValue = { [uuid()]: 1, ...selectedValue };
    const acl = base64.encode(JSON.stringify(tempSelectedValue));
    const fileUrl = `${url}/${acl}`;
    console.debug(url);

    getFileDownload(sagaKey, isOrigin ? url.replace('/mdcsfile/', '/file/') : fileUrl, fileName);
  };

  componentDidMount() {
    const { colData, CONFIG, fieldSelectData, profile } = this.props;
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

    let isOriginDownload = false;
    if (
      CONFIG &&
      CONFIG.property.originDownGroupIds &&
      CONFIG.property.originDownGroupIds.length > 0 &&
      profile &&
      profile.ACCOUNT_IDS_DETAIL &&
      profile.ACCOUNT_IDS_DETAIL.V
    ) {
      const vGroup = profile.ACCOUNT_IDS_DETAIL.V.split(',');
      CONFIG.property.originDownGroupIds.forEach(node => {
        if (vGroup.findIndex(iNode => iNode === node) > -1) isOriginDownload = true;
      });
    }
    this.setState({ fileList: tmpList, isOriginDownload });
  }

  render() {
    const { COMP_FIELD } = this.props;
    const { fileList, isOriginDownload } = this.state;

    return (
      <div id={COMP_FIELD}>
        <ul>
          {fileList.map(file => (
            <li className={`${file.fileExt} file-list`}>
              <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>{file.icon}</span>
              <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>{file.fileName}</span>
              {isOriginDownload ? (
                <StyledButton className="btn-light btn-xxs ml5" onClick={() => this.onClickDownLoad(file.down, file.fileName, true)}>
                  원본파일
                </StyledButton>
              ) : (
                ''
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default DragUploadMDCSViewComp;
