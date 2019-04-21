import React, { Component } from 'react';
import * as feed from 'components/Feedback/functions';

import fileIcon from 'apps/hypm_common/css/image/icon/icon_photo.png'

export default class FileTextReaderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  fileClick = () => {
    feed.success('사진 다운로드 서비스 준비 중입니다.');
  }
  render() {
    return (
      <div>
        <span
          onClick={this.fileClick}
          onKeyPress={this.fileClick}
          role="presentation"
        >
          <img src={fileIcon} alt="" style={{ cursor: 'pointer' }} />
        </span>
      </div>
    );
  }
}
