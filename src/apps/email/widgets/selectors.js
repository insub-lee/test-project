import { createSelector } from 'reselect';

const selectEmails = state => state.get('Email');

const makeGetMailList = () => createSelector(
  selectEmails,
  maileState => maileState.get('mailList').toJS(),
);

export {
  selectEmails,
  makeGetMailList,
};
