import React, { Component } from 'react';
import { Radio } from 'antd';

class RadioCodeValueAsCharComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    const {
      // getExtraApiData,
      sagaKey: id,
      COMP_FIELD,
      CONFIG: {
        property: { mapId },
      },
      submitExtraHandler,
    } = this.props;
    // const apiArys = [{ key: `${COMP_FIELD}`, url: `/api/admin/v1/common/categoryMapList?MAP_ID=${mapId}`, type: 'GET' }];
    const url = `/api/admin/v1/common/categoryMapList?MAP_ID=${mapId}`;
    // getExtraApiData(id, apiArys, this.initDataBind);
    submitExtraHandler(id, 'GET', url, {}, this.initData);
  }

  initDataBind = sagaKey => {
    const { COMP_FIELD, extraApiData } = this.props;
    const { categoryMapList: dataList } = extraApiData[COMP_FIELD];
    const dataSource = dataList.filter(f => f.USE_YN === 'Y' && f.LVL > 0);
    this.setState({ dataSource });
  };

  initData = (id, response) => {
    const { categoryMapList } = response;
    if (categoryMapList && categoryMapList.length > 0) {
      const dataSource = categoryMapList.filter(f => f.USE_YN === 'Y' && f.LVL > 0);
      this.setState({ dataSource });
    }
  };

  onChangeRadio = e => {
    const { sagaKey, COMP_FIELD, changeFormData } = this.props;
    changeFormData(sagaKey, COMP_FIELD, e.target.value);
  };

  render() {
    const { colData, readOnly, CONFIG } = this.props;
    const { dataSource } = this.state;
    return (
      <Radio.Group onChange={this.onChangeRadio} value={colData} disabled={readOnly || CONFIG.property.readOnly}>
        {dataSource &&
          dataSource.map(rdo => (
            <Radio key={`RadioCodeValueAsCharComp-rdo.CODE-${rdo.CODE}`} value={rdo.CODE}>
              {rdo.NAME_KOR}
            </Radio>
          ))}
      </Radio.Group>
    );
  }
}

export default RadioCodeValueAsCharComp;
