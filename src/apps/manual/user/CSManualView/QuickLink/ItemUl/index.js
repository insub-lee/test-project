import React from 'react';

import LinkItem from '../LinkItem';
import Styled from './Styled';

const ItemUl = ({ quickProps: { relationList, widgetId, addManualHistory, setListSelectedMualIdx } }) => (
  <Styled>
    <ul>
      <li>
        {relationList.map(node => (
          <LinkItem
            key={`mualViewQuickLink_${node.MUAL_IDX}`}
            node={node}
            addManualHistory={addManualHistory}
            setListSelectedMualIdx={setListSelectedMualIdx}
            widgetId={widgetId}
          />
        ))}
      </li>
    </ul>
  </Styled>
);

export default ItemUl;
