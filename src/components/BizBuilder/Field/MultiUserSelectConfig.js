import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

class MultiUserSelectConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChangeViewCompData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    if (key === 'isSubComp') {
      configInfo.property.expression = null;
    }
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const { handleChangeViewCompData } = this;
    const { configInfo } = this.props;
    return (
      <>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">
            선택화면 바로 노출 여부
            <br />
            (서브빌더 사용시 체크)
          </span>
          <Checkbox checked={configInfo.property.isSubComp} onChange={e => handleChangeViewCompData('isSubComp', e.target.checked)} />
        </div>
      </>
    );
  }
}

MultiUserSelectConfig.propTypes = {
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
  configInfo: PropTypes.object,
};

export default MultiUserSelectConfig;
