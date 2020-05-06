import React, { Component } from 'react';
import { Input, Radio, Select } from 'antd';
import { debounce } from 'lodash';

const { Option } = Select;
class ComponentConfig extends Component {
  constructor(props) {
    super(props);
    this.handleChangeConfigData = debounce(this.handleChangeConfigData, 500);
  }

  handleChangeConfigData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const { configInfo } = this.props;
    return [
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">컬럼명</span>
        <Input
          defaultValue={(configInfo && configInfo.property && configInfo.property.viewDataKey) || ''}
          onChange={e => this.handleChangeConfigData('viewDataKey', e.target.value)}
        ></Input>
      </div>,
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
        <span className="spanLabel">Bold체 조건</span>
        <Input
          style={{ width: '50%' }}
          placeholder="Bold체 여부를 결정할 컬럼명을 입력해주세요."
          defaultValue={(configInfo && configInfo.property && configInfo.property.boldCondition) || ''}
          onChange={e => this.handleChangeConfigData('boldCondition', e.target.value)}
        />
        <Input
          style={{ width: '50%' }}
          placeholder="Bold체 여부를 결정할 값을 입력해주세요."
          defaultValue={(configInfo && configInfo.property && configInfo.property.boldTarget) || ''}
          onChange={e => this.handleChangeConfigData('boldTarget', e.target.value)}
        />
      </div>,
      /*
          목적 : JoinRead 컴포넌트 클릭시 titleComp 기능 추가
          변경전 : JoinReadComp 읽기 전용
          변경후 : CONFIG를 통해 titleComp 기능 사용가능
          create by. HyoSeong
      */
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
    ];
  }
}

export default ComponentConfig;
