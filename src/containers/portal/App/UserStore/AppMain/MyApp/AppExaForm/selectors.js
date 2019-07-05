import { createSelector } from 'reselect';

const selectOrg = state => state.get('AppExaForm');

const makeAppExamineOk = () => createSelector(
  selectOrg,
  org => org.get('appExamineOk'),
);

const makeSelectAppRovalReqComent = () => createSelector(
  selectOrg,
  org => org.get('APPROVALREQ_COMMENT').toJS(),
);

const makeSelectAppRovalProcComnt = () => createSelector(
  selectOrg,
  org => org.get('APPROVALPROC_COMNT').toJS(),
);

const makeSelectAppinfo = () => createSelector(
  selectOrg,
  org => org.get('appinfo'),
);

const makeSelectApprovalProcList = () => createSelector(
  selectOrg,
  org => org.get('APPROVALPROC_LIST').toJS(),
);

const makeSelectSvcReqDt = () => createSelector(
  selectOrg,
  org => org.get('svcReqDt'),
);

export {
  selectOrg,
  makeAppExamineOk,
  makeSelectAppRovalReqComent,
  makeSelectAppRovalProcComnt,
  makeSelectAppinfo,
  makeSelectApprovalProcList,
  makeSelectSvcReqDt,
};
