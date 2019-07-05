import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { Button, Popover } from 'antd';
import { Link } from 'react-router-dom';
import * as feed from 'components/Feedback/functions';

import { intlObj, lang, imgUrl } from 'utils/commonUtils';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import messages from '../messages';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import { AppIntroduction, AppsRequired, AppsRecommended } from './StyleAppScreenShot';

import CarouselWrapper from './carousel.style';
import Carousels from './carousel';
import moreMenu from 'images/bizstore/icon-more-menu.png';
import { BtnSeeMore } from '../../../components/uielements/buttons.style';

const Carousel = props => (
  <CarouselWrapper>
    <Carousels {...props} />
  </CarouselWrapper>
);

class AppScreenshot extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      appId: prop.appId,
      rqheiFlog: true,
      rcheiFlog: true,
      gubun: prop.gubun,
      isOpen: false,
      images: [],
      photoIndex: 0,
    };
    prop.reqAppScreenshotList(this.state.appId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.appId !== nextProps.appId) {
      this.setState({
        appId: nextProps.appId,
        gubun: nextProps.gubun,
      });
      this.props.reqAppScreenshotList(nextProps.appId);
    }
  }
  /* eslint-disable */
  render() {
    const { isOpen, images, photoIndex } = this.state;

    const onClickImgFullView = index => {
      const imagesArr = [];

      this.props.resAppScreenshotList.map(item => imagesArr.push(imgUrl.get('0x0', item.FILE_PATH)));

      this.setState({
        images: imagesArr,
        isOpen: true,
        photoIndex: index === '' ? 0 : index,
      });
    };

    const loop = data =>
      data.map((item, index) => (
        <div key={item.FILE_PATH} style={{ overflow: 'hidden' }}>
          <span onClick={() => onClickImgFullView(index)} onKeyPress={() => onClickImgFullView(index)} role="presentation">
            <img src={imgUrl.get('190x140', item.FILE_PATH)} alt={item.ITEM_VALUE} style={{ height: 140, margin: 'auto', cursor: 'pointer' }} />
          </span>
        </div>
      ));

    const loopApp = data =>
      data.map(item => {
        const registerApps = () => {
          this.props.registApp(item.REF_APP_ID, this.props.resAppExplain.APP_ID);
        };
        const handleRegistApp = () => feed.showConfirm(`${lang.get('NAME', item)} ${intlObj.get(messages.appInput)}`, '', registerApps);

        const registerCategorys = () => {
          this.props.registCategory(item.REF_APP_ID, this.props.resAppExplain.APP_ID);
        };
        const handleRegistCategory = () =>
          feed.showConfirm(`${lang.get('NAME', item)} ${intlObj.get(messages.appInput)}`, `${intlObj.get(messages.catgAppInput)}`, registerCategorys);
        return (
          <div key={item.REF_APP_ID} className="appCols">
            <Link to={`/store/appMain/bizStore/app/detail/${item.CATG_ID}/${item.REF_APP_ID}`}>
              <img src={imgUrl.get('120x120', item.ICON)} alt={lang.get('NAME', item)} style={{ width: '100%', height: '100%' }} />
            </Link>
            <Popover
              placement="bottomRight"
              content={
                <ul className="popoverType1 appListMenu">
                  <li>
                    <Button
                      onClick={() => handleRegistCategory(item)}
                      type="button"
                      className="highlight icon-regst-tree"
                      style={{ display: item.WG_COUNT === 0 ? 'block' : 'none' }}
                    >
                      {intlObj.get(messages.catgInput)}
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => handleRegistApp(item)}
                      type="button"
                      className="icon-regst-app"
                      style={{ display: item.WG_COUNT === 0 ? 'block' : 'none' }}
                    >
                      {intlObj.get(messages.menuInput)}
                    </Button>
                  </li>
                  <li>
                    <Button type="button" className="icon-regst-use" style={{ display: item.WG_COUNT > 0 ? 'block' : 'none' }}>
                      {intlObj.get(messages.apping)}
                    </Button>
                  </li>
                </ul>
              }
              size="50"
              trigger="hover"
              overlayClassName="popoverType1"
            >
              <div className="moreMenuImg">
                <img src={moreMenu} alt={intlObj.get(messages.appMenu)} />
              </div>
            </Popover>
            <Link to={`/store/appMain/bizStore/app/detail/${item.CATG_ID}/${item.REF_APP_ID}`}>
              <p className="appName">{lang.get('NAME', item)}</p>
            </Link>
          </div>
        );
      });

    const rqButton = () => {
      if (this.state.rqheiFlog) {
        this.setState({ rqheiFlog: false });
      } else {
        this.setState({ rqheiFlog: true });
      }
    };

    const rcButton = () => {
      if (this.state.rcheiFlog) {
        this.setState({ rcheiFlog: false });
      } else {
        this.setState({ rcheiFlog: true });
      }
    };

    return (
      <div>
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
        <AppIntroduction>
          <h2 className="adTitle" style={{ display: lang.get('DSCR', this.props.resAppExplain) !== ' ' ? 'block' : 'none' }}>
            {intlObj.get(messages.appdscr)}
          </h2>
          <div className="dscr">{lang.get('DSCR', this.props.resAppExplain)}</div>
          <div className="carouselWrapper">
            <Carousel
              arrows
              infinite
              dots={false}
              slidesToShow={4}
              slidesToScroll={3}
              adaptiveHeight
              centerMode
              // centerPadding="10px"
            >
              {loop(this.props.resAppScreenshotList)}
            </Carousel>
          </div>
        </AppIntroduction>
        <AppsRequired
          style={{
            display: this.props.resRequiredAppList.length > 0 && this.state.gubun === 1 ? 'block' : 'none',
          }}
        >
          <h2 className="adTitle">{intlObj.get(messages.requiredApp)}</h2>
          {this.state.rqheiFlog && (this.props.currentView === 'Mobile' || this.props.currentView === 'Tablet') ? (
            <div className="appColWrapper" style={{ overflow: 'hidden', maxHeight: 124 }}>
              {loopApp(this.props.resRequiredAppList)}
            </div>
          ) : (
            ''
          )}
          {this.state.rqheiFlog && (this.props.currentView !== 'Mobile' && this.props.currentView !== 'Tablet') ? (
            <div className="appColWrapper" style={{ overflow: 'hidden', maxHeight: 200 }}>
              {loopApp(this.props.resRequiredAppList)}
            </div>
          ) : (
            ''
          )}
          {!this.state.rqheiFlog ? (
            <div className="appColWrapper" style={{ overflow: 'hidden', maxHeight: 'auto' }}>
              {loopApp(this.props.resRequiredAppList)}
            </div>
          ) : (
            ''
          )}
          {this.props.currentView !== 'Mobile' && this.props.currentView !== 'Tablet' ? (
            <BtnSeeMore
              key="submit"
              loading={this.state.loading}
              onClick={rqButton}
              style={{ display: this.props.resRequiredAppList.length > 5 ? 'block' : 'none' }}
              className={this.state.rqheiFlog ? 'down' : 'up'}
            />
          ) : (
            <BtnSeeMore
              key="submit"
              loading={this.state.loading}
              onClick={rqButton}
              style={{ display: this.props.resRequiredAppList.length > 3 ? 'block' : 'none' }}
              className={this.state.rqheiFlog ? 'down' : 'up'}
            />
          )}
        </AppsRequired>
        <AppsRecommended style={{ display: this.props.resRecomAppList.length > 0 && this.state.gubun === 1 ? 'block' : 'none' }}>
          <h2 className="adTitle">{intlObj.get(messages.recomApp)}</h2>
          {this.state.rcheiFlog && (this.props.currentView === 'Mobile' || this.props.currentView === 'Tablet') ? (
            <div className="appColWrapper" style={{ overflow: 'hidden', maxHeight: 124 }}>
              {loopApp(this.props.resRecomAppList)}
            </div>
          ) : (
            ''
          )}
          {this.state.rcheiFlog && (this.props.currentView !== 'Mobile' && this.props.currentView !== 'Tablet') ? (
            <div className="appColWrapper" style={{ overflow: 'hidden', maxHeight: 200 }}>
              {loopApp(this.props.resRecomAppList)}
            </div>
          ) : (
            ''
          )}
          {!this.state.rcheiFlog ? (
            <div className="appColWrapper" style={{ overflow: 'hidden', maxHeight: 'auto' }}>
              {loopApp(this.props.resRecomAppList)}
            </div>
          ) : (
            ''
          )}
          {this.props.currentView !== 'Mobile' && this.props.currentView !== 'Tablet' ? (
            <BtnSeeMore
              key="submit"
              loading={this.state.loading}
              onClick={rcButton}
              style={{ display: this.props.resRecomAppList.length > 5 ? 'block' : 'none' }}
              className={this.state.rcheiFlog ? 'down' : 'up'}
            />
          ) : (
            <BtnSeeMore
              key="submit"
              loading={this.state.loading}
              onClick={rcButton}
              style={{ display: this.props.resRecomAppList.length > 3 ? 'block' : 'none' }}
              className={this.state.rcheiFlog ? 'down' : 'up'}
            />
          )}
        </AppsRecommended>
      </div>
    );
  }
}

