import React, { Component } from 'react';
import { Form, Select } from 'antd';

import PropTypes from 'prop-types';

import StyledHtmlTable from 'commonStyled/Table/StyledHtmlTable';
const FormItem = Form.Item;
const { Option } = Select;

class DwStd extends Component {
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
        dwList: { categoryMapList: dwItems },
        prdList: { categoryMapList: prdItems },
        pkgList: { categoryMapList: pkgItems },
        lineList: { categoryMapList: lineItems },
        leadList: { categoryMapList: leadItems },
        ballList: { categoryMapList: ballItems },
      },
    } = this.props;

    this.setState({
      dwItems: dwItems.filter(x => x.LVL !== 0),
      prdItems: prdItems.filter(x => x.LVL !== 0),
      pkgItems: pkgItems.filter(x => x.LVL !== 0),
      lineItems: lineItems.filter(x => x.LVL !== 0),
      leadItems: leadItems.filter(x => x.LVL !== 0),
      ballItems: ballItems.filter(x => x.LVL !== 0),
    });
  };

  render() {
    const { dwItems, prdItems, pkgItems, lineItems, leadItems, ballItems } = this.state;
    return (
      <StyledHtmlTable>
        <table>
          <thead>
            <tr>
              <th colSpan="4">정보코드별 검색</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>SCOPE</th>
              <td>
                <StyledHtmlTable>
                  <table>
                    <tr>
                      <th>도면 구분</th>
                      <td>
                        <Select style={{ width: '300px' }}>{dwItems && dwItems.map(dw => <Option key={dw.NODE_ID}>{dw.NAME_KOR}</Option>)}</Select>
                      </td>
                      <th>적용 Product</th>
                      <td>
                        <Select style={{ width: '150px' }}>{prdItems && prdItems.map(prd => <Option key={prd.NODE_ID}>{prd.NAME_KOR}</Option>)}</Select>
                      </td>
                    </tr>
                    <tr>
                      <th>적용 Pkg</th>
                      <td>
                        <Select style={{ width: '150px' }}>{pkgItems && pkgItems.map(pkg => <Option key={pkg.NODE_ID}>{pkg.NAME_KOR}</Option>)}</Select>
                      </td>
                      <th>적용 Line Site</th>
                      <td>
                        <Select style={{ width: '150px' }}>{lineItems && lineItems.map(line => <Option key={line.NODE_ID}>{line.NAME_KOR}</Option>)}</Select>
                      </td>
                    </tr>
                    <tr>
                      <th>적용 Lead</th>
                      <td>
                        <Select style={{ width: '150px' }}>{leadItems && leadItems.map(lead => <Option key={lead.NODE_ID}>{lead.NAME_KOR}</Option>)}</Select>
                      </td>
                      <th>적용 Ball</th>
                      <td>
                        <Select style={{ width: '150px' }}>{ballItems && ballItems.map(ball => <Option key={ball.NODE_ID}>{ball.NAME_KOR}</Option>)}</Select>
                      </td>
                    </tr>
                  </table>
                </StyledHtmlTable>
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
