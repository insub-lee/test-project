import React, { PureComponent } from 'react';
import { Tabs, Modal, Input } from 'antd';
import { BtnSearchDkGray } from './buttons.style';
import PropTypes from 'prop-types';

const { TabPane } = Tabs;

class testimg extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      color: '', // 동영상 끝나고 변경
      modalColor: '', // 문서 보기끝나고 변경
      visible: false, 
      playYn: '재생', // 재생 일시정지
      currentTime: '', // 현재 재생시간
      durationTime: '', // 총 재생시간 
      seekBar: 0, // 재생시간에 따른 이동bar
    };
  }
  // 모달
  showModal = () => {
    // if(this.state.color === 'green'){    조건 필요없다함.
    this.setState({
      visible: true,
    });
    // }else{
    //   alert('비디오 시청을 완료 해주세요');
    // }
  }
  // 모달안에 ok버튼
  handleOk = () => {
    this.setState({
      visible: false,
      modalColor: 'green',
    });
  }
  // 모달안에 캔슬버튼
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      modalColor: 'green',
    });
  }
  // 탭 컨트롤 하기위함
  //  handlecallback = (key) => {
  //    if( key === '3' && this.state.color === 'green'){
  //   this.setState({
  //     visible: true,
  //   });
  //     }
  //   }

  // 비디오 종료 시 알림
  optionEnded = (finishText) => {
    alert(finishText); 
    this.setState({
      color: 'green',
    });
  }
  // 비디오 재생시간 .
  playTimecontrolls = () => {
    const video = document.getElementById('video');
    // 재생시간에 따른 재생바 이동
    const value = (100 / video.duration) * video.currentTime;
    // 화면에 보여질  전체 재생시간
    const { duration } = video;
    let durationmin = Math.floor(duration / 60);
    let durationsec = Math.floor(duration - (durationmin * 60));
    if (durationmin < 10) {
      durationmin = `0${durationmin}`;
    }
    if (durationsec < 10) {
      durationsec = `0${durationsec}`;
    }
    const durationTotal = `${durationmin}:${durationsec}`;
    // 현재 재생시간
    const current = video.currentTime;
    let currentmin = Math.floor(current / 60);
    let currentsec = Math.floor(current - (currentmin * 60));
    if (currentmin < 10) {
      currentmin = `0${currentmin}`;
    }
    if (currentsec < 10) {
      currentsec = `0${currentsec}`;
    }
    const currentTotal = `${currentmin}:${currentsec}`;

    this.setState({
      currentTime: currentTotal,
      durationTime: durationTotal,
      seekBar: value,
    });
  }
  // 전체화면 풀스크린 
  test = (e) => {
    console.log('언제들어오나', e);
  }
  // 전체화면 기능
	fullScreenControls = () => {
    const video = document.getElementById('video');
	  if (video.requestFullscreen) {
		video.requestFullscreen();
	  } else if (video.mozRequestFullScreen) {
		video.mozRequestFullScreen(); // Firefox
	  } else if (video.webkitRequestFullscreen) {
		video.webkitRequestFullscreen(); // Chrome and Safari
	  }
	};

  // 비디오 클릭 일시정지 재생 보여주기
  playPauseControls = () => {
    const video = document.getElementById('video');
    if (video.paused) {
      // Play the video
      video.play();
      this.setState({
        playYn: '재생',
      });
    } else {
      // Pause the video
      video.pause();
      this.setState({
        playYn: '일시중지',
      });
    }
  }

  render() {
    const {
      color,
      modalColor,
      playYn,
      currentTime,
      durationTime,
      seekBar,
    } = this.state;
    const{
      imgdesc // 전에 값에서 선택된 데이터 desc 
    } = this.props;
    console.log('이미지디이에스시', imgdesc);
    return (
      <div>
      <section className="pmSheet-guide">
        <button className="btn-expand" onClick={this.props.handleOnClickSideBtn}>확대</button>
        {/* 클릭시 hypmTablet toggleClass 'expand-guide' */}
        <div className="guide-area">
          <h3 className="required">가이드</h3>
          <Tabs defaultActiveKey="1" type="card" >
            <TabPane tab={<span className="check">사진</span>} key="1">
            {/* 확인중, 확인완료, 미확인 = check, checked, uncheck */}
              <div className="photo">
                <img alt="asd" src="http://cdn.skhynix.com/img/thumb/166x124/93575" style={{ width: 480, height: 230 }} />
                <button className="full-screen">Fullscreen</button>
                  {/* <div className="full-screen">
                    이미지
                    <button className="full-screen-exit">Fullscreen</button>
                  </div> */}
              </div>
            </TabPane>
            <TabPane tab={<span className="checked">동영상</span>} key="2">
              <div className="video">
                <video
                  id="video"
                  width="480"
                  height="230"
                  controls
                  onTimeUpdate={this.playTimecontrolls}
                  onEnded={() => this.optionEnded('동영상 시청이 끝났습니다')}
                >
                  <source src="http://cdn.skhynix.com/down/file/93596" type="video/mp4" />
                  <track src="" kind="captions" srcLang="en" label="English" />
                </video>
              </div>
              <div id="video-controls">
                <BtnSearchDkGray
                  id="play-pause"
                  style={{ backgroundColor: modalColor }}
                  onClick={this.playPauseControls}
                >{playYn}
                </BtnSearchDkGray>
                {currentTime} 
                <Input
                  type="range"
                  id="seek-bar"
                  value={seekBar}
                  style={{ width: 180 }}
                  readOnly
                />
                {durationTime}
                <BtnSearchDkGray
                  id="full-screen"
                  style={{ backgroundColor: modalColor }}
                  onClick={this.fullScreenControls}
                >
                전체화면
                </BtnSearchDkGray>
              </div>
            </TabPane>
            <TabPane tab={<span className="uncheck" onClick={this.showModal}>문서</span>} key="3" />
          </Tabs>
          <Modal
            title="국소배기 및 FCE 실시"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <div style={{ width: '520', height: '300' }}>
              <table border="1">
                <tr>
                  <td>
                    <img alt="img1" src="http://cdn.skhynix.com/img/thumb/178x125/93579" style={{ width: 300, height: 200 }} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <img alt="img2" src="http://cdn.skhynix.com/img/thumb/0x0/93580" style={{ width: 150, height: 100 }} />
                    <img alt="img3" src="http://cdn.skhynix.com/img/thumb/0x0/93582" style={{ width: 150, height: 100 }} />
                  </td>
                </tr>
              </table>
            </div>
          </Modal>
          </div>
          <div className="comment-area">
            <h3>Comment</h3>
            <ol>
              <li>해당 챔버 선택, Main Page, FCE 실행 (PS2 녹색 점등되면 완료)</li>
            </ol>
          </div>
          <aside className="no-result">
            <p>HyPM 작업을 위한<br /> 안내 가이드가 제공될 영역입니다.</p>
          </aside>        
        </section>
      </div>
    );
  }
}

testimg.propTypes = {
  handleOnClickSideBtn: PropTypes.func.isRequired
};

export default testimg;
