import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Input, Button } from 'antd';
import ReactDataGrid from 'react-data-grid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import basicStyle from 'config/basicStyle';

import UserInfo from './UserInfo';
import StyledSignLine from './StyledSignLine';
import StyleGrid from './StyleGrid';
import EmptyRowsView from './emptyRowsView';

class SignLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedIndexes: [],
      checkedUsers: [],
      searchText: '',
    };
    this.columns = [
      {
        key: 'GRID_DATA',
        name: '',
        resizable: true,
        width: 265,
        frozen: false,
      },
    ];
  }

  rowGetter = i => {
    const { users } = this.props;
    if (users[i] !== undefined) {
      const content = {
        GRID_DATA: [<UserInfo key={users[i].USER_ID} user={users[i]} />],
        rows: users[i],
      };
      return content;
    }
    return {};
  };

  onRowsSelected = rows => {
    this.setState(prevState => {
      const { checkedIndexes, checkedUsers } = prevState;
      return {
        checkedIndexes: checkedIndexes.concat(rows.map(r => r.rowIdx)),
        checkedUsers: checkedUsers.concat(rows.map(r => r.row.rows)),
      };
    });
  };

  onRowsDeselected = rows => {
    const rowIndexes = rows.map(r => r.rowIdx);
    const userIdx = rows.map(r => r.row.rows.USER_ID);
    this.setState(prevState => {
      const { checkedIndexes, checkedUsers } = prevState;
      return {
        checkedIndexes: checkedIndexes.filter(i => rowIndexes.indexOf(i) === -1),
        checkedUsers: checkedUsers.filter(user => userIdx.indexOf(user.USER_ID) === -1),
      };
    });
  };

  setSearchText = searchText => {
    this.setState({ searchText });
  };

  onSearchSubmit = e => {
    e.preventDefault();
    const { getUsers, pagination } = this.props;
    const { searchText } = this.state;
    if (searchText !== '') {
      const payload = {
        PARAM: {
          KEYWORD: searchText,
          PAGE: 1,
          PAGE_CNT: pagination.pageSize,
        },
      };
      getUsers(payload);
    }
  };

  // onScroll = scroll => {
  //   console.debug('data : ', scroll);
  //   const { users, getUsers, pagination } = this.props;
  //   const { searchText } = this.state;
  //   if (users.length === scroll.rowVisibleEndIdx) {
  //     const payload = {
  //       PARAM: {
  //         KEYWORD: searchText,
  //         PAGE: pagination.currentPage + 1,
  //         PAGE_CNT: pagination.pageSize,
  //       },
  //     };
  //     getUsers(payload);
  //   }
  // };

  addCheckedUsers = () => {
    const { selectedUsers, setSelectedUsers } = this.props;
    const { checkedUsers } = this.state;
    checkedUsers.forEach(user1 => {
      const findUser = selectedUsers.find(user3 => user1.USER_ID === user3.USER_ID);
      if (findUser === undefined) {
        selectedUsers.push(user1);
      }
    });

    setSelectedUsers(selectedUsers);
    this.setState({
      checkedIndexes: [],
      checkedUsers: [],
    });
  };

  removeCheckedUsers = user => {
    const { selectedUsers, setSelectedUsers } = this.props;
    setSelectedUsers(selectedUsers.filter(u => u.USER_ID !== user.USER_ID));
  };

  onDragEnd = dropResult => {
    if (!dropResult.destination) {
      return;
    }

    const { source, destination } = dropResult;
    const { selectedUsers, setSelectedUsers } = this.props;
    const [removed] = selectedUsers.splice(source.index, 1);
    selectedUsers.splice(destination.index, 0, removed);
    setSelectedUsers(selectedUsers);
  };

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { checkedIndexes, searchText } = this.state;
    const { users, selectedUsers } = this.props;

    return (
      <StyledSignLine>
        <div className="modalContents">
          <Row style={rowStyle} gutter={gutter} className="orgActivityInnerBody">
            <Col span={12} style={colStyle}>
              <div className="leftCol">
                <div className="searchOptions">
                  <Form onSubmit={this.onSearchSubmit}>
                    <div className="inputWrapper">
                      <label htmlFor="find-box">
                        <Input type="text" name="searchText" id="find-box" value={searchText} onChange={e => this.setSearchText(e.target.value)} />
                      </label>
                      <Button htmlType="submit" className="searchButton" title="검색하기" />
                    </div>
                  </Form>
                </div>
                <StyleGrid gridHeight={435}>
                  <ReactDataGrid
                    rowKey="USER_ID"
                    columns={this.columns}
                    rowGetter={this.rowGetter}
                    rowsCount={users.length}
                    onRowClick={false}
                    rowSelection={{
                      showCheckbox: true,
                      enableShiftSelect: true,
                      onRowsSelected: this.onRowsSelected,
                      onRowsDeselected: this.onRowsDeselected,
                      selectBy: {
                        indexes: checkedIndexes,
                      },
                    }}
                    emptyRowsView={EmptyRowsView}
                  />
                </StyleGrid>
              </div>
            </Col>
            <Col span={2} style={colStyle}>
              <div className="centerCol">
                <Button className="inBtn" title="추가" onClick={this.addCheckedUsers} />
              </div>
            </Col>
            <Col span={10} style={colStyle}>
              <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="selectedUser" type="cell-item" isDropDisabled={false}>
                  {(dropProvided, dropSnapshot) => (
                    <div className="rightCol" {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
                      <ul className="selUser">
                        {selectedUsers.map((user, index) => (
                          <Draggable key={`cell-${user.USER_ID}`} index={index} draggableId={`draggable-${user.USER_ID}_${index}`}>
                            {(dragProvided, dragSnapshot) => (
                              <li ref={dragProvided.innerRef} {...dragProvided.draggableProps} {...dragProvided.dragHandleProps}>
                                <UserInfo isDraggable user={user} removeCheckedUsers={this.removeCheckedUsers} />
                              </li>
                            )}
                          </Draggable>
                        ))}
                      </ul>
                      {/* <StyleSelectedUser>
                        <Table size="small" className="SUTable" style={{ width: '100%' }}>
                          <Table.Body>
                            {selectedUsers.map((user, index) => (
                              <Draggable key={`cell-${user.USER_ID}`} index={index} draggableId={`draggable-${user.USER_ID}_${index}`}>
                                {(dragProvided, dragSnapshot) => (
                                  <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} {...dragProvided.dragHandleProps}>
                                    <Table.Row key={user.USER_ID}>
                                      <Table.Cell textAlign="left" title="cell">
                                        <UserInfo isDraggable user={user} removeCheckedUsers={this.removeCheckedUsers} />
                                      </Table.Cell>
                                    </Table.Row>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          </Table.Body>
                        </Table>
                      </StyleSelectedUser> */}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Col>
          </Row>
        </div>
      </StyledSignLine>
    );
  }
}

SignLine.propTypes = {
  users: PropTypes.array.isRequired,
  selectedUsers: PropTypes.array,
  pagination: PropTypes.object,
  getUsers: PropTypes.func.isRequired,
  setSelectedUsers: PropTypes.func,
};

SignLine.defaultTypes = {
  users: [],
  selectedUsers: [],
  pagination: {},
  getUsers: () => {},
  setSelectedUsers: () => {},
};

export default SignLine;
