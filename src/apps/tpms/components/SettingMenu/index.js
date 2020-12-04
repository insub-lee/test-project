import React from 'react';
import StyledSettingMenu from './StyledSettingMenu';
import StyledButton from './StyledButton';

const SettingMenu = ({ options }) => (
  <StyledSettingMenu>
    <div className="menu_option">
      <div className="menu_option-title">Title</div>
      <ul className="menu_option-container">
        <li className="menu_option-item">
          <StyledButton type="button">
            <div className="icon_box">
              <i className="fas fa-desktop" />
            </div>
            <p className="text">IT</p>
          </StyledButton>
        </li>
        <li className="menu_option-item">
          <StyledButton type="button">
            <div className="icon">icon</div>
            <p className="text">경영</p>
          </StyledButton>
        </li>
        <li className="menu_option-item">
          <StyledButton type="button">
            <div className="icon">icon</div>
            <p className="text">마케팅</p>
          </StyledButton>
        </li>
        <li className="menu_option-item">
          <StyledButton type="button">
            <div className="icon">icon</div>
            <p className="text">전략기획</p>
          </StyledButton>
        </li>
        <li className="menu_option-item">
          <StyledButton type="button">
            <div className="icon">icon</div>
            <p className="text">EX1</p>
          </StyledButton>
        </li>
        <li className="menu_option-item">
          <StyledButton type="button">
            <div className="icon">icon</div>
            <p className="text">EX2</p>
          </StyledButton>
        </li>
        <li className="menu_option-item">
          <StyledButton type="button">
            <div className="icon">icon</div>
            <p className="text">EX3</p>
          </StyledButton>
        </li>
        <li className="menu_option-item">
          <StyledButton type="button">
            <div className="icon">icon</div>
            <p className="text">EX4</p>
          </StyledButton>
        </li>
        <li className="menu_option-item">
          <StyledButton type="button">
            <div className="icon">icon</div>
            <p className="text">EX5</p>
          </StyledButton>
        </li>
        <li className="menu_option-item">
          <StyledButton type="button">
            <div className="icon">icon</div>
            <p className="text">EX6</p>
          </StyledButton>
        </li>
      </ul>
    </div>
  </StyledSettingMenu>
);

export default SettingMenu;
