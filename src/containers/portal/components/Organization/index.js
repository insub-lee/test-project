import React from 'react';
import PropTypes from 'prop-types';
import Organization from './organization';

class OrganizationWrapper extends React.PureComponent {
  render() {
    const {
      show,
      checkedDept,
      checkedGrp,
      checkedPstn,
      checkedDuty,
      selectedUsers,
      userTab,
      pstnTab,
      dutyTab,
      grpTab,
      isModal,
      isProfile,
      userProfile,
      isDraggable,
      isTreeCheckbox,
      getDataFromOrganization,
      addCallback,
      deleteCallback,
      dndChangePositionCallback,
      deleteAllCallback,
      orgName,
      item,
      isDeptSelectbox,
      siteIdParam,
      closeModal,
      userSetting,
    } = this.props;

    return (
      <div>
        {
          show
            ?
              <Organization
                show={show}
                checkedDept={checkedDept}
                checkedGrp={checkedGrp}
                checkedPstn={checkedPstn}
                checkedDuty={checkedDuty}
                selectedUsers={selectedUsers}
                userTab={userTab}
                pstnTab={pstnTab}
                dutyTab={dutyTab}
                grpTab={grpTab}
                isModal={isModal}
                isProfile={isProfile}
                userProfile={userProfile}
                isDraggable={isDraggable}
                isTreeCheckbox={isTreeCheckbox}
                getDataFromOrganization={getDataFromOrganization}
                addCallback={addCallback}
                deleteCallback={deleteCallback}
                dndChangePositionCallback={dndChangePositionCallback}
                deleteAllCallback={deleteAllCallback}
                orgName={orgName}
                item={item}
                isDeptSelectbox={isDeptSelectbox}
                siteIdParam={siteIdParam}
                closeModal={closeModal}
                userSetting={userSetting}
              />
            :
              ''
        }
      </div>
    );
  }
}

OrganizationWrapper.propTypes = {
  show: PropTypes.bool.isRequired,
  selectedUsers: PropTypes.array,
  checkedDept: PropTypes.array,
  checkedGrp: PropTypes.array,
  checkedPstn: PropTypes.array,
  checkedDuty: PropTypes.array,
  userTab: PropTypes.bool,
  pstnTab: PropTypes.bool,
  dutyTab: PropTypes.bool,
  grpTab: PropTypes.bool,
  isModal: PropTypes.bool,
  isProfile: PropTypes.bool,
  userProfile: PropTypes.object, // Organization으로 전달될 선택된 구성원의 정보
  isDraggable: PropTypes.bool,
  isTreeCheckbox: PropTypes.bool,
  getDataFromOrganization: PropTypes.func,
  addCallback: PropTypes.func,
  deleteCallback: PropTypes.func,
  dndChangePositionCallback: PropTypes.func,
  deleteAllCallback: PropTypes.func,
  orgName: PropTypes.string,
  item: PropTypes.object,
  isDeptSelectbox: PropTypes.bool,
  siteIdParam: PropTypes.number,
  closeModal: PropTypes.func.isRequired,
  userSetting: PropTypes.bool,
};

OrganizationWrapper.defaultProps = {
  userTab: false,
  pstnTab: false,
  dutyTab: false,
  grpTab: false,
  isModal: true,
  isProfile: false,
  userProfile: undefined,
  isDraggable: false,
  isTreeCheckbox: true,
  addCallback: undefined,
  dndChangePositionCallback: undefined,
  deleteCallback: undefined,
  deleteAllCallback: undefined,
  getDataFromOrganization: undefined,
  orgName: 'Nothing',
  item: undefined,
  selectedUsers: [],
  checkedDept: [],
  checkedGrp: [],
  checkedPstn: [],
  checkedDuty: [],
  isDeptSelectbox: false,
  siteIdParam: undefined,
  userSetting: false,
};

export default OrganizationWrapper;
