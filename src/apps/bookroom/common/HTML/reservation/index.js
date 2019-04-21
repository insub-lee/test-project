import React from 'react';
import { Button, Modal } from 'antd';
import '../../style/bookroom.css';
import StyleBookroom from '../../style/styleBookroom';

class Reservation extends React.PureComponent {
  state = {
    modal1Visible: false,
    modal2Visible: false,
    modal3Visible: false,
    modal4Visible: false,
  }

  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }
  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }
  setModal3Visible(modal3Visible) {
    this.setState({ modal3Visible });
  }
  setModal4Visible(modal4Visible) {
    this.setState({ modal4Visible });
  }

  render() {
    return (
      <StyleBookroom>
        <section className="br-now">
          {/* 예약정보 보기 모달 */}
          <Modal
            wrapClassName="br-now"
            title="예약정보"
            centered
            visible={this.state.modal1Visible}
            onOk={() => this.setModal1Visible(false)}
            onCancel={() => this.setModal1Visible(false)}
            footer={[
              <Button className="btn-cancel" key="back" onClick={this.handleCancel}>닫기</Button>,
            ]}
          >
            <section className="rsv-form">
              <ul className="rsv-info">
                <li className="person">홍길동 / 정보화 개발
                  <Button className="btn-call">전화걸기</Button>
                  <h3>정보화 개발 홍길동님의 회의</h3>
                  <p>정보화 개발 홍길동님의 회의입니다. 회의내용이 무엇인지 적어주세요. 여기는 회의내용을 적으면 들어갈 영역입니다. </p>
                </li>
                <li className="date">2019-03-11(월) 오늘</li>
                <li className="time">14:00 ~ 15:30</li>
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
          {/*  */}
          {/* 내 예약정보 보기 모달 */}
          <Modal
            wrapClassName="br-now"
            title="내 예약정보"
            centered
            visible={this.state.modal2Visible}
            onOk={() => this.setModal2Visible(false)}
            onCancel={() => this.setModal2Visible(false)}
            footer={[
              <Button className="btn-cancel" key="back" onClick={this.handleCancel}>닫기</Button>,
              <Button className="btn-confirm" key="submit" type="primary" onClick={this.handleOk}>
                예약취소
              </Button>,
            ]}
          >
            <section className="rsv-form">
              <ul className="rsv-info">
                <li className="person">홍길동 / 정보화 개발
                  <h3>정보화 개발 홍길동님의 회의</h3>
                  <p>정보화 개발 홍길동님의 회의입니다. 회의내용이 무엇인지 적어주세요. 여기는 회의내용을 적으면 들어갈 영역입니다. </p>
                </li>
                <li className="date">2019-03-11(월) 오늘</li>
                <li className="time">14:00 ~ 15:30</li>
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
          {/*  */}

          {/* 예약완료 모달 */}
          <Modal
            wrapClassName="br-now rsv-result"
            // title="예약 완료"
            centered
            visible={this.state.modal3Visible}
            onOk={() => this.setModal3Visible(false)}
            onCancel={() => this.setModal3Visible(false)}
          >
            <section className="rsv-form">
              <div className="massage success">
                <h4>회의실 예약이 완료되었습니다.</h4>
              </div>
              <ul className="rsv-info">
                <li className="date">2019-03-11(월) 오늘</li>
                <li className="time">14:00 ~ 15:30</li>
                <li className="location">
                  <dl>
                    <dd>SKHYNIX1</dd>
                    <dd>Package Test 3</dd>
                    <dd>22층</dd>
                  </dl>
                </li>
              </ul>
            </section>
          </Modal>
          {/*  */}

          {/* 예약실패 모달 */}
          <Modal
            wrapClassName="br-now rsv-result"
            // title="예약 실패"
            centered
            visible={this.state.modal4Visible}
            onOk={() => this.setModal4Visible(false)}
            onCancel={() => this.setModal4Visible(false)}
          >
            <section className="rsv-form">
              <div className="massage fail">
                <h4>해당 시간은 예약이 만료되었습니다.</h4>
                <p>예약 가능한 회의실과 시간을 다시 확인해주세요.</p>
              </div>
              <ul className="rsv-info">
                <li className="date">2019-03-11(월) 오늘</li>
                <li className="time">14:00 ~ 15:30</li>
                <li className="location">
                  <dl>
                    <dd>SKHYNIX1</dd>
                    <dd>Package Test 3</dd>
                    <dd>22층</dd>
                    <dd>회의실 201</dd>
                  </dl>
                </li>
              </ul>
            </section>
          </Modal>
          {/*  */}

          <header>
            <span className="btn-home">Home</span>
            <h1>회의 NOW</h1>
          </header>
          <main className="br-now-main">
            <div className="container">
              {/* 예약관련 모달 팝업 버튼 모음 */}
              <br />
              <Button onClick={() => this.setModal1Visible(true)}>
                예약 정보
              </Button>
              <br />
              <br />
              <Button onClick={() => this.setModal2Visible(true)}>
                내 예약 정보
              </Button>
              <br />
              <br />
              <Button onClick={() => this.setModal3Visible(true)}>
                예약 완료
              </Button>
              <br />
              <br />
              <Button onClick={() => this.setModal4Visible(true)}>
                예약 실패
              </Button>
              <br />
              <br />
            </div>
          </main>
        </section>
      </StyleBookroom>
    );
  }
}

export default Reservation;
