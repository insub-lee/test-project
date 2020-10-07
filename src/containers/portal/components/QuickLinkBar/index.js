import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import Styled from './Styled';
import * as site from './site';

const AntdSelect = StyledSelect(Select);

/*
    ESHS - Home - 관련 사이트 링크바
*/

const quickLinkSelect = value => {
  const urlYn = value.length > 1;
  if (urlYn) {
    return window.open(value, '_blank');
  }
  return false;
};

const QuickLinkBar = props => (
  <Styled marginLeft={props.menuFixedYn === 'Y'}>
    <div className="eshs-quicklink">
      <span className="eshs-quicklink-title">정부기관 및 관공서 관련사이트</span>
      <AntdSelect
        placeholder="환경 - Enviroment Site"
        className="select-xs ant-select-inline"
        style={{ width: '25%', marginRight: '10px' }}
        onChange={value => quickLinkSelect(value)}
      >
        {site.EnvSite.map(item => {
          const { value, childSite } = item;
          return (
            <AntdSelect.OptGroup label={value}>
              {childSite.map(child => (
                <AntdSelect.Option key={child.value} value={child.url}>
                  {`${child.value}`}
                </AntdSelect.Option>
              ))}
            </AntdSelect.OptGroup>
          );
        })}
      </AntdSelect>
      <AntdSelect
        placeholder="안전 - Safety Site"
        className="select-xs ant-select-inline"
        style={{ width: '25%', marginRight: '10px' }}
        onChange={value => quickLinkSelect(value)}
      >
        {site.SafetySite.map(item => {
          const { value, childSite } = item;
          return (
            <AntdSelect.OptGroup label={value}>
              {childSite.map(child => (
                <AntdSelect.Option key={child.value} value={child.url}>
                  {`${child.value}`}
                </AntdSelect.Option>
              ))}
            </AntdSelect.OptGroup>
          );
        })}
      </AntdSelect>
      <AntdSelect
        placeholder="보건 - Health Site"
        className="select-xs ant-select-inline"
        style={{ width: '25%', marginRight: '10px' }}
        onChange={value => quickLinkSelect(value)}
      >
        {site.healthSite.map(item => {
          const { value, childSite } = item;
          return (
            <AntdSelect.OptGroup label={value}>
              {childSite.map(child => (
                <AntdSelect.Option key={child.value} value={child.url}>
                  {`${child.value}`}
                </AntdSelect.Option>
              ))}
            </AntdSelect.OptGroup>
          );
        })}
      </AntdSelect>
    </div>
  </Styled>
);

QuickLinkBar.propTypes = {
  menuFixedYn: PropTypes.string,
};

QuickLinkBar.defaultProps = {
  menuFixedYn: undefined,
};

export default QuickLinkBar;
