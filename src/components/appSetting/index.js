import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Loadable from 'react-loadable';
import { intlObj, lang } from 'utils/commonUtils';
import { Form, Button, Radio, Col, Row, Input } from 'antd';
import { Link } from 'react-router-dom';
import * as orgAction from 'containers/portal/components/Organization/actions';
import * as commonjs from 'containers/common/functions/common';
import messages from './messages';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import StyleWidgetSetting from './StyleWidgetSetting';
import AntRadiobox from '../../containers/portal/components/uielements/radiobox.style';
// import { BtnDkGray } from '../../containers/portal/components/uielements/buttons.style';
import Loading from '../Page/Loading';

import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';

import { resetCategory } from '../appSelectorportal/actions';

const RadioGroup = AntRadiobox(Radio.Group);
const FormItem = Form.Item;

let settingPath = false;

class appSetting extends Component {
  constructor(props) {
    super(props);

    const { match } = props;
    const { params } = match;
    const { PAGE_ID, WIDGET_ID } = params;

    this.state = {
      show: false,
      title: "",
      isTitle: true,
      widgetSkin: 1,
      dispSize: '1X1',
      display: 1,
      PAGE_ID: Number(PAGE_ID),
      WIDGET_ID: Number(WIDGET_ID),
      widgetSettingJsx : '',
    };
    
    this.closeModal = this.closeModal.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onKeyPressTitle = this.onKeyPressTitle.bind(this);
    this.onBlurTitle = this.onBlurTitle.bind(this);
    this.onChangeDispTitleYn = this.onChangeDispTitleYn.bind(this);
    this.onChangeWidgetSkin = this.onChangeWidgetSkin.bind(this);
    this.onChangeDispSize = this.onChangeDispSize.bind(this);
    this.folding = this.folding.bind(this);
    this.unfolding = this.unfolding.bind(this);
    this.createComponents = this.createComponents.bind(this);

    this.props.getWidget(Number(WIDGET_ID));
    this.props.getWidgetList(Number(PAGE_ID));
  }

