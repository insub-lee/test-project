import React, { Component } from 'react';

import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledMainWidget from './StyledMainWidget';

class MainWidget extends Component {
  componentDidMount() {}

  render() {
    return (
      <StyledMainWidget>
        <div className="main-widget-section-card">
          <div className="widget-card card1">
            <p className="card-txt">검진 예약인원 수</p>
            <p className="card-num">
              <b>10,000</b> 명
            </p>
            <div className="card-deco"></div>
          </div>
          <div className="widget-card card2">
            <p className="card-txt">검진 예약인원 수</p>
            <p className="card-num">
              <b>10,000</b> 명
            </p>
            <div className="card-deco"></div>
          </div>
          <div className="widget-card card3">
            <p className="card-txt">검진 예약인원 수</p>
            <p className="card-num">
              <b>10,000</b> 명
            </p>
            <div className="card-deco"></div>
          </div>
        </div>
        <div className="main-widget-section widget-left">
          <div className="section-header">
            <h2 className="section-title">
              금일검진예약현황
              <span>(2020.05.27)</span>
            </h2>
          </div>
          <div className="section-body">
            <ul className="reservation-list-area">
              <li>
                <div>
                  <p className="txt1">홍길동(930216-1234567)</p>
                  <span className="txt2">전화번호 : 010.1234.5678</span>
                  <span className="txt3">검진유형 : A형</span>
                </div>
              </li>
              <li>
                <div>
                  <p className="txt1">홍길동(930216-1234567)</p>
                  <span className="txt2">전화번호 : 010.1234.5678</span>
                  <span className="txt3">검진유형 : A형</span>
                </div>
              </li>
              <li>
                <div>
                  <p className="txt1">홍길동(930216-1234567)</p>
                  <span className="txt2">전화번호 : 010.1234.5678</span>
                  <span className="txt3">검진유형 : A형</span>
                </div>
              </li>
              <li>
                <div>
                  <p className="txt1">홍길동(930216-1234567)</p>
                  <span className="txt2">전화번호 : 010.1234.5678</span>
                  <span className="txt3">검진유형 : A형</span>
                </div>
              </li>
            </ul>
            <div className="more-btn-area">
              <button type="button">+ 더보기</button>
            </div>
          </div>
        </div>
        <div className="main-widget-section widget-right">
          <div className="section-header">
            <h2 className="section-title">
              공지사항
              <span>※ 조회할 날짜를 클릭하세요.</span>
            </h2>
          </div>
          <div className="section-body">
            <ul className="section-contents-board">
              <li>
                <a href="#none">
                  <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                  <span className="board-date">2020.04.23</span>
                </a>
              </li>
              <li>
                <a href="#none">
                  <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                  <span className="board-date">2020.04.23</span>
                </a>
              </li>
              <li>
                <a href="#none">
                  <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                  <span className="board-date">2020.04.23</span>
                </a>
              </li>
              <li>
                <a href="#none">
                  <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                  <span className="board-date">2020.04.23</span>
                </a>
              </li>
              <li>
                <a href="#none">
                  <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                  <span className="board-date">2020.04.23</span>
                </a>
              </li>
              <li>
                <a href="#none">
                  <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                  <span className="board-date">2020.04.23</span>
                </a>
              </li>
              <li>
                <a href="#none">
                  <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                  <span className="board-date">2020.04.23</span>
                </a>
              </li>
              <li>
                <a href="#none">
                  <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                  <span className="board-date">2020.04.23</span>
                </a>
              </li>
              <li>
                <a href="#none">
                  <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                  <span className="board-date">2020.04.23</span>
                </a>
              </li>
              <li>
                <a href="#none">
                  <span className="board-txt">매그나칩, 베젤리스 스마트폰 디스플레이용 3세대 40nm 모바일</span>
                  <span className="board-date">2020.04.23</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="main-widget-section widget-bottom">
          <div className="section-header">
            <h2 className="section-title">건강검진 등록 결과 양식</h2>
          </div>
          <div className="section-body">
            <p>건강검진 등록 결과에 대한 문의는 건강검진 창구(000-000-0000)로 전화 주시면 자세하게 안내해 드리겠습니다.</p>
            <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-10">
              <StyledButton className="btn-primary">건강검진결과 등록문서 양식 다운로드</StyledButton>
            </StyledButtonWrapper>
          </div>
        </div>
      </StyledMainWidget>
    );
  }
}

export default MainWidget;
