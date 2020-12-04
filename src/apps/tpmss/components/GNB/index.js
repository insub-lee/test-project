import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import StyledMainMenu from './StyledMainMenu';
import StyledSubMenu from './StyledSubMenu';

const GNB = ({ menus, action }) => (
  <StyledMainMenu className="gnb">
    {menus.map(menu => {
      let menuIcon = 'far fa-file-alt fa-lg';
      switch (menu.mnuNm) {
        case '개선활동':
          menuIcon = 'fas fa-drafting-compass fa-lg';
          break;
        case '공지사항':
          menuIcon = 'fas fa-volume-up fa-lg';
          break;
        case '개선활동신문고':
          menuIcon = 'far fa-dot-circle fa-lg';
          break;
        case '설문조사':
          menuIcon = 'far fa-check-square fa-lg';
          break;
        default:
          break;
      }
      return (
        <li key={menu.mnuId}>
          {menu.mnuFnc === 'P' ? (
            <NavLink to={`/${menu.mnuId}`} className="nav_link" activeClassName="active" onClick={action.closeMobileMenu}>
              <i className={menuIcon} />
              {menu.mnuNm}
            </NavLink>
          ) : (
            <button type="button" className="nav_link" onClick={() => action.toggleParentMenu(menu.mnuId)}>
              <i className={menuIcon} />
              {menu.mnuNm}
              <i className="fas fa-angle-right" />
            </button>
          )}
          {menu.children.length > 0 && (
            <StyledSubMenu className={`gnb_sub ${menu.showSubMenus ? 'active' : ''}`}>
              {menu.children.map((subMenu, childIndex) => (
                <li key={subMenu.mnuId}>
                  {subMenu.mnuFnc === 'P' ? (
                    <NavLink to={`/${subMenu.mnuId}`} className="nav_link" activeClassName="active" onClick={action.closeMobileMenu}>
                      {subMenu.mnuNm}
                    </NavLink>
                  ) : (
                    <React.Fragment>
                      <button type="button" className="nav_link" onClick={() => action.toggleChildrenMenu(menu.mnuId, childIndex)}>
                        {subMenu.mnuNm}
                      </button>
                      <ul className={`gnb gnb_sub_depth ${subMenu.showSubMenus ? 'active' : ''}`}>
                        {subMenu.children.map(deepSubMenu => (
                          <li key={deepSubMenu.mnuId}>
                            <NavLink to={`/${deepSubMenu.mnuId}`} className="nav_link" activeClassName="active" onClick={action.closeMobileMenu}>
                              {deepSubMenu.mnuNm}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </React.Fragment>
                  )}
                </li>
              ))}
            </StyledSubMenu>
          )}
        </li>
      );
    })}
  </StyledMainMenu>
);

GNB.propTypes = {
  menus: PropTypes.arrayOf(PropTypes.object),
  action: PropTypes.shape({
    toggleParentMenu: PropTypes.func,
    toggleChildrenMenu: PropTypes.func,
    toggleMobileMenu: PropTypes.func,
    closeMobileMenu: PropTypes.func,
  }),
};

GNB.defaultProps = {
  menus: [],
  action: PropTypes.shape({
    toggleParentMenu: () => false,
    toggleChildrenMenu: () => false,
    toggleMobileMenu: () => false,
    closeMobileMenu: () => false,
  }),
};

export default GNB;
