import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Select, Input, Radio } from 'antd';
import { debounce } from 'lodash';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as selectors from 'apps/mdcs/admin/ViewDesigner/selectors';

const { Option } = Select;

class LabelByNodeIdConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChangeViewCompData = debounce(this.handleChangeViewCompData, 500);
  }

  handleChangeViewCompData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;

    configInfo.property[key] = value;

    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const { configInfo } = this.props;

    return (
      <>
        {/* <div className="popoverItem popoverItemInput">
          <span className="spanLabel">필드 입력</span>
          <Input
            defaultValue={(configInfo && configInfo.property && configInfo.property.targetField) || ''}
            onChange={e => this.handleChangeViewCompData('targetField', e.target.value)}
          ></Input>
        </div> */}
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">보여주는 값</span>
          <Radio.Group
            value={(configInfo && configInfo.property && configInfo.property.viewColumn) || 'NAME_KOR'}
            onChange={e => {
              const { value } = e.target;
              this.handleChangeViewCompData('viewColumn', value);
            }}
          >
            <Radio value="NAME_KOR">NAME_KOR</Radio>
            <Radio value="FULLPATH_NM">FullPath</Radio>
            <Radio value="CODE">Code</Radio>
          </Radio.Group>
        </div>
      </>
    );
  }
}

LabelByNodeIdConfig.propTypes = {
  configInfo: PropTypes.any,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

export default LabelByNodeIdConfig;
