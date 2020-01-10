import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { intlObj, bannerImgUrl } from 'utils/commonUtils';

import { WIDGET } from 'utils/constants';
import CarouselWrapper from './carousel.style';
import Carousels from './carousel';
import { BannerWrapper } from './bannerStyle';

import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';

import messages from '../../../components/Page/messages';

const Carousel = props => (
  <CarouselWrapper>
    <Carousels {...props} />
  </CarouselWrapper>
);

const divisionStyle = {
  width: '100%',
  // 테스트 용도로 220으로 변경 실제변경시 250 && .slick-slide 도 260으로 변경해야 함 0627
  height: 215,
  // marginTop: 10,
};

const slideStyle = {
  textAlign: 'center',
  fontSize: 10,
  width: '320px',
  height: '100%',
  margin: 'auto',
};

const slideStyle2 = {
  textAlign: 'center',
  fontSize: 10,
  width: '100%',
  height: '100%',
  margin: 'auto',
};

// const noContent = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   color: '#909090',
//   fontSize: '14px',
// };

class Banner extends PureComponent {
  // constructor(props) {
  //   super(props);
  //   const { item } = this.props;
  //   this.state = {
  //     item: item,
  //   }
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   const { item } = this.props;
  //   if (item.WIDGET_ID === nextProps.cashItem.WIDGET_ID) {
  //     if (!_.isEqualWith(item, nextProps.cashItem)) {
  //       this.setState({ item: nextProps.cashItem });
  //     }
  //   }
  // }

  getBanner = (banners, bannersViewType, checkTitle) => {
    const tableRowArr = [];

    if (bannersViewType === '0') {
      if (banners.length > 0) {
        const bannersData = banners;
        const bannersNum = bannersData.length;
        const isTitleHeight = Math.ceil(225 / bannersNum);
        const isNotTitleHeight = Math.ceil(260 / bannersNum);
        /* title이 없을 때 Math.ceil(240 / bannersNum); 해주어야 합니다 */
        for (let i = 0; i < bannersData.length; i += 1) {
          tableRowArr.push(
            <Table.Row key={bannersData[i].SEQNO}>
              <Table.Cell style={{ verticalAlign: 'top', height: checkTitle ? isTitleHeight : isNotTitleHeight }}>
                {/* <Table.Cell style={{ padding: '0 10px', verticalAlign: 'top', height: checkTitle ? isTitleHeight : isNotTitleHeight }}> */}
                <a href={bannersData[i].URL} target="_blank">
                  <img
                    alt={bannersData[i].TITLE}
                    src={bannerImgUrl.get('320x240', bannersData[i].IMAGE)}
                    title={bannersData[i].TITLE}
                    style={{ width: '100%', height: checkTitle ? isTitleHeight : isNotTitleHeight }}
                    onError={e => {
                      e.target.src = '/no_img_pro.jpg';
                    }}
                  />
                </a>
              </Table.Cell>
            </Table.Row>,
          );
        }

        const tableArr = [];
        let index = 0;

        let tableRowArrBefore = [];

        tableRowArr.forEach(() => {
          if (index < bannersData.length) {
            tableRowArrBefore.push(tableRowArr[(index += 1)]);
            if (index === bannersData.length) {
              tableArr.push(
                React.createElement(
                  'div',
                  { key: '' },
                  React.createElement(Table, { className: 'multiBanner', style: divisionStyle }, React.createElement(Table.Body, {}, tableRowArrBefore)),
                ),
              );
              tableRowArrBefore = [];
            }
          }
        });
        //
        // for (let j = 0; j < tableRowArr.length; j++) {
        //   if (index < bannersData.length) {
        //     tableRowArrBefore.push(tableRowArr[index++]);
        //     if (index === bannersData.length) {
        //       tableArr.push(
        //         React.createElement(
        //           'div',
        //           { key: '' },
        //           React.createElement(Table, { className: 'multiBanner', style: divisionStyle }, React.createElement(Table.Body, {}, tableRowArrBefore)),
        //         ),
        //       );
        //       tableRowArrBefore = [];
        //     }
        //   }
        // }

        return tableArr;
      }
    }

    return [];
  };

  slideContent = item => {
    const banners = item.data;
    const widgetWidth = item.position[2];
    const widgetHeight = item.position[3];

    if (widgetWidth === '1' && widgetHeight === '1') {
      return banners.map(banner => (
        <a href={banner.URL} target="_blank" key={banner.IMAGE} style={{ overflow: 'hidden' }} className="slideContent">
          <img src={bannerImgUrl.get('320x240', banner.IMAGE)} title={banner.TITLE} style={slideStyle} alt={banner.IMAGE} />
        </a>
      ));
    }
    if (widgetWidth === '2' && widgetHeight === '1') {
      return banners.map(banner => (
        <a href={banner.URL} target="_blank" key={banner.IMAGE} style={{ overflow: 'hidden' }} className="slideContent">
          <img src={bannerImgUrl.get('640x240', banner.IMAGE)} alt={banner.IMAGE} title={banner.TITLE} style={slideStyle2} />
          <div className="slideContentText" style={{ display: banner.TITLE ? 'block' : 'none' }}>
            <p className="title">{banner.TITLE}</p>
          </div>
        </a>
      ));
    }
    return banners.map(banner => (
      <a href={banner.URL} target="_blank" key={banner.IMAGE} style={{ overflow: 'hidden' }} className="slideContent">
        <img src={bannerImgUrl.get('320x240', banner.IMAGE)} alt={banner.IMAGE} title={banner.TITLE} style={slideStyle} />
      </a>
    ));
  };

  render() {
    console.log('Banner Render ########', this);
    const { item } = this.props;
    const banners = item.data;
    const checkTitle = item.user.isTitle;
    // viewType: 0 분할, 1 슬라이드
    const bannersViewType = item.user.viewType;
    const divisionContent = this.getBanner(banners, bannersViewType, checkTitle);

    return (
      <div>
        {banners.length > 0 ? (
          <BannerWrapper>
            {bannersViewType === '1' ? (
              <div className="carouselWrapper banner">
                <Carousel
                  // arrows
                  dots
                  slidesToShow={1}
                  adaptiveHeight
                  afterChange={this.onChange}
                  autoplay
                >
                  {this.slideContent(item)}
                </Carousel>
              </div>
            ) : (
              <div>{divisionContent}</div>
            )}
          </BannerWrapper>
        ) : (
          <div className="noWidgetWrapper">
            <div className="noWidgetContent">
              <p className="noWCIcon">{intlObj.get(messages.bannerResist)}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Banner.propTypes = {
  item: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cashItem: selectors.makeGetBanner(),
});

const mapDispatchToProps = dispatch => ({
  // handleGetBannerList: item => dispatch(actions.getBannerList(item)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'banner', reducer });
const withSaga = injectSaga({ key: 'banner', saga, mode: WIDGET });

export default compose(withReducer, withSaga, withConnect)(Banner);
