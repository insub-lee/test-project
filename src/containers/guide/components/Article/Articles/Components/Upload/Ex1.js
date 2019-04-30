import React, { PureComponent } from 'react';
import { fromJS } from 'immutable';
import Upload from 'components/Upload';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      uploadFiles: [],
    };
  }

  onFileUploaded = (file) => {
    const { uploadFiles } = this.state;
    const tmpArr = fromJS(uploadFiles).toJS();
    // one file upload 최신 파일만 업로드 되게
    tmpArr.splice(0, 1, file);
    this.setState({
      uploadFiles: tmpArr,
    });
    // this.handleChangeImage(tmpArr[0].seq);
  }

  render() {
    const { uploadFiles } = this.state;
    const appIconUploadArea = {
      position: 'relative',
      display: 'inlineBlock',
      width: '287px',
      height: '140px',
      padding: '18px',
      background: '#f3f3f3',
      marginBottom: '30px',
      borderStyle: 'dashed',
    };

    return (
      <div style={appIconUploadArea}>
        <Upload
          accept="image/jpeg, image/png" // default ALL
          onFileUploaded={this.onFileUploaded}
          multiple={false} // default true
          width={250}
          height={120}
          borderStyle="none"
        >
          <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
            {uploadFiles.length !== 0 ?
              <div>
                <ul>
                  {uploadFiles.map(f => (
                    <div>
                      <img
                        src={`/img/thumb/200x200/${f.seq}`}
                        alt={f.fileName}
                        style={{ width: '100%', maxHeight: 100 }}
                      />
                      <li key={f.fileName}>{f.fileName} - {f.fileSize} bytes</li>
                    </div>
                      ))
                  }
                </ul>
              </div>
              :
              <div>
                Drop files here, or click to select files
              </div>
            }
          </div>
        </Upload>
      </div>
    );
  }
}

const code = `import React, { PureComponent } from 'react';
import { fromJS } from 'immutable';
import Upload from 'components/Upload';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      uploadFiles: [],
    };
  }

  onFileUploaded = (file) => {
    const { uploadFiles } = this.state;
    const tmpArr = fromJS(uploadFiles).toJS();
    // one file upload 최신 파일만 업로드 되게
    tmpArr.splice(0, 1, file);
    this.setState({
      uploadFiles: tmpArr,
    });
    // this.handleChangeImage(tmpArr[0].seq);
  }

  render() {
    const { uploadFiles } = this.state;
    const appIconUploadArea = {
      position: 'relative',
      display: 'inlineBlock',
      width: '287px',
      height: '140px',
      padding: '18px',
      background: '#f3f3f3',
      marginBottom: '30px',
      borderStyle: 'dashed',
    };

    return (
      <div style={appIconUploadArea}>
        <Upload
          accept="image/jpeg, image/png" // default ALL
          onFileUploaded={this.onFileUploaded}
          multiple={false} // default true
          width={250}
          height={120}
          borderStyle="none"
        >
          <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
            {uploadFiles.length !== 0 ?
              <div>
                <ul>
                  {uploadFiles.map(f => (
                    <div>
                      <img
                        src={&#96;/img/thumb/200x200/&#36;{f.seq}&#96;}
                        alt={f.fileName}
                        style={{ width: '100%', maxHeight: 100 }}
                      />
                      <li key={f.fileName}>{f.fileName} - {f.fileSize} bytes</li>
                    </div>
                      ))
                  }
                </ul>
              </div>
              :
              <div>
                Drop files here, or click to select files
              </div>
            }
          </div>
        </Upload>
      </div>
    );
  }
}

export default App;
`;

const title = '-singleUpload 사용법';

const details = 'singleUpload 사용법의 예시입니다.';

export { App, code, title, details };
