import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Input, Select } from 'antd';
import { Link } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import StyledButton from 'components/Button/StyledButton';

import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';

import StyledNode from '../StyledNode';

const { Option } = Select;

class NodeDetail extends Component {
  componentDidMount() {
    const { NODE_ID } = this.props.match.params;
    if (NODE_ID !== '-1') {
      this.props.getNodeDetail(NODE_ID);
    }
  }

  componentDidUnmount() {
    this.props.setNodeDetail({});
  }

  render() {
    const { node } = this.props;

    return (
      <StyledNode>
        <h3 className="pageTitle list">노드등록</h3>
        <div className="pageContent">
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
                  <tr>
                    <th>
                      <label htmlFor="v2">노드경로</label>
                    </th>
                    <td>{node.SRC_PATH}</td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="v2">서비스명</label>
                    </th>
                    <td>{node.CLASSNAME}</td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="v2">노드옵션</label>
                    </th>
                    <td>{node.NODE_OPTION}</td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="v2">노드타입</label>
                    </th>
                    <td>
                      <Select value={node.NODE_TYPE} style={{ width: '100px' }} disabled>
                        <Option value="NU">사용자</Option>
                        <Option value="ND">부서</Option>
                        <Option value="NG">그룹</Option>
                      </Select>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="v2">노드구분</label>
                    </th>
                    <td>
                      <Select value={node.NODE_GUBUN} style={{ width: '100px' }} disabled>
                        <Option value={1}>결재</Option>
                        <Option value={9}>시스템</Option>
                      </Select>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="v2">뷰타입</label>
                    </th>
                    <td>
                      <Select value={node.VIEW_TYPE} style={{ width: '100px' }} disabled>
                        <Option value={1}>인장</Option>
                        <Option value={2}>항목</Option>
                        <Option value={9}>NONE</Option>
                      </Select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="buttonWrapper">
              <Link to="/admin/adminmain/node">
                <StyledButton className="btn-light">목록으로</StyledButton>
              </Link>
              <StyledButton className="btn-dark" style={{ marginRight: '8px' }} onClick={() => this.props.deleteNode(node)}>
                삭제
              </StyledButton>
              <Link to={`/admin/adminmain/node/nodeRegist/${node.NODE_ID}`}>
                <StyledButton className="btn-primary">수정</StyledButton>
              </Link>
            </div>
          </div>
        </div>
      </StyledNode>
    );
  }
}

NodeDetail.propTypes = {
  match: PropTypes.object.isRequired,
  node: PropTypes.object,
  getNodeDetail: PropTypes.func,
  setNodeDetail: PropTypes.func,
  deleteNode: PropTypes.func,
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
  setNodeDetail: nodeInfo => dispatch(actions.setNodeDetail(nodeInfo)),
  deleteNode: nodeInfo => dispatch(actions.deleteNode(nodeInfo)),
});

const withReducer = injectReducer({ key: 'containers.admin.AdminMain.Node.NodeDetail', reducer });
const withSaga = injectSaga({ key: 'containers.admin.AdminMain.Node.NodeDetail', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withReducer, withConnect)(NodeDetail);
