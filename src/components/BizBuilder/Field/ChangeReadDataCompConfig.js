import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Input, Select, Button, message, Radio } from 'antd';
import { debounce } from 'lodash';

const { Option } = Select;
class ComponentConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeList: [],
      originValue: '',
      changeValue: '',
      selectedId: 0,
      id: 0,
    };
    this.handleChangeConfigData = debounce(this.handleChangeConfigData, 500);
  }

  componentDidMount() {
    const { configInfo } = this.props;
    const changeList = configInfo.property.changeList || [];
    const tempId = changeList.reduce((prev, curr) => (prev.id < curr.id ? curr : prev));
    this.setState({ changeList, id: tempId.id });
  }

  handleChangeConfigData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  insertColumn = () => {
    const {
      configInfo: { property },
    } = this.props;
    const { changeList, originValue, changeValue, selectedId, id } = this.state;
    const overlab = property && property.columns && property.columns.findIndex(item => item.id === selectedId);
    if ((overlab === -1 || overlab === undefined) && originValue && changeValue) {
      const plusId = id + 1;
      const temp = changeList.concat({ id: plusId, originValue, changeValue });
      this.setState({ changeList: temp, id: plusId }, () => this.handleChangeConfigData('changeList', temp));
      this.onReset();
      message.info('등록되었습니다.');
    } else if (originValue && changeValue) {
      message.warning('중복된 값입니다.');
    } else if (originValue) {
      message.warning('Origin 값를 입력해주세요.');
    } else {
      message.warning('Change 값을 입력해주세요.');
    }
  };

  updateColumn = () => {
    const {
      configInfo: { property },
    } = this.props;
    const { changeList, originValue, changeValue, selectedId } = this.state;
    const updateIndex = property && property.columns && property.columns.findIndex(item => item.id === selectedId);
    if (updateIndex !== -1 && originValue && changeValue) {
      changeList.splice(updateIndex, 1, {
        id: selectedId,
        originValue,
        changeValue,
      });
      this.setState({ changeList });
      this.handleChangeConfigData('changeList', changeList);
      this.onReset();
      message.info('수정되었습니다.');
    } else if (originValue && changeValue) {
      message.warning('존재하지 않은 값입니다.');
    } else if (originValue) {
      message.warning('Origin 값를 입력해주세요.');
    } else {
      message.warning('Change 값을 입력해주세요.');
    }
  };

  selectedColumn = value => {
    const { changeList } = this.state;
    const temp = changeList.find(item => item.id === value) || { originValue: '', changeValue: '' };
    this.setState({ selectedId: value, originValue: temp.originValue, changeValue: temp.changeValue });
  };

  deleteColumn = () => {
    const { changeList, selectedId } = this.state;
    const temp = changeList.filter(item => item.id !== selectedId);
    this.setState({ changeList: temp }, () => this.handleChangeConfigData('changeList', temp));
    this.onReset();
  };

  onReset = () => {
    this.setState({ selectedId: 0, originValue: '', changeValue: '' });
  };

  render() {
    const { selectedId } = this.state;
    const { configInfo } = this.props;
    return [
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">컬럼명</span>
        <Input
          defaultValue={(configInfo && configInfo.property && configInfo.property.viewDataKey) || ''}
          onChange={e => this.handleChangeConfigData('viewDataKey', e.target.value)}
        ></Input>
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
        <span className="spanLabel">변환 설정</span>
        <Input
          style={{ width: '48.6%' }}
          value={this.state.originValue}
          name="originValue"
          onChange={e => this.setState({ originValue: e.target.value })}
          placeholder="원본데이터을 입력해주세요."
        />
        {' -> '}
        <Input
          style={{ width: '48.6%' }}
          value={this.state.changeValue}
          name="changeValue"
          onChange={e => this.setState({ changeValue: e.target.value })}
          placeholder="변경데이터을 입력해주세요."
        />
        <div className="popoverItem popoverItemInput" style={{ textAlign: 'right' }}>
          {selectedId || selectedId !== 0 ? <Button onClick={this.updateColumn}>수정</Button> : <Button onClick={this.insertColumn}>추가</Button>}
          <Button onClick={this.deleteColumn}>삭제</Button>
        </div>
      </div>,
      configInfo && configInfo.property && configInfo.property.changeList ? (
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">변환 설정 리스트</span>
          <Select style={{ width: '100%' }} defaultValue={0} onChange={value => this.selectedColumn(value)}>
            <Option value={0}>등록</Option>
            {configInfo &&
              configInfo.property &&
              configInfo.property.changeList &&
              configInfo.property.changeList.map(item => (
                <Option value={item.id}>
                  {item.originValue} -&gt; {item.changeValue}
                </Option>
              ))}
          </Select>
        </div>
      ) : (
        ''
      ),
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

ComponentConfig.propTypes = {
  configInfo: PropTypes.object,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

export default ComponentConfig;
