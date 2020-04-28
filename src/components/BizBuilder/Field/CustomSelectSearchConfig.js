import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Input, Select, Table, Checkbox } from 'antd';
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
        {
          title: '선택',
          dataIndex: 'selected',
          width: '10%',
          align: 'center',
          render: (text, record) => (
            <Checkbox defaultChecked={eval(text)} onChange={e => debounceChangeViewCompData(record.COMP_FIELD, e.target.checked, 'selected')} />
          ),
        },
        {
          title: 'COMP FIELD',
          dataIndex: 'COMP_FIELD',
          align: 'center',

          width: '35%',
        },
        {
          title: 'FIELD TYPE',
          dataIndex: 'FIELD_TYPE',
          align: 'center',

          width: '20%',
        },
        {
          title: 'COMP_NAME',
          dataIndex: 'NAME_KOR',
          width: '35%',
          render: (text, record) => (
            <Input
              defaultValue={text || ''}
              name="targetIndex"
              onChange={e => debounceChangeViewCompData(record.COMP_FIELD, e.target.value, 'NAME_KOR')}
              placeholder="Select Option Name"
            />
          ),
        },
      ],
    };
    const debounceChangeViewCompData = debounce(this.handleChangeViewCompData, 500);
  }

  componentDidMount() {
    const { submitHandlerBySaga } = this.props;
    const tempData = (this.props && this.props.configInfo && this.props.configInfo.property && this.props.configInfo.property.compData) || [];
    const workSeq = (this.props && this.props.comp && this.props.comp.WORK_SEQ) || 0;

    const apiUrl = `/api/eshs/v1/common/eshsBuilderCustomSearch/${workSeq}`;
    if (0 in tempData) {
      // CONFIG - 컴포넌트 설정의 SAVE를 눌렀을때 저장되는 곳
      return this.handleChangeViewCompData('compData', tempData);
    }
    // init
    return submitHandlerBySaga('GET', apiUrl, {}, this.configStart);
  }

  configStart = response => {
    const { compData } = this.props;
    const joinList = (response && response.list && response.list.filter(r => r.OPT_SEQ === 5)) || [];
    if (0 in joinList) {
      const joinData = JSON.parse(joinList[0].OPT_VALUE);

      joinData.forEach(j => {
        const data = { FIELD_TYPE: j.JOIN_TYPE };
        j.COLUMN_INFO.forEach(c => {
          compData.push({ ...data, COMP_FIELD: c.ID, NAME_KOR: c.ALIAS });
        });
      });
    }

    this.handleChangeViewCompData(
      'compData',
      compData.filter(c => c.FIELD_TYPE),
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
  };

  render() {
    const {
      configInfo,
      configInfo: {
        property: { compData },
      },
    } = this.props;
    const { columns } = this.state;
    return (
      <>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">Select Option Set</span>
          <div className="popoverInnerCom">
            <AntdLineTable
              key="CustomSelectSearchTable"
              columns={columns}
              rowKey="COMP_FIELD"
              dataSource={compData || []}
              scroll={{ y: 132 }}
              pagination={false}
            />
          </div>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">검색 조건</span>
          <Select
            style={{ width: '100%' }}
            placeholder="Select component"
            defaultValue={(configInfo && configInfo.property && configInfo.property.searchCondition) || ''}
            onChange={value => this.handleChangeViewCompData('searchCondition', value)}
          >
            <Option value="=">=</Option>
            <Option value="LIKE">Like</Option>
          </Select>
        </div>
      </>
    );
  }
}

const CustomSelectSearchConfig = ({ changeViewCompData, groupIndex, rowIndex, colIndex, configInfo, compData }) => (
  <BizMicroDevBase
    sagaKey="CustomSelectSearchConfig"
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

CustomSelectSearchConfig.propTypes = {
  configInfo: PropTypes.any,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
  compData: PropTypes.array,
};

export default connect(() => createStructuredSelector({ compData: selectors.makeSelectCompData() }))(ComponentConfig);
