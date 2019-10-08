import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Input } from 'antd';
import { Link } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import StyledButton from 'components/Button/StyledButton';

import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';

import StyledNode from '../StyledNode';

class NodeDetail extends Component {
  componentDidMount() {
    const { NODE_ID } = this.props.match.params;
    if (NODE_ID !== '-1') {
      this.props.getNodeDetail(NODE_ID);
    }
  }

  render() {
    const { node } = this.props;

    return (
      <StyledNode>
        <h3 className="pageTitle list">노드등록</h3>
        <div className="pageContent">
          <form onSubmit={e => this.onSubmit(e)}>
            <div className="categoryContents">
              <div className="regFrom">
                <table className="adminTbl">
                  <tbody>
                    <tr>
                      <th className="required">
                        <label htmlFor="v2">노드명(KOR)</label>
                      </th>
                      <td>{node.NAME_KOR}</td>
                    </tr>
                    {/* <tr>
                      <th>
                        <label htmlFor="v2">노드명(ENG)</label>
                      </th>
                      <td>{node.NAME_ENG}</td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="v2">노드명(CHN)</label>
                      </th>
                      <td>{node.NAME_CHN}</td>
                    </tr> */}
                    <tr>
                      <th>
                        <label htmlFor="v2">노드경로</label>
                      </th>
                      <td>{node.SRC_PATH}</td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="v2">노드옵션</label>
                      </th>
                      <td>{node.NODE_OPTION}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="buttonWrapper">
                <Link to="/admin/adminmain/node">
                  <StyledButton className="btn-light">목록으로</StyledButton>
                </Link>
                <StyledButton className="btn-dark" style={{ marginRight: '8px' }}>
                  삭제
                </StyledButton>
                <Link to={`/admin/adminmain/node/nodeRegist/${node.NODE_ID}`}>
                  <StyledButton className="btn-primary">수정</StyledButton>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </StyledNode>
    );
  }
}

NodeDetail.propTypes = {
  match: PropTypes.object.isRequired,
  node: PropTypes.object,
  getNodeDetail: PropTypes.func,
};

NodeDetail.defaultProps = {
  node: {
    NODE_ID: -1,
    NAME_KOR: '',
    SRC_PATH: '',
    NODE_OPTION: '',
  },
};

const mapStateToProps = createStructuredSelector({
  node: selectors.makeNodeDetail(),
});

const mapDispatchToProps = dispatch => ({
  getNodeDetail: nodeId => dispatch(actions.getNodeDetail(nodeId)),
});

const withReducer = injectReducer({ key: 'containers.admin.AdminMain.Node.NodeDetail', reducer });
const withSaga = injectSaga({ key: 'containers.admin.AdminMain.Node.NodeDetail', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(NodeDetail);
