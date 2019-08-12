import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, List, Button } from 'antd';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import Wrapper from './Wrapper';

class WorkBuilderViewer extends Component {
  componentDidMount() {
    console.debug('Boot......두두두두두두');
    const { fetchData } = this.props;
    fetchData();
  }

  render() {
    const { appList, workBuilderList, postRegistWBApp } = this.props;
    return (
      <Wrapper>
        <div className="title">
          <h3>업무 앱 관리</h3>
        </div>
        <hr />
        <div className="small-container">
          <Row gutter={16}>
            <Col span={12}>
              <div className="border-layer">
                <div className="title">업무 리스트</div>
                <div className="layer-body fixHeight500">
                  <List
                    size="small"
                    itemLayout="horizontal"
                    dataSource={workBuilderList}
                    renderItem={item => (
                      <List.Item actions={[<Button htmlType="button" disabled={item.STATUS > 0 && item.APP_ID && item.APP_ID > 0} onClick={() => postRegistWBApp(item.NAME_KOR, item.WORK_SEQ)}>등록</Button>]}>
                        <List.Item.Meta title={item.NAME_KOR} description={item.DSCR} />
                        {item.APP_ID && item.APP_ID > 0 ? <div>등록된 앱</div> : <div>앱등록 가능</div>}
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="border-layer">
                <div className="title">등록된 업무 앱</div>
                <div className="layer-body fixHeight500">
                  <List
                    size="small"
                    itemLayout="horizontal"
                    dataSource={appList}
                    renderItem={item => (
                      <List.Item actions={[<Button htmlType="button">해제</Button>]}>
                        <List.Item.Meta title={item.NAME_KOR} description={item.DSCR} />
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Wrapper>
    );
  }
}

WorkBuilderViewer.propTypes = {
  appList: PropTypes.arrayOf(PropTypes.object),
  workBuilderList: PropTypes.arrayOf(PropTypes.object),
  fetchData: PropTypes.func,
  postRegistWBApp: PropTypes.func,
};

WorkBuilderViewer.defaultProps = {
  appList: [],
  workBuilderList: [],
  fetchData: () => console.debug('no bind events'),
  postRegistWBApp: () => console.debug('no bind events'),
};

const mapStateToProps = createStructuredSelector({
  appList: selectors.makeSelectAppList(),
  workBuilderList: selectors.makeSelectWorkBuilderList(),
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(actions.fetchData()),
  postRegistWBApp: (appName, id) => dispatch(actions.postRegistWBApp(appName, id)),
});

const withReducer = injectReducer({ key: 'work-builder-to-app-page', reducer });
const withSaga = injectSaga({ key: 'work-builder-to-app-page', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WorkBuilderViewer);
