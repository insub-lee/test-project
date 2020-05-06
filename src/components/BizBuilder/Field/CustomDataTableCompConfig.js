import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import { Col, Input, Row, Button, Radio } from 'antd';
import _, { debounce } from 'lodash';

const cont = {
  ADD_: 'ADD',
  RESET_: 'RESET',
  REMOVE_: 'REMOVE',
  TITLE_: 'TITLE',
  OPTION_: 'OPTION',
  RADIO_: 'RADIO',
  TEXT_: 'TEXT',
  DATA_INDEX_: 'DATA_INDEX',
  GROUP_TITLE_: 'GROUP_TITLE',
  ORDER_: 'ORDER',
};

function CustomDataTableCompConfig(props) {
  const { ADD_, RESET_, REMOVE_, TITLE_, OPTION_, RADIO_, TEXT_, DATA_INDEX_, GROUP_TITLE_, ORDER_ } = cont;
  const [url, setUrl] = useState(undefined);
  const [columns, setColumns] = useState([]);
  const [groups, setGroups] = useState([]);
  const [title, setTitle] = useState(undefined);

  // componentDidMount
  useEffect(() => {
    const { URL, COLUMNS, GROUPS, TITLE } = props.configInfo.property || {};
    setUrl(URL);
    setColumns(COLUMNS || []);
    setGroups(GROUPS || []);
    setTitle(TITLE);
  }, []);

  useEffect(() => {
    debouncedHandleChangeViewCompData('URL', url);
  }, [url]);

  useEffect(() => {
    debouncedHandleChangeViewCompData('COLUMNS', columns);
  }, [columns]);

  useEffect(() => {
    debouncedHandleChangeViewCompData('GROUPS', groups);
  }, [groups]);

  useEffect(() => {
    debouncedHandleChangeViewCompData('TITLE', title);
  }, [title]);

  const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = props;

  const handleChangeViewCompData = (key, value) => {
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  const debouncedHandleChangeViewCompData = debounce(handleChangeViewCompData, 250);

  const columnSizeHandler = type => {
    let temp = [...(columns || [])];
    switch (type) {
      // add Column
      case ADD_: {
        const tempColumns = { title: undefined, dataIndex: undefined, order: undefined, option: TEXT_ };
        temp.push(tempColumns);
        break;
      }

      // remove Column
      case REMOVE_: {
        temp = [..._.dropRight(temp, 1)];
        break;
      }
    }
    setColumns(temp);
  };

  const groupSizeHandler = type => {
    let temp = [...(groups || [])];
    switch (type) {
      // add Group
      case ADD_: {
        const tempColumns = { title: undefined, order: undefined };
        temp.push(tempColumns);
        break;
      }

      // remove Group
      case REMOVE_: {
        temp = [..._.dropRight(temp, 1)];
        break;
      }
    }
    setGroups(temp);
  };

  // Column title
  const columnValueHandler = (type, value, idx) => {
    if (typeof value === 'string') {
      const temp = [...(columns || [])];
      value = value.trim();

      switch (type) {
        case TITLE_: {
          temp[idx].title = value;
          break;
        }
        case DATA_INDEX_: {
          temp[idx].dataIndex = value;
          break;
        }
        case ORDER_: {
          temp[idx].order = value;
          break;
        }
        case OPTION_: {
          temp[idx].option = value;
          break;
        }
      }
      setColumns(temp);
    }
  };

  // Group title
  const groupValueHandler = (type, value, idx) => {
    if (typeof value === 'string') {
      value = value.trim();
      const temp = [...(groups || [])];

      switch (type) {
        case GROUP_TITLE_: {
          temp[idx].title = value;
          break;
        }
        case ORDER_: {
          temp[idx].order = value;
          break;
        }
      }
      setGroups(temp);
    }
  };

  return [
    <div className="popoverItem popoverItemInput">
      <span className="spanLabel">URL</span>
      <Input value={url} onChange={e => setUrl(e.target.value)} placeHolder="대상 URL을 입력" />
    </div>,
    <div className="popoverItem popoverItemInput">
      <span className="spanLabel">Group 사이즈</span>
      <span style={{ display: 'block', textAlign: 'center' }}>
        <Button
          type="primary"
          style={{ width: '33.3%' }}
          onClick={() => {
            groupSizeHandler(ADD_);
          }}
        >
          {ADD_}
        </Button>
        <Button
          type="ghost"
          style={{ width: '33.3%' }}
          onClick={() => {
            setGroups([]);
          }}
        >
          {RESET_}
        </Button>
        <Button
          type="danger"
          style={{ width: '33.3%' }}
          onClick={() => {
            groupSizeHandler(REMOVE_);
          }}
        >
          {REMOVE_}
        </Button>
      </span>
    </div>,
    <>
      {groups.length > 0 &&
        groups.map(({ title, order }, idx) => (
          <div className="popoverItem popoverItemInput">
            <span className="spanLabel">group{idx + 1}</span>
            <span>
              <Input
                style={{ width: '38%' }}
                value={title}
                placeHolder="Column Group Title"
                onChange={e => groupValueHandler(GROUP_TITLE_, e.target.value, idx)}
                onKeyDown={e => (e.keyCode === 13 ? groupSizeHandler(ADD_) : null)}
              />
              <Input
                style={{ width: '38%' }}
                value={order}
                placeHolder="Column Group order"
                onChange={e => groupValueHandler(ORDER_, e.target.value, idx)}
                onKeyDown={e => (e.keyCode === 13 ? groupSizeHandler(ADD_) : null)}
              />
            </span>
          </div>
        ))}
    </>,
    <div className="popoverItem popoverItemInput">
      <span className="spanLabel">Column 사이즈</span>
      <span style={{ display: 'block', textAlign: 'center' }}>
        <Button
          type="primary"
          style={{ width: '33.3%' }}
          onClick={() => {
            columnSizeHandler(ADD_);
          }}
        >
          {ADD_}
        </Button>
        <Button
          type="ghost"
          style={{ width: '33.3%' }}
          onClick={() => {
            setColumns([]);
          }}
        >
          {RESET_}
        </Button>
        <Button
          type="danger"
          style={{ width: '33.3%' }}
          onClick={() => {
            columnSizeHandler(REMOVE_);
          }}
        >
          {REMOVE_}
        </Button>
      </span>
    </div>,
    <>
      {columns.length > 0 &&
        columns.map(({ title, option, order, dataIndex }, idx) => (
          <div className="popoverItem popoverItemInput">
            <span className="spanLabel">Column{idx + 1}</span>
            <span>
              <Input
                style={{ width: '25%' }}
                value={title}
                placeHolder="Column Title"
                onChange={e => columnValueHandler(TITLE_, e.target.value, idx)}
                onKeyDown={e => (e.keyCode === 13 ? columnSizeHandler(ADD_) : null)}
              />
              <Input
                style={{ width: '25%' }}
                value={dataIndex}
                placeHolder="Data Index"
                onChange={e => columnValueHandler(DATA_INDEX_, e.target.value, idx)}
                onKeyDown={e => (e.keyCode === 13 ? columnSizeHandler(ADD_) : null)}
              />
              <Input
                style={{ width: '25%' }}
                value={order}
                placeHolder="Column Group Order"
                onChange={e => columnValueHandler(ORDER_, e.target.value, idx)}
                onKeyDown={e => (e.keyCode === 13 ? columnSizeHandler(ADD_) : null)}
              />
              <Radio.Group
                style={{ width: '20%', textAlign: 'center' }}
                value={option}
                onChange={e => {
                  const { value } = e.target;
                  columnValueHandler(OPTION_, value, idx);
                }}
              >
                <Radio value={RADIO_}>{RADIO_}</Radio>
                <Radio value={TEXT_}>{TEXT_}</Radio>
              </Radio.Group>
            </span>
          </div>
        ))}
    </>,
  ];
}

CustomDataTableCompConfig.defaultProps = {
  CONFIG: PropTypes.objectOf(PropTypes.object),
  COMP_FIELD: PropTypes.string,
};

CustomDataTableCompConfig.propTypes = {
  CONFIG: {
    info: {},
    option: {},
    property: { URL: undefined, columns: [] },
  },
  COMP_FIELD: '',
};

export default CustomDataTableCompConfig;
// export default configer;
