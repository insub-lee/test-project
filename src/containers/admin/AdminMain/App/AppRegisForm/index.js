import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { Form, Input, Row, Col, Radio, Button, Checkbox } from 'antd';
import Upload from 'components/Upload';
import { fromJS } from 'immutable';
import basicStyle from 'config/basicStyle';
import AppSelector from 'components/appSelector/index';
// import WidgetSkin from 'components/uielements/styles/widgetSkin';
import * as feed from 'components/Feedback/functions';
import { intlObj, lang, imgUrl } from 'utils/commonUtils';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import AntRadiobox from 'containers/admin/components/uielements/radiobox.style';
import { LinkBtnLgtGray, BtnDkGray, LinkBtnList } from 'containers/admin/components/uielements/buttons.style';
import messages from '../messages';

import MyAppCategoryModal from '../AppCategoryModal';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import { StyleAppRegisForm, Vesions } from './StyleAppRegisForm';
import StyledButton from 'components/Button/StyledButton';
import StyledRadio from 'components/FormStuff/Radio';

const RadioGroup = AntRadiobox(Radio.Group);
const FormItem = Form.Item;
const { rowStyle, colStyle, gutter } = basicStyle;

class AppRegisForm extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      // DFLT_SKIN: '1',
      Workstep: 'L',
      AppManual: 'L',
      INTL_YN: 'Y',
      linkType: 'NEW',
      // DisLoc: 'd1',
      LINK_METHOD: 'GET',
      SEC_REQ_YN: 'Y',
      appPlus1: false,
      appList1: [],
      appPlus2: false,
      appList2: [],
      // allOrgShow: false,
      MyAppCategoryModalShow: false,
      UploadFilesIcon: [],
      UploadFilesWork: [],
      UploadFilesManual: [],
      UploadFilesScreenshot: [],
      // insertParam start,
      LANG_LIST: ['KOR', 'ENG', 'CHN'],
      CLIENT_TYPE: ['W', 'P', 'M'],
      NAME_KOR: '',
      APP_ABBR_KOR: '',
      DSCR_KOR: '',
      NAME_ENG: '',
      APP_ABBR_ENG: '',
      DSCR_ENG: '',
      NAME_CHN: '',
      APP_ABBR_CHN: '',
      DSCR_CHN: '',
      CATG_ID: 0,
      CATG_NAME: '',
      SRC_PATH: '',
      VER_1: '',
      VER_2: '',
      VER_3: '',
      WORK_STEP_URL: '',
      APP_MANUAL_URL: '',
      KEYWORD: '',
      LINK_URL: '',
      // WIDTH: '',
      // HEIGHT: '',
      LINK_PARAM: '',
      SERVICE_FORM: ['WY', 'MY'],
      NAME_KOR_CHK: false,
      APP_ABBR_KOR_CHK: false,
      NAME_ENG_CHK: false,
      APP_ABBR_ENG_CHK: false,
      NAME_CHN_CHK: false,
      APP_ABBR_CHN_CHK: false,
      SRC_PATH_CHK: false,
      CATG_ID_CHK: false,
      ITEM_VALUE: '',
      ITEM_VALUE_EXAMPLE: `{
        "appKey" : "appKey",
        "appInfo" : {
          "path" : "example/index",
          "default" : "1X1",
          "data" : { }
        },
        "widgets" : [ {
          "size" : "1X1",
          "sizeArr" : [ "1X1" ],
          "basic" : {
            "path" : "example/widgets/index",
            "settingPath":"example/widgets/widgetSetting",
            "drilldownPath":"example/widgets/drillDown",
            "morePath":"example/widgets/more",
            "type" : "L",
            "functions":[
                          "reload",
                          "drilldown",
                          "more"
            ]
          },
          "user" : {
            "isTitle" : true,
            "skin" : "1"
          },
          "data" : { }
        }]
      }`,
    };
    this.onFileUploadedIcon = this.onFileUploadedIcon.bind(this);
    this.onFileUploadedWork = this.onFileUploadedWork.bind(this);
    this.onFileUploadedManual = this.onFileUploadedManual.bind(this);
    this.onFileUploadedScreenshot = this.onFileUploadedScreenshot.bind(this);
    this.props.getInitInfo();
  }

  onFileUploadedIcon(file) {
    this.setState({
      UploadFilesIcon: [],
    });
    const tmpArr = fromJS(this.state.UploadFilesIcon).toJS();
    tmpArr.push(file);
    this.setState({
      UploadFilesIcon: tmpArr,
    });
  }

  onFileUploadedWork(file) {
    this.setState({
      UploadFilesWork: [],
    });
    const tmpArr = fromJS(this.state.UploadFilesWork).toJS();
    tmpArr.push(file);
    this.setState({
      UploadFilesWork: tmpArr,
    });
  }

  onFileUploadedManual(file) {
    this.setState({
      UploadFilesManual: [],
    });
    const tmpArr = fromJS(this.state.UploadFilesManual).toJS();
    tmpArr.push(file);
    this.setState({
      UploadFilesManual: tmpArr,
    });
  }

  onFileUploadedScreenshot(file) {
    // this.setState({
    //   UploadFilesScreenshot: [],
    // });
    const tmpArr = fromJS(this.state.UploadFilesScreenshot).toJS();
    tmpArr.push(file);
    this.setState({
      UploadFilesScreenshot: tmpArr,
    });
  }

  UploadFilesIconDel = () => {
    this.setState({
      UploadFilesIcon: [],
    });
  };

  UploadFilesScreenDel = (e, index) => {
    const tmpArr = fromJS(this.state.UploadFilesScreenshot).toJS();
    tmpArr.splice(index, 1);
    this.setState({
      UploadFilesScreenshot: tmpArr,
    });
    e.stopPropagation();
  };

  MyAppCategoryModalOpen = () => {
    this.setState({
      MyAppCategoryModalShow: true,
    });
  };

  MyAppCategoryModalClose = () => {
    this.setState({
      MyAppCategoryModalShow: false,
    });
  };

  // managerPop = () => {
  //   feed.success('개발 예정인 기능 입니다.');
  // };

  render() {
    const { history } = this.props;

    // const onChangeDfltskin = (val) => {
    //   this.setState({ DFLT_SKIN: val.target.value });
    // };
    const onChangeWorkstep = val => {
      this.setState({ Workstep: val.target.value });
    };
    const onChangeAppManual = val => {
      this.setState({ AppManual: val.target.value });
    };
    const onChangeIntlYn = val => {
      this.setState({ INTL_YN: val.target.value });
    };
    const onChangeLinkType = val => {
      this.setState({ linkType: val.target.value });
    };
    const onChangeMethod = val => {
      this.setState({ LINK_METHOD: val.target.value });
    };
    const onChangeSecReqYn = val => {
      this.setState({ SEC_REQ_YN: val.target.value });
    };
    const loopLinkType = data =>
      data.map(item => (
        <Radio value={item.CODE_CD} key={item.CODE_CD}>
          {lang.get('NAME', item)}
        </Radio>
      ));

    const loopMethod = data =>
      data.map(item => (
        <Radio value={item.CODE_CD} key={item.CODE_CD}>
          {lang.get('NAME', item)}
        </Radio>
      ));

    // const loopWidgetColor = data =>
    //   data.map(item => (
    //     <Radio.Button value={item.CODE_CD} key={item.CODE_CD}>
    //       <WidgetSkin className={`wSkin${item.CODE_CD}`}>
    //         abc
    //       </WidgetSkin>
    //     </Radio.Button >
    //   ));

    // 앱추가1
    const openAppPlus1Modal = () => {
      this.setState({ appPlus1: true });
    };
    const closeAppPlus1Modal = () => {
      this.setState({ appPlus1: false });
    };
    const addList1 = app => {
      const { appList1 } = this.state;
      const appList1Copy = appList1.slice();
      const appList1CopyFromAppselector = app;

      appList1CopyFromAppselector.map(obj => {
        if (appList1.findIndex(o => o.APP_ID === obj.APP_ID) === -1) {
          appList1Copy.push(obj);
        }
        return appList1Copy;
      });

      this.setState({
        appList1: appList1Copy,
      });
    };
    const appList1Del = index => {
      const tmpArr = fromJS(this.state.appList1).toJS();
      tmpArr.splice(index, 1);
      this.setState({
        appList1: tmpArr,
      });
    };
    // 앱추가2
    const openAppPlus2Modal = () => {
      this.setState({ appPlus2: true });
    };
    const closeAppPlus2Modal = () => {
      this.setState({ appPlus2: false });
    };
    const addList2 = app => {
      const { appList2 } = this.state;
      const appList2Copy = appList2.slice();
      const appList2CopyFromAppselector = app;

      appList2CopyFromAppselector.map(obj => {
        if (appList2.findIndex(o => o.APP_ID === obj.APP_ID) === -1) {
          appList2Copy.push(obj);
        }
        return appList2Copy;
      });

      this.setState({
        appList2: appList2Copy,
      });
    };
    const appList2Del = index => {
      const tmpArr = fromJS(this.state.appList2).toJS();
      tmpArr.splice(index, 1);
      this.setState({
        appList2: tmpArr,
      });
    };
    const returnGateId = (resultObj1, resultObj2) => {
      this.setState({
        CATG_ID: resultObj1,
        CATG_NAME: resultObj2,
      });

      if (resultObj1 > 0) {
        this.setState({ CATG_ID_CHK: true });
      } else {
        this.setState({ CATG_ID_CHK: false });
      }
    };
    // 저장하기
    const appInfoSaveOn = () => {
      this.props.appInfoSave(
        this.state.CLIENT_TYPE,
        this.state.LANG_LIST,
        this.state.NAME_KOR,
        this.state.APP_ABBR_KOR,
        this.state.DSCR_KOR,
        this.state.NAME_ENG,
        this.state.APP_ABBR_ENG,
        this.state.DSCR_ENG,
        this.state.NAME_CHN,
        this.state.APP_ABBR_CHN,
        this.state.DSCR_CHN,
        this.state.CATG_ID,
        this.state.SRC_PATH,
        history,
        this.state.UploadFilesIcon,
        this.state.VER_1,
        this.state.VER_2,
        this.state.VER_3,
        this.state.Workstep,
        this.state.WORK_STEP_URL,
        this.state.UploadFilesWork,
        this.state.AppManual,
        this.state.APP_MANUAL_URL,
        this.state.UploadFilesManual,
        this.state.UploadFilesScreenshot,
        this.state.KEYWORD,
        this.state.INTL_YN,
        this.state.linkType,
        this.state.LINK_URL,
        // this.state.WIDTH,
        // this.state.HEIGHT,
        this.state.LINK_METHOD,
        this.state.LINK_PARAM,
        this.state.SEC_REQ_YN,
        this.state.appList1,
        this.state.appList2,
        // this.state.DFLT_SKIN,
        this.state.SERVICE_FORM,
        this.state.ITEM_VALUE,
      );
    };

    const appInfoSaveChk = () => {
      feed.showConfirm(`${intlObj.get(messages.insertGoing)}`, '', appInfoSaveOn);
    };

    const appInfoSave = () => {
      if (
        this.state.NAME_KOR_CHK &&
        this.state.APP_ABBR_KOR_CHK &&
        this.state.SRC_PATH_CHK &&
        this.state.CATG_ID_CHK &&
        this.state.LANG_LIST.length > 0 &&
        this.state.CLIENT_TYPE.length > 0 &&
        (this.state.INTL_YN === 'Y' && this.state.SERVICE_FORM.indexOf('WY') > -1 ? !!this.state.ITEM_VALUE : true)
      ) {
        this.setState({
          NAME_ENG: this.state.NAME_ENG ? this.state.NAME_ENG : this.state.NAME_KOR,
          APP_ABBR_ENG: this.state.APP_ABBR_ENG ? this.state.APP_ABBR_ENG : this.state.APP_ABBR_KOR,
          NAME_CHN: this.state.NAME_CHN ? this.state.NAME_CHN : this.state.NAME_KOR,
          APP_ABBR_CHN: this.state.APP_ABBR_CHN ? this.state.APP_ABBR_CHN : this.state.APP_ABBR_KOR,
        });
        appInfoSaveChk();
      } else {
        message.error(<MessageContent>{intlObj.get(messages.reqValFail)}</MessageContent>, 3);
      }
    };

    const onChangeClientType = val => {
      this.setState({ CLIENT_TYPE: val });
    };
    const onChangeLangList = val => {
      this.setState({ LANG_LIST: val });
    };
    const onChangeNameKor = val => {
      this.setState({ NAME_KOR: val.target.value });

      if (val.target.value.replace(/(\s*)/g, '').length > 0) {
        this.setState({ NAME_KOR_CHK: true });
      } else {
        this.setState({ NAME_KOR_CHK: false });
      }
    };
    const onChangeAppAbbrKor = val => {
      this.setState({ APP_ABBR_KOR: val.target.value });

      if (val.target.value.replace(/(\s*)/g, '').length > 0) {
        this.setState({ APP_ABBR_KOR_CHK: true });
      } else {
        this.setState({ APP_ABBR_KOR_CHK: false });
      }
    };
    const onChangeDscrKor = val => {
      this.setState({ DSCR_KOR: val.target.value });
    };
    const onChangeNameEng = val => {
      this.setState({ NAME_ENG: val.target.value });

      if (val.target.value.replace(/(\s*)/g, '').length > 0) {
        this.setState({ NAME_ENG_CHK: true });
      } else {
        this.setState({ NAME_ENG_CHK: false });
      }
    };
    const onChangeAppAbbrEng = val => {
      this.setState({ APP_ABBR_ENG: val.target.value });

      if (val.target.value.replace(/(\s*)/g, '').length > 0) {
        this.setState({ APP_ABBR_ENG_CHK: true });
      } else {
        this.setState({ APP_ABBR_ENG_CHK: false });
      }
    };
    const onChangeDscrEng = val => {
      this.setState({ DSCR_ENG: val.target.value });
    };
    const onChangeNameChn = val => {
      this.setState({ NAME_CHN: val.target.value });

      if (val.target.value.replace(/(\s*)/g, '').length > 0) {
        this.setState({ NAME_CHN_CHK: true });
      } else {
        this.setState({ NAME_CHN_CHK: false });
      }
    };
    const onChangeAppAbbrChn = val => {
      this.setState({ APP_ABBR_CHN: val.target.value });

      if (val.target.value.replace(/(\s*)/g, '').length > 0) {
        this.setState({ APP_ABBR_CHN_CHK: true });
      } else {
        this.setState({ APP_ABBR_CHN_CHK: false });
      }
    };
    const onChangeDscrChn = val => {
      this.setState({ DSCR_CHN: val.target.value });
    };
    const onChangeSrcPath = val => {
      this.setState({ SRC_PATH: val.target.value });

      if (val.target.value.replace(/(\s*)/g, '').length > 0) {
        this.setState({ SRC_PATH_CHK: true });
      } else {
        this.setState({ SRC_PATH_CHK: false });
      }
    };
    const onChangeVer1 = val => {
      this.setState({ VER_1: val.target.value });
    };
    const onChangeVer2 = val => {
      this.setState({ VER_2: val.target.value });
    };
    const onChangeVer3 = val => {
      this.setState({ VER_3: val.target.value });
    };
    const onChangeWorkstepUrl = val => {
      this.setState({ WORK_STEP_URL: val.target.value });
    };
    const onChangeAppManualUrl = val => {
      this.setState({ APP_MANUAL_URL: val.target.value });
    };
    const onChangeKeyword = val => {
      this.setState({ KEYWORD: val.target.value });
    };
    const onChangeLinkurl = val => {
      this.setState({ LINK_URL: val.target.value });
    };
    const onChangeParam = val => {
      this.setState({ LINK_PARAM: val.target.value });
    };
    const imgClick = e => {
      e.stopPropagation();
    };
    const onChangeItemValue = val => {
      this.setState({ ITEM_VALUE: val.target.value });
    };
    // const appExamodal = () => {
    //   feed.error(`${intlObj.get(messages.appExaNo)}`);
    // };
    const onChangeServiceForm = val => {
      this.setState({ SERVICE_FORM: val });
    };
    return (
      <div>
        <MyAppCategoryModal show={this.state.MyAppCategoryModalShow} closeModal={this.MyAppCategoryModalClose} returnGateId={returnGateId} type="app" />
        <AppSelector show={this.state.appPlus1} closeModal={closeAppPlus1Modal} addList={addList1} style={{ marginTop: 570 }} type="all" />
        <AppSelector show={this.state.appPlus2} closeModal={closeAppPlus2Modal} addList={addList2} style={{ marginTop: 570 }} type="all" />
        <StyleAppRegisForm>
          <Form>
            {/* <h2 className="pageTitle">{intlObj.get(messages.appRegisTitle)}</h2> */}
            <h3 className="sectionTitle">{intlObj.get(messages.appInfo)}</h3>
            {/* 1. 지원 플랫폼 */}
            <h4 className="required">{intlObj.get(messages.supporClient)}</h4>
            <FormItem style={{ marginBottom: 30 }}>
              <Checkbox.Group style={{ width: 290 }} onChange={onChangeClientType} defaultValue={this.state.CLIENT_TYPE} id="supportPlatform">
                <Row>
                  <Col span={8}>
                    <Checkbox value="W">{intlObj.get(messages.web)}</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="P">{intlObj.get(messages.pc)}</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="M">{intlObj.get(messages.mobile)}</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
              {/* <p className="errMsg">* 지원언어를 선택해 주세요</p> */}
            </FormItem>
            {/* 2. 지원 언어 */}
            <h4 className="required">{intlObj.get(messages.supporLang)}</h4>
            <FormItem style={{ marginBottom: 30 }}>
              <Checkbox.Group style={{ width: 290 }} onChange={onChangeLangList} defaultValue={this.state.LANG_LIST}>
                <Row>
                  <Col span={8}>
                    <Checkbox value="KOR">{intlObj.get(messages.kor)}</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="ENG">{intlObj.get(messages.eng)}</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="CHN">{intlObj.get(messages.chn)}</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
              {/* <p className="errMsg">* 지원언어를 선택해 주세요</p> */}
            </FormItem>
            {/* 3. 명칭 */}
            <h4 className="required">{intlObj.get(messages.appNameInput)}</h4>
            <Row>
              <Col sm={12} style={{ paddingRight: 10 }}>
                <FormItem
                  label={intlObj.get(messages.appNameKor)}
                  labelCol={{ width: '100%' }}
                  wrapperCol={{ width: '100%' }}
                  className="required"
                  hasFeedback
                  validateStatus={this.state.NAME_KOR_CHK ? 'success' : 'error'}
                >
                  <Input
                    placeholder=""
                    title={intlObj.get(messages.appNameKor)}
                    maxLength="100"
                    onChange={onChangeNameKor}
                    defaultValue={this.state.NAME_KOR}
                  />
                  {/* <p className="errMsg">* App 정식명칭을 기입해주세요.</p> */}
                </FormItem>
              </Col>
              <Col sm={12} style={{ paddingLeft: 10 }}>
                <FormItem
                  label={intlObj.get(messages.appAbbrKor)}
                  labelCol={{ width: '100%' }}
                  wrapperCol={{ width: '100%' }}
                  className="required"
                  hasFeedback
                  validateStatus={this.state.APP_ABBR_KOR_CHK ? 'success' : 'error'}
                >
                  <Input
                    placeholder=""
                    title={intlObj.get(messages.appAbbrKor)}
                    maxLength="1000"
                    onChange={onChangeAppAbbrKor}
                    defaultValue={this.state.APP_ABBR_KOR}
                  />
                  {/* <p className="errMsg">* App 약식명칭을 기입해주세요.</p> */}
                </FormItem>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col sm={24}>
                <FormItem
                  // label={intlObj.get(messages.dscrKor)}
                  labelCol={{ width: '100%' }}
                  wrapperCol={{ width: '100%' }}
                >
                  <textarea
                    row="5"
                    placeholder={intlObj.get(messages.dscrKor)}
                    title={intlObj.get(messages.dscrKor)}
                    maxLength="1000"
                    onChange={onChangeDscrKor}
                    defaultValue={this.state.DSCR_KOR}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row style={{ marginTop: 24 }}>
              <Col sm={12} style={{ paddingRight: 10 }}>
                <FormItem
                  label={intlObj.get(messages.appNameEng)}
                  labelCol={{ width: '100%' }}
                  wrapperCol={{ width: '100%' }}
                  // className="required"
                  // hasFeedback={true}
                  // validateStatus={this.state.NAME_ENG_CHK ? 'success' : 'error'}
                >
                  <Input
                    placeholder=""
                    title={intlObj.get(messages.appNameEng)}
                    maxLength="100"
                    onChange={onChangeNameEng}
                    defaultValue={this.state.NAME_ENG}
                  />
                  {/* <p className="errMsg">* App 정식명칭을 기입해주세요.</p> */}
                </FormItem>
              </Col>
              <Col sm={12} style={{ paddingLeft: 10 }}>
                <FormItem
                  label={intlObj.get(messages.appAbbrEng)}
                  labelCol={{ width: '100%' }}
                  wrapperCol={{ width: '100%' }}
                  // className="required"
                  // hasFeedback={true}
                  // validateStatus={this.state.APP_ABBR_ENG_CHK ? 'success' : 'error'}
                >
                  <Input
                    placeholder=""
                    title={intlObj.get(messages.appAbbrEng)}
                    maxLength="1000"
                    onChange={onChangeAppAbbrEng}
                    defaultValue={this.state.APP_ABBR_ENG}
                  />
                  {/* <p className="errMsg">* App 약식명칭을 기입해주세요.</p> */}
                </FormItem>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col sm={24}>
                <FormItem
                  // label={intlObj.get(messages.dscrEng)}
                  labelCol={{ width: '100%' }}
                  wrapperCol={{ width: '100%' }}
                >
                  <textarea
                    row="5"
                    placeholder={intlObj.get(messages.dscrEng)}
                    title={intlObj.get(messages.dscrEng)}
                    maxLength="1000"
                    onChange={onChangeDscrEng}
                    defaultValue={this.state.DSCR_ENG}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row style={{ marginTop: 24 }}>
              <Col sm={12} style={{ paddingRight: 10 }}>
                <FormItem
                  label={intlObj.get(messages.appNameChn)}
                  labelCol={{ width: '100%' }}
                  wrapperCol={{ width: '100%' }}
                  // className="required"
                  // hasFeedback={true}
                  // validateStatus={this.state.NAME_CHN_CHK ? 'success' : 'error'}
                >
                  <Input
                    placeholder=""
                    title={intlObj.get(messages.appNameChn)}
                    maxLength="100"
                    onChange={onChangeNameChn}
                    defaultValue={this.state.NAME_CHN}
                  />
                  {/* <p className="errMsg">* App 정식명칭을 기입해주세요.</p> */}
                </FormItem>
              </Col>
              <Col sm={12} style={{ paddingLeft: 10 }}>
                <FormItem
                  label={intlObj.get(messages.appAbbrChn)}
                  labelCol={{ width: '100%' }}
                  wrapperCol={{ width: '100%' }}
                  // className="required"
                  // hasFeedback={true}
                  // validateStatus={this.state.APP_ABBR_CHN_CHK ? 'success' : 'error'}
                >
                  <Input
                    placeholder=""
                    title={intlObj.get(messages.appAbbrChn)}
                    maxLength="1000"
                    onChange={onChangeAppAbbrChn}
                    defaultValue={this.state.APP_ABBR_CHN}
                  />
                  {/* <p className="errMsg">* App 약식명칭을 기입해주세요.</p> */}
                </FormItem>
              </Col>
            </Row>
            <Row style={{ marginTop: 10, paddingBottom: 30 }}>
              <Col sm={24}>
                <FormItem
                  // label={intlObj.get(messages.dscrChn)}
                  labelCol={{ width: '100%' }}
                  wrapperCol={{ width: '100%' }}
                  className="required"
                >
                  <textarea
                    row="5"
                    placeholder={intlObj.get(messages.dscrChn)}
                    title={intlObj.get(messages.dscrChn)}
                    maxLength="1000"
                    onChange={onChangeDscrChn}
                    defaultValue={this.state.DSCR_CHN}
                  />
                </FormItem>
              </Col>
            </Row>
            {/* 4. 카테고리 */}
            <h4 className="required">{intlObj.get(messages.category)}</h4>
            <FormItem hasFeedback validateStatus={this.state.CATG_ID_CHK ? 'success' : 'error'} className="required" style={{ marginBottom: 30 }}>
              <Input placeholder="" readOnly="readOnly" value={this.state.CATG_ID > 0 ? this.state.CATG_NAME : ''} />
              <Button className="btnText edit" onClick={this.MyAppCategoryModalOpen}>
                {intlObj.get(messages.edit)}
              </Button>
              {/* <p className="errMsg">* App 카테고리를 선택해 주세요</p> */}
            </FormItem>
            {/* 5. App ID */}
            {/* <h4 className="required">App ID</h4> */}
            <h4 className="required">SRC PATH [앱경로]</h4>
            <FormItem hasFeedback validateStatus={this.state.SRC_PATH_CHK ? 'success' : 'error'}>
              <Input maxLength="50" onChange={onChangeSrcPath} defaultValue={this.state.SRC_PATH} />
            </FormItem>

            <h3 className="sectionTitle" style={{ padding: '33px 0 20px' }}>
              {intlObj.get(messages.serviceGubun)}
            </h3>
            {/* 14. 서비스 구분 */}
            <FormItem>
              <div>
                <RadioGroup className="typeOptions" onChange={onChangeIntlYn} value={this.state.INTL_YN}>
                  <Radio value="Y">{intlObj.get(messages.insideService)}</Radio>
                  <Radio value="N">{intlObj.get(messages.outService)}</Radio>
                </RadioGroup>
              </div>
            </FormItem>
            {/* 선택한 서비스에 따른 서브옵션 박스 */}
            <div className="subFormArea" style={{ display: this.state.INTL_YN === 'Y' ? 'none' : 'block' }}>
              <FormItem label={intlObj.get(messages.display)} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                <RadioGroup className="typeOptions" onChange={onChangeLinkType} value={this.state.linkType}>
                  {loopLinkType(this.props.linkTypeList)}
                </RadioGroup>
              </FormItem>
              <FormItem label="URL" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                <Input placeholder="" title="URL" maxLength="500" onChange={onChangeLinkurl} defaultValue={this.state.LINK_URL} />
              </FormItem>
              {/* <FormItem
                label="창 크기 (pixel)"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
              >
                <Row>
                  {loopWindowSizeList(this.props.windowSizeList)}
                </Row>
              </FormItem> */}
              {/* <FormItem
                label="표시위치 (pixel)"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
              >
                <RadioGroup
                  className="typeOptions"
                  onChange={onChangePopupPos}
                  value={this.state.DisLoc}
                >
                  {loopPopupPos(this.props.popupPosList)}

                  <Radio value="d1">좌상단</Radio>
                  <Radio value="d2">중앙</Radio>
                  <Radio value="d3">우상단</Radio>
                </RadioGroup>
              </FormItem> */}
              <FormItem label={intlObj.get(messages.protocol)} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                <RadioGroup className="typeOptions" onChange={onChangeMethod} value={this.state.LINK_METHOD}>
                  {loopMethod(this.props.methodList)}
                </RadioGroup>
              </FormItem>
              <FormItem label={intlObj.get(messages.variable)} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                <Input placeholder="" title={intlObj.get(messages.variable)} maxLength="500" onChange={onChangeParam} defaultValue={this.state.LINK_PARAM} />
                <div className="infoVarList">
                  * 전달변수 중, 자동 채번 변수방식
                  <ul>
                    <li>#EMPNO = 사번</li>
                    <li>#EMPNAME = 구성원 이름</li>
                    <li>#DEPTCD =</li>
                  </ul>
                </div>
              </FormItem>
            </div>
            <div className="subFormArea" style={{ display: this.state.INTL_YN === 'N' ? 'none' : 'block' }}>
              <FormItem label={intlObj.get(messages.serviceForm)} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                <Checkbox.Group
                  style={{ width: 340 }}
                  onChange={onChangeServiceForm}
                  value={this.state.SERVICE_FORM}
                  // defaultValue={}
                >
                  <Row>
                    <Col span={8}>
                      <Checkbox value="WY">{intlObj.get(messages.wedgetYn)}</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="MY">{intlObj.get(messages.menuYn)}</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </FormItem>
              <Row style={{ marginTop: 10, display: this.state.SERVICE_FORM.indexOf('WY') > -1 ? 'block' : 'none' }}>
                <Col sm={24}>
                  <FormItem
                    label="위젯설정"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    hasFeedback
                    validateStatus={this.state.ITEM_VALUE ? 'success' : 'error'}
                    className="ta_feedback"
                  >
                    <textarea
                      row="10"
                      placeholder="위젯설정 (ITEM_VALUE)"
                      title="위젯설정 (ITEM_VALUE)"
                      onChange={onChangeItemValue}
                      style={{ minHeight: 250 }}
                      defaultValue={this.state.ITEM_VALUE_EXAMPLE}
                    />
                  </FormItem>
                </Col>
              </Row>
            </div>
            <h3 className="sectionTitle">{intlObj.get(messages.verInfo)}</h3>
            {/* 6. 아이콘 */}
            <h4>{intlObj.get(messages.icon)}</h4>
            <section style={{ marginBottom: 30 }} className="appIconUploadArea">
              <Upload
                accept="image/jpeg, image/png" // default ALL
                onFileUploaded={this.onFileUploadedIcon}
                multiple={false} // default true
                width={122}
                height={122}
                borderStyle="none"
              >
                <div>
                  <div style={{ display: this.state.UploadFilesIcon.length < 1 ? 'block' : 'none' }}>
                    <div className="readyToUpload" />
                  </div>
                  <div style={{ display: this.state.UploadFilesIcon.length > 0 ? 'block' : 'none' }}>
                    <span onClick={imgClick} onKeyPress={imgClick} role="presentation" className="appShape">
                      {this.state.UploadFilesIcon.map(f => (
                        <img src={imgUrl.get('120x120', f.seq)} alt={f.fileName} key={f.seq} />
                      ))}
                    </span>
                  </div>
                </div>
              </Upload>
              <div className="deleteIconWrapper" style={{ display: this.state.UploadFilesIcon.length > 0 ? 'block' : 'none' }}>
                <button className="deleteAppIcon" onClick={this.UploadFilesIconDel} title={intlObj.get(messages.appIconDel)} />
              </div>
            </section>
            {/* 7. 버전 */}
            <h4>{intlObj.get(messages.ver)}</h4>
            <FormItem>
              <div style={{ paddingBottom: 30 }}>
                <Vesions>
                  <div className="mark">
                    <Input placeholder="" title={intlObj.get(messages.majorVer)} maxLength="3" onChange={onChangeVer1} defaultValue={this.state.VER_1} />
                  </div>
                  <div className="mark">
                    <Input
                      placeholder=""
                      title={intlObj.get(messages.minorVer)}
                      className="mark"
                      maxLength="3"
                      onChange={onChangeVer2}
                      defaultValue={this.state.VER_2}
                    />
                  </div>
                  <div>
                    <Input placeholder="" title={intlObj.get(messages.buildVer)} maxLength="3" onChange={onChangeVer3} defaultValue={this.state.VER_3} />
                  </div>
                </Vesions>
              </div>
            </FormItem>
            {/* 8. 업무절차 */}
            <h4>{intlObj.get(messages.Workstep)}</h4>
            <FormItem>
              <div style={{ position: 'relative', paddingBottom: 30 }}>
                <div>
                  <RadioGroup className="typeOptions" onChange={onChangeWorkstep} value={this.state.Workstep}>
                    <Radio value="L">{intlObj.get(messages.webside)}</Radio>
                    <Radio value="F" style={{ width: 295 }}>
                      {intlObj.get(messages.documentation)}
                    </Radio>
                  </RadioGroup>
                </div>
                <div style={{ display: this.state.Workstep === 'L' ? 'block' : 'none', marginTop: 10 }}>
                  <Input
                    placeholder=""
                    title={intlObj.get(messages.webside)}
                    style={{ verticalAlign: 'middle' }}
                    maxLength="1000"
                    onChange={onChangeWorkstepUrl}
                    defaultValue={this.state.WORK_STEP_URL}
                  />
                </div>
                <div style={{ display: this.state.Workstep === 'F' ? 'block' : 'none', marginTop: 10 }}>
                  {this.state.UploadFilesWork.length > 0 ? (
                    this.state.UploadFilesWork.map(f => (
                      <Input placeholder="" title={intlObj.get(messages.documentation)} style={{ verticalAlign: 'middle' }} value={f.fileName} />
                    ))
                  ) : (
                    <Input placeholder="" title={intlObj.get(messages.documentation)} style={{ verticalAlign: 'middle' }} />
                  )}
                  <section className="btnText attachFile">
                    <Upload
                      // accept="image/jpeg, image/png" // default ALL
                      onFileUploaded={this.onFileUploadedWork}
                      multiple={false} // default true
                      // width={123}
                      // height={123}
                      borderStyle="none"
                    >
                      <span>{intlObj.get(messages.attachment)}</span>
                    </Upload>
                  </section>
                </div>
              </div>
            </FormItem>
            {/* 9. 사용자 메뉴얼 */}
            <h4>{intlObj.get(messages.userManual)}</h4>
            <FormItem>
              <div style={{ position: 'relative' }}>
                <div>
                  <RadioGroup className="typeOptions" onChange={onChangeAppManual} value={this.state.AppManual}>
                    <Radio value="L">{intlObj.get(messages.webside)}</Radio>
                    <Radio value="F" style={{ width: 295 }}>
                      {intlObj.get(messages.documentation)}
                    </Radio>
                  </RadioGroup>
                </div>
                <div style={{ display: this.state.AppManual === 'L' ? 'block' : 'none', marginTop: 10 }}>
                  <Input
                    placeholder=""
                    title={intlObj.get(messages.webside)}
                    style={{ verticalAlign: 'middle' }}
                    maxLength="1000"
                    onChange={onChangeAppManualUrl}
                    defaultValue={this.state.APP_MANUAL_URL}
                  />
                </div>
                <div style={{ display: this.state.AppManual === 'F' ? 'block' : 'none', marginTop: 10 }}>
                  {this.state.UploadFilesManual.length > 0 ? (
                    this.state.UploadFilesManual.map(f => (
                      <Input placeholder="" title={intlObj.get(messages.documentation)} style={{ verticalAlign: 'middle' }} value={f.fileName} />
                    ))
                  ) : (
                    <Input placeholder="" title={intlObj.get(messages.documentation)} style={{ verticalAlign: 'middle' }} />
                  )}
                  <section className="btnText attachFile">
                    <Upload
                      // accept="image/jpeg, image/png" // default ALL
                      onFileUploaded={this.onFileUploadedManual}
                      multiple={false} // default true
                      // width={123}
                      // height={123}
                      borderStyle="none"
                    >
                      <span>{intlObj.get(messages.attachment)}</span>
                    </Upload>
                  </section>
                </div>
              </div>
            </FormItem>

            <h3 className="sectionTitle">{intlObj.get(messages.screenInfo)}</h3>
            {/* 10. 스크린샷 */}
            <h4>{intlObj.get(messages.screenShot)}</h4>
            <section className="screenshotUploadArea" style={{ marginBottom: 30 }}>
              <div className="defaultGuideTxt">{intlObj.get(messages.screenShotDrag)}</div>
              <Upload
                accept="image/jpeg, image/png" // default ALL
                onFileUploaded={this.onFileUploadedScreenshot}
                multiple // default true
                borderStyle="none"
              >
                <Row style={rowStyle} gutter={gutter} justify="start">
                  {this.state.UploadFilesScreenshot.map((f, index) => (
                    <Col key={f.seq} md={6} sm={12} xs={24} style={colStyle}>
                      <span onClick={imgClick} onKeyPress={imgClick} role="presentation">
                        <img src={imgUrl.get('190x140', f.seq)} alt={f.fileName} />
                      </span>
                      <button className="deleteScreenshots" onClick={e => this.UploadFilesScreenDel(e, index)} title={intlObj.get(messages.screenShotDel)} />
                    </Col>
                  ))}
                  <Col>
                    <div className="readyToUpload" />
                  </Col>
                </Row>
              </Upload>
            </section>
            {/* 11. 키워드 */}
            <h4>{intlObj.get(messages.keyword)}</h4>
            <FormItem style={{ paddingBottom: 30 }}>
              <Input placeholder="" title={intlObj.get(messages.keyword)} maxLength="120" onChange={onChangeKeyword} defaultValue={this.state.KEYWORD} />
            </FormItem>
            {/* 12. 필수 App */}
            <h4>{intlObj.get(messages.requiredApp)}</h4>
            <section className="quickmenuAppUploadArea" style={{ paddingBottom: 20 }}>
              <Row style={rowStyle} gutter={gutter} justify="start">
                {this.state.appList1.map((f, index) => (
                  <Col key={f.APP_ID} md={6} sm={12} xs={24} style={colStyle}>
                    <div className="borderRadius">
                      <img
                        src={imgUrl.get('120x120', f.ICON)}
                        alt={lang.get('NAME', f)}
                        onError={e => {
                          e.target.src = '/app_icon/icon_no_image.png';
                        }}
                      />
                      {/* <p className="appName">{lang.get('NAME', f)}</p> */}
                      <button
                        className="deleteScreenshots"
                        // onClick={UploadFilesScreenDel(f.seq)}
                        onClick={() => appList1Del(index)}
                        title={intlObj.get(messages.screenShotDel)}
                      />
                    </div>
                  </Col>
                ))}
                <Col>
                  <button onClick={openAppPlus1Modal} title={intlObj.get(messages.appAdd)} className="readyToUpload" />
                </Col>
              </Row>
            </section>
            {/* 13. 추천 App */}
            <h4>{intlObj.get(messages.recommApp)}</h4>
            <section className="quickmenuAppUploadArea">
              <Row style={rowStyle} gutter={gutter} justify="start">
                {this.state.appList2.map((f, index) => (
                  <Col key={f.APP_ID} md={6} sm={12} xs={24} style={colStyle}>
                    <img
                      src={imgUrl.get('120x120', f.ICON)}
                      alt={lang.get('NAME', f)}
                      onError={e => {
                        e.target.src = '/app_icon/icon_no_image.png';
                      }}
                    />
                    {/* <p className="appName">{lang.get('NAME', f)}</p> */}
                    <button
                      className="deleteScreenshots"
                      // onClick={UploadFilesScreenDel(f.seq)}
                      onClick={() => appList2Del(index)}
                      title={intlObj.get(messages.screenShotDel)}
                    />
                  </Col>
                ))}
                <Col>
                  <button onClick={openAppPlus2Modal} title={intlObj.get(messages.appAdd)} className="readyToUpload" />
                </Col>
              </Row>
            </section>
            <h3 className="sectionTitle">{intlObj.get(messages.permissions)}</h3>
            {/* 15. 추천 App */}
            <h4>
              {intlObj.get(messages.authApp)} {intlObj.get(messages.availability)}
            </h4>
            <ul className="infoAuthList">
              <li>{intlObj.get(messages.authAppMemt1)}</li>
              <li>{intlObj.get(messages.authAppMemt2)}</li>
            </ul>
            <FormItem style={{ margin: '10px 0 50px 0' }}>
              <RadioGroup className="typeOptions" onChange={onChangeSecReqYn} value={this.state.SEC_REQ_YN}>
                <StyledRadio value="Y">{intlObj.get(messages.authAppYes)}</StyledRadio>
                <StyledRadio value="N">{intlObj.get(messages.authAppNo)}</StyledRadio>
              </RadioGroup>
            </FormItem>

            <div className="buttonWrapper">
              <Link to="/admin/adminmain/sysapp" style={{ float: 'left' }}>
                <StyledButton className="btn-light">{intlObj.get(messages.list)}</StyledButton>
              </Link>
              <Link to="/admin/adminmain/sysapp">
                <StyledButton className="btn-light">{intlObj.get(messages.cancel)}</StyledButton>
              </Link>
              <StyledButton className="btn-primary" onClick={appInfoSave}>
                {intlObj.get(messages.save)}
              </StyledButton>
              {/* <BtnDkGray onClick={appExamodal}>
                {intlObj.get(messages.examinReq)}
              </BtnDkGray> */}
            </div>
          </Form>
        </StyleAppRegisForm>
      </div>
    );
  }
}

