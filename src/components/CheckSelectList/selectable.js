import React from 'react';
import { Row, Col, Input } from 'antd';

import StyledButton from 'components/CommonStyled/StyledButton';
import Styled from './Styled';

const CheckList = ({ onChange, dataSource, onClear, props, isMultiple }) => (
  <Styled>
    <div style={{ width: '100%' }}>
      <Row type="flex">
        {dataSource &&
          dataSource.map((ListItems, index) => {
            let multipleValues = [];
            if (isMultiple && props[ListItems.groupKey].value) {
              multipleValues = props[ListItems.groupKey].value
                .toString()
                .replace(/, /gi, ',')
                .split(',');
            }
            return (
              <Col key={index}>
                <Row>
                  <Col>
                    <Input placeholder={ListItems.groupName} disabled style={{ width: '135px' }} value={ListItems.groupName} />
                  </Col>
                  <Col style={{ textAlign: 'center' }}>
                    <StyledButton
                      className="btn-gray btn-xs"
                      onClick={() => {
                        onClear(ListItems.groupKey);
                      }}
                    >
                      Clear
                    </StyledButton>
                  </Col>
                  <Col>
                    {isMultiple ? (
                      <select
                        onChange={e => onChange(ListItems.groupKey, e)}
                        id={ListItems.groupKey}
                        style={{ width: '135px' }}
                        size="10"
                        multiple={isMultiple}
                        value={multipleValues}
                      >
                        {ListItems.dataSet &&
                          ListItems.dataSet
                            .filter(filterItem => filterItem.LVL > 0 && filterItem.USE_YN === 'Y')
                            .map(opt => (
                              <option value={opt.NODE_ID} key={opt.NODE_ID}>
                                {opt.NAME_KOR}
                              </option>
                            ))}
                      </select>
                    ) : (
                      <select
                        onChange={e => onChange(ListItems.groupKey, e)}
                        id={ListItems.groupKey}
                        style={{ width: '135px' }}
                        size="10"
                        value={props[ListItems.groupKey].value === ' ' ? undefined : props[ListItems.groupKey].value}
                      >
                        {ListItems.dataSet &&
                          ListItems.dataSet
                            .filter(filterItem => filterItem.LVL > 0 && filterItem.USE_YN === 'Y')
                            .map(opt => (
                              <option value={opt.NODE_ID} key={opt.NODE_ID} selected={opt.NODE_ID.toString() === props[ListItems.groupKey].value}>
                                {opt.NAME_KOR}
                              </option>
                            ))}
                      </select>
                    )}
                  </Col>
                </Row>
              </Col>
            );
          })}
      </Row>
    </div>
  </Styled>
);
CheckList.defaultProps = { isMultiple: false };
export default CheckList;
