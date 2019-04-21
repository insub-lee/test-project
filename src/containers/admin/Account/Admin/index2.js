import React from 'react';
import { fromJS } from 'immutable';
import Upload from 'components/Upload';
import notify from 'components/Notification';

class Accept extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      uploadFiles: [],
    };
    console.log(this.props);

    notify.normal({
      appId: '55',
      type: 'notify/COMMON_NOTIFY',
      message: {
        USE_TYPE: 0,
        MSG_KEY: 'APP_AUTOAUTHREQ',
        TITLE: '새로운 이벤트가 발생했습니다.',
        TITLE_KOR: '새로운 이벤트가 발생했습니다.',
        TITLE_ENG: '@새로운 이벤트가 발생했습니다.',
        TITLE_CHN: '@@새로운 이벤트가 발생했습니다.',
        DSCR: '새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다.',
        DSCR_KOR: '새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다.',
        DSCR_ENG: '@새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다.',
        DSCR_CHN: '@@새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다. 새로운 이벤트가 발생했습니다.',
      },
      link: {
        type: 'out',
        url: 'http://iflow.skhynix.com',
        size: [400, 600],
      },
      images: [],
      buttons: [
        {
          type: 'primary',
          size: 'default',
          value: '확인',
          link: {
            type: 'out',
            url: 'http://iflow.skhynix.com',
            size: [400, 600],
          },
        },
      ],
    });
    this.onFileUploaded = this.onFileUploaded.bind(this);
  }

  onFileUploaded(file) {
    const tmpArr = fromJS(this.state.uploadFiles).toJS();
    tmpArr.push(file);
    console.log('UPLOAD COMPLETE FILE', tmpArr);
    console.log('UPLOAD COMPLETE FILE', this);
    this.setState({
      uploadFiles: tmpArr,
    });
  }
  render() {
    console.log('THIS', this);
    return (
      <section>
        <Upload
          accept="image/jpeg, image/png" // default ALL
          onFileUploaded={this.onFileUploaded}
          multiple={true} // default true
        >
          <div>
            <p>여기에 업로드 하세요. !!!!!</p>
            <ul>
              {
                this.state.uploadFiles.map(f =>
                  <li key={f.seq}>{f.fileName} <img src={f.link} alt={f.fileName} /> </li>)
              }
            </ul>
          </div>
        </Upload>
        <h2>업로드 후 콜백은 이쪽으로.</h2>
      </section>
    );
  }
}

export default Accept;
