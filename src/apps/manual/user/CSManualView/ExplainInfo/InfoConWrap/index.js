import React from 'react';
import PropTypes from 'prop-types';
import { isJSON } from 'utils/helpers';
import Title from '../Title';
import InfoCon from '../InfoCon';
import QnA from '../QnA';
import Tab from '../Tab';
import Styled from './Styled';

const InfoConWrap = ({ componentList, indexRelationList }) => (
  <Styled>
    {componentList &&
      componentList.map(item => {
        console.log('메뉴얼그리기', item);
        switch (item.TYPE) {
          case 'index':
            return (
              <Title key={`manualViewIndexComp_title_${item.MUAL_TABCOMP_IDX}`} contents={item.MUAL_COMPVIEWINFO} idx={item.MUAL_TABCOMP_IDX} compData={item} />
            );
          case 'editor':
            return <InfoCon key={`manualViewIndexComp_infoCon_${item.MUAL_TABCOMP_IDX}`} contents={item.MUAL_COMPVIEWINFO} />;
          case 'indexLink':
            return (
              <Title key={`manualViewIndexComp_title_${item.MUAL_TABCOMP_IDX}`} contents={item.MUAL_COMPVIEWINFO} idx={item.MUAL_TABCOMP_IDX} compData={item} />
            );
          case 'indexRelation':
            const indexRelationItem = [
              <Title
                key={`manualViewIndexComp_title_${item.MUAL_TABCOMP_IDX}`}
                contents={item.MUAL_COMPVIEWINFO}
                idx={item.MUAL_TABCOMP_IDX}
                compData={item}
              />,
            ];
            if (item.COMP_OPTION) {
              console.debug(item.COMP_OPTION, indexRelationList);
              indexRelationList
                .filter(node => node.MUAL_ORG_IDX === item.COMP_OPTION.MUAL_ORG_IDX && node.MUAL_TABCOMP_OIDX === item.COMP_OPTION.MUAL_TABCOMP_OIDX)
                .forEach(node => {
                  node.CHILD_NODE.forEach(subNode => {
                    indexRelationItem.push(
                      <InfoCon key={`manualViewIndexComp_infoCon_${item.MUAL_TABCOMP_IDX}_${subNode.MUAL_TABCOMP_IDX}`} contents={subNode.MUAL_COMPVIEWINFO} />,
                    );
                  });
                });
            }
            return indexRelationItem;
          case 'qna':
            return <QnA key={`manualViewIndexComp_title_${item.MUAL_TABCOMP_IDX}`} contents={item.MUAL_COMPVIEWINFO}></QnA>;
          case 'tab':
            const tabData = isJSON(item.MUAL_COMPVIEWINFO) ? JSON.parse(item.MUAL_COMPVIEWINFO) : [];
            return <Tab key={`manualViewIndexComp_title_${item.MUAL_TABCOMP_IDX}`} tabData={tabData} keyName="id"></Tab>;
          default:
            return '';
        }
      })}
  </Styled>
);

InfoConWrap.propTypes = {
  componentList: PropTypes.array,
};

InfoConWrap.defaultProps = {
  componentList: [],
};

export default InfoConWrap;
