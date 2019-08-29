import React, { Component } from 'react';
import { Table, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import Rodal from 'rodal';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ScrollBar from 'react-custom-scrollbars';
import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';
import { RodalContentStyle, DrilldownView } from './StyleRodal';

class BizBuilderWidget extends Component {
  state = {
    visible: true,
  };

  componentDidMount() {
    const { item, getBizBuilderListSettingBySaga } = this.props;
    getBizBuilderListSettingBySaga(item.id, 'common');
  }

  render() {
    const { bizBuilderList, bizBuilderConfigInfo } = this.props;
    const { sourcecols } = bizBuilderConfigInfo;
    return (
      <div>
        <Table columns={sourcecols} dataSource={bizBuilderList}></Table>
        <Rodal
          className="drillDownCon"
          customStyles={{
            position: 'relative',
            width: 1580,
            height: 'calc(100vh - 200px)',
            backgroundColor: '#646567',
            top: 0,
            left: 0,
            margin: 'auto',
            borderRadius: '3px',
            padding: '15px',
          }}
          visible={this.state.visible}
        >
          <div>
            <RodalContentStyle className="contentWrapper">
              <div className="header" />
              <Row type="flex" justify="space-between">
                <Col xs={24} md={24} xl={16} className="leftActivity">
                  <ScrollBar className="rodalCustomScrollbar">
                    <div className="content">ㅇㅎㄹㅇㅎㄹ</div>
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
                                <li className="name"></li>
                                <li className="empNo"></li>
                                <li className="dept"></li>
                                <li className="position"></li>
                              </ul>
                              <div className="writtenDate"></div>
                              <h1 className="title ellipsis"></h1>
                            </div>

                            <div className="attachedfiles">
                              <div className="saveAll">
                                <button type="button" title="모두 저장"></button>
                              </div>
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
                            <ul className="otherListItems"></ul>
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
};

BizBuilderWidget.defaultProps = {
  item: { id: '11078' },
  getBizBuilderListSettingBySaga: () => false,
  bizBuilderList: [],
  bizBuilderConfigInfo: [],
};

const mapStateToProps = createStructuredSelector({
  bizBuilderList: selectors.makeSelectBizBuilderList(),
  bizBuilderConfigInfo: selectors.makeSelectBizBuilderConfigInfo(),
});

const mapDispatchToProps = dispatch => ({
  getBizBuilderListSettingBySaga: (widgetId, type) => dispatch(actions.getBizBuilderListSettingBySaga(widgetId, type)),
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
