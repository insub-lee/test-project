import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { ThemeProvider } from 'styled-components';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext as dragDropContext } from 'react-dnd';
import guide from 'config/themes/guide';
import Sidebar from '../components/Sidebar/Sidebar';
import Topbar from '../components/Topbar/Topbar';
import AppRouter from './AppRouter';

import * as selectors from './selectors';
import reducer from './reducer';
import * as actions from './actions';

import injectReducer from '../../../utils/injectReducer';

const wrap = dragDropContext(HTML5Backend);
const { Content, Footer } = Layout;

const App = props => {
  const { url } = props.match;
  console.log(props);

  return (
    <ThemeProvider theme={guide}>
      <Layout style={{ minWidth: 1280 }}>
        <Topbar url={url} firstLevelSelected={props.firstLevelSelected} />
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar url={url} articleSelected={props.articleSelected} selectedIndex={props.selectedIndex} height={props.height} />
          <Layout>
            <Content>
              <AppRouter url={url} selectedArticle={props.selectedArticle} />
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </Layout>
    </ThemeProvider>
  );
};

App.propTypes = {
  match: PropTypes.object.isRequired,
  firstLevelSelected: PropTypes.func.isRequired,
  articleSelected: PropTypes.func.isRequired,
  selectedIndex: PropTypes.string.isRequired,
  selectedArticle: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
};

const mapDispatchToProps = dispatch => ({
  firstLevelSelected: selectedIndex => dispatch(actions.firstLevelSelected(selectedIndex)),
  articleSelected: selectedArticle => dispatch(actions.articleSelected(selectedArticle)),
});

const mapStateToProps = createStructuredSelector({
  height: selectors.makeHeight(),
  selectedIndex: selectors.makeSelectedIndex(),
  selectedArticle: selectors.makeSelectedArticle(),
});
const withReducer = injectReducer({ key: 'app', reducer });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withConnect)(wrap(App));
