import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import { Col, Input, Row, Button, Radio } from 'antd';
import _, { debounce } from 'lodash';

const cont = {
  ADD: 'ADD',
  RESET: 'RESET',
  REMOVE: 'REMOVE',
  NAME: 'NAME',
  OPTION: 'OPTION',
  RADIO: 'RADIO',
  TEXT: 'TEXT',
  GROUP: 'GROUP',
};

function CustomDataTableCompConfig(props) {
  const { ADD, RESET, REMOVE, NAME, OPTION, RADIO, TEXT, GROUP } = cont;
  const [url, setUrl] = useState(undefined);
  const [headers, setHeaders] = useState([]);
  // const [group, setGroup] = useState([]);
  const [title, setTitle] = useState(undefined);

  // componentDidMount
  useEffect(() => {
    const { URL, HEADERS, TITLE } = props.configInfo.property || {};
    setUrl(URL);
    setHeaders(HEADERS || []);
    // setGroup(GROUP);
    setTitle(TITLE);
  }, []);

  useEffect(() => {
    debouncedHandleChangeViewCompData('URL', url);
  }, [url]);

  useEffect(() => {
    debouncedHandleChangeViewCompData('HEADERS', headers);
  }, [headers]);

  // useEffect(() => {
  //   debouncedHandleChangeViewCompData('GROUP', headers);
  // }, [group]);

  useEffect(() => {
    debouncedHandleChangeViewCompData('TITLE', headers);
  }, [title]);

  const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = props;

  const handleChangeViewCompData = (key, value) => {
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  const debouncedHandleChangeViewCompData = debounce(handleChangeViewCompData, 250);

  const headerHandler = type => {
    let temp = [...(headers || [])];
    switch (type) {
      // add header
      case ADD: {
        const tempHeader = { name: undefined, group: undefined, option: TEXT };
        temp.push(tempHeader);
        break;
      }

      // remove header
      case REMOVE: {
        temp = [..._.dropRight(temp, 1)];
        break;
      }
    }
    setHeaders(temp);
  };

  // header name
  const valueHandler = (type, value, idx) => {
    if (typeof value === 'string') {
      value = value.trim();
      const temp = [...(headers || [])];

      switch (type) {
        case NAME: {
          temp[idx].name = value;
          break;
        }
        case GROUP: {
          temp[idx].GROUP = value;
          break;
        }
        case OPTION: {
          temp[idx].option = value;
          break;
        }
      }
      setHeaders(temp);
    }
  };

  return [
    <div className="popoverItem popoverItemInput">
      <span className="spanLabel">URL</span>
      <Input value={url} onChange={e => setUrl(e.target.value)} placeHolder="대상 URL을 입력" />
    </div>,
    <div className="popoverItem popoverItemInput">
      <span className="spanLabel">헤더 사이즈</span>
      <span style={{ display: 'block', textAlign: 'center' }}>
        <Button
          type="primary"
          style={{ width: '33.3%' }}
          onClick={() => {
            headerHandler(ADD);
          }}
        >
          {ADD}
        </Button>
        <Button
          type="ghost"
          style={{ width: '33.3%' }}
          onClick={() => {
            setHeaders([]);
          }}
        >
          {RESET}
        </Button>
        <Button
          type="danger"
          style={{ width: '33.3%' }}
          onClick={() => {
            headerHandler(REMOVE);
          }}
        >
          {REMOVE}
        </Button>
      </span>
    </div>,
    <>
      {headers.length > 0 &&
        headers.map(({ name, option, group }, idx) => (
          <div className="popoverItem popoverItemInput">
            <span className="spanLabel">header{idx + 1}</span>
            <span>
              <Input
                style={{ width: '38%' }}
                value={group}
                onChange={e => valueHandler(GROUP, e.target.value, idx)}
                onKeyDown={e => (e.keyCode === 13 ? headerHandler(ADD) : null)}
              />
              <Input
                style={{ width: '38%' }}
                value={name}
                onChange={e => valueHandler(NAME, e.target.value, idx)}
                onKeyDown={e => (e.keyCode === 13 ? headerHandler(ADD) : null)}
              />
              <Radio.Group
                style={{ width: '24%', textAlign: 'center' }}
                value={option}
                onChange={e => {
                  const { value } = e.target;
                  valueHandler(OPTION, value, idx);
                }}
              >
                <Radio value={RADIO}>{RADIO}</Radio>
                <Radio value={TEXT}>{TEXT}</Radio>
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
    property: { URL: undefined, headers: [] },
  },
  COMP_FIELD: '',
};

export default CustomDataTableCompConfig;
// export default configer;
