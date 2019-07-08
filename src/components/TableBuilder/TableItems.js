import React from 'react';
import PropTypes from 'prop-types';

import Whitespace from 'components/Panel';
import PanelContainer from 'components/Panel/PanelContainer';
import PanelContent from 'components/Panel/PanelContent';
import PanelHeader from 'components/Panel/PanelHeader';

import ItemBody from './ItemBody';

const TableItems = ({ items }) => (
  <Whitespace>
    <PanelHeader title="Item" />
    <PanelContainer>
      <PanelContent>
        <ItemBody items={items} />
      </PanelContent>
    </PanelContainer>
  </Whitespace>
);

TableItems.propTypes = {
  items: PropTypes.array,
};

TableItems.defaultProps = {
  items: [],
};

export default TableItems;
