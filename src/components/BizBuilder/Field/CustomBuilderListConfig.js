import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { InputNumber, Input, Select } from 'antd';
import { debounce } from 'lodash';

import BizMicroDevBase from 'components/BizMicroDevBase';

const { Option } = Select;
class ComponentConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workList: [],
      listMeta: [],
      selectListMeta: [],
    };
    this.handleChangeViewCompData = debounce(this.handleChangeViewCompData, 500);
  }

  componentDidMount() {
    const { getCallDataHandler, sagaKey: id } = this.props;
    const apiArray = [
      { key: 'workList', url: '/api/builder/v1/work/main', type: 'GET' },
      { key: 'listMeta', url: '/api/eshs/v1/common/getListMeta', type: 'GET' },
    ];
    getCallDataHandler(id, apiArray, this.configStart);
  }

  configStart = sagaKey => {
    const { result } = this.props;
    const workList = (result && result.workList && result.workList.list) || [];
    const listMeta = (result && result.listMeta && result.listMeta.list) || [];
    this.setState({ workList, listMeta });
  };

  handleChangeViewCompData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property[key] = value;
    if (key === 'listWorkSeq') {
      configInfo.property.listMetaSeq = '';
      const { listMeta } = this.state;
      this.setState({ selectWork: value, selectListMeta: listMeta.filter(l => String(l.WORK_SEQ) === String(value)) });
    }
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const { configInfo } = this.props;
    const { workList, selectListMeta } = this.state;
    return (
      <>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">SagaKey 설정</span>
          <Input
            style={{ width: '100%' }}
            defaultValue={(configInfo && configInfo.property && configInfo.property.listSagaKey) || ''}
            min={0}
            onChange={e => this.handleChangeViewCompData('listSagaKey', e.target.value)}
          />
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">WorkBuilder 설정</span>
          <Select
            style={{ width: '100%' }}
            placeholder="분류체계를 설정해주세요"
            defaultValue={(configInfo && configInfo.property && configInfo.property.listWorkSeq) || ''}
            onChange={value => this.handleChangeViewCompData('listWorkSeq', value)}
          >
            {workList.map(item => (
              <Option key={item.WORK_SEQ} value={item.WORK_SEQ}>
                {item.NAME_KOR}
              </Option>
            ))}
          </Select>
        </div>
        {/* <div className="popoverItem popoverItemInput">
          <span className="spanLabel">WORK_SEQ 설정</span>
          <InputNumber
            style={{ width: '100%' }}
            defaultValue={(configInfo && configInfo.property && configInfo.property.listWorkSeq) || ''}
            min={0}
            onChange={value => this.handleChangeViewCompData('listWorkSeq', value)}
          />
        </div> */}
        {/* <div className="popoverItem popoverItemInput">
          <span className="spanLabel">ListMetaSeq 설정</span>
          <InputNumber
            style={{ width: '100%' }}
            defaultValue={(configInfo && configInfo.property && configInfo.property.listMetaSeq) || ''}
            min={0}
            onChange={value => this.handleChangeViewCompData('listMetaSeq', value)}
          />
        </div> */}
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">List 설정</span>
          <Select
            style={{ width: '100%' }}
            placeholder="선택없을시 기본 List화면"
            value={(configInfo && configInfo.property && configInfo.property.listMetaSeq) || ''}
            onChange={value => this.handleChangeViewCompData('listMetaSeq', value)}
          >
            {selectListMeta.map(item => (
              <Option key={item.META_SEQ} value={item.META_SEQ}>
                {item.NAME_KOR}
              </Option>
            ))}
          </Select>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">rowKey설정</span>
          <Input
            style={{ width: '100%' }}
            defaultValue={(configInfo && configInfo.property && configInfo.property.dataKey) || ''}
            min={0}
            onChange={e => this.handleChangeViewCompData('dataKey', e.target.value)}
          />
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">등록버튼</span>
          <Select
            defaultValue={(configInfo && configInfo.property && configInfo.property.inputBtn) || 'N'}
            style={{ width: '100%' }}
            onChange={value => this.handleChangeViewCompData('inputBtn', value)}
          >
            <Option value="N">미사용</Option>
            <Option value="Y">사용</Option>
          </Select>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">선택한 ROW FormData값 설정</span>
          <Select
            defaultValue={(configInfo && configInfo.property && configInfo.property.isFormData) || 'N'}
            style={{ width: '100%' }}
            onChange={value => this.handleChangeViewCompData('isFormData', value)}
          >
            <Option value="N">미사용</Option>
            <Option value="Y">사용</Option>
          </Select>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">Modal Width</span>
          <Input
            style={{ width: '100%' }}
            defaultValue={(configInfo && configInfo.property && configInfo.property.modalWidth) || ''}
            min={0}
            onChange={e => this.handleChangeViewCompData('modalWidth', e.target.value)}
          />
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">Modal Height</span>
          <Input
            style={{ width: '100%' }}
            defaultValue={(configInfo && configInfo.property && configInfo.property.modalHeight) || ''}
            min={0}
            onChange={e => this.handleChangeViewCompData('modalHeight', e.target.value)}
          />
        </div>
      </>
    );
  }
}

const CustomBuilderListConfig = ({ changeViewCompData, groupIndex, rowIndex, colIndex, configInfo }) => (
  <BizMicroDevBase
    sagaKey="CustomBuilderListConfig"
    changeViewCompData={changeViewCompData}
    groupIndex={groupIndex}
    rowIndex={rowIndex}
    colIndex={colIndex}
    configInfo={configInfo}
    component={ComponentConfig}
  ></BizMicroDevBase>
);

ComponentConfig.propTypes = {
  configInfo: PropTypes.any,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
  getCallDataHandler: PropTypes.func,
};

ComponentConfig.defaultProps = {
  getCallDataHandler: () => {},
};

CustomBuilderListConfig.propTypes = {
  configInfo: PropTypes.any,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

export default CustomBuilderListConfig;
