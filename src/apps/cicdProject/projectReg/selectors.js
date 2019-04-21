import { createSelector } from 'reselect';

const selectProjectReg = state => state.get('ProjectReg');

const makeNameCheckK = () => createSelector(
  selectProjectReg,
  selectProjectRegState => selectProjectRegState.get('nameChk_kor'),
);

const makeNameCheckC = () => createSelector(
  selectProjectReg,
  selectProjectRegState => selectProjectRegState.get('nameChk_chn'),
);

const makeNameCheckE = () => createSelector(
  selectProjectReg,
  selectProjectRegState => selectProjectRegState.get('nameChk_eng'),
);

const makeProjectReg = () => createSelector(
  selectProjectReg,
  selectProjectRegState => selectProjectRegState.get('projectReg').toJS(),
);

const makeDefaultList = () => createSelector(
  selectProjectReg,
  selectProjectRegState => selectProjectRegState.get('defaultList').toJS(),
);

// new add
const makeDupCheck = () => createSelector(
  selectProjectReg,
  selectProjectRegState => selectProjectRegState.get('dupCheckYn'),
);

const dupCheckFlag = () => createSelector(
  selectProjectReg,
  selectProjectRegState => selectProjectRegState.get('dupCheckFlag'),
);

const makeDivionListCombo = () => createSelector(
  selectProjectReg,
  selectProjectRegState => selectProjectRegState.get('divionListCombo').toJS(),
);

const saveCheck = () => createSelector(
  selectProjectReg,
  selectProjectRegState => selectProjectRegState.get('saveCheck'),
);

export {
  selectProjectReg,
  makeNameCheckK,
  makeNameCheckC,
  makeNameCheckE,
  makeProjectReg,
  makeDefaultList,
  // new add
  makeDupCheck,
  dupCheckFlag,
  makeDivionListCombo,
  saveCheck,
};
