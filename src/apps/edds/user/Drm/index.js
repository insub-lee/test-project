import React, { Component } from 'react';
import { Icon } from 'antd';

import pngInstall from 'images/edds/install.png';
import pngInstallBox from 'images/edds/install_box.png';
import pngUnInstall from 'images/edds/uninstall.png';
import pngUnInstallBox from 'images/edds/uninstall_box.png';
import StyledDrmInstall from './StyledDrmInstall';

class Drm extends Component {
  render() {
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <div style={{ marginBottom: '10px' }}>
          <p style={{ fontSize: '22px', fontWeight: '500', color: '#000' }}>
            <Icon type="form" /> DRM 설치 / 삭제
          </p>
        </div>
        <StyledDrmInstall>
          <div className="drm_wrap">
            <div className="drm_con drm_con01">
              <div className="drm_box">
                <div className="drm_img drm_img01">
                  <img src={pngInstall} alt="install" />
                </div>
                <div className="drm_img drm_img02">
                  <img src={pngInstallBox} alt="install_box" />
                </div>
              </div>
              <div className="drm_box drm_text">
                <ul>
                  {/* <li>1. <Button type="link" style={{ padding: '0' }} onClick={() => getFileDownload(id, '/down/file/drm/2', 'MAGNACHIP_DocSAFER_EXT.exe')}>[클라이언트 설치 프로그램]</Button>을 클릭하여 설치 파일을 다운로드합니다.</li> */}
                  <li>1. <a href='/down/file/drm/2' download>[클라이언트 설치 프로그램]</a>을 클릭하여 설치 파일을 다운로드합니다.</li>
                  <li>2. 다운로드받은 <span className="pointcolor">DocSafer.exe 파일을 실행</span>합니다.</li>
                  <li>3. [시작] → [프로그램] → [MarkAny ]→ [Document Safer]가 생성된 것을 확인합니다. </li>
                  <li>4. 설치가 완료됩니다.</li>
                </ul>
              </div>
            </div>
            <div className="drm_con drm_con02">
              <div className="drm_box">
                <div className="drm_img drm_img01">
                  <img src={pngUnInstall} alt="uninstall" />
                </div>
                <div className="drm_img drm_img02">
                  <img src={pngUnInstallBox} alt="uninstall" />
                </div>
              </div>
              <div className="drm_box drm_text">
                <ul>
                  <li>1. <a href='/down/file/drm/3' download>[클라이언트 삭제 프로그램]</a>을 클릭하여 삭제 파일을 다운로드합니다.</li>
                  <li>2. 다운로드받은 <span className="pointcolor">DocSafer_delete.exe 파일을 실행</span>합니다.</li>
                  <li>3. 확인 버튼을 클릭합니다. (확인 버튼 클릭 시, Document Safer가 삭제됩니다) </li>
                  <li>4. <span className="pointcolor">"이 메세지를 다시 표시하지 마십시오"</span>에 체크하고, 무시 버튼을 클릭합니다.</li>
                  <li>5. 시스템을 재 부팅합니다.</li>
                </ul>
              </div>
            </div>
          </div>
        </StyledDrmInstall>
      </div>
    );
  }
}

export default Drm;