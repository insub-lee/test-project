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
        onClick={() => window.open(
          'http://skynet.skhynix.com/portlet/ptl/cmm/ptlprivacy.jsp',
          'privacy',
          'width=766, height=535, toolbar=0, location=0, directories=0, status=0, menubar=0, scrollbars=yes, resizable=0',
        )}
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
        onClick={() => window.open(
            'http://skynet.skhynix.com/portlet/ptl/cmm/ptlhelptel.jsp?addToRoster=y',
            'HelpTel',
            'width=575, height=650, toolbar=0, location=0, directories=0, status=0, menubar=0, scrollbars=0, resizable=0',
          )}
        className="systemCharger"
      >{intlObj.get(messages.systemManager)}
      </Button>
    </li>
  </ul>
);

export default FooterMenu;
