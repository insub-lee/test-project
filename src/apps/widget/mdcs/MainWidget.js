import React, { Component } from 'react';

import StyledMainWidget from 'commonStyled/MdcsStyled/Wrapper/StyledMainWidget';

// eslint-disable-next-line react/prefer-stateless-function
class MainWidget extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledMainWidget>
        <div className="main-widget-row">
          <div className="main-widget-col col-3">
            <div className="widget-inner widget-notice widget-black">
              <div className="widget-title">
                알림판
                <a href="#none" className="btn-more">
                  <span className="hidden">알림판 게시판으로 이동</span>
                </a>
              </div>
              <ul className="widget-board">
                <li>
                  <a href="#none">
                    <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                    <span className="board-etc">2020.04.21</span>
                  </a>
                </li>
                <li>
                  <a href="#none">
                    <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                    <span className="board-etc">2020.04.21</span>
                  </a>
                </li>
                <li>
                  <a href="#none">
                    <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                    <span className="board-etc">2020.04.21</span>
                  </a>
                </li>
                <li>
                  <a href="#none">
                    <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                    <span className="board-etc">2020.04.21</span>
                  </a>
                </li>
                <li>
                  <a href="#none">
                    <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                    <span className="board-etc">2020.04.21</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="main-widget-col col-3">
            <div className="widget-inner widget-bookmark">
              <div className="widget-title">
                즐겨찾기
                <a href="#none" className="btn-more">
                  <span className="hidden">즐겨찾기 게시판으로 이동</span>
                </a>
              </div>
              <ul className="widget-board">
                <li>
                  <a href="#none">
                    <span className="board-txt">
                      <span className="board-icon icon-file-zip"></span>
                      HW SPEC1 Mannual Revision 1
                    </span>
                    <span className="board-etc">890</span>
                  </a>
                </li>
                <li>
                  <a href="#none">
                    <span className="board-txt">가장 많이 본 문서 리스트입니다.</span>
                    <span className="board-etc">890</span>
                  </a>
                </li>
                <li>
                  <a href="#none">
                    <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                    <span className="board-etc">890</span>
                  </a>
                </li>
                <li>
                  <a href="#none">
                    <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                    <span className="board-etc">890</span>
                  </a>
                </li>
                <li>
                  <a href="#none">
                    <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                    <span className="board-etc">890</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="main-widget-col col-3">
            <div className="widget-inner widget-view">
              <div className="widget-title">
                내가 본 문서
                <a href="#none" className="btn-more">
                  <span className="hidden">내가 본 문서 게시판으로 이동</span>
                </a>
              </div>
              <ul className="widget-board">
                <li>
                  <a href="#none">
                    <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                    <span className="board-etc">890</span>
                  </a>
                </li>
                <li>
                  <a href="#none">
                    <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                    <span className="board-etc">890</span>
                  </a>
                </li>
                <li>
                  <a href="#none">
                    <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                    <span className="board-etc">890</span>
                  </a>
                </li>
                <li>
                  <a href="#none">
                    <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                    <span className="board-etc">890</span>
                  </a>
                </li>
                <li>
                  <a href="#none">
                    <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                    <span className="board-etc">890</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="main-widget-row">
          <div className="main-widget-col col-3">
            <div className="widget-inner widget-approve">
              <div className="widget-title">
                결재 요청건
                <a href="#none" className="btn-more">
                  <span className="hidden">결재 요청건 게시판으로 이동</span>
                </a>
              </div>
              <p className="widget-number">
                <strong>
                  09<span></span>
                </strong>
                건
              </p>
              <ul className="widget-board">
                <li>
                  <a href="#none">
                    <span className="board-txt">
                      <span className="highlight">[CP]</span>
                      문서 결재 요청드립니다.
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#none">
                    <span className="board-txt">
                      <span className="highlight">[CP]</span>
                      문서 결재 요청드립니다.
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#none">
                    <span className="board-txt">
                      <span className="highlight">[CP]</span>
                      문서 결재 요청드립니다.
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#none">
                    <span className="board-txt">
                      <span className="highlight">[CP]</span>
                      문서 결재 요청드립니다.
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#none">
                    <span className="board-txt">
                      <span className="highlight">[CP]</span>
                      문서 결재 요청드립니다.
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="main-widget-col col-1-2">
            <div className="widget-hover-inner">
              <a href="#none" className="widget-cover">
                <span className="widget-icon widget-icon2"></span>
                <span className="widget-title-kor">업무표준</span>
                <span className="widget-title-eng">Operating standard</span>
                <span className="widget-item-number">
                  66 <span className="total">/ 120</span>
                </span>
              </a>
            </div>
          </div>
          <div className="main-widget-col col-1-2">
            <div className="widget-hover-inner">
              <a href="#none" className="widget-cover">
                <span className="widget-icon widget-icon3"></span>
                <span className="widget-title-kor">기술표준</span>
                <span className="widget-title-eng">Technical standard</span>
                <span className="widget-item-number">
                  114 <span className="total">/ 120</span>
                </span>
              </a>
            </div>
          </div>
          <div className="main-widget-col col-1-2">
            <div className="widget-hover-inner">
              <a href="#none" className="widget-cover">
                <span className="widget-icon widget-icon4"></span>
                <span className="widget-title-kor">도면</span>
                <span className="widget-title-eng">Drawing</span>
                <span className="widget-item-number">
                  77 <span className="total">/ 120</span>
                </span>
              </a>
            </div>
          </div>
          <div className="main-widget-col col-1-2">
            <div className="widget-hover-inner">
              <a href="#none" className="widget-cover">
                <span className="widget-icon widget-icon5"></span>
                <span className="widget-title-kor">업무절차</span>
                <span className="widget-title-eng">Work Process</span>
                <span className="widget-item-number">
                  120 <span className="total"></span>
                </span>
              </a>
            </div>
          </div>
          <div className="main-widget-col col-1-2 mb-0">
            <div className="widget-hover-inner">
              <a href="#none" className="widget-cover">
                <span className="widget-icon widget-icon7"></span>
                <span className="widget-title-kor">PDP</span>
                <span className="widget-title-eng">Plasma Display Panel</span>
                <span className="widget-item-number">
                  120 <span className="total"></span>
                </span>
              </a>
            </div>
          </div>
          <div className="main-widget-col col-1-2 mb-0">
            <div className="widget-hover-inner">
              <a href="#none" className="widget-cover">
                <span className="widget-icon widget-icon8"></span>
                <span className="widget-title-kor">NPI</span>
                <span className="widget-title-eng">New Product Introduction</span>
                <span className="widget-item-number">
                  120 <span className="total"></span>
                </span>
              </a>
            </div>
          </div>
          <div className="main-widget-col col-1-2 mb-0">
            <div className="widget-hover-inner">
              <a href="#none" className="widget-cover">
                <span className="widget-icon widget-icon9"></span>
                <span className="widget-title-kor">승인서</span>
                <span className="widget-title-eng">Approval document</span>
                <span className="widget-item-number">
                  12 <span className="total">/ 120</span>
                </span>
              </a>
            </div>
          </div>
          <div className="main-widget-col col-1-2 mb-0">
            <div className="widget-hover-inner">
              <a href="#none" className="widget-cover">
                <span className="widget-icon widget-icon10"></span>
                <span className="widget-title-kor">WDS/I-FOUNDRY</span>
                <span className="widget-title-eng">Wireless Distribution System</span>
                <span className="widget-item-number">
                  6 <span className="total">/ 120</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </StyledMainWidget>
    );
  }
}

export default MainWidget;
