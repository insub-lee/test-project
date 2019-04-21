import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { intlObj } from 'utils/commonUtils';
import messages from './messages';
import NoResultBox from './noResultStyle';
import noResultImage from '../../../../../../images/bizstore/no-result.png';

class NoSearchResult extends PureComponent {
  render() {
    const { searchword } = this.props;

    return (
      <NoResultBox>
        <img src={noResultImage} alt={intlObj.get(messages.alarm)} />
        <h4 className="noResultTitle">
          <strong>`{searchword}`</strong>{intlObj.get(messages.noSearchResult)}
        </h4>
        <ul className="searchGuideList">
          <li>{intlObj.get(messages.checkSpelling)}</li>
          <li>{intlObj.get(messages.checkLanguage)}</li>
          <li>{intlObj.get(messages.checkKeyword)}</li>
          <li>{intlObj.get(messages.checkSpacing)}</li>
        </ul>
      </NoResultBox>
    );
  }
}

NoSearchResult.propTypes = {
  searchword: PropTypes.string.isRequired,
};

export default NoSearchResult;
