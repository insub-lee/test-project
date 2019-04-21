import { createSelector } from 'reselect';

const selectProjectDtl = state => state.get('ProjectDtl');

const makeNameCheckK = () => createSelector(
  selectProjectDtl,
  selectProjectDtlState => selectProjectDtlState.get('nameChk_kor'),
);

const makeNameCheckC = () => createSelector(
  selectProjectDtl,
  selectProjectDtlState => selectProjectDtlState.get('nameChk_chn'),
);

const makeNameCheckE = () => createSelector(
  selectProjectDtl,
  selectProjectDtlState => selectProjectDtlState.get('nameChk_eng'),
);

const makeProjectDtl = () => createSelector(
  selectProjectDtl,
  selectProjectDtlState => selectProjectDtlState.get('projectDtl').toJS(),
);

const makeDefaultList = () => createSelector(
  selectProjectDtl,
  selectProjectDtlState => selectProjectDtlState.get('defaultList').toJS(),
);

// new add
const makeDupCheck = () => createSelector(
  selectProjectDtl,
  selectProjectDtlState => selectProjectDtlState.get('dupCheckYn'),
);

const dupCheckFlag = () => createSelector(
  selectProjectDtl,
  selectProjectDtlState => selectProjectDtlState.get('dupCheckFlag'),
);

const makeDivionListCombo = () => createSelector(
  selectProjectDtl,
  selectProjectDtlState => selectProjectDtlState.get('divionListCombo').toJS(),
);

const saveCheck = () => createSelector(
  selectProjectDtl,
  selectProjectDtlState => selectProjectDtlState.get('saveCheck'),
);

const projectData = () => createSelector(
  selectProjectDtl,
  params => params.get('projectData'),
);

const updateCheck = () => createSelector(
  selectProjectDtl,
  params => params.get('updateCheck'),
);

export {
  selectProjectDtl,
  makeNameCheckK,
  makeNameCheckC,
  makeNameCheckE,
  makeProjectDtl,
  makeDefaultList,
  // new add
  makeDupCheck,
  dupCheckFlag,
  makeDivionListCombo,
  saveCheck,
  projectData,
  updateCheck,
};
