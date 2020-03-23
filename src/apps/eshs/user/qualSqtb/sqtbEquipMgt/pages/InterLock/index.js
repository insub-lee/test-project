import React, { Component } from 'react';
import { getTreeFromFlatData } from 'react-sortable-tree';
import * as PropTypes from 'prop-types';
import { TreeSelect, Input, Button, Checkbox } from 'antd';
import InterLockStyled from '../../styled/InterLockStyled';

const getCategoryMapListAsTree = flatData => {
  console.debug('flatData', flatData);
  return getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: item.NAME_KOR,
      value: item.NODE_ID,
      key: item.NODE_ID,
      parentValue: item.PARENT_NODE_ID,
      selectable: item.CHILDREN_CNT === 0,
    })),

    getKey: node => node.key,
    getParentKey: node => node.parentValue,
    rootKey: 633,
  });
};
class InterLock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [],
      interLockTable: {},
    };
  }

  componentDidMount() {
    const { getExtraApiData, id, apiArray, formData } = this.props;
    const task_seq = (formData && formData.TASK_SEQ) || '';
    if (task_seq) {
      apiArray.push({
        key: 'interLockList',
        type: 'GET',
        url: `/api/admin/v1/common/categoryMapList/${task_seq}`,
      });
    }
    getExtraApiData(id, apiArray, this.setTreeSelect);
  }

  setTreeSelect = () => {
    const { extraApiData, id, changeFormData } = this.props;
    const treeData = (extraApiData && extraApiData.treeData && extraApiData.treeData.categoryMapList) || [];
    const interLockList = (extraApiData && extraApiData.interLockList && extraApiData.interLockList.list) || [];
    if (!interLockList.length) {
      interLockList.push({ IS_DEL: 0, IL_KIND_FROM: '', IL_FUNC: '' });
      interLockList.push({ IS_DEL: 0, IL_KIND_FROM: '', IL_FUNC: '' });
      interLockList.push({ IS_DEL: 0, IL_KIND_FROM: '', IL_FUNC: '' });
    }
    const td = getCategoryMapListAsTree(treeData.filter(x => x.USE_YN === 'Y'));
    const categoryData = td.length > 0 ? td[0] : [];
    this.setState({ treeData: categoryData.children });
    changeFormData(id, 'interLockList', interLockList);
  };

  onChangeHandler = (value, key) => {
    const { id, changeFormData, formData } = this.props;
    const { interLockList } = formData;
    changeFormData(
      id,
      'interLockList',
      interLockList.map((i, index) => (index === key ? { ...i, IL_KIND_FROM: value } : i)),
    );
  };

  handleInputChange = (e, key) => {
    const { id, changeFormData, formData } = this.props;
    const { interLockList } = formData;
    changeFormData(
      id,
      'interLockList',
      interLockList.map((i, index) => (index === key ? { ...i, IL_FUNC: e.target.value } : i)),
    );
  };

  handlePlusTd = () => {
    const { id, changeFormData, formData } = this.props;
    const { interLockList } = formData;
    interLockList.push({ IS_DEL: 0, IL_KIND_FROM: '', IL_FUNC: '' });
    interLockList.push({ IS_DEL: 0, IL_KIND_FROM: '', IL_FUNC: '' });
    interLockList.push({ IS_DEL: 0, IL_KIND_FROM: '', IL_FUNC: '' });
    changeFormData(id, 'interLockList', interLockList);
  };

  render() {
    const { viewType, formData } = this.props;
    const { treeData } = this.state;
    const interLockList = (formData && formData.interLockList) || [];
    return (
      <InterLockStyled>
        <div className="InterLockTable">
          <span>
            InterLock <Button onClick={this.handlePlusTd}>[+3]</Button>
          </span>
          <table align="center" className="InterLockTable">
            <colgroup>
              <col width="5%" />
              <col width="8%" />
              <col width="20%" />
              <col width="67%" />
            </colgroup>
            <thead>
              <tr>
                <td>삭제</td>
                <td>해제취소</td>
                <td>종류/형식</td>
                <td>세부기능</td>
              </tr>
            </thead>
            <tbody>
              {interLockList.length > 0 &&
                interLockList.map((i, index) => (
                  <tr key={index}>
                    <td>
                      <Checkbox />
                    </td>
                    <td></td>
                    <td>
                      <TreeSelect
                        style={{ width: '100%' }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={treeData}
                        onChange={value => this.onChangeHandler(value, index)}
                        value={i.IL_KIND_FROM || ''}
                      />
                    </td>
                    <td>
                      <Input value={i.IL_FUNC || ''} onChange={e => this.handleInputChange(e, index)} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </InterLockStyled>
    );
  }
}

InterLock.propTypes = {
  id: PropTypes.string,
  viewType: PropTypes.string,
  getExtraApiData: PropTypes.func,
  changeFormData: PropTypes.func,
  formData: PropTypes.object,
  apiArray: PropTypes.array,
  extraApiData: PropTypes.object,
};

InterLock.defaultProps = {
  apiArray: [
    {
      key: 'treeData',
      type: 'POST',
      url: '/api/admin/v1/common/categoryMapList',
      params: { PARAM: { NODE_ID: 1493 } },
    },
  ],
};
export default InterLock;
