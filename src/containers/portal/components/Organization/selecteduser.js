import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import ScrollBar from 'react-custom-scrollbars';
import { intlObj, lang } from 'utils/commonUtils';
import UserProfile from 'containers/portal/components/UserProfile';
import messages from './messages';
import Draggable from './draggable';
import NotDraggable from './notDraggable';
import SelectedUser from './StyleSelectedUser';

let deleteusers = [];

class selecteduser extends React.Component {
  onChange = list => {
    const { complete, selectedUsers, deptList, grpList, pstnList, dutyList } = this.props;

    const uidx = selectedUsers.findIndex(t => t.EMP_NO === list.target.value);
    const didx = deptList.findIndex(t => t.id === list.target.value);
    const gidx = grpList.findIndex(t => t.id === list.target.value);
    const pidx = pstnList.findIndex(t => t.id === list.target.value);
    const duidx = dutyList.findIndex(t => t.id === list.target.value);

    if (complete === true) {
      deleteusers = [];
    }
    if (list.target.checked === true) {
      deleteusers.push(list.target.value);
      if (uidx !== -1) {
        selectedUsers[uidx].checked2 = 'checked';
      }
      if (didx !== -1) {
        deptList[didx].checked2 = 'checked';
      }
      if (gidx !== -1) {
        grpList[gidx].checked2 = 'checked';
      }
      if (pidx !== -1) {
        pstnList[pidx].checked2 = 'checked';
      }
      if (duidx !== -1) {
        dutyList[duidx].checked2 = 'checked';
      }
    } else if (list.target.checked === false) {
      const index = deleteusers.findIndex(a => a === list.target.value);
      deleteusers.splice(index, 1);
      if (uidx !== -1) {
        delete selectedUsers[uidx].checked2;
      }
      if (didx !== -1) {
        delete deptList[didx].checked2;
      }
      if (gidx !== -1) {
        delete grpList[gidx].checked2;
      }
      if (pidx !== -1) {
        delete pstnList[pidx].checked2;
      }
      if (duidx !== -1) {
        delete dutyList[duidx].checked2;
      }
    }
    this.props.deleteList(deleteusers);
  };

  onChangeAll = e => {
    const { selectedUsers, deptList, grpList, pstnList, dutyList } = this.props;

    deleteusers = [];

    if (e.target.checked) {
      for (let i = 0; i < selectedUsers.length; i += 1) {
        selectedUsers[i].checked2 = 'checked';
        deleteusers.push(selectedUsers[i].id);
      }
      for (let i = 0; i < deptList.length; i += 1) {
        deptList[i].checked2 = 'checked';
        deleteusers.push(deptList[i].id);
      }
      for (let i = 0; i < grpList.length; i += 1) {
        grpList[i].checked2 = 'checked';
        deleteusers.push(grpList[i].id);
      }
      for (let i = 0; i < pstnList.length; i += 1) {
        pstnList[i].checked2 = 'checked';
        deleteusers.push(pstnList[i].id);
      }
      for (let i = 0; i < dutyList.length; i += 1) {
        dutyList[i].checked2 = 'checked';
        deleteusers.push(dutyList[i].id);
      }
      this.props.deleteList('all');
    } else {
      for (let i = 0; i < selectedUsers.length; i += 1) {
        delete selectedUsers[i].checked2;
      }
      for (let i = 0; i < deptList.length; i += 1) {
        delete deptList[i].checked2;
      }
      for (let i = 0; i < grpList.length; i += 1) {
        delete grpList[i].checked2;
      }
      for (let i = 0; i < pstnList.length; i += 1) {
        delete pstnList[i].checked2;
      }
      for (let i = 0; i < dutyList.length; i += 1) {
        delete dutyList[i].checked2;
      }

      deleteusers = [];
      this.props.deleteList('nall');
    }
  };