AppScreenshot.propTypes = {
  reqAppScreenshotList: PropTypes.func, //eslint-disable-line
  resAppScreenshotList: PropTypes.array, //eslint-disable-line
  resAppExplain: PropTypes.object, //eslint-disable-line
  resRequiredAppList: PropTypes.array, //eslint-disable-line
  resRecomAppList: PropTypes.array, //eslint-disable-line
  registCategory: PropTypes.func, //eslint-disable-line
  registApp: PropTypes.func, //eslint-disable-line
  appId: PropTypes.string, //eslint-disable-line
  gubun: PropTypes.number, //eslint-disable-line
  currentView: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  reqAppScreenshotList: appId => dispatch(actions.reqAppScreenshotList(appId)),
  registCategory: (REF_APP_ID, APP_ID) => {
    dispatch(actions.registCategory(REF_APP_ID, APP_ID));
  },
  registApp: (REF_APP_ID, APP_ID) => dispatch(actions.registApp(REF_APP_ID, APP_ID)),
});

const mapStateToProps = createStructuredSelector({
  resAppScreenshotList: selectors.makeSelectAppScreenshotList(),
  resAppExplain: selectors.makeSelectAppExplain(),
  resRequiredAppList: selectors.makeSelectRequiredAppList(),
  resRecomAppList: selectors.makeSelectRecomAppList(),
  currentView: selectors.currentView(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'appScreenshotList', saga });
const withReducer = injectReducer({ key: 'appScreenshotList', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AppScreenshot);
