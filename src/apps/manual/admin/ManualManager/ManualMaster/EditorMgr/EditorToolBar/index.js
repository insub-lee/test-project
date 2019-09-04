import React, { Component } from 'react';
import { Menu, Accordion, Tab, Modal, Button, Icon, List, Checkbox } from 'semantic-ui-react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import arrowDown from 'images/common/arrow-down.png';
import * as actions from '../../actions';

import MenuItem from './MenuItem';
import { modifyTool, writingTool } from './ItemToolData';

class ItemToolBar extends Component {
  componentDidMount() {
    console.debug('init toolbar');
  }

  render() {
    const { addEditorComponent } = this.props;
    return (
      <Menu borderless className="itemtoolbar" icon vertical>
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200} style={{ height: '100%' }}>
          <Menu.Item>
            <Accordion className="itemtoolbaritem">
              <Accordion.Title active onClick={() => false}>
                {modifyTool.title}
                <img src={arrowDown} className="icon" alt="" />
              </Accordion.Title>
              <Accordion.Content active>
                <div className="tempTools temp">
                  <div>
                    {modifyTool.menus.map(menu => (
                      <MenuItem
                        key={menu.menuId}
                        name={menu.menuId}
                        text={menu.menuName}
                        iconName={menu.menuIcon}
                        handleMenuClick={e => {
                          e.preventDefault();
                          this.props.handleWritingToolClick(menu.menuId);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </Accordion.Content>
            </Accordion>
          </Menu.Item>
          <Menu.Item>
            <Accordion className="itemtoolbaritem">
              <Accordion.Title active onClick={() => false}>
                {writingTool.title}
                <img src={arrowDown} className="icon" alt="" />
              </Accordion.Title>
              <Accordion.Content active>
                <div className="tempTools temp">
                  <div>
                    {writingTool.menus.map(menu => (
                      <MenuItem
                        key={menu.menuId}
                        name={menu.menuId}
                        text={menu.menuName}
                        iconName={menu.menuIcon}
                        handleMenuClick={e => {
                          e.preventDefault();
                          addEditorComponent(menu.menuType);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </Accordion.Content>
            </Accordion>
          </Menu.Item>
        </Scrollbars>
      </Menu>
    );
  }
}

ItemToolBar.propTypes = {
  addEditorComponent: PropTypes.func,
};

ItemToolBar.defaultProps = {
  addEditorComponent: () => false,
};

const mapDispatchToProps = dispatch => ({
  addEditorComponent: compType => {
    dispatch(actions.addEditorComponentByReduc(compType));
    if (compType === 'indexRelationPopup') dispatch(actions.getCategoryListBySaga());
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(ItemToolBar);
