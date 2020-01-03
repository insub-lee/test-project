import React, { Component } from 'react';
import { Form, Select } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
const { Option } = Select;

class DwStd extends Component {
  componentDidMount() {
    const { searchParam, setSearchParam } = this.props;
    const apiArr = [
      {
        key: 'dwType',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=20',
        type: 'GET',
        params: {},
      },
      {
        key: 'product',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=16',
        type: 'GET',
        params: {},
      },
      {
        key: 'pkg',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=15',
        type: 'GET',
        params: {},
      },
      {
        key: 'fab',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=11',
        type: 'GET',
        params: {},
      },
      {
        key: 'lead',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=21',
        type: 'GET',
        params: {},
      },
      {
        key: 'ball',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=22',
        type: 'GET',
        params: {},
      },
    ];
    this.callApi(apiArr);
    setSearchParam({
      ...searchParam,
      dwType: { key: 'WBT.DW_TYPE', condition: '=', value: 0, type: 'INT' },
      product: { key: 'WBT.PRODUCT', condition: '=', value: 0, type: 'INT' },
      pkg: { key: 'WBT.PKG', condition: '=', value: 0, type: 'INT' },
      fab: { key: 'WBT.FAB', condition: '=', value: 0, type: 'INT' },
      lead: { key: 'WBT.LEAD', condition: '=', value: 0, type: 'INT' },
      ball: { key: 'WBT.BALL', condition: '=', value: 0, type: 'INT' },
    });
  }

  callApi = apiArr => {
    const { id, getCallDataHanlder } = this.props;
    getCallDataHanlder(id, apiArr);
  };

  render() {
    const { result, searchParam, onChangeCheckBox, onChangeValue } = this.props;
    const { dwType, product, pkg, fab, lead, ball } = searchParam;
    let dwTypeData = [];
    let productData = [];
    let pkgData = [];
    let fabData = [];
    let leadData = [];
    let ballData = [];
    if (result && result.dwType && result.dwType.categoryMapList && result.dwType.categoryMapList.length > 0) {
      dwTypeData = result.dwType.categoryMapList.filter(fNode => fNode.LVL > 0 && fNode.USE_YN === 'Y');
    }
    if (result && result.product && result.product.categoryMapList && result.product.categoryMapList.length > 0) {
      productData = result.product.categoryMapList.filter(fNode => fNode.LVL > 0 && fNode.USE_YN === 'Y');
    }
    if (result && result.pkg && result.pkg.categoryMapList && result.pkg.categoryMapList.length > 0) {
      pkgData = result.pkg.categoryMapList.filter(fNode => fNode.LVL > 0 && fNode.USE_YN === 'Y');
    }
    if (result && result.fab && result.fab.categoryMapList && result.fab.categoryMapList.length > 0) {
      fabData = result.fab.categoryMapList.filter(fNode => fNode.LVL > 0 && fNode.USE_YN === 'Y');
    }
    if (result && result.lead && result.lead.categoryMapList && result.lead.categoryMapList.length > 0) {
      leadData = result.lead.categoryMapList.filter(fNode => fNode.LVL > 0 && fNode.USE_YN === 'Y');
    }
    if (result && result.ball && result.ball.categoryMapList && result.ball.categoryMapList.length > 0) {
      ballData = result.ball.categoryMapList.filter(fNode => fNode.LVL > 0 && fNode.USE_YN === 'Y');
    }
    return (
      <>
        <FormItem label="도면구분">
          {dwTypeData && dwTypeData.length > 0 && (
            <Select value={dwType.value} onSelect={value => onChangeValue('dwType', value)}>
              <Option value={0}>--------</Option>
              {dwTypeData.map(node => (
                <Option value={node.NODE_ID}>{node.NAME_ENG}</Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem label="Product">
          {productData && productData.length > 0 && (
            <Select value={product.value} onSelect={value => onChangeValue('product', value)}>
              <Option value={0}>--------</Option>
              {productData.map(node => (
                <Option value={node.NODE_ID}>{node.NAME_KOR}</Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem label="Pkg">
          {pkgData && pkgData.length > 0 && (
            <Select value={pkg.value} onSelect={value => onChangeValue('pkg', value)}>
              <Option value={0}>--------</Option>
              {pkgData.map(node => (
                <Option value={node.NODE_ID}>{node.NAME_KOR}</Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem label="적용Line/Site">
          {fabData && fabData.length > 0 && (
            <Select value={fab.value} onSelect={value => onChangeValue('fab', value)}>
              <Option value={0}>--------</Option>
              {fabData.map(node => (
                <Option value={node.NODE_ID}>{node.NAME_KOR}</Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem label="적용 Lead">
          {leadData && leadData.length > 0 && (
            <Select value={lead.value} onSelect={value => onChangeValue('lead', value)}>
              <Option value={0}>--------</Option>
              {leadData.map(node => (
                <Option value={node.NODE_ID}>{node.NAME_KOR}</Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem label="적용 Ball">
          {ballData && ballData.length > 0 && (
            <Select value={ball.value} onSelect={value => onChangeValue('ball', value)}>
              <Option value={0}>--------</Option>
              {ballData.map(node => (
                <Option value={node.NODE_ID}>{node.NAME_KOR}</Option>
              ))}
            </Select>
          )}
        </FormItem>
      </>
    );
  }
}

DwStd.propTypes = {
  searchParam: PropTypes.objectOf(PropTypes.object, PropTypes.object),
};

DwStd.defaultProps = {
  searchParam: { nodeIds: { value: [] }, scope: { value: 0 } },
};

export default DwStd;
