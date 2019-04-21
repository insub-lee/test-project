import React, { Component } from 'react';
import * as feed from 'components/Feedback/functions';

import fileIcon from 'apps/hypm_common/css/image/icon/icon_file.png'

export default class FileImgReaderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  fileTextClick = () => {
    feed.success('PM 문서 다운로드 서비스 준비 중입니다.');
  }
  render() {
    return (
      <div>
        <span
          onClick={this.fileTextClick}
          onKeyPress={this.fileTextClick}
          role="presentation"
        >
          <img src={fileIcon} alt="" style={{ cursor: 'pointer' }} />
        </span>
      </div>
    );
  }
}
