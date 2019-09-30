import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { Select, Button, Icon } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import * as selectors from '../selector';
import * as actions from '../action';
import saga from '../saga';
import reducer from '../reducer';
import StyleWidgetSetting from './StyleWidgetSetting';

// Bookmark CSManualViewer Widget
class CSManualBookmarkWidgetSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMual: undefined,
    };
  }

  componentDidMount() {
    const { getBookmarkBySaga, item } = this.props;
    const widgetId = item.WIDGET_ID;
    getBookmarkBySaga(widgetId);
  }

  onChangeHandler = value => {
    this.setState({
      selectedMual: value,
    });
  };

  onClickHandler = () => {
    const { item, updateBookmarkBySaga, type, updateBizGroupChgYn } = this.props;
    const { selectedMual } = this.state;

    if (selectedMual === undefined) {
      if (item.data.selectedBookmark !== undefined) {
        message.warning(<MessageContent>변경사항이 없습니다.</MessageContent>, 2);
      } else {
        message.error(<MessageContent>선택된 메뉴얼이 없습니다.</MessageContent>, 2);
      }
    } else if (selectedMual === item.data.selectedBookmark) {
      message.warning(<MessageContent>변경사항이 없습니다.</MessageContent>, 2);
    } else {
      updateBookmarkBySaga(item, selectedMual, type);
      if (type === 'bizgroup') {
        updateBizGroupChgYn();
      }
    }
  };

  render() {
    const { item, profile, bookmarkList } = this.props;
    const { onChangeHandler, onClickHandler } = this;
    const { Option } = Select;

    // 북마크 리스트(JSX)
    const options = bookmarkList.map(bookmark => <Option value={bookmark.MUAL_ORG_IDX}>{bookmark.MUAL_NAME}</Option>);

    return (
      <StyleWidgetSetting>
        <div className="infoText">{profile.NAME_KOR}님의 북마크 매뉴얼 목록입니다.</div>
        <div className="settingWrap">
          <div className="bookmarkSelect">
            <Select
              defaultValue={item.data.selectedBookmark}
              showSearch
              style={{ width: 500 }}
              placeholder="북마크 매뉴얼을 선택하세요(검색가능)"
              optionFilterProp="children"
              onChange={value => onChangeHandler(value)}
            >
              {options}
            </Select>
          </div>
          <div>
            <Button type="primary" onClick={() => onClickHandler()}>
              <Icon type="save" /> 저장
            </Button>
          </div>
        </div>
      </StyleWidgetSetting>
    );
  }
}

CSManualBookmarkWidgetSetting.propTypes = {
  item: PropTypes.object,
  profile: PropTypes.object,
  getBookmarkBySaga: PropTypes.func,
  updateBookmarkBySaga: PropTypes.func,
  bookmarkList: PropTypes.array,
  type: PropTypes.string,
};

CSManualBookmarkWidgetSetting.defaultProps = {
  item: {},
  getBookmarkBySaga: () => false,
  updateBookmarkBySaga: () => false,
  bookmarkList: [],
};

const mapStateToProps = createStructuredSelector({
  profile: selectors.selectUserProfile(),
  bookmarkList: selectors.selectBookmarkList(),
});

const mapDispatchToProps = dispatch => ({
  getBookmarkBySaga: widgetId => dispatch(actions.getBookmarkBySaga(widgetId)),
  updateBookmarkBySaga: (item, selectedMual, settingType) => dispatch(actions.updateBookmarkBySaga(item, selectedMual, settingType)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'CSManual-Bookmark-Widget', saga });
const withReducer = injectReducer({ key: 'CSManual-Bookmark-Widget', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CSManualBookmarkWidgetSetting);
