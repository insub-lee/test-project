import React, { useEffect, useState } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { Col, Input, Row, Button, Table, Radio } from 'antd';
import StyledAntdTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
import AntRadiobox from 'containers/portal/components/uielements/radiobox.style';

import request from 'utils/request';

const AntdTable = StyledAntdTable(Table);
const { Column, ColumnGroup } = Table;
const cont = {
  RADIO_: 'RADIO',
  TEXT_: 'TEXT',
};

const RadioGroup = AntRadiobox(Radio.Group);

function CustomDataTableComp(props) {
  const [columns, setColumns] = useState([]);
  const [groups, setGroups] = useState([]);
  const { RADIO_, TEXT_ } = cont;
  const [dataSource, setDataSource] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  // const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const { URL } = props.CONFIG.property || {};
    const { formData, viewPageData } = props;

    if (viewPageData?.viewType === 'MODIFY') {
      setIsEditable(true);
    }

    if (typeof URL === 'string' || URL !== '') {
      request({
        method: 'POST',
        url: URL,
        // FIRE_CODE: FE (소화기)
        data: formData,
      }).then(({ response }) => {
        console.debug('### response of CustomDataTableComp: ', response);
        if (response?.result === 1) {
          // console.debug('£££ result : ', response?.data instanceof Object);
          if (response?.data instanceof Array) {
            setDataSource(response?.data);
            setIsLoaded(true);
          }
        }
      });
    }

    const { COLUMNS, GROUPS } = props.CONFIG.property || {};
    // console.debug('£££ customDataTable :', COLUMNS, GROUPS);
    if (COLUMNS instanceof Array) {
      const tempArray = [];
      COLUMNS.forEach(header => {
        const tempObj = {};
        tempObj.title = header.title;
        tempObj.dataIndex = header.dataIndex;
        tempObj.key = header.title;
        tempObj.option = header.option;
        tempObj.order = header.order;
        tempArray.push(tempObj);
      });
      setColumns(tempArray);
    }
    if (GROUPS instanceof Array) {
      // const tempArray = [];
      // GROUPS.forEach(group => {
      // 	const tempObj = {};
      // 	tempObj.title = group.name;
      // 	tempObj.order = group.order;
      // 	tempArray.push(tempObj);
      // });
      setGroups(GROUPS);
    }
  }, []);

  const colRenderer = (text, option) => {
    // console.debug('£££ colRenderer : ', text, option);
    let result = text;
    switch (option) {
      case cont.RADIO_: {
        result = (
          <RadioGroup value={text}>
            <Radio value="Y">정상</Radio>
            <Radio value="N">불량</Radio>
          </RadioGroup>
        );
      }
    }
    // console.debug('£££ colRenderer: ', result);
    return <div>{result}</div>;
  };

  const columnRenderer = () => {
    // console.debug('£££ columnRenderer : ', groups, columns);
    if (groups?.length > 0) {
      return groups.map(({ title, order }) => {
        if (typeof order === 'string') {
          return (
            <ColumnGroup key={`CustomDataTableComp > ColumnGroup > ${Math.random()}`} title={title}>
              {columns.map(({ order: c_order, title: c_title, dataIndex, option }) => {
                if (order === c_order) {
                  return (
                    <Column
                      key={`CustomDataTableComp > groups > ${Math.random()}`}
                      title={c_title}
                      dataIndex={dataIndex}
                      render={text => colRenderer(text, option)}
                    />
                  );
                }
              })}
            </ColumnGroup>
          );
        }
      });
    }
    return columns.map(({ title, dataIndex, option }) => (
      <Column key={`CustomDataTableComp > Column > ${Math.random()}`} title={title} dataIndex={dataIndex} render={text => colRenderer(text, option)} />
    ));
  };

  return (
    <AntdTable
      rowKey="TASK_SEQ"
      // key={`${group.key}_list`}
      className="view-designer-list"
      // columns={columns}
      dataSource={isLoaded ? dataSource : null}
      // rowSelection={rowSelection}
      pagination={false}
      scroll={{ x: true }}
    >
      {columnRenderer()}
    </AntdTable>
  );
}

CustomDataTableComp.propTypes = {
  CONFIG: PropTypes.shape({ info: PropTypes.object, option: PropTypes.object, property: PropTypes.object }),
  COMP_FIELD: PropTypes.string,
};

CustomDataTableComp.defaultProps = {
  CONFIG: {
    info: {},
    option: {},
    property: { customValues: [{ value: null, text: null }], definedValue: { value: null, text: null } },
  },
  COMP_FIELD: '',
};

export default CustomDataTableComp;