AppRegisForm.propTypes = {
  getInitInfo: PropTypes.func, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
  appInfoSave: PropTypes.func, //eslint-disable-line
  linkTypeList: PropTypes.array, //eslint-disable-line
  // windowSizeList: PropTypes.array, //eslint-disable-line
  // popupPosList: PropTypes.array, //eslint-disable-line
  methodList: PropTypes.array, //eslint-disable-line
  handleSaveSettingMembers: PropTypes.func, //eslint-disable-line
  wedgetColorList: PropTypes.array, //eslint-disable-line
};

const mapDispatchToProps = dispatch => ({
  getInitInfo: () => dispatch(actions.getInitInfo()),

  appInfoSave: (
    CLIENT_TYPE,
    LANG_LIST,
    NAME_KOR,
    APP_ABBR_KOR,
    DSCR_KOR,
    NAME_ENG,
    APP_ABBR_ENG,
    DSCR_ENG,
    NAME_CHN,
    APP_ABBR_CHN,
    DSCR_CHN,
    CATG_ID,
    SRC_PATH,
    history,
    UploadFilesIcon,
    VER_1,
    VER_2,
    VER_3,
    Workstep,
    WORK_STEP_URL,
    UploadFilesWork,
    AppManual,
    APP_MANUAL_URL,
    UploadFilesManual,
    UploadFilesScreenshot,
    KEYWORD,
    INTL_YN,
    linkType,
    LINK_URL,
    // WIDTH,
    // HEIGHT,
    LINK_METHOD,
    LINK_PARAM,
    SEC_REQ_YN,
    appList1,
    appList2,
    // DFLT_SKIN,
    SERVICE_FORM,
    ITEM_VALUE,
  ) => {
    dispatch(
      actions.insertAppInfo(
        CLIENT_TYPE,
        LANG_LIST,
        NAME_KOR,
        APP_ABBR_KOR,
        DSCR_KOR,
        NAME_ENG,
        APP_ABBR_ENG,
        DSCR_ENG,
        NAME_CHN,
        APP_ABBR_CHN,
        DSCR_CHN,
        CATG_ID,
        SRC_PATH,
        history,
        UploadFilesIcon,
        VER_1,
        VER_2,
        VER_3,
        Workstep,
        WORK_STEP_URL,
        UploadFilesWork,
        AppManual,
        APP_MANUAL_URL,
        UploadFilesManual,
        UploadFilesScreenshot,
        KEYWORD,
        INTL_YN,
        linkType,
        LINK_URL,
        // WIDTH,
        // HEIGHT,
        LINK_METHOD,
        LINK_PARAM,
        SEC_REQ_YN,
        appList1,
        appList2,
        // DFLT_SKIN,
        SERVICE_FORM,
        ITEM_VALUE,
      ),
    );
  },
});

const mapStateToProps = createStructuredSelector({
  linkTypeList: selectors.makeSelectLinkTypeList(),
  // windowSizeList: selectors.makeSelectWindowSizeList(),
  // popupPosList: selectors.makeSelectPopupPosList(),
  methodList: selectors.makeSelectMethodList(),
  wedgetColorList: selectors.makeSelectWedgetColorList(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'admin/AdminMain/App/AppRegisForm', saga });
const withReducer = injectReducer({ key: 'admin/AdminMain/App/AppRegisForm', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AppRegisForm);
