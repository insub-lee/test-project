import React, { PureComponent } from 'react';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { message } from 'antd';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Config from './config';
import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';
class counselConfig extends PureComponent {
  constructor(props) {
    super(props);
    props.getWidgetInfo([2874]);
    this.state = {
      items: props.item,
    };
  }

  componentDidMount() {}

  HandleCategorieChange = PRNT_ID => {
    const before = this.state.items;
    this.setState({
      items: { ...before, data: { categorie: PRNT_ID } },
    });
  };

  handleClick = () => {
    if (this.state.items.data.categorie !== 0) {
      this.success();
      console.log(this.state.items);
      this.props.deleteConfig(this.state.items);
      this.props.updateBizGroupChgYn();
    } else {
      this.error();
    }
  };

  success = () => {
    message.success('적용되었습니다.');
  };

  error = () => {
    message.error('카테고리를 설정해주세요');
  };

  render() {
    const { categorie } = this.props;

    return (
      <div>
        <Config categorie={categorie} onCategorieChange={this.HandleCategorieChange} onClick={this.handleClick} items={this.state.items} />
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  categorie: selectors.makeSelectWidget(),
});

const mapDispatchToProps = dispatch => ({
  getWidgetInfo: () => dispatch(actions.getWidgetInfo()),
  deleteConfig: payload => dispatch(actions.deleteConfig(payload)),
});

const withReducer = injectReducer({ key: 'apps-counselHelper', reducer });
const withSaga = injectSaga({ key: 'apps-counselHelper', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(counselConfig);
