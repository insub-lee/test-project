import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Checkbox, Select } from 'antd';
import StyledCheckbox from 'components/FormStuff/Checkbox';

import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';

const { Option } = Select;

class TechStd extends Component {
  state = {
    siteList: [],
  };

  componentDidMount() {
    const { sagaKey, getCallDataHandler, apiArys } = this.props;
    getCallDataHandler(sagaKey, apiArys, this.initDataBind);
  }

  initDataBind = sagaKey => {
    const {
      result: {
        techSubCategory: { categoryMapList: techSubCategoryItems },
        site: { categoryMapList: siteItems },
        lineSite: { categoryMapList: lineItems },
        teachList: { categoryMapList: techItems },
        genList: { categoryMapList: genItems },
        memoryList: { categoryMapList: memoryItems },
        pkgList: { categoryMapList: pkgItems },
        prdList: { categoryMapList: prdItems },
        moduleList: { categoryMapList: moduleItems },
        customList: { categoryMapList: customItems },
        changeList: { categoryMapList: changeItems },
        fmeaList: { categoryMapList: fmeaItems },
      },
    } = this.props;

    this.setState({
      techSubCategoryItems: techSubCategoryItems.filter(x => x.LVL === 2).map(item => <Checkbox value={item.NODE_ID}>{item.NAME_KOR}</Checkbox>),
      siteItems: siteItems.filter(x => x.LVL !== 0).map(item => <Option key={item.NODE_ID}>{item.NAME_KOR}</Option>),
      lineItems: lineItems.filter(x => x.LVL !== 0).map(item => <Option key={item.NODE_ID}>{item.NAME_KOR}</Option>),
      techItems: techItems.filter(x => x.LVL !== 0).map(item => <Option key={item.NODE_ID}>{item.NAME_KOR}</Option>),
      genItems: genItems.filter(x => x.LVL !== 0).map(item => <Option key={item.NODE_ID}>{item.NAME_KOR}</Option>),
      memoryItems: memoryItems.filter(x => x.LVL !== 0).map(item => <Option key={item.NODE_ID}>{item.NAME_KOR}</Option>),
      pkgItems: pkgItems.filter(x => x.LVL !== 0).map(item => <Option key={item.NODE_ID}>{item.NAME_KOR}</Option>),
      prdItems: prdItems.filter(x => x.LVL !== 0).map(item => <Option key={item.NODE_ID}>{item.NAME_KOR}</Option>),
      moduleItems: moduleItems.filter(x => x.LVL !== 0).map(item => <Option key={item.NODE_ID}>{item.NAME_KOR}</Option>),
      customItems: customItems.filter(x => x.LVL !== 0).map(item => <Option key={item.NODE_ID}>{item.NAME_KOR}</Option>),
      changeItems: changeItems.filter(x => x.LVL !== 0).map(item => <Checkbox value={item.NODE_ID}>{item.NAME_KOR}</Checkbox>),
      fmeaItems: fmeaItems.filter(x => x.LVL !== 0).map(item => <Checkbox value={item.NODE_ID}>{item.NAME_KOR}</Checkbox>),
    });
  };

