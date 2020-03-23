import React from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

import { lang } from 'utils/commonUtils';
import Badge from 'components/Badge/StyleBadge';

import StyledTableWrapper from './StyledTableWrapper';

const Contents = ({ myMNotiList, onClickItem }) => (
  <div style={{ paddingTop: 13 }}>
    <Scrollbars className="custom-scrollbar" autoHide autoHideTimeout={1000} autoHideDuration={100} autoHeight autoHeightMin={0} autoHeightMax={290}>
      <StyledTableWrapper>
        <Table size="small" style={{ width: '100%' }}>
          <Table.Body>
            {myMNotiList.map(noti => (
              <Table.Row key={noti.MENU_ID}>
                <Table.Cell onClick={() => onClickItem(noti)}>
                  {noti.SEC_YN === 'Y' ? <p>{lang.get('NAME', noti)}</p> : <p style={{ color: 'lightgray' }}>{lang.get('NAME', noti)}</p>}
                </Table.Cell>
                <Table.Cell>
                  <Badge count={noti.UNREAD_CNT ? noti.UNREAD_CNT : ''} overflowCount={99} className="badgeCount">
                    <Link to="/" className="badgeLink" />
                  </Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </StyledTableWrapper>
    </Scrollbars>
  </div>
);

Contents.propTypes = {
  myMNotiList: PropTypes.arrayOf(PropTypes.object),
  onClickItem: PropTypes.func,
};

Contents.defaultProps = {
  myMNotiList: [],
  onClickItem: () => {},
};

export default Contents;
