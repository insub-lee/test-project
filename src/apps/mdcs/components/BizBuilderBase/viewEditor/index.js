import React, { Component } from 'react';
import { Row, Col, Button, Input, Checkbox, Popover } from 'antd';

import { isJSON } from 'utils/helpers';
import { CompInfo } from '../CompInfo';

import Styled from './Styled';
import ConfigInfo from './ConfigInfo';
import { viewLayerDummy } from './dummy';

class viewEditor extends Component {
  state = {
    selectedRowIdx: -1,
    selectedColIdx: -1,
    viewLayer: {},
  };

  componentDidMount = () => {
    this.setState({ viewLayer: viewLayerDummy });
  };

  addComp = compType => {
    const { viewLayer, selectedRowIdx, selectedColIdx } = this.state;
    const retData = { ...viewLayer };
    let COMP_SRC = '';
    switch (compType.toUpperCase()) {
      case 'LABEL':
        COMP_SRC = 'LabelComp';
        break;
      case 'TEXT':
        COMP_SRC = 'TextComp';
        break;
      case 'RICH-TEXT-EDITOR':
        COMP_SRC = 'EditorComp';
        break;
      default:
    }
    if (selectedRowIdx > -1 && selectedColIdx > -1) {
      retData.property.layer[selectedRowIdx].cols[selectedColIdx].comp = { COMP_SRC, COMP_TAG: compType };
      this.setState({ viewLayer: retData }, () => console.debug(this.state.viewLayer));
    } else {
      alert('error!!!');
    }
  };

  setCompData = (rowIdx, colIdx, key, value) => {
    this.setState(
      prevState => {
        const { viewLayer } = prevState;
        viewLayer.property.layer[rowIdx].cols[colIdx].comp[key] = value;
        return { viewLayer };
      },
      () => console.debug(this.state.viewLayer),
    );
  };

  renderCompConfig = (col, rowIdx) => <div>test</div>;

  renderCol = (col, rowIdx) => {
    if (col.comp && col.comp.COMP_SRC) {
      return (
        <div className="compConfig">
          <Row>
            <Col span={col.comp.COMP_TAG === 'LABEL' ? 24 : 11}>
              <Input placeholder="필드명(KO)" onChange={e => this.setCompData(rowIdx, col.colIdx, 'NAME_KOR', e.target.value)} />
            </Col>
            <Col span={col.comp.COMP_TAG === 'LABEL' ? 24 : 11}>
              <Input placeholder="아이디" onChange={e => this.setCompData(rowIdx, col.colIdx, 'COMP_FIELD', e.target.value)} />
            </Col>
            {col.comp.COMP_TAG !== 'LABEL' && (
              <Col span={2}>
                <Popover placement="bottomRight" content={this.renderCompConfig()} trigger="click" overlayStyle={{ width: '500px' }}>
                  <span
                    className="toolbar-item fa fa-cog"
                    onClick={e => {
                      e.stopPropagation();
                      // removeLayer(object.id, object.type);
                    }}
                    role="button"
                    onKeyPress={() => false}
                    tabIndex="0"
                  />
                </Popover>
              </Col>
            )}
          </Row>
          {col.comp.COMP_TAG !== 'LABEL' && (
            <Row>
              <Col span={11}>
                <Input placeholder="사이즈" onChange={e => this.setCompData(rowIdx, col.colIdx, 'size', e.target.value)} />
              </Col>
              <Col span={11}>
                <Input placeholder="디폴트값" onChange={e => this.setCompData(rowIdx, col.colIdx, 'defaultValue', e.target.value)} />
              </Col>
            </Row>
          )}
        </div>
      );
    }
    return (
      <div
        role="button"
        onClick={() => this.setState({ selectedRowIdx: rowIdx, selectedColIdx: col.colIdx })}
        className={`compBase${this.state.selectedRowIdx === rowIdx && this.state.selectedColIdx === col.colIdx ? ' active' : ''}`}
      >
        Component add
      </div>
    );
  };

  render = () => {
    const { viewLayer } = this.state;
    const viewLayerList = (viewLayer.property && viewLayer.property.layer) || [];
    return (
      <Styled>
        <div className="pop_tit">업무표준</div>
        <div className="pop_con">
          <div className="sub_form">
            <div className="tableBody">
              {viewLayerList.length > 0 &&
                viewLayerList.map((row, rowIdx) => (
                  <Row key={`BizBuilderBaseRow_${rowIdx}`} type="flex">
                    {row.cols.length > 0 &&
                      row.cols.map((col, colIdx) => (
                        <Col span={col.span} key={`BizBuilderBaseCol_${rowIdx}_${colIdx}`} className="viewEditorCol">
                          {this.renderCol(col, row.rowIdx)}
                        </Col>
                      ))}
                  </Row>
                ))}
            </div>
          </div>
          <div className="sub_form">
            <div className="tableBody">
              <Button onClick={() => this.addComp('LABEL')}>Label</Button>
              <Button onClick={() => this.addComp('text')}>text</Button>
            </div>
          </div>
        </div>
      </Styled>
    );
  };
}

export default viewEditor;
