import React, { Component } from 'react';

class DraftWidget extends Component {
  render() {
    return (
      <div className="grid2">
        <div className="main_bg main_bg3">
          <div className="grid_tit">
            결재 요청 건 <button type="button" onClick="location.href=&#39;../sub/approval.html#1&#39;" className="icon icon_plus_w"></button>
          </div>
          <div className="main_board_tit">
            <strong>
              09<span></span>
            </strong>{' '}
            건
          </div>
          <ul className="main_board2">
            <li>
              <button type="button" onClick="location.href=&#39;../sub/approval.html#1&#39;">
                <span className="txt">
                  <span>[CP]</span> 문서 결재 요청 드립니다.
                </span>
              </button>
            </li>
            <li>
              <button type="button" onClick="location.href=&#39;../sub/approval.html#1&#39;">
                <span className="txt">
                  <span>[CP]</span> Minimal Promo Landing{' '}
                </span>
              </button>
            </li>
            <li>
              <button type="button" onClick="location.href=&#39;../sub/approval.html#1&#39;">
                <span className="txt">
                  <span>[MP]</span> 문서 결재 요청 드립니다.
                </span>
              </button>
            </li>
            <li>
              <button type="button" onClick="location.href=&#39;../sub/approval.html#1&#39;">
                <span className="txt">
                  <span>[IP]</span> Minimal Promo Landing Igor
                </span>
              </button>
            </li>
            <li>
              <button type="button" onClick="location.href=&#39;../sub/approval.html#1&#39;">
                <span className="txt">
                  <span>[CP]</span> 문서 결재 요청 드립니다.
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default DraftWidget;
