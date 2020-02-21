import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Checkbox, Select } from 'antd';
import StyledCheckbox from 'components/FormStuff/Checkbox';

import StyledHtmlTable from 'commonStyled/Table/StyledHtmlTable';

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
      siteItems: siteItems.filter(x => x.LVL !== 0),
      lineItems: lineItems.filter(x => x.LVL !== 0),
      techItems: techItems.filter(x => x.LVL !== 0),
      genItems: genItems.filter(x => x.LVL !== 0),
      memoryItems: memoryItems.filter(x => x.LVL !== 0),
      pkgItems: pkgItems.filter(x => x.LVL !== 0),
      prdItems: prdItems.filter(x => x.LVL !== 0),
      moduleItems: moduleItems.filter(x => x.LVL !== 0),
      customItems: customItems.filter(x => x.LVL !== 0),
      changeItems: changeItems.filter(x => x.LVL !== 0),
      fmeaItems: fmeaItems.filter(x => x.LVL !== 0),
    });
  };

  render() {
    const { siteItems, lineItems, techItems, genItems, memoryItems, pkgItems, prdItems, moduleItems, customItems, changeItems, fmeaItems } = this.state;
    return (
      <StyledHtmlTable>
        <table>
          <thead>
            <tr>
              <th colSpan="4">기술표준 정보선택</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>중분류</th>
              <td>
                <Checkbox.Group>{}</Checkbox.Group>
              </td>
            </tr>
            <tr>
              <th>SCOPE</th>
              <td>
                <StyledHtmlTable>
                  <table>
                    <tr>
                      <th>지역</th>
                      <td>
                        <Select style={{ width: '150px' }}>{siteItems && siteItems.map(site => <Option key={site.NODE_ID}>{site.NAME_KOR}</Option>)}</Select>
                      </td>
                      <th>적용 Line/Site</th>
                      <td>
                        <Select style={{ width: '150px' }}>{lineItems && lineItems.map(line => <Option key={line.NODE_ID}>{line.NAME_KOR}</Option>)}</Select>
                      </td>
                    </tr>
                    <tr>
                      <th>Tech</th>
                      <td>
                        <Select style={{ width: '150px' }}>{techItems && techItems.map(tech => <Option key={tech.NODE_ID}>{tech.NAME_KOR}</Option>)}</Select>
                      </td>
                      <th>Gen</th>
                      <td>
                        <Select style={{ width: '150px' }}>{genItems && genItems.map(gen => <Option key={gen.NODE_ID}>{gen.NAME_KOR}</Option>)}</Select>
                      </td>
                    </tr>
                    <tr>
                      <th>Memory Density</th>
                      <td>
                        <Select style={{ width: '150px' }}>
                          {memoryItems && memoryItems.map(memory => <Option key={memory.NODE_ID}>{memory.NAME_KOR}</Option>)}
                        </Select>
                      </td>
                      <th>Pkg</th>
                      <td>
                        <Select style={{ width: '150px' }}>{pkgItems && pkgItems.map(pkg => <Option key={pkg.NODE_ID}>{pkg.NAME_KOR}</Option>)}</Select>
                      </td>
                    </tr>
                    <tr>
                      <th>Product</th>
                      <td>
                        <Select style={{ width: '150px' }}>{prdItems && prdItems.map(prd => <Option key={prd.NODE_ID}>{prd.NAME_KOR}</Option>)}</Select>
                      </td>
                      <th>Module</th>
                      <td>
                        <Select style={{ width: '150px' }}>{moduleItems && moduleItems.map(mod => <Option key={mod.NODE_ID}>{mod.NAME_KOR}</Option>)}</Select>
                      </td>
                    </tr>
                    <tr>
                      <th>Customer</th>
                      <td colSpan={3}>
                        <Select style={{ width: '150px' }}>
                          {customItems && customItems.map(custom => <Option key={custom.NODE_ID}>{custom.NAME_KOR}</Option>)}
                        </Select>
                      </td>
                    </tr>
                  </table>
                </StyledHtmlTable>
              </td>
            </tr>
            <tr>
              <th>Change</th>
              <td>
                <Checkbox.Group>{changeItems && changeItems.map(change => <Checkbox value={change.NODE_ID}>{change.NAME_KOR}</Checkbox>)}</Checkbox.Group>
              </td>
            </tr>
            <tr>
              <th>FMEA 대상</th>
              <td>
                <Checkbox.Group>{fmeaItems && fmeaItems.map(fmea => <Checkbox value={fmea.NODE_ID}>{fmea.NAME_KOR}</Checkbox>)}</Checkbox.Group>
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
      key: 'changeList',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=19',
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
