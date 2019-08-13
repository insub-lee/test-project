import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { intlObj } from 'utils/commonUtils';
import { Row, Col } from 'antd';
import * as RoutesAction from 'containers/common/Routes/actions';

import Button from '../../../../components/Button';
import MessageTab from './MessageTab';
import SkinTab from './SkinTab';
import LanguageTab from './LanguageTab';
import { onLoadCheck, loadLang } from './actions';
import injectReducer from '../../../../utils/injectReducer';
import injectSaga from '../../../../utils/injectSaga';
import { makeCheckList, makeLanguage, currentView } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import StyleUserSetting from './StyleUserSetting';

class SettingsPopover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skin: '',
      lang: '',
      selected: 'toast',
      active: 1,
    };
  }
  componentDidMount() {
    this.props.onLoadCheck();
    this.props.loadLang();
    // RoutesAction의 디스패쳐
    this.props.loadSkin();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.list !== nextProps.list) {
      this.setState({ list: nextProps.list });
    }
  }

  onModal = () => {
    this.setState({ selected: '토스트 메시지 수신 설정' });
  }
  setMessage = (app, stat) => {
    this.setState({ app, stat });
  }
  setSkin = (skin) => {
    this.props.loadSkin();
    this.setState({ skin });
  }
  setLang = (lang) => {
    this.setState({
      lang,
    });
  }
  closeModal = () => {
    this.setState({ app: '', stat: '' });
  }
  handleSelect = (key) => {
    if (key === 'toast') {
      this.setState({
        selected: key,
        app: '',
        stat: '',
        skin: '',
        lang: '',
        active: 1,
      });
    } else if (key === 'skin') {
      this.setState({
        selected: key,
        app: '',
        stat: '',
        skin: '',
        lang: '',
        active: 2,
      });
    } else {
      this.setState({
        selected: key,
        app: '',
        stat: '',
        skin: '',
        lang: '',
        active: 3,
      });
    }
  }
  render() {

    const { currentView } = this.props;
    let className = "";
    let minHeight;
    switch (currentView) {
      case 'DesktopWide':
      className = "navContent";
        break;
      case 'Desktop':
      className = "navContent";
        break;
      case 'DesktopNarrow':
      className = "navContent";
        break;
      case 'Tablet':
      className = "navContent";
        break;
      default:
      className = "navContentMobile";
    }

    const RenderSettingView = () => {
      if (this.state.app) {
        if (this.state.app === 'all') {
          if (this.state.stat) {
            return (
              <p className="responseTxt">{intlObj.get(messages.all)} {intlObj.get(messages.activate)}</p>
            );
          } else if (!this.state.stat) {
            return (
              <p className="responseTxt">{intlObj.get(messages.all)} {intlObj.get(messages.activate)}</p>
            );
          }
        } else if (this.state.app !== 'all') {
          if (this.state.stat) {
            return (
              <p className="responseTxt">{this.state.app} {intlObj.get(messages.activate)}</p>
            );
          } else if (!this.state.stat) {
            return (
              <p className="responseTxt">{this.state.app} {intlObj.get(messages.inactivate)}</p>
            );
          }
        }
      } else if (!this.state.app) {
        return false;
      }
    };


    return (
      <StyleUserSetting className="userSetting">
        <div className="userSettingWrapper">
          <h2 className="pageHeader">
            설정
          </h2>
          <Row>
            <Col xl={8} className="navigation">
              <nav>
                <ul>
                  <li><Button className={this.state.active === 1 ? 'current' : null} onClick={() => this.handleSelect('toast')} >{intlObj.get(messages.setToastMessage)}</Button></li>
                  <li><Button className={this.state.active === 2 ? 'current' : null} onClick={() => this.handleSelect('skin')} >{intlObj.get(messages.setSkin)}</Button></li>
                  <li><Button className={this.state.active === 3 ? 'current' : null} onClick={() => this.handleSelect('language')} >{intlObj.get(messages.setMultipleLanguage)}</Button></li>
                </ul>
              </nav>
            </Col>
            <Col xl={16} className={className} >
              {this.state.selected === 'toast' ?
                <MessageTab
                  onClose={this.props.closeSetting}
                  message={this.setMessage}
                  list={this.state.list}
                  currentView={this.props.currentView}
                /> :
                false
                }
              {/* 언어별 적용 방법에 대한 고려 필요 */}
              {RenderSettingView()}
                    {/* <BtnDkGray className="InTab" onClick={() => this.props.closeSetting()}>{intlObj.get(messages.close)}</BtnDkGray> */}
                    {this.state.selected === 'skin' ? 
                    <SkinTab onClose={this.closeModal} setSkin={this.setSkin} currentView={this.props.currentView} />
                    :
                    false
                    }
                    {this.state.skin ? <p className="responseTxt">{this.state.skin}테마가 활성화 되었습니다.</p>
                      : false}
                    {/* <BtnDkGray className="InTab" onClick={() => this.props.closeSetting()}>{intlObj.get(messages.close)}</BtnDkGray> */}
                    {this.state.selected === 'language' ?
                    <LanguageTab onClose={this.closeModal} setLang={this.setLang} currentView={this.props.currentView} />
                    :
                    false
                    }
                    {this.state.lang ? <p className="responseTxt">{intlObj.get(messages.selectLanguage)}</p>
                      : false}
                    {/* <BtnDkGray className="InTab" onClick={() => this.props.closeSetting()}>{intlObj.get(messages.close)}</BtnDkGray> */}
              </Col>
            </Row>
          </div>
      </StyleUserSetting>
    );
  }
}

SettingsPopover.propTypes = {
  loadSkin: PropTypes.func.isRequired,
  onLoadCheck: PropTypes.func.isRequired,
  // language 스토어에 있는 locale을 selector로 가져오니,
  // 언어 설정에서 locale값을 변경하면 UserSetting도 함께 리랜더링된다.
  loadLang: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  closeSetting: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  list: makeCheckList(),
  locale: makeLanguage(),
  currentView: currentView(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadCheck: () => dispatch(onLoadCheck()),
    loadLang: () => dispatch(loadLang()),
    loadSkin: () => dispatch(RoutesAction.loadSkin()),
  };
}

const withReducer = injectReducer({ key: 'messagetab', reducer });
const withSaga = injectSaga({ key: 'messagetab', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SettingsPopover);
