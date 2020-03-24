import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Input, Row, Button, Table, Radio } from 'antd';
import StyledAntdTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
import request from 'utils/request';

const AntdTable = StyledAntdTable(Table);

function CustomDataTableComp(props) {
  const [headers, setHeaders] = useState([]);
  // const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const { URL } = props.CONFIG.property || {};
    const { formData } = props;
    if (typeof URL === 'string') {
      request({
        method: 'POST',
        url: URL,
        // FIRE_CODE: FE (소화기)
        params: formData,
      }).then(({ response }) => {
        console.debug('### response: ', response);
      });
    }

    const { HEADERS } = props.CONFIG.property || [];
    if (HEADERS instanceof Array) {
      const tempArray = [];
      HEADERS.forEach(header => {
        const tempObj = {};
        tempObj.title = header.name;
        tempObj.dataIndex = header.name;
        tempObj.key = header.name;
        tempObj.option = header.option;
        tempArray.push(tempObj);
      });
      setHeaders(tempArray);
    }
  }, []);

  return (
    <AntdTable
      rowKey="TASK_SEQ"
      // key={`${group.key}_list`}
      className="view-designer-list"
      columns={headers}
      // dataSource={listData || []}
      // rowSelection={rowSelection}
      // pagination={{ pageSize: 50 }}
      // scroll={{ x: '800px', y: '800px' }}
    />
  );
}

CustomDataTableComp.defaultProps = { CONFIG: PropTypes.objectOf(PropTypes.object), COMP_FIELD: PropTypes.string };

CustomDataTableComp.propTypes = {
  CONFIG: {
    info: {},
    option: {},
    property: { customValues: [{ value: null, text: null }], definedValue: { value: null, text: null } },
  },
  COMP_FIELD: '',
};

export default CustomDataTableComp;
