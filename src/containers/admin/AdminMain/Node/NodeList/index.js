import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import StyledButton from 'components/Button/StyledButton';
import { InputSearch } from 'components/FormStuff/Input';

import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';
import Styled from './Styled';

const AntdTable = StyledAntdTable(Table);

const columns = [
  {
    title: 'No',
    dataIndex: 'RNUM',
    key: 'RNUM',
    width: '5%',
    align: 'center',
  },
  {
    title: '노드명',
    dataIndex: 'NAME_KOR',
    key: 'NAME_KOR',
    render: (text, record) => (
      <Link to={`/admin/adminmain/node/nodeDetail/${record.NODE_ID}`}>
        <Button type="link">{text}</Button>
      </Link>
    ),
  },
  {
    title: '노드경로',
    dataIndex: 'SRC_PATH',
    key: 'SRC_PATH',
  },
];

class NodeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  componentDidMount() {
    this.props.getNodeList({});
  }

  onChangeSearchText = e => {
    this.setState({ searchText: e.target.value });
  };

  onSerchNode = () => {
    const payload = {
      searchText: this.state.searchText,
    };
    this.props.getNodeList(payload);
  };

  render() {
    const { nodeList } = this.props;
    const { searchText } = this.state;

    return (
      <Styled>
        <h3 className="pageTitle">노드 관리</h3>
        <div className="searchBox">
          <div className="searchWrapper">
            <InputSearch placeholder="노드명을 입력해주세요" defaultValue={searchText} onChange={e => this.onChangeSearchText(e)} onSearch={this.onSerchNode} />
          </div>
        </div>
        <div>
          <AntdTable columns={columns} dataSource={nodeList.map(item => ({ ...item, key: item.NODE_ID }))} bordered />
        </div>
        <div className="buttonWrapper">
          <Link to="/admin/adminmain/node/nodeRegist/-1">
            <StyledButton className="btn-primary">Node추가</StyledButton>
          </Link>
        </div>
      </Styled>
    );
  }
}

NodeList.propTypes = {
  nodeList: PropTypes.array,
  getNodeList: PropTypes.func,
};

NodeList.defaultProps = {
  nodeList: [],
};

const mapStateToProps = createStructuredSelector({
  nodeList: selectors.makeNodeList(),
});

const mapDispatchToProps = dispatch => ({
  getNodeList: payload => dispatch(actions.getNodeList(payload)),
});

const withReducer = injectReducer({ key: 'containers.admin.AdminMain.Node.NodeList', reducer });
const withSaga = injectSaga({ key: 'containers.admin.AdminMain.Node.NodeList', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(NodeList);
