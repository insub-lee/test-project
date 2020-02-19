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
    console.debug(this.props);
  }

  initDataBind = sagaKey => {
    const {
      result: {
        list: { categoryMapList },
      },
      getTreeData,
      treeData,
      workSeq,
    } = this.props;

    const docTree = getTreeData(treeData, 2);
    const docTypelist = docTree.map(doc => <Checkbox value={doc.value}>{doc.title}</Checkbox>);
    const scopeTree = getTreeData(categoryMapList);
    this.setState({ scopeTree: scopeTree[0] && scopeTree[0].children, docTypelist, workSeq });
  };

  onChangeDocType = checkedValues => {
    console.debug('onchageDocType', checkedValues, this.props);
    const { onChangeSearchValue } = this.props;
    let strSql = 'select node_id from fr_category_map where ';
    let cnt = 1;
    checkedValues.map(value => {
      if (cnt !== 1) {
        strSql += ' OR ';
      }
      cnt += 1;
      strSql += `fullpath like (select fullpath || '%' from fr_category_map where node_id=${value})`;
    });

    onChangeSearchValue('w.node_id', ` and w.node_id in (${strSql})`, checkedValues.join());
  };

  onChangeTree = value => {
    const { onChangeSearchValue } = this.props;
    const strSql = `and w.task_seq in (select task_seq from mg_commoncode where node_id in (select node_id from fr_category_map where fullpath like (select fullpath || '%' from fr_category_map where node_id=${value}))) `;
    console.debug(strSql);
    onChangeSearchValue('w.scope', strSql, value);
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
                <Checkbox.Group onChange={this.onChangeDocType}>{docTypelist}</Checkbox.Group>
              </td>
            </tr>
            <tr>
              <th>SCOPE</th>
              <td>
                {scopeTree && scopeTree.length > 0 && (
                  <TreeSelect onChange={this.onChangeTree} placeholder="Scope를 선택해주세요" style={{ width: '300px' }} treeData={scopeTree}></TreeSelect>
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
