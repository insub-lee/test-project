import React from 'react';
import PropTypes from 'prop-types';

import Whitespace from '../../components/Panel';
import PanelContainer from '../../components/Panel/PanelContainer';
import PanelContent from '../../components/Panel/PanelContent';
import PanelHeader from '../../components/Panel/PanelHeader';

import ItemBody from './ItemBody';

const TableItems = ({ title, items, dropId, action }) => (
  <Whitespace>
    <PanelHeader title={title} />
    <PanelContainer>
      <PanelContent>
        <ItemBody items={items} dropId={dropId} action={action} />
      </PanelContent>
    </PanelContainer>
  </Whitespace>
);

TableItems.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  dropId: PropTypes.string,
};

TableItems.defaultProps = {
  title: '',
  items: [],
  dropId: '',
};

export default TableItems;
