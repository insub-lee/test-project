import React from 'react';
import { Button, Modal } from 'antd';
import PropTypes from 'prop-types';

import ImformNote from '../Popup/InformNoteDetailPopup';
import '../assets/styles/pmTabletDetail.css';
// import StylePmTablet from '../assets/styles/stylePmTabletDetail.js';

class HeaderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        infoView: true,
        viewWide: true,
        bview: false,
        iview: false,

        // css
        modal1Visible: false,
        modal2Visible: false,
        modal3Visible: true,
        modal4Visible: false,
        value: 1,
    };
  }

  onClickMore = () => {
    this.setState({ infoView: !this.state.infoView });
    this.props.handleOnClickInfo(this.state.infoView);
  }

  onChangeView = () => {
    this.setState({ viewWide: !this.state.viewWide });
    this.props.handleChangeView(this.state.viewWide);
  }

  onClickInform = () => {
    this.setState({ iview: !this.state.iview });
  }


  onBack = () => {
    this.setState({
      bview: true,
    });
    // this.props.history.push({
    //   pathname: '/sm/pmSheetTablet'
    // });
  }

  handleOk = (e) => {
    this.setState({
      bview: false,
    });
    this.props.history.push({
      pathname: '/sm/pmSheetTablet'
    });
  }

  handleCancel = (e) => {
    this.setState({
      bview: false,
      iview: false,
    });
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
    const data = {
      params: {
        PARAM: this.props.informId,
      },
    };

    return (
      <div>
        <header>
          <Button className="btn-header go-main" onClick={this.onBack}>메인으로</Button>
          {/* 화면 로딩시 케이스별 모달 샘플 임시로 위 버튼에 처리 */}
          {/* 다른 작업자가 해당 항목 작업중인 경우 */}
          <Modal
            width="324px"
            wrapClassName="hypmTablet confirm"
            centered
            closable={false}
            visible={this.state.modal3Visible}
            footer={[
              <Button className="btn-cancel" key="back" onClick={() => this.setModal3Visible(false)}>취소</Button>,
              <Button className="btn-confirm" key="submit" onClick={() => this.setModal3Visible(false)}>
                진행
              </Button>
            ]}
          >
            <div className="confirm">
              <p className="comment">다른 작업자가 Interlock 설정 중입니다.<br />
                계속 진행하시겠습니까?
              </p>
              {/* 기존 작업자에게 alert 제공 */}
              {/* <p className="comment">다른 작업자가<br />
                [30.7~30.10 CH# 분해 작업]을<br />
                시작하였습니다.
              </p> */}
            </div>
          </Modal>
          {/* 모달 끝 */}

          <h1 className="title">HyPM</h1>
          <section className="detail-tool">
            <div className="sheet-info">
              <span className="no">{this.props.hyPmState}</span>
              <Button className={this.state.infoView ? "btn-header more active" : "btn-header more"} onClick={this.onClickMore}>more</Button>
              {/* 버튼 클릭시 자기자신 'active', hypmTablet 'view-info' toggleClass */}
            </div>
            <ul className="btn-area">
              <li><Button className="btn-header inform" onClick={() => this.onClickInform()}>인폼노트</Button></li>
              <li><Button className="btn-header feedback" onClick={() => this.props.handleRenderSet('Notice')}>전달사항 <i className="count">9</i></Button></li>
              <li><Button className="btn-header work">Work <i className="count">9</i></Button></li>
              <li><Button className="btn-header recent">최근 PM Sheet 조회</Button></li>
            </ul>
          </section>
          <aside className="user-area">
            {/* 로그인 정보 */}
            <ul>
              <li className="user-info">작업자 :
                <span className="name">{this.props.collaboratorList.length === 0 ? '' : this.props.collaboratorList[0].WORKER}</span>
                {/* 작업자가 없을 경우 자동으로 '-' 표시 */}
                <i className="count">{this.props.collaboratorList.length === 0 ? '' : this.props.collaboratorList.length-1}</i>
                {/* count 숫자가 없을 경우 자동으로 표시되지 않음 */}
              </li>
              <li><Button className="btn-header change-worker" onClick={() => this.props.handleRenderSet('Collaborator')}>작업자선택</Button></li>
            </ul>
          </aside>
          <aside className="list-view">
            <Button className={this.state.viewWide ? "btn-header list" : "btn-header list active"} onClick={this.onChangeView}>List view</Button>
            {/* 버튼 클릭시 자기자신 'active', hypmTablet 'view-list' toggleClass */}
          </aside>
        </header>
        <Modal
          visible={this.state.bview}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          closable={false}
          width="500px"
        >
          현재까지 작성된 PM Sheet를 저장하고 작업 목록으로 이동합니다.
        </Modal>
        <Modal
          title="InformNote"
          width= '900px'
          visible={this.state.iview}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
          centered={true}
        >
          <ImformNote match={data} />
        </Modal>
      </div>      
    );
  }
}

HeaderView.defaultProps = {
};

HeaderView.propTypes = {
  history: PropTypes.object.isRequired,
  handleRenderSet: PropTypes.func.isRequired,
  collaboratorList: PropTypes.array.isRequired,
  empName: PropTypes.string.isRequired,
  handleOnClickInfo: PropTypes.func.isRequired,
  handleChangeView: PropTypes.func.isRequired,
};

export default HeaderView;

