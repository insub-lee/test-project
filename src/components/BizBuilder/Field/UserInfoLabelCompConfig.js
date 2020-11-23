import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Radio, Select, Checkbox } from 'antd';
import { debounce } from 'lodash';

const { Option } = Select;
class UserInfoLabelCompConfig extends Component {
  constructor(props) {
    super(props);
    this.handleChangeConfigData = debounce(this.handleChangeConfigData, 500);
  }

  // Config 설정 변경
  handleChangeConfigData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  // 페이지 렌더
  render() {
    const { configInfo } = this.props;
    const { useEmpNo, usePosition, useDept } = configInfo.property;
    return [
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">툴팁 사용 여부</span>
        <Radio.Group
          className="alignCenter"
          value={(configInfo && configInfo.property && configInfo.property.usingToolTip) || 'N'}
          onChange={e => {
            const { value } = e.target;
            this.handleChangeConfigData('usingToolTip', value);
          }}
        >
          <Radio value="Y">Y</Radio>
          <Radio value="N">N</Radio>
        </Radio.Group>
      </div>,
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">제목 기능 사용 여부</span>
        <Radio.Group
          className="alignCenter"
          value={(configInfo && configInfo.property && configInfo.property.titleUse) || 'N'}
          onChange={e => {
            const { value } = e.target;
            this.handleChangeConfigData('titleUse', value);
          }}
        >
          <Radio value="Y">Y</Radio>
          <Radio value="N">N</Radio>
        </Radio.Group>
      </div>,
      configInfo && configInfo.property && configInfo.property.titleUse === 'Y' ? (
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">모달 페이지 설정</span>
          <Select
            style={{ width: '100%' }}
            defaultValue={(configInfo && configInfo.property && configInfo.property.changeViewType) || 'VIEW'}
            onChange={value => this.handleChangeConfigData('changeViewType', value)}
          >
            <Option value="VIEW" disable>
              View Page
            </Option>
            <Option value="MODIFY">Modify Page</Option>
          </Select>
        </div>
      ) : (
        ''
      ),
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">노출할 유저정보</span>
        <div>
          <Checkbox onChange={e => this.handleChangeConfigData('useEmpNo', e.target.checked)} checked={useEmpNo || false}>
            사번
          </Checkbox>
          <Checkbox onChange={e => this.handleChangeConfigData('usePosition', e.target.checked)} checked={usePosition || false}>
            직책
          </Checkbox>
          <Checkbox onChange={e => this.handleChangeConfigData('useDept', e.target.checked)} checked={useDept || false}>
            부서명
          </Checkbox>
        </div>
      </div>,
    ];
  }
}

UserInfoLabelCompConfig.propTypes = {
  configInfo: PropTypes.object,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

export default UserInfoLabelCompConfig;
