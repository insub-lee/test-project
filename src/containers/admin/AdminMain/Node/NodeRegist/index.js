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

class NodeRegist extends Component {
  componentDidMount() {
    const { NODE_ID } = this.props.match.params;
    if (NODE_ID !== '-1') {
      this.props.getNodeDetail(NODE_ID);
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = {};
    data.forEach((value, key) => {
      payload[key] = value;
    });

    this.props.saveNode(payload);
  };

  render() {
    const { match, node } = this.props;
    const { NODE_ID } = match.params;

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
                      <td>
                        <Input name="NAME_KOR" defaultValue={node.NAME_KOR} style={{ width: '300px' }} />
                      </td>
                    </tr>
                    {/* <tr>
                      <th>
                        <label htmlFor="v2">노드명(ENG)</label>
                      </th>
                      <td>
                        <Input name="NAME_ENG" style={{ width: '300px' }} />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="v2">노드명(CHN)</label>
                      </th>
                      <td>
                        <Input name="NAME_CHN" style={{ width: '300px' }} />
                      </td>
                    </tr> */}
                    <tr>
                      <th>
                        <label htmlFor="v2">노드경로</label>
                      </th>
                      <td>
                        <Input name="SRC_PATH" defaultValue={node.SRC_PATH} />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="v2">노드옵션</label>
                      </th>
                      <td>
                        <Input name="NODE_OPTION" defaultValue={node.NODE_OPTION} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="buttonWrapper">
                <Link to="/admin/adminmain/node">
                  <StyledButton className="btn-light">목록으로</StyledButton>
                </Link>
                {NODE_ID !== '-1' ? (
                  <React.Fragment>
                    <Link to={`/admin/adminmain/node/nodeDetail/${node.NODE_ID}`}>
                      <StyledButton className="btn-dark" style={{ marginLeft: '8px' }}>
                        취소
                      </StyledButton>
                    </Link>
                    <StyledButton className="btn-primary" htmlType="submit">
                      저장
                    </StyledButton>
                  </React.Fragment>
                ) : (
                  <StyledButton className="btn-primary" type="submit">
                    등록
                  </StyledButton>
                )}
              </div>
            </div>
          </form>
        </div>
      </StyledNode>
    );
  }
}

NodeRegist.propTypes = {
  match: PropTypes.object.isRequired,
  node: PropTypes.object,
  getNodeDetail: PropTypes.func,
  saveNode: PropTypes.func,
};

NodeRegist.defaultProps = {
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
  saveNode: nodeInfo => dispatch(actions.saveNode(nodeInfo)),
});

const withReducer = injectReducer({ key: 'containers.admin.AdminMain.Node.NodeRegist', reducer });
const withSaga = injectSaga({ key: 'containers.admin.AdminMain.Node.NodeRegist', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(NodeRegist);