  render() {
    const {
      selectedUsers,
      deptList,
      grpList,
      pstnList,
      dutyList,
      deleteCallback,
      dndChangePositionUser,
      dndChangePositionCallback,
      isDraggable,
      deleteAll,
      setIsDragged,
      setIsDraggedEnd,
    } = this.props;
    return (
      <SelectedUser>
        <div className="SUTitle">
          <h3>
            {intlObj.get(messages.selectionList)}
            <button className="deleteAll" onClick={deleteAll}>
              전체삭제
            </button>
          </h3>
        </div>
        <ScrollBar style={{ height: 455 }}>
          <div className="marginForIE">
            {' '}
            {/* IE에서의 목록 하단 짤림 방지 */}
            {deptList &&
              grpList &&
              pstnList &&
              dutyList &&
              selectedUsers &&
              deptList.length === 0 &&
              grpList.length === 0 &&
              pstnList.length === 0 &&
              dutyList.length === 0 &&
              selectedUsers.length === 0 && <div className="noUserSelected">{intlObj.get(messages.noSelection)}</div>}
            {deptList !== undefined && deptList.length > 0 && <div className="SUSubTitle">{intlObj.get(messages.department)}</div>}
            {deptList !== undefined && deptList.length > 0 && (
              <Table size="small" className="SUTable" style={{ width: '100%' }}>
                <Table.Body>
                  {deptList.map(dept => (
                    <Table.Row key={dept.title}>
                      <Table.Cell textAlign="left" title={`${lang.get('NAME', dept)}`} className="SUTableCell">
                        <NotDraggable dept={dept} deleteCallback={deleteCallback} type="dept">
                          {lang.get('NAME', dept)}
                        </NotDraggable>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
            {grpList !== undefined && grpList.length > 0 && <div className="SUSubTitle">{intlObj.get(messages.virtualGroup)}</div>}
            {grpList !== undefined && (
              <Table size="small" className="SUTable" style={{ width: '100%' }}>
                <Table.Body>
                  {grpList.map(grp => (
                    <Table.Row key={grp.title}>
                      <Table.Cell textAlign="left" title={`${lang.get('NAME', grp)}`} className="SUTableCell grpItem">
                        <NotDraggable grp={grp} deleteCallback={deleteCallback} type="grp">
                          {lang.get('NAME', grp)}
                        </NotDraggable>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
            {pstnList !== undefined && pstnList.length > 0 && <div className="SUSubTitle">{intlObj.get(messages.position)}</div>}
            {pstnList !== undefined && (
              <Table size="small" className="SUTable" style={{ width: '100%' }}>
                <Table.Body>
                  {pstnList.map(pstn => (
                    <Table.Row key={pstn.title}>
                      <Table.Cell textAlign="left" title={`${lang.get('NAME', pstn)}`} className="SUTableCell">
                        <NotDraggable pstn={pstn} deleteCallback={deleteCallback} type="pstn">
                          {lang.get('NAME', pstn)}
                        </NotDraggable>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
            {dutyList !== undefined && dutyList.length > 0 && <div className="SUSubTitle">{intlObj.get(messages.duty)}</div>}
            {dutyList !== undefined && (
              <Table size="small" className="SUTable" style={{ width: '100%' }}>
                <Table.Body>
                  {dutyList.map(duty => (
                    <Table.Row key={duty.title}>
                      <Table.Cell textAlign="left" title={`${lang.get('NAME', duty)}`} className="SUTableCell">
                        <NotDraggable duty={duty} deleteCallback={deleteCallback} type="duty">
                          {lang.get('NAME', duty)}
                        </NotDraggable>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
            {selectedUsers !== undefined && selectedUsers.length > 0 && <div className="SUSubTitle">{intlObj.get(messages.member)}</div>}
            {selectedUsers !== undefined && (
              <Table size="small" className="SUTable" style={{ width: '100%' }}>
                <Table.Body>
                  {selectedUsers.map(users => (
                    <Table.Row key={users.EMP_NO}>
                      <Table.Cell textAlign="left" title={`${users.NAME_KOR} (${users.EMP_NO}) / ${users.DEPT_NAME_KOR} / ${users.PSTN_NAME_KOR}`}>
                        {isDraggable ? (
                          <Draggable
                            user={users}
                            deleteCallback={deleteCallback}
                            type="user"
                            dndChangePosition={dndChangePositionUser}
                            dndChangePositionCallback={dndChangePositionCallback}
                            setIsDragged={setIsDragged}
                            setIsDraggedEnd={setIsDraggedEnd}
                          >
                            <UserProfile userProfile={users} />
                          </Draggable>
                        ) : (
                          <NotDraggable user={users} deleteCallback={deleteCallback} type="user">
                            <UserProfile userProfile={users} />
                          </NotDraggable>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </div>
        </ScrollBar>
      </SelectedUser>
    );
  }
}

selecteduser.propTypes = {
  complete: PropTypes.bool.isRequired,
  selectedUsers: PropTypes.array.isRequired,
  deptList: PropTypes.array.isRequired,
  grpList: PropTypes.array.isRequired,
  pstnList: PropTypes.array.isRequired,
  dutyList: PropTypes.array.isRequired,
  deleteCallback: PropTypes.func.isRequired,
  isDraggable: PropTypes.bool.isRequired,
  dndChangePositionUser: PropTypes.func,
  dndChangePositionCallback: PropTypes.func,
  deleteList: PropTypes.array.isRequired,
  deleteAll: PropTypes.func.isRequired,
  setIsDragged: PropTypes.func,
  setIsDraggedEnd: PropTypes.func,
};

selecteduser.defaultProps = {
  dndChangePositionUser: undefined,
  dndChangePositionCallback: undefined,
  setIsDragged: undefined,
  setIsDraggedEnd: undefined,
};

export default selecteduser;
