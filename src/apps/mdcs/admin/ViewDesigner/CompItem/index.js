import React, { Fragment } from 'react';
import { Row, Col, Input, Popover, Checkbox, InputNumber } from 'antd';

const setCompData = (rowIndex, colKey, key, value, changeCompData) => {
  changeCompData(rowIndex, colKey, key, value);
  // viewLayer.property.layer[rowIndex].cols[colKey].comp[key] = value;
};

const renderCompConfig = () => (
  <div>
    <Checkbox onChange={e => console.debug(e.target)}>필수</Checkbox>
    <Checkbox onChange={e => console.debug(e.target)}>편집</Checkbox>
  </div>
);

const CompItem = ({ col, groupIndex, rowIndex, colIndex, changeCompData }) => {
  if (col && col.comp && col.comp.CONFIG && col.comp.CONFIG.property.COMP_SRC) {
    return (
      <div className="compConfig">
        <Row>
          <Col span={col.comp.COMP_TAG === 'LABEL' ? 24 : 11}>
            <Input placeholder="필드명(KO)" onChange={e => changeCompData(groupIndex, rowIndex, colIndex, 'NAME_KOR', e.target.value)} />
          </Col>
          {col.comp.COMP_TAG !== 'LABEL' && (
            <>
              <Col span={11}>
                <Input placeholder="아이디" onChange={e => changeCompData(groupIndex, rowIndex, colIndex, 'COMP_FIELD', e.target.value)} />
              </Col>
              <Col span={2}>
                <Popover placement="bottomRight" content={renderCompConfig()} trigger="click" overlayStyle={{ width: '500px' }}>
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
            </>
          )}
        </Row>
        {col.comp.COMP_TAG !== 'LABEL' && (
          <Row>
            <Col span={11}>
              <InputNumber
                placeholder="사이즈"
                style={{ width: '100%' }}
                min={1}
                max={100000000000}
                onChange={value => changeCompData(groupIndex, rowIndex, colIndex, 'size', value)}
              />
            </Col>
            <Col span={11}>
              <Input placeholder="디폴트값" onChange={e => changeCompData(groupIndex, rowIndex, colIndex, 'defaultValue', e.target.value)} />
            </Col>
          </Row>
        )}
      </div>
    );
  }
  return <div>Component add</div>;
};

export default CompItem;
