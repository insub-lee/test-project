import React from 'react';
import PropTypes from 'prop-types';
import { settingsWith } from 'components/WorkBuilder/config';

import Styled from './Styled';
import SignLineOptions from './SignLineOptions';
import SettingTab from './SettingTab';

// const settingsWith = ['Group', 'text', 'checkbox', 'radio', 'textarea'];

const StyleManager = ({ property, action }) => (
  <Styled>
    <div>
      {property.viewTargetType === 'SignLine' && <SignLineOptions signLine={property.signLine} action={action} />}
      {settingsWith.includes(property.viewTargetType) && <SettingTab property={property} action={action} />}
      {!settingsWith.includes(property.viewTargetType) && (
        <div className="blocks-cs">
          <p style={{ padding: 10 }}>
            설정 가능한
            <br />
            기능이 없습니다.
          </p>
        </div>
      )}
    </div>
  </Styled>
);

StyleManager.propTypes = {
  action: PropTypes.object,
  property: PropTypes.object,
};

StyleManager.defaultProps = {
  action: {},
  property: {
    viewTargetType: '',
    signLine: [],
  },
};

export default StyleManager;
