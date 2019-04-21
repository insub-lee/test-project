/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import PmSheetModeling from './PmSheetModeling';
import PmSheetOperation from './PmSheetOperation';
import pmSheetSpListPopup from './pmSheetSpListPopup';
import pmSheetWrokTimePopup from './pmSheetWrokTimePopup';
import pmSheetPlanChangeListPopup from './pmSheetPlanChangeListPopup';
import PmSheetMicQualListPopup from './PmSheetMicQualListPopup';


class PMSheetModeling extends PureComponent {
  render() {
    return (
      <div>
        {/* 목록 */}
        <Route path="/apps/pmSheetModeling" component={PmSheetModeling} exact />
        <Route path="/sm/pmSheetModeling" component={PmSheetModeling} exact />
        {/* Operation */}
        <Route path="/apps/pmSheetModeling/Operation" component={PmSheetOperation} exact />
        <Route path="/sm/pmSheetModeling/Operation" component={PmSheetOperation} exact />
        {/* 자재목록 팝업 */}
        <Route path="/apps/pmSheetModeling/pmSheetSpListPopup/:plnal/:plnnr/:vornr/:revision/:status/:uid" component={pmSheetSpListPopup} exact />
        <Route path="/sm/pmSheetModeling/pmSheetSpListPopup/:plnal/:plnnr/:vornr/:revision/:status/:uid" component={pmSheetSpListPopup} exact />
        {/* work Time 팝업 */}
        <Route path="/apps/pmSheetModeling/pmSheetWrokTimePopup/:plnnr/:plnal/:revision/:uid/:active/:status/:vornr" component={pmSheetWrokTimePopup} exact />
        <Route path="/sm/pmSheetModeling/pmSheetWrokTimePopup/:plnnr/:plnal/:revision/:uid/:active/:status/:vornr" component={pmSheetWrokTimePopup} exact />
        {/* Plan 영향 List 팝업*/}
        <Route path="/apps/pmSheetModeling/pmSheetPlanChangeListPopup/:plnnr/:plnal" component={pmSheetPlanChangeListPopup} exact />
        <Route path="/sm/pmSheetModeling/pmSheetPlanChangeListPopup/:plnnr/:plnal" component={pmSheetPlanChangeListPopup} exact />
        {/* 점검항목 팝업 */}
        <Route path="/apps/pmSheetModeling/pmSheetMicQualListPopup/:plnal/:plnnr/:vornr/:revision/:eqktx/:beber/:ltxa1/:ktex1/:status/:uid/:opGubun" component={PmSheetMicQualListPopup} exact />
        <Route path="/sm/pmSheetModeling/pmSheetMicQualListPopup/:plnal/:plnnr/:vornr/:revision/:eqktx/:beber/:ltxa1/:ktex1/:status/:uid/:opGubun" component={PmSheetMicQualListPopup} exact />
      </div>
    );
  }
}

export default PMSheetModeling;