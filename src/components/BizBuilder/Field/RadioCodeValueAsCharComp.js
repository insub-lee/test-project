import React, { Component } from 'react';
import { Radio } from 'antd';

class RadioCodeValueAsCharComp extends Component {
  state = {
    dataSource: [],
  };

  componentDidMount() {
    const {
      getExtraApiData,
      sagaKey: id,
      COMP_FIELD,
      CONFIG: {
        property: { mapId },
      },
    } = this.props;
    const apiArys = [{ key: `${COMP_FIELD}`, url: `/api/admin/v1/common/categoryMapList?MAP_ID=${mapId}`, type: 'GET' }];
    getExtraApiData(id, apiArys, this.initDataBind);
  }

  initDataBind = sagaKey => {
    const { COMP_FIELD, extraApiData } = this.props;
    const { categoryMapList: dataList } = extraApiData[COMP_FIELD];
    const dataSource = dataList.filter(f => f.USE_YN === 'Y' && f.LVL > 0);
    this.setState({ dataSource });
  };

  onChangeRadio = e => {
    const { sagaKey, COMP_FIELD, changeFormData } = this.props;
    changeFormData(sagaKey, COMP_FIELD, e.target.value);
  };

  render() {
    console.debug(this.props, this.state);
    const { colData } = this.props;
    const { dataSource } = this.state;
    return (
      <Radio.Group onChange={this.onChangeRadio} value={colData}>
        {dataSource && dataSource.map(rdo => <Radio value={rdo.CODE}>{rdo.NAME_KOR}</Radio>)}
      </Radio.Group>
    );
  }
}

export default RadioCodeValueAsCharComp;
