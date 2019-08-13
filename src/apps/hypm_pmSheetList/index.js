/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import PmSheetList from './PmSheetList';
import InformNoteListCBMSelectListPopup from './InformNoteListCBMSelectListPopup';
import PmSheetDetailPMCardPopup from './PmSheetDetailPMCardPopup';
import InformNoteDetailPopup from './InformNoteDetailPopup';

class PmSheet extends PureComponent {
  render() {
    return (
      <div>
        <Switch>
          {/* 기입바람 */}
          <Route path="/apps/pmSheetList" component={PmSheetList} exact />
          <Route path="/sm/pmSheetList" component={PmSheetList} exact />
          {/* 기입바람 */}
          <Route path="/apps/pmSheetList/InformNoteListCBMSelectListPopup/:PARAM" component={InformNoteListCBMSelectListPopup} />
          <Route path="/sm/pmSheetList/InformNoteListCBMSelectListPopup/:PARAM" component={InformNoteListCBMSelectListPopup} />
          {/* 기입바람 */}
          <Route path="/apps/pmSheetList/PmSheetDetailPMCardPopup/:PARAM" component={PmSheetDetailPMCardPopup} />
          <Route path="/sm/pmSheetList/PmSheetDetailPMCardPopup/:PARAM" component={PmSheetDetailPMCardPopup} />
          {/* 기입바람 */}
          <Route path="/apps/pmSheetList/InformNoteDetailPopup/:PARAM" component={InformNoteDetailPopup} />
          <Route path="/sm/pmSheetList/InformNoteDetailPopup/:PARAM" component={InformNoteDetailPopup} />
        </Switch>
      </div>
    );
  }
}

export default PmSheet;