  componentWillReceiveProps(nextProps) {
    const { match, widget } = nextProps;
    const { params } = match;
    const { PAGE_ID, WIDGET_ID } = params;

    if (WIDGET_ID
      && this.state.WIDGET_ID !== Number(WIDGET_ID)) {
      this.setState({
        WIDGET_ID: Number(WIDGET_ID),
      });
      this.props.getWidget(Number(WIDGET_ID));
      this.props.resetCategory();
    }

    if (PAGE_ID
      && this.state.PAGE_ID !== Number(PAGE_ID)) {
      this.setState({
        PAGE_ID: Number(PAGE_ID),
      });
      this.props.getWidgetList(Number(PAGE_ID));
    }

    if (Object.keys(widget).length !== 0
        && (widget.WIDGET_ID !== this.props.widget.WIDGET_ID || this.state.title === '')
        // && (
        //   widget.WIDGET_ID !== this.props.widget.WIDGET_ID
        //   || lang.get('NAME', this.props.widget) !== widget.title
        //   || this.props.widget.DISP_TITLE_YN !== widget.DISP_TITLE_YN
        //   || this.props.widget.WIDGET_SKIN !== widget.WIDGET_SKIN
        //   || this.props.widget.DISP_SIZE !== widget.DISP_SIZE)
      ) {
      this.setState({
        title: lang.get('NAME', widget),
        isTitle: widget.user.isTitle,
        widgetSkin: widget.user.skin,
        dispSize: widget.size,
        widgetSettingJsx: this.createComponents(),
      });
    }

    if(this.props.widgetList.length !== nextProps.widgetList.length) {
      this.setState({
        widgetSettingJsx: this.createComponents(nextProps.widgetList),
      });
    }
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onKeyPressTitle(e) {
    if (e.key === 'Enter') {
      const data = { NAME : this.state.title };
      this.props.updateWidget(this.state.WIDGET_ID, data);
    }
  }

  onBlurTitle() {
    if (lang.get('NAME', this.props.widget) !== this.state.title) {
      const data = { NAME : this.state.title };
      this.props.updateWidget(this.state.WIDGET_ID, data);
    }
  }

  onChangeDispTitleYn(e) {
    this.setState({
      isTitle: e.target.value,
    });
    const data = { isTitle : e.target.value };
    this.props.updateWidget(this.state.WIDGET_ID, data);
  }

  onChangeWidgetSkin(e) {
    this.setState({
      widgetSkin: e.target.value,
    });
    const data = { skin : e.target.value };
    this.props.updateWidget(this.state.WIDGET_ID, data);
  }

  onChangeDispSize(e) {
    this.setState({
      dispSize: e.target.value,
    });
    const data = { DISP_SIZE : e.target.value };
    this.props.updateWidget(this.state.WIDGET_ID, data);
  }

  closeModal() {
    const preUrl = this.props.match.path.substr(0, this.props.match.path.indexOf('/widgetsetting'));
    this.props.history.push(`${preUrl}/page/${this.state.PAGE_ID}`);

    // 차후 appselector, 조직도 사용하는 위젯 구분 필요
    // 서비스 바로가기의 액션
    this.props.resetCategory();

    // 조직도의 액션
    this.props.closeModalInit();
  }

  folding() {
    this.setState({ display: 'none' });
  }

  unfolding() {
    this.setState({ display: '' });
  }

  createComponents(item) {
    let idx = '';

    if(item !== undefined) {
      idx = item.findIndex(i => Number(i.WIDGET_ID) === this.state.WIDGET_ID);
    } else if(this.props.widgetList.length > 0) {
      idx = this.props.widgetList.findIndex(i => Number(i.WIDGET_ID) === this.state.WIDGET_ID);
    }
    let param = {};

    if(item !== undefined) {
      if(item[idx].basic.settingPath !== undefined) {
        settingPath = true;

        param = {
          loader: () => import(`apps/${item[idx].basic.settingPath}`),
          loading: Loading,
        };
      } else {
        settingPath = false;

        param = {
          loader: () => import(`apps/noSetting/widgetSetting`),
          loading: Loading,
        };
      }
      
    } else {
      param = {
        loader: () => import(item),
        loading: Loading,
      };
    }

    if(this.props.widgetList.length > 0 && idx !== -1 && item === undefined) {
      if(this.props.widgetList[idx].basic.settingPath !== '') {
        settingPath = true;

        param = {
          loader: () => import(`apps/${this.props.widgetList[idx].basic.settingPath}`),
          loading: Loading,
        };
      } else {
        settingPath = false;

        param = {
          loader: () => import(`apps/noSetting/widgetSetting`),
          loading: Loading,
        };
      }
    } 

    const COMP = Loadable(param);
    return (
      <div key={'id'}>
        {item !== undefined ?
          <COMP
            item={item[idx]}
            widgetID={this.props.match.params.WIDGET_ID}
            pageID={this.props.match.params.PAGE_ID}
            type="mypage"
          />
          :
          <COMP
            item={this.props.widgetList[idx]}
            widgetID={this.props.match.params.WIDGET_ID}
            pageID={this.props.match.params.PAGE_ID}
            type="mypage"
          />
        }
      </div>
    );
  }

  render() {

    const {
      widget,
      widgetList,
    } = this.props;

    const {
      WIDGET_ID,
    } = this.state;

    return (
      <div className="settingsPage" style={{ width: '100vw', height: '100vh', top: 0, left: 0 }}>
          <StyleWidgetSetting>
            <div className="userSettingWrapper">
              <h2 className="pageHeader">
              {intlObj.get(messages.widgetSetting)}
                <Button className="modalClose" onClick={this.closeModal} title={intlObj.get(messages.closeModal)} />
              </h2>
              <Row>
                <Col xl={8} className="navigation">
                  <nav>
                    <ul>
                      {widgetList.map(w => (
                          <li key={w.id}>
                            <div className={Number(w.id) === WIDGET_ID? 'current' : null}>
                              <Link to={`${commonjs.getPreUrl(this.props.match.path, '/widgetsetting')}/${w.PAGE_ID}/${w.id}`}>
                                {lang.get('NAME', w)}
                              </Link>
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </nav>
                </Col>
                <Col xl={16} className="navContent" ><Scrollbars
                  className="custom-scrollbar"
                  style={{ width: 'calc(100% + 20px)', height: 'calc(100vh - 105px)' }}
                  autoHide
                  autoHideTimeout={1000}
                  autoHideDuration={200}
                >
                  <h3 className='title commonWidget'>
                  {intlObj.get(messages.basicWidgetSetting)}
                    {this.state.display === 'none' ?
                      <a className="accordion unfold" title={intlObj.get(messages.unFolding)} onClick={this.unfolding} />
                      :
                      <a className="accordion fold" title={intlObj.get(messages.folding)} onClick={this.folding} />
                      }
                    </h3>
                  <div className="commonPage" style={{ display: this.state.display }}>
                    <div className="basicSettingTable">
                      <table>
                        <tbody>
                          <tr>
                            <th>
                              <label className="subtitle" htmlFor="wSubject">{intlObj.get(messages.title)}</label>
                            </th>
                            <td>
                              <span>{intlObj.get(messages.onTitle)}</span>
                              <div className="radioWrapper">
                                <RadioGroup
                                  onChange={this.onChangeDispTitleYn}
                                  value={this.state.isTitle}
                                >
                                  <ul className="goPublicYN">
                                    <li key="Y">
                                      <Radio value={true}>{intlObj.get(messages.view)}</Radio>
                                    </li>
                                    <li key="N">
                                      <Radio value={false}>{intlObj.get(messages.unView)}</Radio>
                                    </li>
                                  </ul>
                                </RadioGroup>
                              </div>
                              <div className="inputWrapper">
                                <Input
                                  id="subject"
                                  type="text"
                                  placeholder=""
                                  title={intlObj.get(messages.widgetTitle)}
                                  value={this.state.title}
                                  onChange={this.onChangeTitle}
                                  onKeyPress={this.onKeyPressTitle}
                                  onBlur={this.onBlurTitle}
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th>{intlObj.get(messages.widgetColor)}</th>
                            <td>
                              <FormItem style={{ marginBottom: 0 }}>
                                <RadioGroup
                                  className="colorOptions"
                                  onChange={this.onChangeWidgetSkin}
                                  value={this.state.widgetSkin}
                                >
                                  <Radio.Button value="1">
                                    <div
                                      style={{
                                        backgroundColor: '#ffffff',
                                        borderColor: '#cccccc',
                                        color: '#222222',
                                      }}
                                    >
                                    abc
                                    </div>
                                  </Radio.Button>
                                  <Radio.Button value="2">
                                    <div
                                      style={{
                                        backgroundColor: '#dcf6ff',
                                        borderColor: '#dcf6ff',
                                        color: '#222222',
                                      }}
                                    >
                                    abc
                                    </div>
                                  </Radio.Button>
                                  <Radio.Button value="3">
                                    <div
                                      style={{
                                        backgroundColor: '#fcf5d1',
                                        borderColor: '#fcf5d1',
                                        color: '#222222',
                                      }}
                                    >
                                    abc
                                    </div>
                                  </Radio.Button>
                                  <Radio.Button value="4">
                                    <div
                                      style={{
                                        backgroundColor: '#0a9b65',
                                        borderColor: '#0a9b65',
                                        color: '#ffffff',
                                      }}
                                    >
                                    abc
                                    </div>
                                  </Radio.Button>
                                  <Radio.Button value="5">
                                    <div
                                      style={{
                                        backgroundColor: '#0999e5',
                                        borderColor: '#0999e5',
                                        color: '#ffffff',
                                      }}
                                    >
                                    abc
                                    </div>
                                  </Radio.Button>
                                  <Radio.Button value="6">
                                    <div
                                      style={{
                                        backgroundColor: '#435cce',
                                        borderColor: '#435cce',
                                        color: '#ffffff',
                                      }}
                                    >
                                    abc
                                    </div>
                                  </Radio.Button>
                                  <Radio.Button value="7">
                                    <div
                                      style={{
                                        backgroundColor: '#fa6800',
                                        borderColor: '#fa6800',
                                        color: '#ffffff',
                                      }}
                                    >
                                    abc
                                    </div>
                                  </Radio.Button>
                                  <Radio.Button value="8">
                                    <div
                                      style={{
                                        backgroundColor: '#404040',
                                        borderColor: '#404040',
                                        color: '#ffffff',
                                      }}
                                    >
                                      abc
                                      </div>
                                  </Radio.Button>
                                  {/* <Radio.Button value="9">
                                    <div
                                      style={{
                                        backgroundColor: '#00a09e',
                                        borderColor: '#00a09e',
                                        color: '#ffffff',
                                      }}
                                    >
                                      abc
                                    </div>
                                  </Radio.Button>
                                  <Radio.Button value="10">
                                    <div
                                      style={{
                                        backgroundColor: '#81b022',
                                        borderColor: '#81b022',
                                        color: '#ffffff',
                                      }}
                                    >
                                      abc
                                    </div>
                                  </Radio.Button>
                                  <Radio.Button value="11">
                                    <div
                                      style={{
                                        backgroundColor: '#fa9200',
                                        borderColor: '#fa9200',
                                        color: '#ffffff',
                                      }}
                                    >
                                      abc
                                    </div>
                                  </Radio.Button>
                                  <Radio.Button value="12">
                                    <div
                                      style={{
                                        backgroundColor: '#f85b23',
                                        borderColor: '#f85b23',
                                        color: '#ffffff',
                                      }}
                                    >
                                      abc
                                    </div>
                                  </Radio.Button>
                                  <Radio.Button value="13">
                                    <div
                                      style={{
                                        backgroundColor: '#ec3749',
                                        borderColor: '#ec3749',
                                        color: '#ffffff',
                                      }}
                                    >
                                      abc
                                    </div>
                                  </Radio.Button>
                                  <Radio.Button value="14">
                                    <div
                                      style={{
                                        backgroundColor: '#ff2690',
                                        borderColor: '#ff2690',
                                        color: '#ffffff',
                                      }}
                                    >
                                      abc
                                    </div>
                                  </Radio.Button>
                                  <Radio.Button value="15">
                                    <div
                                      style={{
                                        backgroundColor: '#444444',
                                        borderColor: '#444444',
                                        color: '#ffffff',
                                      }}
                                    >
                                      abc
                                    </div>
                                  </Radio.Button> */}
                                </RadioGroup>
                              </FormItem>
                            </td>
                          </tr>
                          <tr>
                            <th>{intlObj.get(messages.widgetSize)}</th>
                            <td>
                              <div className='widgetSize'>
                                <RadioGroup
                                  onChange={this.onChangeDispSize}
                                  value={this.state.dispSize}
                                >
                                  {
                                    widget.sizeArr ? widget.sizeArr.map((s) => (
                                      <Radio.Button value={s} key={s}>
                                        <div className={`rbox w${s}`}>
                                          <p>{s}</p>
                                        </div>
                                      </Radio.Button>
                                    )) : (
                                      <Radio.Button value="1X1">
                                        <div className="rbox w1X1">
                                          <p>1x1</p>
                                        </div>
                                      </Radio.Button>
                                    )
                                  }
                                </RadioGroup>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="contentByMenu">
                    {settingPath === true ?
                      <h3 className="title">{intlObj.get(messages.widgetsSetting)}</h3>
                      :
                      false
                    }
                      {this.state.widgetSettingJsx}
                  </div>
                </Scrollbars>
                </Col>
              </Row>
            </div>
          </StyleWidgetSetting>
      </div>
    );
  }
}
appSetting.propTypes = {
  widgetList: PropTypes.arrayOf(PropTypes.object).isRequired,
  widget: PropTypes.object.isRequired,
  getWidgetList: PropTypes.func.isRequired,
  resetCategory: PropTypes.func.isRequired,
  closeModalInit: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  widgetList: selectors.makeWidgetList(),
  widget: selectors.makeWidget(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getWidgetList: PAGE_ID => dispatch(actions.getWidgetList(PAGE_ID)),
    getWidget: WIDGET_ID => dispatch(actions.getWidget(WIDGET_ID)),
    updateWidget: (WIDGET_ID, data) => dispatch(actions.updateWidget(WIDGET_ID, data)),

    resetCategory: () => dispatch(resetCategory()),
    closeModalInit: () => dispatch(orgAction.closeModalInit()),
  };
}
const withReducer = injectReducer({ key: 'appsetting', reducer });
const withSaga = injectSaga({ key: 'appsetting', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(appSetting);

