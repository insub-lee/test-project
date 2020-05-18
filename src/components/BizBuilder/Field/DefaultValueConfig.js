import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Input, Select, Table, Checkbox, Button } from 'antd';
import { debounce } from 'lodash';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

import BizMicroDevBase from 'components/BizMicroDevBase';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as selectors from 'apps/mdcs/admin/ViewDesigner/selectors';

const AntdLineTable = StyledAntdTable(Table);
const { Option } = Select;

class ComponentConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        // {
        //   title: '선택',
        //   dataIndex: 'selected',
        //   width: '8%',
        //   align: 'center',
        //   render: (text, record) => (
        //     <Checkbox defaultChecked={eval(text)} onChange={e => debounceChangeViewCompData(record.COMP_FIELD, e.target.checked, 'selected')} />
        //   ),
        // },
        {
          title: 'COMP FIELD',
          dataIndex: 'COMP_FIELD',
          align: 'center',
          width: '25%',
        },
        {
          title: 'Name',
          dataIndex: 'NAME_KOR',
          align: 'center',
          width: '25%',
        },
        {
          title: 'Type',
          align: 'center',
          width: '25%',
          render: (text, record) => <span>{(record.CONFIG && record.CONFIG.info && record.CONFIG.info.type) || ''}</span>,
        },
        {
          title: 'DefaultValue',
          dataIndex: 'DEFAULT_VALUE',
          width: '25%',
          render: (text, record) => (
            <Input
              defaultValue={text || ''}
              name="targetIndex"
              onChange={e => debounceChangeViewCompData(record.COMP_FIELD, e.target.value, 'DEFAULT_VALUE')}
              placeholder="초기값 입력"
            />
          ),
        },
      ],
      compDataTable: [],
    };
    const debounceChangeViewCompData = debounce(this.handleChangeViewCompData, 500);
  }

  componentDidMount() {
    const tempData = (this.props && this.props.configInfo && this.props.configInfo.property && this.props.configInfo.property.compData) || [];

    if (0 in tempData) {
      // CONFIG - 컴포넌트 설정의 SAVE를 눌렀을때 저장되는 곳
      return this.handleChangeViewCompData('compData', tempData);
    }
    // init
    return this.configStart();
  }

  configStart = () => {
    const { compData } = this.props;
    this.handleChangeViewCompData(
      'compData',
      compData.filter(c => c.COMP_TYPE === 'FIELD'),
    );
  };

  handleChangeViewCompData = (key, value, name) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    const compData = (this.props && this.props.configInfo && this.props.configInfo.property && this.props.configInfo.property.compData) || [];
    if (typeof name === 'string') {
      configInfo.property.compData = compData.map(c => (c.COMP_FIELD === key ? { ...c, [name]: value } : c));
    } else {
      configInfo.property[key] = value;
    }
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
    if (key === 'compData') this.setCompDataTable(value);
  };

  setCompDataTable = compData => {
    const { columns } = this.state;
    this.setState({
      compDataTable: [
        <AntdLineTable key="compDataTable" columns={columns} rowKey="COMP_FIELD" dataSource={compData || []} scroll={{ y: 132 }} pagination={false} />,
      ],
    });
  };

  render() {
    const {
      configInfo: {
        property: { compData },
      },
    } = this.props;
    const { compDataTable } = this.state;
    return (
      <>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">
            초기값 설정
            <br />
            <Button onClick={() => this.setState({ compDataTable: [] }, this.configStart)}>[리스트 reload 설정값 초기화됨]</Button>
          </span>
          <div className="popoverInnerCom">{compDataTable}</div>
        </div>
      </>
    );
  }
}

const DefaultValueConfig = ({ changeViewCompData, groupIndex, rowIndex, colIndex, configInfo, compData }) => (
  <BizMicroDevBase
    sagaKey="DefaultValueConfig"
    changeViewCompData={changeViewCompData}
    groupIndex={groupIndex}
    rowIndex={rowIndex}
    colIndex={colIndex}
    configInfo={configInfo}
    compData={compData}
    component={ComponentConfig}
  ></BizMicroDevBase>
);

ComponentConfig.propTypes = {
  configInfo: PropTypes.any,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
  submitHandlerBySaga: PropTypes.func,
  compData: PropTypes.array,
  comp: PropTypes.object,
};

ComponentConfig.defaultProps = {
  compData: [],
};

DefaultValueConfig.propTypes = {
  configInfo: PropTypes.any,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
  compData: PropTypes.array,
};

export default connect(() => createStructuredSelector({ compData: selectors.makeSelectCompData() }))(ComponentConfig);
