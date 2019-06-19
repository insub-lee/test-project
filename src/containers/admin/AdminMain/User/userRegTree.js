import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tree from 'components/Tree';
import { Select, Spin } from 'antd';

const Option = Select.Option; // eslint-disable-line

class UserRegTree extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      selectedIndex: -1,
      selectedDept: '',
    };
    console.log('constructor');
  }
  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    if (nextProps.treeData.length > 0) {
      this.setState({
        selectedDept: nextProps.treeData[0].key,
      });
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    const {
      selectedIndex,
    } = this.state;

    const {
      getSelectNode,
      getSelectDept,
      treeType,
      comboData,
      isLoading,
    } = this.props;

    console.log('render');

    const handleOnClick = (node) => {
      // node - 선택한 트리 노드의 데이터 object
      this.setState({
        selectedIndex: node.key,
      });
      getSelectNode(node);
    };

    return (
      <div
        style={{
          height: 'calc(100vh - 167px)',
          maxHeight: 400,
        }}
      >
        { isLoading
          ?
            <Spin
              size="large"
              style={{
                margin: 'auto',
                width: '100%',
                padding: '20%',
              }}
            />
          :
            <div
              style={{
                display: 'flex',
                flex: '1 0 50%',
                padding: '0',
                flexDirection: 'column',
                width: '100%',
                height: 'calc(100vh - 167px)',
                maxHeight: 400,
              }}
            >
              <Select value={this.state.selectedDept} onChange={e => getSelectDept(e)}>
                {comboData.map(item => (
                  <Option value={item[`${treeType.toUpperCase()}_ID`]}>{item.NAME_KOR}</Option>
                ))}
              </Select>
              <Tree
                treeData={this.props.treeData} // 트리데이터
                handleOnClick={handleOnClick} // onClick 이벤트
                selectedIndex={selectedIndex} // 선택한 트리노드 KEY
              />
            </div>
        }
      </div>
    );
  }
}

UserRegTree.propTypes = {
  getSelectNode: PropTypes.func, //eslint-disable-line
  getSelectDept: PropTypes.func, //eslint-disable-line
  comboData: PropTypes.array, //eslint-disable-line
  treeData: PropTypes.array, //eslint-disable-line
  treeType: PropTypes.string, //eslint-disable-line
  isLoading: PropTypes.bool, //eslint-disable-line
};

export default UserRegTree;
