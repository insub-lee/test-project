import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CarouselWrapper from './carousel.style';
import Carousels from './carousel';
import { BannerWrapper } from './bannerStyle';
import { Table } from 'semantic-ui-react';

import _ from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux'
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { createStructuredSelector } from 'reselect';
import * as selectors from './selectors';

import messages from '../../../components/Page/messages';
import { intlObj } from 'utils/commonUtils';
import { bannerImgUrl } from 'utils/commonUtils';

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
}

class Banner extends PureComponent {
  constructor(props) {
    super(props);
    const { item } = this.props;
    this.state = {
      item: item,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { item } = this.props;
    if (item.WIDGET_ID === nextProps.cashItem.WIDGET_ID) {
      if (!_.isEqualWith(item, nextProps.cashItem)) {
        this.setState({ item: nextProps.cashItem });
      }
    }
  }

  getBanner = (banners, bannersViewType, checkTitle) => {

    let tableRowArr = [];

    if (bannersViewType == '0') {
      if (banners.length > 0) {
        let bannersData = banners;
        let bannersNum = bannersData.length;
        let isTitleHeight = Math.ceil(225 / bannersNum);
        let isNotTitleHeight = Math.ceil(260 / bannersNum);
        /* title이 없을 때 Math.ceil(240 / bannersNum); 해주어야 합니다 */
        for (var i = 0; i < bannersData.length; i++) {
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
                    onError={(e) => { e.target.src = '/no_img_pro.jpg'; }}
                  />
                </a>
              </Table.Cell>
            </Table.Row>
          );
        }

        let tableArr = [];
        let index = 0;

        let tableRowArrBefore = [];

        for (var j = 0; j < tableRowArr.length; j++) {
          if (index < bannersData.length) {
            tableRowArrBefore.push(tableRowArr[index++]);
            if (index === bannersData.length) {
              tableArr.push(
                React.createElement('div', { key: '' },
                  React.createElement(Table, { className: 'multiBanner', style: divisionStyle },
                    React.createElement(Table.Body, {},
                      tableRowArrBefore
                    )
                  )
                )
              );
              tableRowArrBefore = [];
            }
          }
        }

        return tableArr;
      }
    }
  }


  render() {
    const { item } = this.state;
    const banners = item.data;
    const checkTitle = item.user.isTitle;
    // viewType: 0 분할, 1 슬라이드
    const bannersViewType = item.user.viewType;
    const widgetWidth = item.position[2];
    const widgetHeight = item.position[3];
    const divisionContent = this.getBanner(banners, bannersViewType, checkTitle);


    const slideStyle = {
      textAlign: 'center',
      fontSize: 10,
      width: '320px',
      height: '100%',
      margin: 'auto'
    }

    const slideStyle2 = {
      textAlign: 'center',
      fontSize: 10,
      width: '100%',
      height: '100%',
      margin: 'auto'
    }

    const noContent = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#909090',
      fontSize: '14px'
    }

    const slideContent = data => {
      if (widgetWidth == '1' && widgetHeight == '1') {
        return data.map(item => (
          <a href={item.URL}
            target="_blank"
            key={item.SEQNO}
            style={{ overflow: 'hidden' }}
            className="slideContent"
          >
            <img
              src={item.IMAGE}
              src={bannerImgUrl.get('320x240', item.IMAGE)}
              title={item.TITLE}
              style={slideStyle}
            />
          </a>
        ));
      } else if (widgetWidth == '2' && widgetHeight == '1') {
        return data.map(item => (
          <a href={item.URL}
            target="_blank"
            key={item.SEQNO}
            style={{ overflow: 'hidden' }}
            className="slideContent"
          >
            <img
              src={bannerImgUrl.get('640x240', item.IMAGE)}
              alt={item.IMAGE}
              title={item.TITLE}
              style={slideStyle2}
            />
            <div className="slideContentText" style={{ display: item.TITLE ? 'block' : 'none' }}>
              <p className="title">{item.TITLE}</p>
            </div>
          </a>
        ));
      } else {
        return data.map(item => (
          <a href={item.URL}
            target="_blank"
            key={item.SEQNO}
            style={{ overflow: 'hidden' }}
            className="slideContent"
          >
            <img
              src={bannerImgUrl.get('320x240', item.IMAGE)}
              alt={item.IMAGE}
              title={item.TITLE}
              style={slideStyle}
            />
          </a>
        ));
      }
    }

    return (
      <div>
        {banners.length !== 0 ?
          <BannerWrapper>
            {bannersViewType === '1' ?
              <div className="carouselWrapper banner">
                <Carousel
                  // arrows
                  dots={true}
                  slidesToShow={1}
                  adaptiveHeight
                  afterChange={this.onChange}
                  autoplay
                >
                  {slideContent(banners)}
                </Carousel>
              </div>
              :
              <div>
                {divisionContent}
              </div>
            }
          </BannerWrapper>
          :
          <div className="noWidgetWrapper">
            <div className="noWidgetContent">
              <p className="noWCIcon">{intlObj.get(messages.bannerResist)}</p>
            </div>
          </div>
        }
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
const withSaga = injectSaga({ key: 'banner', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Banner);