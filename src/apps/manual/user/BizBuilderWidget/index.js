import React, { Component } from 'react';
import { Table, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { fromJS } from 'immutable';
import Rodal from 'rodal';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ScrollBar from 'react-custom-scrollbars';
import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import 'rodal/lib/rodal.css';
import * as actions from './actions';
import { RodalContentStyle, DrilldownView } from './StyleRodal';
import FroalaEditorView from '../../components/RichTextEditor/FroalaEditorView';

class BizBuilderWidget extends Component {
  state = {
    visible: false,
  };

  componentDidMount() {
    const { item, getBizBuilderListSettingBySaga } = this.props;
    getBizBuilderListSettingBySaga(item.id, 'common');
  }

  render() {
    const { bizBuilderList, bizBuilderConfigInfo, viewInfo } = this.props;
    const { colsListDesignInfo } = bizBuilderConfigInfo;

    const onTitleClick = selectRow => {
      this.setState({ visible: true });
      const { getBizBuilderContentViewBySaga, item } = this.props;
      const { record } = selectRow;
      getBizBuilderContentViewBySaga(item.id, record.WORK_SEQ, record.TASK_SEQ);
    };

    const onViewListClick = vList => {
      const { getBizBuilderContentViewBySaga, item } = this.props;
      getBizBuilderContentViewBySaga(item.id, vList.item.WORK_SEQ, vList.item.TASK_SEQ);
    };

    const listCols =
      colsListDesignInfo &&
      colsListDesignInfo.map(item => ({
        title: item.NAME_KOR,
        dataIndex: item.COMP_FIELD,
        key: item.COMP_FIELD,
        render: (text, record) =>
          item.COMP_FIELD === 'TITLE' ? (
            <a styling="link" onClick={() => onTitleClick({ record })}>
              {text}
            </a>
          ) : (
            undefined
          ),
      }));
    const { data } = viewInfo;
    const listDataSource = bizBuilderList && bizBuilderList.list && bizBuilderList.list.slice(0, 5);
    const onRodalClose = () => {
      this.setState({ visible: false });
    };

    return (
      <div>
        <Table pagination={false} columns={listCols} dataSource={listDataSource}></Table>
        <Rodal
          customStyles={{
            position: 'absolute',
            width: 1300,
            height: 'calc(100vh - 100px)',
            backgroundColor: '#646567',
            top: 0,
            left: 0,
            margin: 'auto',
            borderRadius: '3px',
            padding: '15px',
          }}
          visible={this.state.visible}
          onClose={onRodalClose.bind(this)}
          duration={300}
        >
          <div>
            <RodalContentStyle className="contentWrapper">
              <div className="header" />
              <Row type="flex" justify="space-between">
                <Col xs={24} md={24} xl={16} className="leftActivity">
                  <ScrollBar className="rodalCustomScrollbar">
                    <div className="content">
                      {data && data.CONTENT && data.CONTENT.length > 0 && data.CONTENT.map(item => <FroalaEditorView model={item.DETAIL} />)}
                    </div>
                  </ScrollBar>
                </Col>
                <Col xl={8} className="rightActivity">
                  {/* MobileView에서 숨김 */}
                  <div className="view">
                    <DrilldownView>
                      <div className="rightContent">
                        <div className="viewTop">
                          <ScrollBar className="rodalCustomScrollbar">
                            <div className="contentInfo">
                              <ul className="empData">
                                <li>
                                  <div className="empPicture"></div>
                                </li>
                                <li className="name">{data && data.REG_NAME_KOR ? data.REG_NAME_KOR : ''}</li>
                                <li className="empNo">{data && data.REG_NAME_KOR ? data.REG_NAME_KOR : ''}</li>
                                <li className="dept"></li>
                                <li className="position"></li>
                              </ul>
                              <div className="writtenDate">{data && data.REG_DTTM ? data.REG_DTTM : ''}</div>
                              <h1 className="title ellipsis">{data && data.TITLE ? data.TITLE : ''}</h1>
                            </div>

                            <div className="attachedfiles">
                              <table>
                                <tbody>
                                  <tr>
                                    <td>
                                      <p className="iconAttachedfile">
                                        <span></span>
                                      </p>
                                    </td>
                                    <td>
                                      <button type="button" className="iconSave" title="저장하기">
                                        저장
                                      </button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </ScrollBar>
                        </div>
                        <div className="viewBottom">
                          <ScrollBar className="rodalCustomScrollbar">
                            <ul className="otherListItems">
                              {bizBuilderList &&
                                bizBuilderList.list &&
                                bizBuilderList.list.map(item => (
                                  <li>
                                    <button onClick={() => onViewListClick({ item })} className="ellipsis">
                                      <span> [{item.REG_DTTM.substring(0, 10)}]</span>
                                      {item.TITLE}
                                    </button>
                                  </li>
                                ))}
                            </ul>
                          </ScrollBar>
                        </div>
                      </div>
                    </DrilldownView>
                  </div>
                </Col>
              </Row>
            </RodalContentStyle>
          </div>
        </Rodal>
      </div>
    );
  }
}

BizBuilderWidget.propTypes = {
  item: PropTypes.object,
  getBizBuilderListSettingBySaga: PropTypes.func,
  bizBuilderList: PropTypes.object,
  bizBuilderConfigInfo: PropTypes.object,
  getBizBuilderContentViewBySaga: PropTypes.func,
  viewInfo: PropTypes.object,
};

BizBuilderWidget.defaultProps = {
  item: { id: '11128' },
  getBizBuilderListSettingBySaga: () => false,
  bizBuilderList: {},
  bizBuilderConfigInfo: {},
  getBizBuilderContentViewBySaga: () => false,
  viewInfo: {},
};

const mapStateToProps = createStructuredSelector({
  bizBuilderList: selectors.makeSelectBizBuilderList(),
  bizBuilderConfigInfo: selectors.makeSelectBizBuilderConfigInfo(),
  viewInfo: selectors.makeSelectBizBuilderViewInfo(),
});

const mapDispatchToProps = dispatch => ({
  getBizBuilderListSettingBySaga: (widgetId, type) => dispatch(actions.getBizBuilderListSettingBySaga(widgetId, type)),
  getBizBuilderContentViewBySaga: (widgetId, workSeq, taskSeq) => dispatch(actions.getBizBuilderContentViewBySaga(widgetId, workSeq, taskSeq)),
});

const withReducer = injectReducer({ key: 'apps-manual-user-BizBuilderWidget-reducer', reducer });
const withSaga = injectSaga({ key: 'apps-manual-user-BizBuilderWidget-saga', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(BizBuilderWidget);
