import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import update from 'react-addons-update';
import { Radio } from 'antd';
import AntRadiobox from '../../../containers/store/components/uielements/radiobox.style';
import { BtnIconAdd } from '../../../components/uielements/styles/buttons.style';
import { BtnDkGray } from 'containers/portal/components/uielements/buttons.style';
import { intlObj } from 'utils/commonUtils';
import messages from '../../../components/Page/messages';
import WidgetSettingStyle from './widgetSettingStyle';
import BannerListChild from './bannerListChild';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';

const RadioGroup = AntRadiobox(Radio.Group);

const debouncedOnChange = _.debounce((action, value) => { action(value); }, 300);

class WidgetSetting extends PureComponent {
  constructor(props) {
    super(props);
    const { item, type } = this.props;

    const bannerList = item.data;
    // 초기값 처리
    if (bannerList.length !== undefined) {
      for (let i = 0; i < bannerList.length; i += 1) {
        Object.assign(bannerList[i], { SEQNO: `${i}` });
      }
      this.state = {
        itemList: item,
        bannerList: bannerList,
        deletedBannerIndex: [],
        isWidgetDragged: false,
        viewType: item.user.viewType,
        numChildren: bannerList.length,
        widgetId: item.WIDGET_ID,
        pageId: item.PAGE_ID,
      };
    } else {
      const content = [];
      let emptyContent = new Object();
      emptyContent.SEQNO = `${0}`;
      emptyContent.TITLE = "";
      emptyContent.URL = "";
      emptyContent.IMAGE = "";
      emptyContent.METHOD = "get";
      emptyContent.param = "";
      content.push(emptyContent);

      this.state = {
        itemList: item,
        bannerList: content,
        deletedBannerIndex: [],
        isWidgetDragged: false,
        viewType: item.user.viewType,
        numChildren: content.length,
        widgetId: item.WIDGET_ID,
        pageId: item.PAGE_ID,
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    const { item } = this.props;
    const nextItemBannerList = nextProps.itemBannerList.data;
    if (nextItemBannerList.length !== undefined) {
      for (let i = 0; i < nextItemBannerList.length; i += 1) {
        Object.assign(nextItemBannerList[i], { SEQNO: `${i}` });
      }
      const nextItem = nextProps.itemBannerList;
      const nextWidgetId = nextProps.widgetId;
      const nextPageId = nextProps.pageId;

      this.setState({
        itemList: nextItem,
        bannerList: nextItem.data,
        deletedBannerIndex: [],
        isWidgetDragged: false,
        viewType: nextItem.user.viewType,
        numChildren: nextItem.data.length,
        widgetId: nextWidgetId,
        pageId: nextPageId,
      });
    }
  }

  changeIsWidgetDragged = () => {
    const { isWidgetDragged } = this.state;

    if (!isWidgetDragged) {
      this.setState({
        isWidgetDragged: true,
      });
    } else {
      this.setState({
        isWidgetDragged: false,
      });
    }
  }

  dndChangePosition = (seqNo, afterSeqNo) => {
    const {
      bannerList,
    } = this.state;

    const index = bannerList.findIndex(i => i.SEQNO === seqNo);
    const afterIndex = bannerList.findIndex(i => i.SEQNO === afterSeqNo);

    let temp = bannerList[index];
    let temp2 = bannerList[afterIndex];

    let bannerListCopy = bannerList.slice();

    bannerListCopy.splice(index, 1, temp2);
    bannerListCopy.splice(afterIndex, 1, temp);

    this.setState({
      bannerList: bannerListCopy,
    });
  }

  getBannerSettingList = () => {
    const { bannerList } = this.state;
    const result = bannerList.map((bannerList, index) => {
      if (bannerList.isShow !== false) {
        return (
          <BannerListChild
            index={index}
            bannerList={bannerList}
            setDeletedBannerIndex={this.setDeletedBannerIndex}
            changeIsWidgetDragged={this.changeIsWidgetDragged}
            dndChangePosition={this.dndChangePosition}
          />
        )
      }
    });
    return result;
  }

  setDeletedBannerIndex = (SEQNO) => {
    const {
      bannerList,
      deletedBannerIndex
    } = this.state;
    const index = bannerList.findIndex(bannerList => bannerList.SEQNO === SEQNO);
    let bannerListCopy = update(bannerList, {
      [index]: {
        isShow: {
          $set: false,
        },
      },
    });
    this.setState({
      bannerList: bannerListCopy,
    })
    deletedBannerIndex.push(SEQNO);
  }

  deleteBanner = () => {
    const {
      itemList,
      bannerList,
      viewType,
      widgetId,
      pageId,
    } = this.state;
    const {
      handleSaveSettingBanners,
      handleSaveSettingBizBanners,
      updateBizGroupChgYn,
      type,
    } = this.props;

    const bannerListCopy = bannerList.filter(bannerList => bannerList.isShow !== false);

    for (let i = 0; i < bannerListCopy.length; i += 1) {
      delete bannerListCopy[i].SEQNO;
    }
    const result = {};
    result.size = itemList.size;
    result.sizeArr = itemList.sizeArr;
    result.user = {};
    result.user.isTitle = itemList.user.isTitle;
    result.user.skin = itemList.user.skin;
    result.user.viewType = viewType;
    result.data = bannerListCopy;

    const item = JSON.stringify(result);

    if (type === "mypage") {
      handleSaveSettingBanners(item, widgetId, pageId);
    } else {
      //업무그룹
      handleSaveSettingBizBanners(item, widgetId, pageId);
      // 업무 그룹 변화 감지 함수
      updateBizGroupChgYn();
    }

    this.setState({
      deletedBannerIndex: [],
    });
  }

  handleAppendBanner = () => {
    const content = this.state.bannerList.slice();
    const { bannerList, numChildren } = this.state;
    for (let i = bannerList.length; i < this.state.numChildren + 1; i += 1) {
      let emptyContent = new Object();
      //emptyContent.SEQNO = `${i}`;
      emptyContent.SEQNO = `${i}`;
      emptyContent.TITLE = "";
      emptyContent.URL = "";
      emptyContent.IMAGE = "";
      emptyContent.METHOD = "get";
      emptyContent.param = "";
      content.push(emptyContent)
    }

    this.setState({
      bannerList: content,
      numChildren: numChildren + 1,
    })

    // debouncedOnChange(() => this.scrollbarBottom(), 500);
  }

  // scrollbarBottom() {
  //   this.scrollComponent.scrollToBottom();
  // }

  render() {
    const { bannerList, numChildren } = this.state;
    const content = this.getBannerSettingList();

    const viewTypeChange = (e) => {
      this.setState({ viewType: e.target.value }, function () {
      });
    };

    return (
      <div className="commonPage" style={{ width: '100%' }}>
        <div className="basicSettingTable">
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <th>
                  <label className="subtitle" htmlFor="wSubject">배너 설정</label>
                </th>
                <td>
                  <WidgetSettingStyle>
                    <div className="viewType">
                      <RadioGroup
                        value={this.state.viewType}
                        className="typeOptions"
                        onChange={viewTypeChange}
                      >
                        <Radio value="0">{intlObj.get(messages.viewDivision)}</Radio>
                        <Radio value="1">{intlObj.get(messages.viewSlide)}</Radio>
                      </RadioGroup>
                      <BtnDkGray style={{ float: 'right', marginTop: '-4px' }} onClick={this.deleteBanner}>배너 적용</BtnDkGray>
                    </div>
                    {/* <Scrollbars
                      className="custom-scrollbar"
                      ref={c => { this.scrollComponent = c }}
                      style={{ width: 'auto' }}
                      autoHide
                      autoHideTimeout={1000}
                      autoHideDuration={200}
                      autoHeight
                      autoHeightMax={288}
                    > */}
                    {content}
                    {/* </Scrollbars> */}
                    <div className="btnWrapper">
                      <BtnIconAdd title="addNewForm" onClick={(e) => { e.preventDefault(); this.handleAppendBanner() }} />
                    </div>
                  </WidgetSettingStyle>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

WidgetSetting.propTypes = {
  item: PropTypes.object,
  itemBannerList: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  itemBannerList: selectors.makeGetBannerList(),
  widgetId: selectors.makeGetWidgetId(),
  pageId: selectors.makeGetPageId(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleSaveSettingBanners: (item, widgetId, pageId) => dispatch(actions.deleteBanner(item, widgetId, pageId)),
    handleSaveSettingBizBanners: (item, widgetId, pageId) => dispatch(actions.deleteBizBanner(item, widgetId, pageId)),
  };
}

const withReducer = injectReducer({ key: 'bannerSetting', reducer });
const withSaga = injectSaga({ key: 'bannerSetting', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(WidgetSetting);
