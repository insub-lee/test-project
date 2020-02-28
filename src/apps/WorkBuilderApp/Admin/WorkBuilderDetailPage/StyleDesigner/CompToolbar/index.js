import React from 'react';
import PropTypes from 'prop-types';
import SideMenu from 'react-sidemenu';

import iconInput from 'images/workbuilder/icon_input.png';
import iconText from 'images/workbuilder/icon_text.png';
import iconCheckbox from 'images/workbuilder/icon_checkbox.png';
import iconFieldset from 'images/workbuilder/icon_fieldset.png';
import iconImage from 'images/workbuilder/icon_image.png';
import iconMonth from 'images/workbuilder/icon_month.png';
import iconNumber from 'images/workbuilder/icon_number.png';
import iconPassword from 'images/workbuilder/icon_password.png';
import iconRadio from 'images/workbuilder/icon_radio.png';
import iconSelect from 'images/workbuilder/icon_select.png';
import iconWatch from 'images/workbuilder/icon_watch.png';

const CompToolbar = React.memo(
  ({ compTreeData, action: { setSelectToolbarItem } }) => (
    <div className="categoryWrapper">
      <SideMenu items={compTreeData} collapse={false} activeItem={0} onMenuItemClick={(value, extras) => extras && setSelectToolbarItem(extras)} />
    </div>
  ),
  (prevProps, nextProps) => JSON.stringify(prevProps.compTreeData) === JSON.stringify(nextProps.compTreeData),
);

CompToolbar.propTypes = {
  compTreeData: PropTypes.arrayOf(PropTypes.object),
  action: PropTypes.shape({
    setSelectToolbarItem: PropTypes.func,
  }),
};

CompToolbar.defaultProps = {
  compTreeData: [],
  action: {
    setSelectToolbarItem: () => {},
  },
};

export default CompToolbar;
