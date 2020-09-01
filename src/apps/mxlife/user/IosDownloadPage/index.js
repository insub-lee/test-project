import React, { Component } from 'react';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import AppLogo from './image.512x512.png';
//import AppLogo from './kflife.png';
import Styled from './Styled';

class IOSdwonloadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Styled>
        <ContentsWrapper>
          <div className="section hero">
            <div className="container">
              <div className="row">
                <div className="twelve column">
                  <h4 className="hero-heading">
                    <img className="app-img" src={AppLogo} alt="MxLife App" />
                  </h4>
                  <a
                    className="button button-primary download-link"
                    href="itms-services://?action=download-manifest&url=https://mxlife.magnachip.com/install/app/ios/manifest.plist"
                  >
                    IOS 앱 다운로드
                  </a>
                  <br />
                  <br />
                  <a className="help-link" href="https://support.apple.com/ko-kr/HT204460" target="_blank">
                    iOS에서 기업용 앱 신뢰하기 안되는경우
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ContentsWrapper>
      </Styled>
    );
  }
}

export default IOSdwonloadPage;