  onChangeTechCategory = checkedValues => {
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

  onChangeRegion = value => {
    const { onChangeSearchValue } = this.props;
    onChangeSearchValue('w.region', ` and w.task_seq in ( select task_seq from mg_commoncode where gubun='REGION' and node_id=${value})`);
  };

  onChangeSite = value => {
    const { onChangeSearchValue } = this.props;
    onChangeSearchValue('w.FAB', ` and w.task_seq in ( select task_seq from mg_commoncode where gubun='FAB' and node_id=${value})`);
  };

  onChangeTech = value => {
    const { onChangeSearchValue } = this.props;
    onChangeSearchValue('w.tech', ` and w.task_seq in ( select task_seq from mg_commoncode where gubun='TECH' and node_id=${value})`);
  };

  onChangeGen = value => {
    const { onChangeSearchValue } = this.props;
    onChangeSearchValue('w.gen', ` and w.task_seq in ( select task_seq from mg_commoncode where gubun='GEN' and node_id=${value})`);
  };

  onChangeMemory = value => {
    const { onChangeSearchValue } = this.props;
    onChangeSearchValue('w.DENSITY', ` and w.task_seq in ( select task_seq from mg_commoncode where gubun='DENSITY' and node_id=${value})`);
  };

  onChangePkg = value => {
    const { onChangeSearchValue } = this.props;
    onChangeSearchValue('w.DENSITY', ` and w.task_seq in ( select task_seq from mg_commoncode where gubun='DENSITY' and node_id=${value})`);
  };

  onChangeProduct = value => {
    const { onChangeSearchValue } = this.props;
    onChangeSearchValue('w.DENSITY', ` and w.task_seq in ( select task_seq from mg_commoncode where gubun='DENSITY' and node_id=${value})`);
  };

  onChangeModule = value => {
    const { onChangeSearchValue } = this.props;
    onChangeSearchValue('w.MODULE', ` and w.task_seq in ( select task_seq from mg_commoncode where gubun='MODULE' and node_id=${value})`);
  };

  onChangeCustomer = value => {
    const { onChangeSearchValue } = this.props;
    onChangeSearchValue('w.CUSTOMER', ` and w.task_seq in ( select task_seq from mg_commoncode where gubun='CUSTOMER' and node_id=${value})`);
  };

  onChangeMajor = values => {
    const { onChangeSearchValue } = this.props;
    const selectedValues = values.map(item => `'${item}'`);
    onChangeSearchValue('w.change', ` and w.change in ( ${selectedValues.join()} )`);
  };

  onChangeFMEA = values => {
    const { onChangeSearchValue } = this.props;
    const selectedValues = values.map(item => `'${item}'`);
    onChangeSearchValue('w.fmea_flag', ` and w.fmea_flag in ( ${selectedValues.join()} )`);
  };

  render() {
    const {
      siteItems,
      lineItems,
      techItems,
      genItems,
      memoryItems,
      pkgItems,
      prdItems,
      moduleItems,
      customItems,
      changeItems,
      fmeaItems,
      techSubCategoryItems,
    } = this.state;
    return (
      <StyledHtmlTable>
        <table>
          <thead>
            <tr>
              <th colSpan={5}>기술표준 정보선택</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>중분류</th>
              <td colSpan={4}>
                <Checkbox.Group onChange={this.onChangeTechCategory}>{techSubCategoryItems}</Checkbox.Group>
              </td>
            </tr>
            <tr>
              <th rowSpan={5}>SCOPE</th>
              <th>지역</th>
              <td>
                <Select allowClear onChange={this.onChangeRegion} style={{ width: '150px' }}>
                  {siteItems}
                </Select>
              </td>
              <th>적용 Line/Site</th>
              <td>
                <Select allowClear onChange={this.onChangeSite} style={{ width: '150px' }}>
                  {lineItems}
                </Select>
              </td>
            </tr>
            <tr>
              <th>Tech</th>
              <td>
                <Select allowClear onChange={this.onChangeTech} style={{ width: '150px' }}>
                  {techItems}
                </Select>
              </td>
              <th>Gen</th>
              <td>
                <Select allowClear onChange={this.onChangeGen} style={{ width: '150px' }}>
                  {genItems}
                </Select>
              </td>
            </tr>
            <tr>
              <th>Memory Density</th>
              <td>
                <Select allowClear onChange={this.onChangeMemory} style={{ width: '150px' }}>
                  {memoryItems}
                </Select>
              </td>
              <th>Pkg</th>
              <td>
                <Select allowClear onChange={this.onChangePkg} style={{ width: '150px' }}>
                  {pkgItems}
                </Select>
              </td>
            </tr>
            <tr>
              <th>Product</th>
              <td>
                <Select allowClear onChange={this.onChangeProduct} style={{ width: '150px' }}>
                  {prdItems}
                </Select>
              </td>
              <th>Module</th>
              <td>
                <Select allowClear onChange={this.onChangeModule} style={{ width: '150px' }}>
                  {moduleItems}
                </Select>
              </td>
            </tr>
            <tr>
              <th>Customer</th>
              <td colSpan={3}>
                <Select allowClear onChange={this.onChangeCustomer} style={{ width: '150px' }}>
                  {customItems}
                </Select>
              </td>
            </tr>
            <tr>
              <th>Change</th>
              <td colSpan={4}>
                <Checkbox.Group onChange={this.onChangeMajor}>{changeItems}</Checkbox.Group>
              </td>
            </tr>
            <tr>
              <th>FMEA 대상</th>
              <td colSpan={4}>
                <Checkbox.Group onChange={this.onChangeFMEA}>{fmeaItems}</Checkbox.Group>
              </td>
            </tr>
          </tbody>
        </table>
      </StyledHtmlTable>
    );
  }
}

TechStd.propTypes = {
  apiArys: PropTypes.array,
};

TechStd.defaultProps = {
  apiArys: [
    {
      key: 'techSubCategory',
      url: '/api/admin/v1/common/categoryMapList',
      type: 'POST',
      params: { PARAM: { NODE_ID: 6 } },
    },
    {
      key: 'changeList',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=4',
      type: 'GET',
    },
    {
      key: 'fmeaList',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=23',
      type: 'GET',
    },
    {
      key: 'site',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=10',
      type: 'GET',
    },
    {
      key: 'lineSite',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=11',
      type: 'GET',
    },
    {
      key: 'teachList',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=12',
      type: 'GET',
    },
    {
      key: 'genList',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=13',
      type: 'GET',
    },
    {
      key: 'memoryList',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=14',
      type: 'GET',
    },
    {
      key: 'pkgList',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=15',
      type: 'GET',
    },
    {
      key: 'prdList',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=16',
      type: 'GET',
    },
    {
      key: 'moduleList',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=17',
      type: 'GET',
    },
    {
      key: 'customList',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=18',
      type: 'GET',
    },
  ],
};

export default TechStd;
