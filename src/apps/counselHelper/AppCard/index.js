import React from 'react';
import { Modal, Rate } from 'antd';
// import Test from 'containers/portal/App/UserMenuCard/BizMenuCardDetail/BizInfo';
import ModalView from 'containers/portal/App/UserMenuCard/BizMenuCardDetail/modalindex';
import { createBrowserHistory as createHistory } from 'history';
import appImg from '../../../images/icon-app.png';
import Styled from './Styled';
// <a href={`/portal/card/bizMenu/detail/info/${value}`} className="app-card-text">
class AppCard extends React.PureComponent {
  state = {
    visiable: false,
  };

  handleOnclick = () => {
    const { visiable } = this.state;
    this.setState({ visiable: !visiable });
  };

  render() {
    const history = createHistory();
    const { title, value } = this.props;
    const bizInfo = value;
    const match = {
      path: '/portal/card/:TYPE/detail/info/:BIZGRP_ID',
      params: { BIZGRP_ID: value.toString(), TYPE: 'bizMenu' },
      url: `/portal/card/bizMenu/detail/info/${value}`,
    };
    history.location.pathname = `/portal/card/bizMenu/detail/info/${value}`;

    return (
      <Styled className="app-card">
        <div className="app-card-body" onClick={this.handleOnclick} role="presentation">
          <div className="appd-card-icon">
            <img src={appImg} alt="" />
          </div>
          <div className="app-card-text">
            <p>{title}</p>
            <span>상담업무와 관련 메뉴 상세내용은 어쩌고저쩌고</span>
            <Rate allowHalf disabled value={4.5} style={{ fontSize: '12px' }} />
          </div>
        </div>
        <Modal
          width={1154}
          bodyStyle={{ height: 'calc(100vh - 66px)', padding: '4px' }}
          style={{ top: 42 }}
          visible={this.state.visiable}
          footer={null}
          onCancel={this.handleOnclick}
          closable={false}
        >
          <ModalView match={match} history={history} onCancel={this.handleOnclick}></ModalView>
        </Modal>
      </Styled>
    );
  }
}

export default AppCard;
// <MenuCard BIZ_ID={value} TYPE="bizMenu" path="/portal/card/:TYPE/detail/info/:BIZGRP_ID" url={`/portal/card/bizMenu/detail/info/${value}`}></MenuCard>
