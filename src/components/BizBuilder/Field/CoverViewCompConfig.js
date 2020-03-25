import React, { Component } from 'react';

import { Select } from 'antd';

const { Option } = Select;
class CoverViewCompConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewList: [],
      optList: [],
      selectedValue: undefined,
    };
  }

  initData = response => {
    const {
      configInfo: { property },
    } = this.props;
    const { selectedValue } = property;
    const { list } = response;
    const viewList = list.filter(f => f.COMP_TYPE === 'VIEW' && f.COMP_TAG === 'VIEW');
    const optList = viewList.map(item => <Option value={item.META_SEQ}>{item.NAME_KOR}</Option>);
    this.setState({ viewList, optList, selectedValue });
  };

  componentDidMount() {
    const {
      submitHandlerBySaga,
      comp: { WORK_SEQ },
    } = this.props;
    const apiUrl = `/api/builder/v1/work/meta?workSeq=${WORK_SEQ}`;
    submitHandlerBySaga('GET', apiUrl, {}, this.initData);
  }

  onChangeView = value => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property.selectedValue = value;
    this.setState({ selectedValue: value });
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const { optList, selectedValue } = this.state;
    return (
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">조회화면 선택</span>
        <Select placeholder="이동화면 선택" style={{ width: '300px' }} onChange={this.onChangeView} value={selectedValue}>
          {optList}
        </Select>
      </div>
    );
  }
}

export default CoverViewCompConfig;
