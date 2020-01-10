import React, { Component } from 'react';
import { Form, Checkbox, Select } from 'antd';
import PropTypes from 'prop-types';

import StyledCheckbox from 'components/FormStuff/Checkbox';

const FormItem = Form.Item;
const { Option } = Select;

class BizStd extends Component {
  componentDidMount() {
    const { searchParam, setSearchParam } = this.props;
    const apiArr = [
      {
        key: 'bizStdScope',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=7',
        type: 'GET',
        params: {},
      },
    ];
    this.callApi(apiArr);
    setSearchParam({
      ...searchParam,
      scope: { key: 'TBD.SCOPE', condition: '=', value: 0, type: 'INT' },
      nodeIds: { key: 'TBD.NODE_ID', condition: 'IN', value: [], type: 'INT' },
    });
  }

  callApi = apiArr => {
    const { id, getCallDataHanlder } = this.props;
    getCallDataHanlder(id, apiArr);
  };

  render() {
    const { result, searchParam, onChangeCheckBox, onChangeValue } = this.props;
    const { nodeIds, scope } = searchParam;
    let scopeData = [];
    let checkboxOptData = [];
    if (result && result.categoryInfo && result.categoryInfo.categoryMapList && result.categoryInfo.categoryMapList.length > 0) {
      checkboxOptData = result.categoryInfo.categoryMapList.filter(fNode => fNode.PARENT_NODE_ID === 2 && fNode.USE_YN === 'Y');
    }
    if (result && result.bizStdScope && result.bizStdScope.categoryMapList && result.bizStdScope.categoryMapList.length > 0) {
      scopeData = result.bizStdScope.categoryMapList.filter(fNode => fNode.LVL > 0 && fNode.USE_YN === 'Y');
    }
    return (
      <>
        <FormItem label="문서종류">
          {checkboxOptData && checkboxOptData.length > 0 && (
            <Checkbox.Group onChange={value => onChangeCheckBox('nodeIds', value)} value={nodeIds.value}>
              {checkboxOptData.map(node => (
                <StyledCheckbox value={node.NODE_ID}>{node.NAME_KOR}</StyledCheckbox>
              ))}
            </Checkbox.Group>
          )}
        </FormItem>
        <FormItem label="SCOPE">
          {scopeData && scopeData.length > 0 && (
            <Select value={scope.value} onSelect={value => onChangeValue('scope', value)}>
              <Option value={0}>--------</Option>
              {scopeData.map(node => (
                <Option value={node.NODE_ID}>{node.NAME_KOR}</Option>
              ))}
            </Select>
          )}
        </FormItem>
      </>
    );
  }
}

BizStd.propTypes = {
  searchParam: PropTypes.objectOf(PropTypes.object, PropTypes.object),
};

BizStd.defaultProps = {
  searchParam: { nodeIds: { value: [] }, scope: { value: 0 } },
};

export default BizStd;
