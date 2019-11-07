import React from 'react';

import Wrapper from './Wrapper';
import FileManagerView from './FileManagerView';

const FileManager = () => (
  <Wrapper>
    <div className="title">
      <h3>파일매니저</h3>
    </div>
    <hr />
    <div style={{ minHeight: '500px', height: '500px' }}>
      <FileManagerView />
    </div>
  </Wrapper>
);

export default FileManager;
