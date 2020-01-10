import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as feed from 'components/Feedback/functions';
import { Button, Row, Col } from 'antd';
import { injectIntl } from 'react-intl';
// import WidgetSkin from 'components/uielements/styles/widgetSkin';
// import OrgReturnView from 'components/OrgReturnView';
import basicStyle from 'config/basicStyle';
import { intlObj, lang, imgUrl } from 'utils/commonUtils';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import StyleAppDetailForm from './StyleAppDetailForm';
import messages from '../messages';

const { rowStyle, colStyle, gutter } = basicStyle;

class AppDetailForm extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      isOpen: false,
      images: [],
      photoIndex: 0,
    };
    this.props.getMyAppDetail(prop.APP_ID, prop.VER, lang.getLocale(), prop.history, prop.mod);
  }

  managerPop = () => {
    feed.success('개발 예정인 기능 입니다.');
  };

  render() {
    const {
      setMyAppDetail,
      // systemLink,
      // history,
    } = this.props;
    const { isOpen, images, photoIndex } = this.state;
    const onClickWorking = (flag, url) => {
      if (flag === 'L') {
        if (!url.match(/^https?:\/\//i)) {
          window.open(`http://${url}`);
        } else {
          window.open(url);
        }
        window.open(url);
      } else {
        window.location.assign(url);
      }
    };

    const onClickImgFullView = index => {
      const imagesArr = [];

      this.props.screenshotList.map(item => imagesArr.push(imgUrl.get('0x0', item.FILE_PATH)));

      this.setState({
        images: imagesArr,
        isOpen: true,
        photoIndex: index === '' ? 0 : index,
      });
    };

    const loopScreenShot = data =>
      data.map((item, index) => (
        <Col key={item.ITEM_SQ} md={6} sm={12} xs={24} style={colStyle} className="appCols">
          <span onClick={() => onClickImgFullView(index)} onKeyPress={() => onClickImgFullView(index)} role="presentation">
            <img src={imgUrl.get('190x140', item.FILE_PATH)} alt={item.FILE_PATH} style={{ cursor: 'pointer' }} />
          </span>
        </Col>
      ));

    const loopApp = data =>
      data.map(item => (
        <div key={item.APP_ID} className="appCols">
          <a href={`/admin/adminmain/sysapp/appDetail/${item.CATG_ID}/${item.APP_ID}`} target="_blank" rel="noopener noreferrer">
            <img
              src={imgUrl.get('120x120', item.ICON)}
              alt={lang.get('NAME', item)}
              style={{ width: 120, height: 120 }}
              onError={e => {
                e.target.src = '/app_icon/icon_no_image.png';
              }}
            />
            <p className="appName">{lang.get('NAME', item)}</p>
          </a>
        </div>
      ));

    return (
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
        {/* App 정보 */}
        <StyleAppDetailForm>
          <h2 className="appInfo">{intlObj.get(messages.appInfo)}</h2>

          <h4 className="required">{intlObj.get(messages.supporClient)}</h4>
          <p className="textValue">{setMyAppDetail.CLIENT_TYPE}</p>

          <h4 className="required">{intlObj.get(messages.supporLang)}</h4>
          <p className="textValue">{setMyAppDetail.LANG_LIST}</p>
          {/* 명칭 한국어 */}
          <h4 className="required">{intlObj.get(messages.appNameKor)}</h4>
          <p className="textValue">{setMyAppDetail.NAME_KOR}</p>

          <h4 className="required">{intlObj.get(messages.appAbbrKor)}</h4>
          <p className="textValue">{setMyAppDetail.APP_ABBR_KOR}</p>

          <h4>{intlObj.get(messages.dscrKor)}</h4>
          <p className="textValue">{setMyAppDetail.DSCR_KOR}</p>
          {/* 명칭 영어 */}
          <h4 className="required">{intlObj.get(messages.appNameEng)}</h4>
          <p className="textValue">{setMyAppDetail.NAME_ENG}</p>

          <h4 className="required">{intlObj.get(messages.appAbbrEng)}</h4>
          <p className="textValue">{setMyAppDetail.APP_ABBR_ENG}</p>

          <h4>{intlObj.get(messages.dscrEng)}</h4>
          <p className="textValue">{setMyAppDetail.DSCR_ENG}</p>
          {/* 명칭 중국어 */}
          <h4 className="required">{intlObj.get(messages.appNameChn)}</h4>
          <p className="textValue">{setMyAppDetail.NAME_CHN}</p>

          <h4 className="required">{intlObj.get(messages.appAbbrChn)}</h4>
          <p className="textValue">{setMyAppDetail.APP_ABBR_CHN}</p>

          <h4>{intlObj.get(messages.dscrChn)}</h4>
          <p className="textValue">{setMyAppDetail.DSCR_CHN}</p>
          {/* 카테고리 */}
          <h4>{intlObj.get(messages.category)}</h4>
          <p className="textValue">{setMyAppDetail.CATG_PATH}</p>
          {/* APP ID */}
          {/* <h4>App Id</h4>
          <p className="textValue">{setMyAppDetail.ORIGIN_APP_ID}</p> */}
          <h4>SRC PATH [앱경로]</h4>
          <p className="textValue">{setMyAppDetail.SRC_PATH}</p>

          <h3 className="appInfo">{intlObj.get(messages.serviceGubun)}</h3>
          <div style={{ display: setMyAppDetail.INTL_TYPE === 'N' ? 'block' : 'none' }}>
            <h4>{intlObj.get(messages.serviceGubun)}</h4>
            <p className="textValue">
              {setMyAppDetail.INTL_TYPE === 'Y' ? intlObj.get(messages.insideService) : ''}
              {setMyAppDetail.INTL_TYPE === 'N' ? intlObj.get(messages.outService) : ''}
            </p>

            <h4>{intlObj.get(messages.serviceForm)}</h4>
            <p className="textValue">
              {setMyAppDetail.WIDGET_SVC_YN === 'Y' ? intlObj.get(messages.wedgetYn) : ''}
              {setMyAppDetail.WIDGET_SVC_YN === 'Y' && setMyAppDetail.MENU_SVC_YN === 'Y' ? '/' : ''}
              {setMyAppDetail.MENU_SVC_YN === 'Y' ? intlObj.get(messages.menuYn) : ''}
            </p>

            <h4>{intlObj.get(messages.display)}</h4>
            <p className="textValue">{lang.get('TARGET', this.props.systemLink)}</p>

            <h4>URL</h4>
            <p className="textValue">
              <a href={this.props.systemLink.URL} target="_blank" rel="noopener noreferrer">
                {this.props.systemLink.URL}
              </a>
            </p>

            <h4>{intlObj.get(messages.protocol)}</h4>
            <p className="textValue">{this.props.systemLink.METHOD}</p>

            <h4>{intlObj.get(messages.variable)}</h4>
            <p className="textValue">{this.props.systemLink.PARAM}</p>
          </div>

          <div style={{ display: setMyAppDetail.INTL_TYPE === 'Y' ? 'block' : 'none' }}>
            <h4>{intlObj.get(messages.serviceGubun)}</h4>
            <p className="textValue">
              {setMyAppDetail.INTL_TYPE === 'Y' ? intlObj.get(messages.insideService) : ''}
              {setMyAppDetail.INTL_TYPE === 'N' ? intlObj.get(messages.outService) : ''}
            </p>

            <h4>{intlObj.get(messages.serviceForm)}</h4>
            <p className="textValue">
              {setMyAppDetail.WIDGET_SVC_YN === 'Y' ? intlObj.get(messages.wedgetYn) : ''}
              {setMyAppDetail.WIDGET_SVC_YN === 'Y' && setMyAppDetail.MENU_SVC_YN === 'Y' ? '/' : ''}
              {setMyAppDetail.MENU_SVC_YN === 'Y' ? intlObj.get(messages.menuYn) : ''}
            </p>
          </div>

          <h3 className="appInfo">{intlObj.get(messages.verInfo)}</h3>
          <h4>{intlObj.get(messages.icon)}</h4>
          <div
            style={{
              display: setMyAppDetail.ICON ? 'block' : 'none',
              paddingLeft: 10,
              paddingBottom: 14,
            }}
          >
            <div className="appIcon">
              <img
                // src={`/img/thumb/120x120/${setMyAppDetail.ICON}`}
                src={imgUrl.get('120x120', setMyAppDetail.ICON)}
                alt="APPICON"
              />
            </div>
          </div>

          <h4>
            {intlObj.get(messages.ver)} <small>(Major, Minor, Build)</small>
          </h4>
          <p className="textValue">{setMyAppDetail.VER}</p>

          <h4>{intlObj.get(messages.Workstep)}</h4>
          <div className="textValue">
            <Button
              className={this.props.appProcess.ITEM_TYPE === 'L' ? 'noBorderBtn ellipsis' : 'download'}
              onClick={() => onClickWorking(this.props.appProcess.ITEM_TYPE, this.props.appProcess.FILE_PATH)}
              style={{
                display: this.props.appProcess.ITEM_TYPE ? 'block' : 'none',
              }}
            >
              {this.props.appProcess.ITEM_TYPE === 'L' ? this.props.appProcess.FILE_PATH : intlObj.get(messages.download)}
            </Button>
          </div>

          <h4>{intlObj.get(messages.userManual)}</h4>
          <div className="textValue">
            <Button
              className={this.props.appManual.ITEM_TYPE === 'L' ? 'noBorderBtn ellipsis' : 'download'}
              onClick={() => onClickWorking(this.props.appManual.ITEM_TYPE, this.props.appManual.FILE_PATH)}
              style={{
                display: this.props.appManual.ITEM_TYPE ? 'block' : 'none',
              }}
            >
              {this.props.appManual.ITEM_TYPE === 'L' ? this.props.appManual.FILE_PATH : intlObj.get(messages.download)}
            </Button>
          </div>

          <h3 className="appInfo">{intlObj.get(messages.screenInfo)}</h3>
          <h4>{intlObj.get(messages.screenShot)}</h4>
          <div className="textValue">
            <div className="screenShots">
              <Row style={rowStyle} gutter={gutter} justify="start">
                {loopScreenShot(this.props.screenshotList)}
              </Row>
            </div>
          </div>

          <h4>{intlObj.get(messages.keyword)}</h4>
          <p className="textValue">{setMyAppDetail.KEYWORD}</p>

          <h4>{intlObj.get(messages.requiredApp)}</h4>
          <div className="appColWrapper">{loopApp(this.props.reqAppList)}</div>

          <h4>{intlObj.get(messages.recommApp)}</h4>
          <div className="appColWrapper">{loopApp(this.props.recomAppList)}</div>

          <h3 className="appInfo">{intlObj.get(messages.permissions)}</h3>
          <h4>
            {intlObj.get(messages.authApp)} {intlObj.get(messages.availability)}
          </h4>
          <p className="textValue">
            {setMyAppDetail.SEC_REQ_YN === 'Y' ? intlObj.get(messages.authAppYes) : ''}
            {setMyAppDetail.SEC_REQ_YN === 'N' ? intlObj.get(messages.authAppNo) : ''}
          </p>
        </StyleAppDetailForm>
      </div>
    );
  }
}

