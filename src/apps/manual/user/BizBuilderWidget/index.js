import React, { Component } from 'react';
import { Table, List, Row, Col, Modal } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ScrollBar from 'react-custom-scrollbars';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import ReactDataGrid from 'components/ReactDataGrid';

import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';

import { RodalContentStyle, DrilldownView } from './StyleRodal';
import FroalaEditorView from '../../components/RichTextEditor/FroalaEditorView';
import StyledModalWrapper from './StyledModalWrapper';

const AntdTable = StyledAntdTable(Table);

const AntdModal = StyledModalWrapper(Modal);

class BizBuilderWidget extends Component {
  state = {
    visible: false,
  };

  componentDidMount() {
    const { item, getBizBuilderListSettingBySaga } = this.props;
    getBizBuilderListSettingBySaga(item.id, 'common');
  }

  onRodalClose = () => {
    this.setState({ visible: false });
  };

  render() {
    const { bizBuilderList, bizBuilderConfigInfo, viewInfo } = this.props;
    const { colsListDesignInfo } = bizBuilderConfigInfo;
    console.debug(this.props);
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

    const listCols = [
      {
        title: '수신일',
        dataIndex: 'REG_DTTM',
        key: 'REG_DTTM',
        render: text => text.substring(0, 10),
        align: 'center',
        width: 100,
      },
      {
        title: '제목',
        dataIndex: 'TITLE',
        key: 'TITLE',
        render: (text, record) => (
          <a styling="link" onClick={() => onTitleClick({ record })}>
            {text}
          </a>
        ),
      },
      {
        title: '발신부서',
        dataIndex: 'dept',
        key: 'dept',
        render: () => '스마트고객센터',
        align: 'center',
        width: 100,
      },
    ];

    const { data } = viewInfo;
    const listDataSource = bizBuilderList && bizBuilderList.list && bizBuilderList.list.slice(0, 5);
    console.debug('###listDataSource', listDataSource);
    return (
      <div id="manualBizBuilderWidget">
        <AntdTable pagination={false} columns={listCols} dataSource={listDataSource} />
        <List
          dataSource={listDataSource}
          size="small"
          renderItem={item => (
            <List.Item>
              [{item.REG_DTTM.substring(0, 10)}] {item.TITLE}
            </List.Item>
          )}
        />
        <AntdModal
          width={1000}
          height={500}
          visible={this.state.visible}
          style={{ top: '10%' }}
          // style={{ top: '50%', transform: 'translateY(-50%)' }}
          getContainer={() => document.querySelector('#manualBizBuilderWidget')}
          onCancel={this.onRodalClose}
          footer={null}
        >
          <div>
            <RodalContentStyle className="contentWrapper">
              <div className="header" />
              <Row type="flex" justify="space-between">
                <Col xs={24} md={24} xl={16} className="leftActivity">
                  <ScrollBar className="rodalCustomScrollbar">
                    <div className="content">
                      {data && data.CONTENT && typeof data.CONTENT === 'string'
                        ? data.CONTENT
                        : data && data.CONTENT && data.CONTENT.map(item => <FroalaEditorView model={item.DETAIL} />)}
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
                                    <button type="button" onClick={() => onViewListClick({ item })} className="ellipsis">
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
        </AntdModal>
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
  onRodalClose: PropTypes.func,
  listDataSource: PropTypes.array,
};

BizBuilderWidget.defaultProps = {
  item: { id: '11541' },
  getBizBuilderListSettingBySaga: () => false,
  bizBuilderList: {},
  bizBuilderConfigInfo: {},
  getBizBuilderContentViewBySaga: () => false,
  viewInfo: {},
  onRodalClose: () => false,
  listDataSource: [],
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
