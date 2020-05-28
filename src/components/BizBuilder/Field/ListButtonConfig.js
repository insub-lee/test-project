import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Checkbox } from 'antd';
// import { debounce } from 'lodash';
import request from 'utils/request';
import StyledInput from '../styled/Form/StyledInput';
import StyledSelect from '../styled/Form/StyledSelect';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
class ListButtonConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      builderList: [],
      metaList: [],
    };

    // this.handleChangeViewCompData = debounce(this.handleChangeViewCompData, 500);
  }

  componentDidMount() {
    this.getBuilderData();
  }

  getBuilderData = async () => {
    const builders = await request({
      method: 'GET',
      url: '/api/builder/v1/work/main',
    });
    return this.setBuilderData(builders);
  };

  setBuilderData = response => {
    this.setState({ builderList: response.response.list });
  };

  getMetaSeq = async (workSeq = this.props.configInfo.property.SELECTED_BUILDER, viewType = this.props.configInfo.property.VIEW_TYPE) => {
    const metaList = await request({
      method: 'GET',
      url: `/api/eshs/v1/common/eshsbuilderworkmeta?WORK_SEQ=${workSeq}&COMP_TAG=${viewType}`,
    });
    return this.setMetaSeq(metaList);
  };

  setMetaSeq = response => {
    this.setState({ metaList: response.response.list });
  };

  handleSelectedBuilderChange = (key, value) => {
    this.handleChangeViewCompData(key, value);
    return key.toUpperCase() === 'SELECTED_BUILDER' ? this.getMetaSeq(value) : this.getMetaSeq(undefined, value);
  };

  handleChangeViewCompData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const { handleChangeViewCompData, handleSelectedBuilderChange } = this;
    const { builderList, metaList } = this.state;
    const { configInfo } = this.props;
    return (
      <>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">버튼 이름 설정</span>
          <AntdInput
            defaultValue={configInfo.property.BTN_NAME || ''}
            placeholder="버튼에 들어갈 내용을 입력하세요."
            onChange={e => handleChangeViewCompData('BTN_NAME', e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">빌더 선택</span>
          <AntdSelect
            className="select-sm"
            defaultValue={configInfo.property.SELECTED_BUILDER || ''}
            onChange={value => handleSelectedBuilderChange('SELECTED_BUILDER', value)}
            style={{ width: '100%' }}
          >
            {builderList.map(builder => (
              <Select.Option value={builder.WORK_SEQ}>{builder.NAME_KOR}</Select.Option>
            ))}
          </AntdSelect>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">viewType 선택</span>
          <AntdSelect
            className="select-sm"
            defaultValue={configInfo.property.VIEW_TYPE || ''}
            onChange={value => handleSelectedBuilderChange('VIEW_TYPE', value)}
            style={{ width: '100%' }}
            disabled={!configInfo.property.SELECTED_BUILDER}
          >
            <Select.Option value="LIST">LIST</Select.Option>
            <Select.Option value="VIEW">VIEW</Select.Option>
            <Select.Option value="INPUT">INPUT</Select.Option>
            <Select.Option value="MODIFY">MODIFY</Select.Option>
          </AntdSelect>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">viewMetaSeq 선택</span>
          <AntdSelect
            className="select-sm"
            defaultValue={configInfo.property.VIEW_META_SEQ || ''}
            onChange={value => handleChangeViewCompData('VIEW_META_SEQ', value)}
            style={{ width: '100%' }}
            disabled={!configInfo.property.SELECTED_BUILDER}
          >
            {metaList.map(meta => (
              <Select.Option value={meta.META_SEQ}>{meta.NAME_KOR}</Select.Option>
            ))}
          </AntdSelect>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">빌더 버튼 삭제 여부</span>
          <Checkbox
            checked={configInfo.property.hasNoButtons}
            defaultValue={configInfo.property.hasNoButtons}
            onChange={e => handleChangeViewCompData('hasNoButtons', e.target.checked)}
          />
        </div>
      </>
    );
  }
}

ListButtonConfig.propTypes = {
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
  configInfo: PropTypes.object,
};

ListButtonConfig.defaultProps = {
  configInfo: { property: { hasButtons: true } },
};

export default ListButtonConfig;
