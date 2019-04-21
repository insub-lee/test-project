import React from 'react';
import { DatePicker, TimePicker, Cascader, Input, Button, Modal, Popover } from 'antd';
import moment from 'moment';
import '../../style/bookroom.css';
import StyleBookroom from '../../style/styleBookroom';

const format = 'HH:mm';
const { TextArea } = Input;
const content1 = (
  <ul className="info-popover">
    <li className="projector">빔프로젝터</li>
    <li className="call-conference">컨퍼런스 콜</li>
    <li className="pc">PC</li>
    <li className="video-conference">화상회의</li>
  </ul>
);
const content2 = (
  <p className="notice">이 회의실은 결제승인이 필요합니다.</p>
);

// const CheckboxGroup = Checkbox.Group;
// const plainOptions = ['인원', '기자재', '용도'];

const options = [{
  value: '사업장1',
  label: '사업장1',
  children: [{
    value: '건물이름이길면',
    label: '건물이름이길면',
    children: [{
      value: '1층',
      label: '1층',
    }],
  }],
}, {
  value: '사업장2',
  label: '사업장2',
  children: [{
    value: '건물2',
    label: '건물2',
    children: [{
      value: '1층',
      label: '1층',
    }],
  }],
}];

class TimeTable extends React.PureComponent {
  state = {
    modal1Visible: false,
    modal2Visible: false,
  }

  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }
  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  render() {
    return (
      <StyleBookroom>
        <section className="br-now">
          {/* 회의실 예약 모달 추가 2019-03-15 */}
          <Modal
            wrapClassName="br-now"
            title="회의실 예약"
            centered
            visible={this.state.modal1Visible}
            onOk={() => this.setModal1Visible(false)}
            onCancel={() => this.setModal1Visible(false)}
            footer={[
              <Button className="btn-cancel" key="back" onClick={this.handleCancel}>닫기</Button>,
              <Button className="btn-confirm" key="submit" type="primary" onClick={this.handleOk}>
                예약
              </Button>,
            ]}
          >
            <section className="rsv-form">
              <ul className="rsv-input">
                <li><Input placeholder="정보화 개발 홍길동님의 회의" /></li>
                <li><TextArea placeholder="정보화 개발 홍길동님의 회의입니다." rows={3} /></li>
              </ul>
              <ul className="rsv-info">
                <li className="date">2019-03-11(월) 오늘</li>
                <li className="time">14:00 ~ 15:30
                  {/* 시간 선택 */}
                  <div className="use-time-select">
                    <Button className="down">-</Button>
                    <span className="use-time-input"><Input value="1시간" /></span>
                    <Button className="up">+</Button>
                    <span className="notice">2시간까지 예약 가능</span>
                  </div>
                </li>
                <li className="location">
                  <dl>
                    <dd>SKHYNIX1</dd>
                    <dd>Package Test 3</dd>
                    <dd>22층</dd>
                  </dl>
                </li>
              </ul>
              <div className="use-guide">
                <h4>회의실 201 이용안내</h4>
                <p>이 회의실은 직원만 출입가능합니다. 협력사와 함께 회의 시 유의바랍니다.</p>
              </div>
            </section>
          </Modal>
          {/* 회의실 예약 모달 끝 */}

          {/* 스크롤시, br-now 에 addClass 'sticky' */}
          <header>
            <span className="btn-home">Home</span>
            <h1>회의 NOW</h1>
          </header>
          <main className="br-now-main">
            <section className="room-setting">
              <div className="selected-room">
                <div className="container">
                  <ul>
                    <li className="date">2019-03-13(월) 오늘</li>
                    <li className="time">현재시각
                      <dl>
                        <dt>소요시간</dt>
                        <dd>1시간 30분</dd>
                      </dl>
                    </li>
                    <li className="location">
                      <dl>
                        <dd>SKHYNIX1</dd>
                        <dd>Package Test 3</dd>
                        <dd>22층</dd>
                      </dl>
                      <dl>
                        <dd>SKHYNIX1</dd>
                        <dd>Package Test 3</dd>
                        <dd>22층</dd>
                      </dl>
                      <dl>
                        <dd>SKHYNIX1</dd>
                        <dd>Package Test 3</dd>
                        <dd>22층</dd>
                      </dl>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="search-room active">
                <div className="container">
                  <ul>
                    <li className="date">
                      <DatePicker dropdownClassName="br-now" />
                    </li>
                    <li className="time">
                      <div className="start-time">
                        <TimePicker popupClassName="br-now" defaultValue={moment('12:08', format)} format={format} />
                      </div>
                      <div className="use-time">
                        {/* use-time 클릭시 addClass 'active' */}
                        <dl>
                          <dt>소요시간</dt>
                          <dd>1시간 30분</dd>
                        </dl>
                      </div>
                      {/* 시간 선택 popover */}
                      <div className="use-time-select-pop">
                        <Button className="down">-</Button>
                        <span className="use-time-input"><Input value="1시간" /></span>
                        <Button className="up">+</Button>
                        <div className="btn-area">
                          <Button className="btn-confirm">적용</Button>
                        </div>
                      </div>
                      {/*  */}
                    </li>
                    <li className="location">
                      <Cascader popupClassName="br-now" options={options} placeholder="사업장/건물/층을 선택해주세요" />
                    </li>
                  </ul>
                  <div className="btn-area">
                    <Button className="research">선호위치로 재조회</Button>
                    <Button className="reset">선호위치설정</Button>
                  </div>
                </div>
                {/* <aside className="option-group">
                  <div className="container">
                    <CheckboxGroup options={plainOptions} />
                  </div>
                </aside> */}
              </div>
              {/* 토글버튼 */}
              <button className="btn-toggle">toggle</button>
              {/*  */}
            </section>

            <section className="table-info">
              <div className="container">
                <div className="date-setting">
                  <Button className="prev" disabled>이전</Button>
                  <Button className="next">다음</Button>
                  <span className="selected-date"><Input value="2019-03-13" readOnly /></span>
                </div>
                <div className="info-tool">
                  <button>회의실 정보 펼치기</button>
                </div>

                {/* 기자재 정보 보기 - hidden 했다가 회의실 정보 펼치기 시 visible */}
                <div className="info-legend">
                  기자재
                  <Popover popupClassName="br-now" placement="bottom" content={content1} trigger="click">
                    <button>정보보기</button>
                  </Popover>
                </div>
                {/*  */}
              </div>
            </section>

            {/* Time Table 시작 */}
            <section className="time-table">
              <div className="container">
                <div className="time-table-item">
                  <div className="time-line-guide">
                    sticky Time Line
                  </div>
                  <div className="time-line-area">
                    {/* 조회결과 없음 추가  */}
                    <div className="no-result">
                      <p>조건에 만족하는 예약가능한<br />회의실이 없습니다.</p>
                    </div>
                    {/*  */}
                    {/* 회의실 예약 오픈 테스트 */}
                    <br /><br />
                    <Button onClick={() => this.setModal1Visible(true)}>
                      회의실예약 TEST
                    </Button>
                    <br /><br />
                    {/*  */}
                    {/* Room별 정보 보기 / 기본 width: 20px, active 시에는 190px / style에 정의되어있음 */}
                    <div className="room-info">
                      <span className="room-name">RC 2-10 회의실</span>
                      <div className="info-legend-room active">
                        <ul>
                          <li className="notice"><Popover popupClassName="br-now" placement="bottomLeft" content={content2} trigger="click"><button>Notice</button></Popover></li>
                          <li className="view-map"><button onClick={() => this.setModal2Visible(true)}>지도보기</button></li>
                          <li className="tool"><span className="person">정원</span> <span className="number">12</span></li>
                          {/* 프로젝터 PC 콜정보 등은 유무에 따라 yes, no 토글 */}
                          <li className="tool"><span className="projector">빔 프로젝트</span></li>
                          <li className="tool"><span className="pc">PC</span></li>
                          <li className="tool"><span className="call-conference no">컨퍼런스 콜</span></li>
                          <li className="tool video"><span className="video-conference">화상회의</span></li>
                        </ul>
                      </div>
                    </div>
                    <div className="room-info">
                      <span className="room-name">RC 2-10 회의실</span>
                      <div className="info-legend-room active">
                        <ul>
                          <li className="notice"><Popover popupClassName="br-now" placement="bottomLeft" content={content2} trigger="click"><button>Notice</button></Popover></li>
                          <li className="view-map"><button onClick={() => this.setModal2Visible(true)}>지도보기</button></li>
                          <li className="tool"><span className="person">정원</span> <span className="number">12</span></li>
                          {/* 프로젝터 PC 콜정보 등은 유무에 따라 yes, no 토글 */}
                          <li className="tool"><span className="projector">빔 프로젝트</span></li>
                          <li className="tool"><span className="pc">PC</span></li>
                          <li className="tool"><span className="call-conference no">컨퍼런스 콜</span></li>
                          <li className="tool video"><span className="video-conference">화상회의</span></li>
                        </ul>
                      </div>
                    </div>
                    <div className="room-info">
                      <span className="room-name">Challenge Hall(세미나실 - 예약금지)</span>
                      <div className="info-legend-room active">
                        <ul>
                          <li className="notice"><Popover popupClassName="br-now" placement="bottomLeft" content={content2} trigger="click"><button>Notice</button></Popover></li>
                          <li className="view-map"><button onClick={() => this.setModal2Visible(true)}>지도보기</button></li>
                          <li className="tool"><span className="person">정원</span> <span className="number">12</span></li>
                          {/* 프로젝터 PC 콜정보 등은 유무에 따라 yes, no 토글 */}
                          <li className="tool"><span className="projector">빔 프로젝트</span></li>
                          <li className="tool"><span className="pc">PC</span></li>
                          <li className="tool"><span className="call-conference no">컨퍼런스 콜</span></li>
                          <li className="tool video"><span className="video-conference">화상회의</span></li>
                        </ul>
                      </div>
                    </div>
                    <div className="room-info">
                      <span className="room-name">RC 2-10 회의실</span>
                      <div className="info-legend-room active">
                        <ul>
                          <li className="notice"><Popover popupClassName="br-now" placement="bottomLeft" content={content2} trigger="click"><button>Notice</button></Popover></li>
                          <li className="view-map"><button onClick={() => this.setModal2Visible(true)}>지도보기</button></li>
                          <li className="tool"><span className="person">정원</span> <span className="number">12</span></li>
                          {/* 프로젝터 PC 콜정보 등은 유무에 따라 yes, no 토글 */}
                          <li className="tool"><span className="projector">빔 프로젝트</span></li>
                          <li className="tool"><span className="pc">PC</span></li>
                          <li className="tool"><span className="call-conference no">컨퍼런스 콜</span></li>
                          <li className="tool video"><span className="video-conference">화상회의</span></li>
                        </ul>
                      </div>
                    </div>
                    <div className="room-info">
                      <span className="room-name">#1-2 PJT 회의실</span>
                      <div className="info-legend-room active">
                        <ul>
                          <li className="notice"><Popover popupClassName="br-now" placement="bottomLeft" content={content2} trigger="click"><button>Notice</button></Popover></li>
                          <li className="view-map"><button onClick={() => this.setModal2Visible(true)}>지도보기</button></li>
                          <li className="tool"><span className="person">정원</span> <span className="number">12</span></li>
                          {/* 프로젝터 PC 콜정보 등은 유무에 따라 yes, no 토글 */}
                          <li className="tool"><span className="projector">빔 프로젝트</span></li>
                          <li className="tool"><span className="pc">PC</span></li>
                          <li className="tool"><span className="call-conference no">컨퍼런스 콜</span></li>
                          <li className="tool video"><span className="video-conference">화상회의</span></li>
                        </ul>
                      </div>
                    </div>
                    <div className="room-info">
                      <span className="room-name">#1-2 PJT 회의실 (예약금지)</span>
                      <div className="info-legend-room active">
                        <ul>
                          <li className="notice"><Popover popupClassName="br-now" placement="bottomLeft" content={content2} trigger="click"><button>Notice</button></Popover></li>
                          <li className="view-map"><button onClick={() => this.setModal2Visible(true)}>지도보기</button></li>
                          <li className="tool"><span className="person">정원</span> <span className="number">12</span></li>
                          {/* 프로젝터 PC 콜정보 등은 유무에 따라 yes, no 토글 */}
                          <li className="tool"><span className="projector">빔 프로젝트</span></li>
                          <li className="tool"><span className="pc">PC</span></li>
                          <li className="tool"><span className="call-conference no">컨퍼런스 콜</span></li>
                          <li className="tool video"><span className="video-conference">화상회의</span></li>
                        </ul>
                      </div>
                    </div>
                    <br />

                    {/* 지도보기 모달 */}
                    <Modal
                      wrapClassName="br-now view-map"
                      // title="지도 보기"
                      centered
                      visible={this.state.modal2Visible}
                      onOk={() => this.setModal2Visible(false)}
                      onCancel={() => this.setModal2Visible(false)}
                    >
                      <section className="rsv-form">
                        <ul className="rsv-info">
                          <li className="location">
                            <dl>
                              <dd>SKHYNIX1</dd>
                              <dd>Package Test 3</dd>
                              <dd>22층</dd>
                              <dd>회의실 201</dd>
                            </dl>
                          </li>
                        </ul>
                        <div className="map">
                          회의실 지도
                        </div>
                        <div className="use-guide">
                          <p>두 손가락을 이용해 확대가 가능합니다.</p>
                        </div>
                      </section>
                    </Modal>
                    {/*  */}
                    <br /><br />
                  </div>
                </div>
                <div className="time-table-item">
                  <h2>자동취소 임박</h2>
                  <div className="time-line-area">
                    time-table-item
                  </div>
                </div>
                <div className="btn-area">
                  <Button className="view-all active">회의실 전체보기</Button>
                  {/* 전체보기 클릭시 addClass 'active' */}
                </div>
              </div>
            </section>
          </main>
        </section>
      </StyleBookroom>
    );
  }
}

export default TimeTable;
