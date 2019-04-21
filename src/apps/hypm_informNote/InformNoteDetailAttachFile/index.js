import React, { PureComponent } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Button } from 'antd';

let informNoteNo;
let edmsmode; 
let edmsCallBack;
let htnBtnID;
let hdnUid;
class InformNoteDetailAttachFile extends PureComponent {
  constructor(props) {
    super(props);
    
    const { params } = props.match;
    const { PARAM } = params;
    let arrParam = [];
    arrParam = PARAM.split('|');
    informNoteNo = arrParam[0] === '' ? '' : arrParam[0];
    edmsmode = arrParam[1] === '' ? '' : arrParam[1];
    edmsCallBack = arrParam[2] === '' ? '' : arrParam[2];
    htnBtnID = arrParam[3] === '' ? '' : arrParam[3];
    hdnUid = arrParam[4] === '' ? '' : arrParam[4];
  }

  closePopup = () => {
    window.close();
  }

  render() {
    return (
      <section className="gipms popup">
        <header>
          <h2 className="title">File Attach</h2>
        </header>
        {/* popup contnent */}
        <div>
          <div style={{width: '800px', height: '100px'}}></div>
          1회당 파일 100개 / 총 용량 300MB를 초과할 수 없습니다.
        </div>
        <div className="btn-group">
          <div className="right">
            {edmsmode !== 'R' ? <Button type="primary" onClick={this.savePopup} className="btn-apply save">저장</Button> : false}
            <Button type="primary" onClick={this.closePopup} className="btn-apply save">닫기</Button>
          </div>
        </div>
      </section>
    );
  }
}

export default InformNoteDetailAttachFile;
