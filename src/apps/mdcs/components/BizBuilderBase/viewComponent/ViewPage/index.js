import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Loadable from 'react-loadable';

import { isJSON } from 'utils/helpers';
import { CompInfo } from '../../CompInfo';

import Styled from './Styled';

class ViewPage extends Component {
  renderCol = (col, colData) => {
    const { id, getExtraApiData, extraApiData, formData, compProps } = this.props;
    if (col.CONFIG.property.COMP_SRC && col.CONFIG.property.COMP_SRC.length > 0 && CompInfo[col.CONFIG.property.COMP_SRC]) {
      return CompInfo[col.CONFIG.property.COMP_SRC].renderer({
        ...col,
        colData,
        id,
        getExtraApiData,
        extraApiData,
        formData,
        compProps,
        readOnly: true,
      });
    }
    return `component!!!`;
  };

  render = () => {
    const { viewLayer, formData } = this.props;
    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerList = JSON.parse(viewLayer[0].CONFIG).property.layer || [];
      return (
        <Styled>
          <div className="pop_tit">업무표준</div>
          <div className="pop_con">
            <div className="sub_form">
              <div className="tableBody">
                {viewLayerList.length > 0 &&
                  viewLayerList.map((row, rowIdx) => (
                    <Row key={`BizBuilderBaseRow_${rowIdx}`}>
                      {row.length > 0 &&
                        row.map((col, colIdx) => (
                          <Col span={col.CONFIG.property.span} key={`BizBuilderBaseCol_${rowIdx}_${colIdx}`}>
                            {this.renderCol(col, col.CONFIG.property.COMP_FIELD ? formData[col.CONFIG.property.COMP_FIELD] : '')}
                          </Col>
                        ))}
                    </Row>
                  ))}
              </div>
            </div>
          </div>
        </Styled>
      );
    }
    return '';
  };
}

export default ViewPage;
