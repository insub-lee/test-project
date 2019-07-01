import React, { PureComponent } from './node_modules/react';
import PropTypes from './node_modules/prop-types';
import { intlObj } from './node_modules/utils/commonUtils';
import noResultImage from './node_modules/images/bizstore/no-result.png';
import messages from './node_modules/containers/store/AppMain/AppList/NoSearchResult/messages';
import NoResultBox from './noResultStyle';

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
