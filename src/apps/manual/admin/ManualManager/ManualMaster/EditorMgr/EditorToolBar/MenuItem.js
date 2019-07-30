import React from 'react';
import { Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';

/* {
} */

const MenuItem = props =>
  props.iconName === '' ? (
    <Popup
      className="TabletTooltip"
      position="bottom left"
      as="custom"
      trigger={
        <div>
          <div
            className={`cell ${props.tempType === 'personal' ? 'personal' : ''} ${props.tempType === 'common' ? 'common' : ''} ${
              props.tempType === 'group' ? 'group' : ''
            }`}
          >
            <a
              href=""
              onClick={e => {
                e.preventDefault();
                props.handleMenuClick(e, props.template.tpTitle);
              }}
            >
              <span>{props.template.tpSubtitle ? props.template.tpSubtitle.slice(0, 12) : props.template.tpTitle.slice(0, 12)}</span>
            </a>
            {props.deleteAble ? <button type="button" onClick={() => props.handleUpdateTemplate()} /> : ''}
            {props.deleteAble ? <button type="button" onClick={() => props.handleRemoveUserTemplate(props.template.tpSeq)} /> : ''}
          </div>
        </div>
      }
    >
      <Popup.Content>
        <table>
          <tr>
            <td>템플릿명 :</td>
            {/* 12글자 */}
            <td>{props.template.tpSubtitle ? props.template.tpSubtitle : props.template.tpTitle}</td>
          </tr>
          <tr>
            <td>작성자 : </td>
            <td>{`${props.template.empName} ${props.template.positionName} · ${props.template.deptName}`}</td>
          </tr>
          <tr>
            <td>작성일시 : </td>
            <td>{moment(props.template.regDt).format('YYYY.MM.DD HH:mm')}</td>
          </tr>
          <tr>
            <td>설명 : </td>
            {/* 100자 */}
            <td>{props.template.tpText}</td>
          </tr>
        </table>
      </Popup.Content>
    </Popup>
  ) : (
    <a
      href=""
      onClick={e => {
        e.preventDefault();
        props.handleMenuClick(e, props.name);
      }}
    >
      <span className={props.iconName} />
      <span>{props.text}</span>
    </a>
  );

MenuItem.propTypes = {
  name: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  text: PropTypes.string,
  iconName: PropTypes.string,
  handleMenuClick: PropTypes.func.isRequired,
  deleteAble: PropTypes.bool.isRequired,
  handleRemoveUserTemplate: PropTypes.func,
  handleUpdateTemplate: PropTypes.func.isRequired,
  tempType: PropTypes.string,
  template: PropTypes.shape({
    deptName: PropTypes.string,
    empName: PropTypes.string,
    empnoRegist: PropTypes.string,
    modDt: PropTypes.number,
    positionName: PropTypes.string,
    regDt: PropTypes.number,
    tpSeq: PropTypes.number,
    tpTitle: PropTypes.string,
    tpSubtitle: PropTypes.string,
    tpText: PropTypes.string,
  }),
};
MenuItem.defaultProps = {
  name: '',
  tpSeq: 1,
  handleRemoveUserTemplate: () => false,
  handleUpdateTemplate: () => false,
  iconName: '',
  active: false,
  text: '',
  deleteAble: false,
  tempType: '',
  template: {
    deptName: '',
    empName: '',
    empnoRegist: '',
    modDt: 0,
    positionName: '',
    regDt: 0,
    tpSeq: 0,
    tpTitle: '',
    tpSubtitle: '',
    tpText: '',
  },
};
export default MenuItem;
