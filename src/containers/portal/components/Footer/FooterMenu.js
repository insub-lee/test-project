import React from 'react';
import { intlObj } from 'utils/commonUtils';
import Button from '../../../../components/Button';
import messages from './messages';

const FooterMenu = () => (
  <ul className="portalFooterMenu">
    <li className="fmIcon01">
      <span className="icon-list" />
      <Button
        type="button"
        onClick={() => alert('준비중입니다.')}
        className="personalInfo"
      >{intlObj.get(messages.privateInfo)}
      </Button>
    </li>
    <li className="fmIcon02">
      <span className="icon-contact" />
      <span className="helpDesk">
        {intlObj.get(messages.itHelpDesk)}
      </span>
    </li>
    <li className="fmIcon03">
      <span className="icon-user" />
      <Button
        type="button"
        onClick={() => alert('준비중입니다.')}
        className="systemCharger"
      >{intlObj.get(messages.systemManager)}
      </Button>
    </li>
  </ul>
);

export default FooterMenu;
