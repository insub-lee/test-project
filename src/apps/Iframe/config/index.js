import React, { Component } from 'react';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { message, Button, Input } from 'antd';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer from '../reducer';
import saga from '../saga';
import selectors from '../selectors';
import * as actions from '../actions';

class iframeConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.item.data.url,
    };
  }

  success = () => {
    message.success('적용되었습니다.');
  };

  error = () => {
    message.error('주소를 설정해주세요');
  };

  handlerOnClick = () => {
    const { deleteUrl, item } = this.props;
    const { url } = this.state;
    const payload = { item: { user: item.user, size: item.size, data: url }, WIDGET_ID: item.WIDGET_ID };
    deleteUrl(payload);
  };

  handlerChange = value => {
    this.setState({
      url: value,
    });
  };

  render() {
    const { item } = this.props;
    console.log(this.props);
    const { handlerOnClick, handlerChange } = this;

    return (
      <div>
        {' '}
        <Input type="text" placeholder="주소를 입력해 주세요" defaultValue={this.state.url} onChange={e => handlerChange(e.target.value)}></Input>
        <Button type="primary" onClick={handlerOnClick}>
          적용하기
        </Button>{' '}
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = dispatch => ({
  deleteUrl: payload => dispatch(actions.deleteUrl(payload)),
});
const withReducer = injectReducer({ key: 'iframe-Widget', reducer });
const withSaga = injectSaga({ key: 'iframe-Widget', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(iframeConfig);
