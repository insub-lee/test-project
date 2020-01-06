import React, { Component } from 'react';
import { Form, Checkbox, Select } from 'antd';
import PropTypes from 'prop-types';

import StyledCheckbox from 'components/FormStuff/Checkbox';

const FormItem = Form.Item;
const { Option } = Select;

class TechStd extends Component {
  componentDidMount() {
    const { searchParam, setSearchParam } = this.props;
    const apiArr = [
      {
        key: 'region',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=10',
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
        key: 'tech',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=12',
        type: 'GET',
        params: {},
      },
      {
        key: 'generation',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=13',
        type: 'GET',
        params: {},
      },
      {
        key: 'density',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=14',
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
        key: 'product',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=16',
        type: 'GET',
        params: {},
      },
      {
        key: 'module',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=17',
        type: 'GET',
        params: {},
      },
      {
        key: 'customer',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=18',
        type: 'GET',
        params: {},
      },
    ];
    this.callApi(apiArr);
    setSearchParam({
      ...searchParam,
      nodeIds: { key: 'TBD.NODE_ID', condition: 'IN', value: [], type: 'INT' },
      region: { key: 'TBD.REGION', condition: '=', value: 0, type: 'INT' },
      fab: { key: 'TBD.FAB', condition: '=', value: 0, type: 'INT' },
      tech: { key: 'TBD.TECH', condition: '=', value: 0, type: 'INT' },
      generation: { key: 'TBD.GENERATION', condition: '=', value: 0, type: 'INT' },
      density: { key: 'TBD.DENSITY', condition: '=', value: 0, type: 'INT' },
      pkg: { key: 'TBD.PKG', condition: '=', value: 0, type: 'INT' },
      product: { key: 'TBD.PRODUCT', condition: '=', value: 0, type: 'INT' },
      module: { key: 'TBD.MODULE', condition: '=', value: 0, type: 'INT' },
      customer: { key: 'TBD.CUSTOMER', condition: '=', value: 0, type: 'INT' },
      fmea: { key: 'TBD.FMEA', condition: 'IN', value: [], type: 'INT' },
    });
  }

  callApi = apiArr => {
    const { id, getCallDataHanlder } = this.props;
    getCallDataHanlder(id, apiArr);
  };

  render() {
    const { result, searchParam, onChangeCheckBox, onChangeValue } = this.props;
    const { nodeIds, region, fab, tech, generation, density, pkg, product, module, customer, fmea } = searchParam;
    let regionData = [];
    let fabData = [];
    let techData = [];
    let generationData = [];
    let densityData = [];
    let pkgData = [];
    let productData = [];
    let moduleData = [];
    let customerData = [];
    let checkboxOptData = [];
    if (result && result.categoryInfo && result.categoryInfo.categoryMapList && result.categoryInfo.categoryMapList.length > 0) {
      checkboxOptData = result.categoryInfo.categoryMapList.filter(fNode => fNode.PARENT_NODE_ID === 6 && fNode.USE_YN === 'Y');
    }
    if (result && result.region && result.region.categoryMapList && result.region.categoryMapList.length > 0) {
      regionData = result.region.categoryMapList.filter(fNode => fNode.LVL > 0 && fNode.USE_YN === 'Y');
    }
    if (result && result.fab && result.fab.categoryMapList && result.fab.categoryMapList.length > 0) {
      fabData = result.fab.categoryMapList.filter(fNode => fNode.LVL > 0 && fNode.USE_YN === 'Y');
    }
    if (result && result.tech && result.tech.categoryMapList && result.tech.categoryMapList.length > 0) {
      techData = result.tech.categoryMapList.filter(fNode => fNode.LVL > 0 && fNode.USE_YN === 'Y');
    }
    if (result && result.generation && result.generation.categoryMapList && result.generation.categoryMapList.length > 0) {
      generationData = result.generation.categoryMapList.filter(fNode => fNode.LVL > 0 && fNode.USE_YN === 'Y');
    }
    if (result && result.density && result.density.categoryMapList && result.density.categoryMapList.length > 0) {
      densityData = result.density.categoryMapList.filter(fNode => fNode.LVL > 0 && fNode.USE_YN === 'Y');
    }
    if (result && result.pkg && result.pkg.categoryMapList && result.pkg.categoryMapList.length > 0) {
      pkgData = result.pkg.categoryMapList.filter(fNode => fNode.LVL > 0 && fNode.USE_YN === 'Y');
    }
    if (result && result.product && result.product.categoryMapList && result.product.categoryMapList.length > 0) {
      productData = result.product.categoryMapList.filter(fNode => fNode.LVL > 0 && fNode.USE_YN === 'Y');
    }
    if (result && result.module && result.module.categoryMapList && result.module.categoryMapList.length > 0) {
      moduleData = result.module.categoryMapList.filter(fNode => fNode.LVL > 0 && fNode.USE_YN === 'Y');
    }
    if (result && result.customer && result.customer.categoryMapList && result.customer.categoryMapList.length > 0) {
      customerData = result.customer.categoryMapList.filter(fNode => fNode.LVL > 0 && fNode.USE_YN === 'Y');
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
        <FormItem label="지역">
          {regionData && regionData.length > 0 && (
            <Select value={region.value} onSelect={value => onChangeValue('region', value)}>
              <Option value={0}>--------</Option>
              {regionData.map(node => (
                <Option value={node.NODE_ID}>{node.NAME_ENG}</Option>
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
        <FormItem label="Tech">
          {techData && techData.length > 0 && (
            <Select value={tech.value} onSelect={value => onChangeValue('tech', value)}>
              <Option value={0}>--------</Option>
              {techData.map(node => (
                <Option value={node.NODE_ID}>{node.NAME_KOR}</Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem label="Gen">
          {generationData && generationData.length > 0 && (
            <Select value={generation.value} onSelect={value => onChangeValue('generation', value)}>
              <Option value={0}>--------</Option>
              {generationData.map(node => (
                <Option value={node.NODE_ID}>{node.NAME_KOR}</Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem label="Memory Density">
          {densityData && densityData.length > 0 && (
            <Select value={density.value} onSelect={value => onChangeValue('density', value)}>
              <Option value={0}>--------</Option>
              {densityData.map(node => (
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
        <FormItem label="Module">
          {moduleData && moduleData.length > 0 && (
            <Select value={module.value} onSelect={value => onChangeValue('module', value)}>
              <Option value={0}>--------</Option>
              {moduleData.map(node => (
                <Option value={node.NODE_ID}>{node.NAME_KOR}</Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem label="Customer">
          {customerData && customerData.length > 0 && (
            <Select value={customer.value} onSelect={value => onChangeValue('customer', value)}>
              <Option value={0}>--------</Option>
              {customerData.map(node => (
                <Option value={node.NODE_ID}>{node.NAME_KOR}</Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem label="FMEA 대상">
          {fmea && (
            <Checkbox.Group onChange={value => onChangeCheckBox('fmea', value)} value={fmea.value}>
              (<StyledCheckbox value="A">실시</StyledCheckbox>
              <StyledCheckbox value="D">미실시</StyledCheckbox>)<StyledCheckbox value="N">비대상</StyledCheckbox>
            </Checkbox.Group>
          )}
        </FormItem>
      </>
    );
  }
}

TechStd.propTypes = {
  searchParam: PropTypes.objectOf(PropTypes.object, PropTypes.object),
};

TechStd.defaultProps = {
  searchParam: { nodeIds: { value: [] }, scope: { value: 0 } },
};

export default TechStd;
