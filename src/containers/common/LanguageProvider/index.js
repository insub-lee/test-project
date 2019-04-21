import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import changeLocale from './actions';
import { makeSelectLocale } from './selectors';

class LanguageProvider extends PureComponent {
  render() {
    return (
      <IntlProvider
        locale={this.props.locale}
        messages={this.props.messages[this.props.locale]}
      >
        {Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string.isRequired,
  messages: PropTypes.object.isRequired, //eslint-disable-line
  children: PropTypes.element.isRequired,
};

// const mapStateToProps = createSelector(
//   locale: makeSelectLocale(),
//   locale => ({ locale }),
// );

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

const mapDispatchToProps = dispatch => (
  {
    changeLocale: languageLocale => dispatch(changeLocale(languageLocale)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(LanguageProvider);
