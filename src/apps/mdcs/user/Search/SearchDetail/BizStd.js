import React, { Component } from 'react';
import { Form, Checkbox, TreeSelect } from 'antd';
import PropTypes from 'prop-types';

import StyledHtmlTable from 'commonStyled/Table/StyledHtmlTable';
import StyledCheckbox from 'components/FormStuff/Checkbox';

const FormItem = Form.Item;

class BizStd extends Component {
  state = {
    scopeTree: [],
  };

  componentDidMount() {
    const { sagaKey, getCallDataHandler, apiArys } = this.props;
    getCallDataHandler(sagaKey, apiArys, this.initDataBind);
    console.debug('bizStd didMout');
  }

  initDataBind = sagaKey => {
    const {
      result: {
        list: { categoryMapList },
      },
      getTreeData,
      treeData,
    } = this.props;

    const docTree = getTreeData(treeData, 2);
    const docTypelist = docTree.map(doc => <Checkbox value={doc.value}>{doc.title}</Checkbox>);
    const scopeTree = getTreeData(categoryMapList);
    this.setState({ scopeTree: scopeTree[0] && scopeTree[0].children, docTypelist });
  };

  render() {
    const { scopeTree, docTypelist } = this.state;
    return (
      <StyledHtmlTable>
        <table>
          <thead>
            <tr>
              <th colSpan="4">업무표준 정보 선택</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>문서종류</th>
              <td>
                <Checkbox.Group>{docTypelist}</Checkbox.Group>
              </td>
            </tr>
            <tr>
              <th>SCOPE</th>
              <td>
                {scopeTree && scopeTree.length > 0 && (
                  <TreeSelect placeholder="Scope를 선택해주세요" style={{ width: '300px' }} treeData={scopeTree}></TreeSelect>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </StyledHtmlTable>
    );
  }
}

BizStd.propTypes = {
  apiArys: PropTypes.array,
};

BizStd.defaultProps = {
  apiArys: [
    {
      key: 'list',
      url: `/api/admin/v1/common/categoryMapList`,
      type: 'POST',
      params: { PARAM: { NODE_ID: 94 } },
    },
  ],
};

export default BizStd;
