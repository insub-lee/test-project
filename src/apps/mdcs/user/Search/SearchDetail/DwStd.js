import React, { Component } from 'react';
import { Form, Select } from 'antd';

import PropTypes from 'prop-types';

import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
const FormItem = Form.Item;
const { Option } = Select;

class DwStd extends Component {
  state = {
    siteList: [],
    lead: 0,
    ball: 0,
  };

  componentDidMount() {
    const { sagaKey, getCallDataHandler, apiArys } = this.props;
    getCallDataHandler(sagaKey, apiArys, this.initDataBind);
  }

  initDataBind = sagaKey => {
    const {
      result: {
        dwList: { categoryMapList: dwItems },
        prdList: { categoryMapList: prdItems },
        pkgList: { categoryMapList: pkgItems },
        lineList: { categoryMapList: lineItems },
        leadList: { categoryMapList: leadItems },
        ballList: { categoryMapList: ballItems },
      },
    } = this.props;

    this.setState({
      dwItems: dwItems.filter(x => x.LVL !== 0).map(item => <Option key={item.NODE_ID}>{item.NAME_KOR}</Option>),
      prdItems: prdItems.filter(x => x.LVL !== 0).map(item => <Option key={item.NODE_ID}>{item.NAME_KOR}</Option>),
      pkgItems: pkgItems.filter(x => x.LVL !== 0).map(item => <Option key={item.NODE_ID}>{item.NAME_KOR}</Option>),
      lineItems: lineItems.filter(x => x.LVL !== 0).map(item => <Option key={item.NODE_ID}>{item.NAME_KOR}</Option>),
      leadItems: leadItems.filter(x => x.LVL !== 0).map(item => <Option key={item.NODE_ID}>{item.NAME_KOR}</Option>),
      ballItems: ballItems.filter(x => x.LVL !== 0).map(item => <Option key={item.NODE_ID}>{item.NAME_KOR}</Option>),
    });
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
                <Select allowClear onChange={this.onChangeDwType} style={{ width: '300px' }}>
                  {dwItems}
                </Select>
              </td>
              <th>적용 Product</th>
              <td>
                <Select allowClear onChange={this.onChangeProduct} style={{ width: '150px' }}>
                  {prdItems}
                </Select>
              </td>
            </tr>
            <tr>
              <th>적용 Pkg</th>
              <td>
                <Select allowClear onChange={this.onChangePkg} style={{ width: '150px' }}>
                  {pkgItems}
                </Select>
              </td>
              <th>적용 Line Site</th>
              <td>
                <Select allowClear onChange={this.onChangeFab} style={{ width: '150px' }}>
                  {lineItems}
                </Select>
              </td>
            </tr>
            <tr>
              <th>적용 Lead</th>
              <td>
                <Select allowClear onChange={this.onChangeLead} style={{ width: '150px' }}>
                  {leadItems}
                </Select>
              </td>
              <th>적용 Ball</th>
              <td>
                <Select allowClear onChange={this.onChangeBall} style={{ width: '150px' }}>
                  {ballItems}
                </Select>
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
    dwList: {},
    prdList: {},
    pkgList: {},
    lineList: {},
    leadList: {},
    ballList: {},
  },

  apiArys: [
    {
      key: 'dwList',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=20',
      type: 'GET',
    },
    {
      key: 'prdList',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=16',
      type: 'GET',
    },
    {
      key: 'pkgList',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=15',
      type: 'GET',
    },
    {
      key: 'lineList',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=11',
      type: 'GET',
    },
    {
      key: 'leadList',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=21',
      type: 'GET',
    },
    {
      key: 'ballList',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=22',
      type: 'GET',
    },
  ],
};

export default DwStd;
