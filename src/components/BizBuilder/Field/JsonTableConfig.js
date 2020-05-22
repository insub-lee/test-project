import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import StyledInput from '../styled/Form/StyledInput';

const AntdInput = StyledInput(Input);
class JsonTableConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">컬럼과 헤더는 순서를 맞춰 입력하세요.(&apos;,&apos;로 구분, 헤더 미입력시 컬럼명과 동일하게 등록)</span>
          <br />
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">컬럼</span>
          <AntdInput
            defaultValue={configInfo.property.colName}
            onChange={e => this.handleChangeViewCompData('colName', e.target.value)}
            placeholder="컬럼명을 입력하세요."
          />
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">헤더</span>
          <AntdInput
            defaultValue={configInfo.property.header}
            onChange={e => this.handleChangeViewCompData('header', e.target.value)}
            placeholder="테이블헤더를 입력하세요."
          />
        </div>
      </>
    );
  }
}

JsonTableConfig.propTypes = {
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
  configInfo: PropTypes.object,
};

JsonTableConfig.defaultProps = {
  changeViewCompData: null,
  groupIndex: -1,
  rowIndex: -1,
  colIndex: -1,
  configInfo: null,
};

export default JsonTableConfig;