AppDetailForm.propTypes = {
  getMyAppDetail: PropTypes.func, //eslint-disable-line
  setMyAppDetail: PropTypes.object, //eslint-disable-line
  appProcess: PropTypes.object, //eslint-disable-line
  appManual: PropTypes.object, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
  screenshotList: PropTypes.array, //eslint-disable-line
  reqAppList: PropTypes.array, //eslint-disable-line
  recomAppList: PropTypes.array, //eslint-disable-line
  systemLink: PropTypes.object, //eslint-disable-line
};

const mapDispatchToProps = dispatch => ({
  getMyAppDetail: (APP_ID, VER, LANG, history, mod) => {
    dispatch(actions.getMyAppDetail(APP_ID, VER, LANG, history, mod));
  },
});

const mapStateToProps = createStructuredSelector({
  setMyAppDetail: selectors.makeSelectMyAppDetail(),
  appProcess: selectors.makeSelectProcess(),
  appManual: selectors.makeSelectManual(),
  screenshotList: selectors.makeSelectScreenshotList(),
  reqAppList: selectors.makeSelectReqAppList(),
  recomAppList: selectors.makeSelectRecomAppList(),
  systemLink: selectors.makeSelectSystemLink(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'admin/AdminMain/App/AppDetailForm', saga });
const withReducer = injectReducer({ key: 'admin/AdminMain/App/AppDetailForm', reducer });

export default injectIntl(compose(withReducer, withSaga, withConnect)(AppDetailForm));
