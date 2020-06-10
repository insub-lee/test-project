import React, { Component } from 'react';
import { Form, Select } from 'antd';

import PropTypes from 'prop-types';

import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

const AntdSelect = StyledSelect(Select);
const FormItem = Form.Item;
const { Option } = Select;

class DwStd extends Component {
  state = {
    siteList: [],
    lead: 0,
    ball: 0,
  };

  componentDidMount() {
    const { sagaKey, submitHandlerBySaga } = this.props;
    submitHandlerBySaga(sagaKey, 'POST', '/api/admin/v1/common/categoryMapByMapIds', { PARAM: { mapIds: [11, 15, 16, 20, 21, 22] } }, this.initDataBind);
  }

  initDataBind = (sagaKey, response) => {
    if (response) {
      const lineItems = response['11'];
      const pkgItems = response['15'];
      const prdItems = response['16'];
      const dwItems = response['20'];
      const leadItems = response['21'];
      const ballItems = response['22'];

      this.setState({
        dwItems: dwItems.filter(x => x.LVL !== 0).map(item => <Option key={item.NODE_ID}>{item.NAME_KOR}</Option>),
        prdItems: prdItems.filter(x => x.LVL !== 0).map(item => <Option key={item.NODE_ID}>{item.NAME_KOR}</Option>),
        pkgItems: pkgItems.filter(x => x.LVL !== 0).map(item => <Option key={item.NODE_ID}>{item.NAME_KOR}</Option>),
        lineItems: lineItems.filter(x => x.LVL !== 0).map(item => <Option key={item.NODE_ID}>{item.NAME_KOR}</Option>),
        leadItems: leadItems.filter(x => x.LVL !== 0).map(item => <Option key={item.NODE_ID}>{item.NAME_KOR}</Option>),
        ballItems: ballItems.filter(x => x.LVL !== 0).map(item => <Option key={item.NODE_ID}>{item.NAME_KOR}</Option>),
      });
    }
  };

  onChangeDwType = value => {
    const { onChangeSearchValue } = this.props;
    if (value) {
      onChangeSearchValue('w.dwtype', ` and w.task_seq in ( select task_seq from mg_commoncode where gubun='DW_TYPE' and node_id=${value})`);
    } else {
      onChangeSearchValue('w.dwtype', '', '');
    }
  };

  onChangeProduct = value => {
    const { onChangeSearchValue } = this.props;
    if (value) {
      onChangeSearchValue('w.product', ` and w.task_seq in ( select task_seq from mg_commoncode where gubun='PRODUCT' and node_id=${value})`);
    } else {
      onChangeSearchValue('w.product', '', '');
    }
  };

  onChangePkg = value => {
    const { onChangeSearchValue } = this.props;
    if (value) {
      onChangeSearchValue('w.pkg', ` and w.task_seq in ( select task_seq from mg_commoncode where gubun='PKG' and node_id=${value})`);
    } else {
      onChangeSearchValue('w.pkg', '', '');
    }
  };

  onChangeFab = value => {
    const { onChangeSearchValue } = this.props;
    if (value) {
      onChangeSearchValue('w.fab', ` and w.task_seq in ( select task_seq from mg_commoncode where gubun='FAB' and node_id=${value})`);
    } else {
      onChangeSearchValue('w.fab', '', '');
    }
  };

  onChangeLead = value => {
    const { onChangeSearchValue } = this.props;
    this.setState({ lead: value || 0 }, () => {
      const { lead, ball } = this.state;
      const selectedValue = [lead, ball];
      onChangeSearchValue('w.fab', ` and w.task_seq in ( select task_seq from mg_commoncode where comp_field ='LB' and node_id in (${selectedValue.join()}))`);
    });
  };

  onChangeBall = value => {
    const { onChangeSearchValue } = this.props;
    this.setState({ ball: value || 0 }, () => {
      const { lead, ball } = this.state;
      const selectedValue = [lead, ball];
      console.debug('dkdkdk', selectedValue);
      onChangeSearchValue('w.fab', ` and w.task_seq in ( select task_seq from mg_commoncode where comp_field ='LB' and node_id in (${selectedValue.join()}))`);
    });
  };

  render() {
    const { dwItems, prdItems, pkgItems, lineItems, leadItems, ballItems } = this.state;
    return (
      <StyledHtmlTable>
        <table>
          <colgroup>
            <col width="130px" />
            <col width="130px" />
            <col width="*" />
            <col width="130px" />
            <col width="*" />
          </colgroup>
          <thead>
            <tr>
              <th colSpan="5">정보코드별 검색</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th rowSpan="3">SCOPE</th>
              <th>도면 구분</th>
              <td>
                <AntdSelect className="select-sm" allowClear onChange={this.onChangeDwType} style={{ width: '150px' }}>
                  {dwItems}
                </AntdSelect>
              </td>
              <th>적용 Product</th>
              <td>
                <AntdSelect className="select-sm" allowClear onChange={this.onChangeProduct} style={{ width: '150px' }}>
                  {prdItems}
                </AntdSelect>
              </td>
            </tr>
            <tr>
              <th>적용 Pkg</th>
              <td>
                <AntdSelect className="select-sm" allowClear onChange={this.onChangePkg} style={{ width: '150px' }}>
                  {pkgItems}
                </AntdSelect>
              </td>
              <th>적용 Line Site</th>
              <td>
                <AntdSelect className="select-sm" allowClear onChange={this.onChangeFab} style={{ width: '150px' }}>
                  {lineItems}
                </AntdSelect>
              </td>
            </tr>
            <tr>
              <th>적용 Lead</th>
              <td>
                <AntdSelect className="select-sm" allowClear onChange={this.onChangeLead} style={{ width: '150px' }}>
                  {leadItems}
                </AntdSelect>
              </td>
              <th>적용 Ball</th>
              <td>
                <AntdSelect className="select-sm" allowClear onChange={this.onChangeBall} style={{ width: '150px' }}>
                  {ballItems}
                </AntdSelect>
              </td>
            </tr>
          </tbody>
        </table>
      </StyledHtmlTable>
    );
  }
}

DwStd.propTypes = {
  apiArys: PropTypes.array,
  result: PropTypes.object,
};

DwStd.defaultProps = {
  result: {
    categoryList: {},
  },
};

export default DwStd;
