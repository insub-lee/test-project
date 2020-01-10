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

class NodeRegist extends Component {
  componentDidMount() {
    const { NODE_ID } = this.props.match.params;
    if (NODE_ID !== '-1') {
      this.props.getNodeDetail(NODE_ID);
    }
  }

  componentDidUnmount() {
    this.props.setNodeDetail({});
  }

  onSubmit = e => {
    e.preventDefault();

    const { NODE_ID } = this.props.match.params;
    const data = new FormData(e.target);
    let payload = {};

    if (NODE_ID !== '-1') {
      payload = { NODE_ID };
      data.forEach((value, key) => {
        payload[key] = value;
      });
      this.props.updateNode(payload);
    } else {
      data.forEach((value, key) => {
        payload[key] = value;
      });
      this.props.saveNode(payload);
    }
  };

  onSaveNode = e => {
    e.preventDefault();
    const { node, saveNode } = this.props;
    saveNode(node);
  };

  onUpdateNode = e => {
    e.preventDefault();
    const { node, updateNode } = this.props;
    updateNode(node);
  };

  render() {
    const { match, node } = this.props;
    const { NODE_ID } = match.params;

    console.debug('node >> ', node);

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
                    <td>
                      <Input value={node.NAME_KOR} style={{ width: '300px' }} onChange={e => this.props.changeNodeData('NAME_KOR', e.target.value)} />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="v2">노드경로</label>
                    </th>
                    <td>
                      <Input value={node.SRC_PATH} style={{ width: '300px' }} onChange={e => this.props.changeNodeData('SRC_PATH', e.target.value)} />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="v2">서비스명</label>
                    </th>
                    <td>
                      <Input value={node.CLASSNAME} onChange={e => this.props.changeNodeData('CLASSNAME', e.target.value)} />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="v2">노드옵션</label>
                    </th>
                    <td>
                      <Input value={node.NODE_OPTION} onChange={e => this.props.changeNodeData('NODE_OPTION', e.target.value)} />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="v2">노드타입</label>
                    </th>
                    <td>
                      <Select value={node.NODE_TYPE} style={{ width: '100px' }} onChange={value => this.props.changeNodeData('NODE_TYPE', value)}>
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
                      <Select value={node.NODE_GUBUN} style={{ width: '100px' }} onChange={value => this.props.changeNodeData('NODE_GUBUN', value)}>
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
                      <Select value={node.VIEW_TYPE} style={{ width: '100px' }} onChange={value => this.props.changeNodeData('VIEW_TYPE', value)}>
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
              {NODE_ID !== '-1' ? (
                <>
                  <Link to={`/admin/adminmain/node/nodeDetail/${node.NODE_ID}`}>
                    <StyledButton className="btn-dark" style={{ marginLeft: '8px' }}>
                      취소
                    </StyledButton>
                  </Link>
                  <StyledButton className="btn-primary" htmlType="button" onClick={e => this.onUpdateNode(e)}>
                    저장
                  </StyledButton>
                </>
              ) : (
                <StyledButton className="btn-primary" type="button" onClick={e => this.onSaveNode(e)}>
                  등록
                </StyledButton>
              )}
            </div>
          </div>
        </div>
      </StyledNode>
    );
  }
}

NodeRegist.propTypes = {
  match: PropTypes.object.isRequired,
  node: PropTypes.object,
  getNodeDetail: PropTypes.func,
  setNodeDetail: PropTypes.func,
  saveNode: PropTypes.func,
  updateNode: PropTypes.func,
  changeNodeData: PropTypes.func,
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
  setNodeDetail: nodeInfo => dispatch(actions.setNodeDetail(nodeInfo)),
  saveNode: nodeInfo => dispatch(actions.saveNode(nodeInfo)),
  updateNode: nodeInfo => dispatch(actions.updateNode(nodeInfo)),
  changeNodeData: (key, val) => dispatch(actions.changeNodeData(key, val)),
});

const withReducer = injectReducer({ key: 'containers.admin.AdminMain.Node.NodeRegist', reducer });
const withSaga = injectSaga({ key: 'containers.admin.AdminMain.Node.NodeRegist', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withReducer, withConnect)(NodeRegist);
