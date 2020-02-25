import React from 'react';
import * as PropTypes from 'prop-types';
import { Input, Popover, Checkbox, InputNumber, Popconfirm, Select } from 'antd';
import { debounce } from 'lodash';

import Styled from './Styled';
import { ConfigInfo } from './ConfigInfo';

const { Option } = Select;

class CompItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeHeaderName = debounce(this.handleChangeHeaderName, 500);
  }

  handleChangeHeaderName = value => {
    const {
      col: {
        comp: { CONFIG },
      },
      groupIndex,
      rowIndex,
      colIndex,
      action: { changeViewCompData },
    } = this.props;
    const nextConfig = JSON.parse(JSON.stringify(CONFIG));
    nextConfig.property.HEADER_NAME_KOR = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', nextConfig);
  };

  render() {
    const {
      col,
      groupIndex,
      rowIndex,
      colIndex,
      action: { changeCompData, removeColComp, changeViewCompData },
      groupType,
      // compPoolList,
      viewType,
      // compList,
      setCompConfigModal,
    } = this.props;
    if (col && col.comp && col.comp.CONFIG && col.comp.CONFIG.property.COMP_SRC) {
      const configProps = {
        comp: col.comp,
        changeCompData,
        groupIndex,
        rowIndex,
        colIndex,
        configInfo: col.comp.CONFIG,
        // compPoolList,
        changeViewCompData,
        col,
        viewType,
        groupType,
        // compList,
      };
      if (groupType !== 'listGroup') {
        const colClassName = 'compConfigCol compConfigDiv wid100-28';
        return (
          <Styled className="compConfig compConfigDiv">
            <div className="compConfigRow compConfigDiv">
              <div className={colClassName}>
                <i className="iconField iconFieldCheck" />
                <p
                  className="componentTit"
                  role="button"
                  onClick={() => setCompConfigModal(true, col.comp.CONFIG.property.COMP_SETTING_SRC, configProps, 'COMP')}
                >
                  {col.comp.COMP_TYPE !== 'LABEL' ? col.comp.COMP_FIELD : col.comp.NAME_KOR}
                </p>
              </div>
              <div className="compConfigCol compConfigDiv buttonWrapper">
                <span
                  className="toolbar-item iconSetting"
                  role="button"
                  onKeyPress={() => false}
                  tabIndex="0"
                  onClick={() => setCompConfigModal(true, col.comp.CONFIG.property.COMP_SETTING_SRC, configProps, 'COMP')}
                />
                <Popconfirm
                  title="Are you sure delete this Component?"
                  onConfirm={() => removeColComp(groupIndex, rowIndex, colIndex)}
                  okText="Yes"
                  cancelText="No"
                >
                  <span className="toolbar-item iconTrash" role="button" onKeyPress={() => false} tabIndex="0" />
                </Popconfirm>
              </div>
            </div>
            <div className="compTitleWrapper">
              <p>{col.comp.CONFIG.property.COMP_NAME}</p>
            </div>
          </Styled>
        );
      }
      return (
        <Styled className="compConfig compConfigDiv">
          <div className="compConfigRow compConfigDiv">
            <div className="compConfigCol compConfigDiv wid100">{col.comp.COMP_FIELD || 'no id'}</div>
          </div>
          <div className="compConfigRow compConfigDiv">
            <div className="compConfigCol compConfigDiv wid100-28">
              <Input
                placeholder="Header Name(KO)"
                defaultValue={col.comp.CONFIG.property.HEADER_NAME_KOR || ''}
                onChange={e => this.handleChangeHeaderName(e.target.value)}
              />
            </div>
            <div className="compConfigCol compConfigDiv buttonWrapper">
              <span
                className="toolbar-item iconSetting"
                role="button"
                onKeyPress={() => false}
                tabIndex="0"
                onClick={() => setCompConfigModal(true, col.comp.CONFIG.property.COMP_SETTING_SRC, configProps, 'COMP')}
              />
              <Popconfirm
                title="Are you sure delete this Component?"
                onConfirm={() => removeColComp(groupIndex, rowIndex, colIndex)}
                okText="Yes"
                cancelText="No"
              >
                <span className="toolbar-item iconTrash" role="button" onKeyPress={() => false} tabIndex="0" />
              </Popconfirm>
            </div>
          </div>
        </Styled>
      );
    }
    return <div>Component add</div>;
  }
}

CompItem.propTypes = {
  col: PropTypes.any,
  groupIndex: PropTypes.any,
  rowIndex: PropTypes.any,
  colIndex: PropTypes.any,
  action: PropTypes.any,
  viewType: PropTypes.any,
  groupType: PropTypes.any,
  compPoolList: PropTypes.any,
};

export default CompItem;
