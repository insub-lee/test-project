import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button, Modal } from 'antd';
import ReactDataGrid from 'react-data-grid';
import { Link } from 'react-router-dom';
import moment from 'moment';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import WorkBuilderDetailPage from '../WorkBuilderDetailPage'

import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import Wrapper from './Wrapper';
import FormModal from './FormModal';

const columns = [
  {
    name: 'WORK_SEQ',
    key: 'WORK_SEQ',
  },
  {
    name: '업무빌더ID',
    key: 'WORK_ID',
  },
  {
    name: '업무빌더명',
    key: 'NAME_KOR',
  },
  {
    name: '설명',
    key: 'DSCR',
  },
  {
    name: '등록일',
    key: 'REG_DTTM',
    formatter: ({ value }) => moment(value).format('YYYY-MM-DD'),
  },
  {
    name: '상태',
    key: 'STATUS',
    formatter: ({ value }) => {
      switch (value) {
        case 0:
          return '디자인중';
        case 1:
          return '생성됨';
        default:
          return '';
      }
    },
  },
];

class WorkBuilderListPage extends Component {
  state = {
    isShow: false,
    workSeq: 0,
  }

  componentDidMount() {
    const { getList } = this.props;
    getList();
  }

  registerFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const {
      list,
      modalStatus: { formModal },
      // columns,
      toggleModalVisible,
      postWorkBuilder,
      history,
    } = this.props;
    return (
      <Wrapper>
        <div className="title">
          <h3>업무빌더관리</h3>
          <div className="action-buttons">
            <Button htmlType="button" shape="round" icon="form" size="small" onClick={() => toggleModalVisible('formModal', true)}>
              Write
            </Button>
          </div>
        </div>
        <hr />
        <ReactDataGrid
          columns={columns}
          rowGetter={i => list[i]}
          rowsCount={list.length}
          minHeight={500}
          // onRowClick={i => history.push(`/admin/adminmain/workBuilder/${list[i].WORK_SEQ}`)}
          onRowClick={i => this.setState({ isShow: true, workSeq: list[i].WORK_SEQ })}
          enableCellAutoFocus={false}
        />
        <FormModal
          wrappedComponentRef={this.registerFormRef}
          visible={formModal.visible}
          loading={formModal.loading}
          handleOk={() => postWorkBuilder(this.formRef.props)}
          handleCancel={() => toggleModalVisible('formModal', false)}
        />
        <Modal
          style={{ top: '10px' }}
          visible={this.state.isShow}
          width="95%"
          maskClosable={false}
          onCancel={() => {
            this.setState({ isShow: false, workSeq: 0 });
          }}
          destroyOnClose
          footer={null}
          zIndex={106}
        >
          <WorkBuilderDetailPage workSeq={this.state.workSeq} />
        </Modal>
      </Wrapper>
    );
  }
}

WorkBuilderListPage.propTypes = {
  history: PropTypes.object.isRequired,
  list: PropTypes.arrayOf(PropTypes.object),
  modalStatus: PropTypes.object.isRequired,
  toggleModalVisible: PropTypes.func,
  postWorkBuilder: PropTypes.func,
  getList: PropTypes.func,
};

WorkBuilderListPage.defaultProps = {
  list: [],
  toggleModalVisible: () => console.debug('no bind events'),
  postWorkBuilder: () => console.debug('no bind events'),
  getList: () => console.debug('no bind events'),
};

const mapStateToProps = createStructuredSelector({
  columns: selectors.makeSelectColumns(),
  list: selectors.makeSelectList(),
  modalStatus: selectors.makeSelectModalStatus(),
});

const mapDispatchToProps = dispatch => ({
  toggleModalVisible: (key, status) => dispatch(actions.toggleModalVisible({ key, status })),
  postWorkBuilder: ({ form }) => {
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      dispatch(actions.postWorkBuilder(values));
    });
  },
  getList: () => dispatch(actions.getList()),
});

const withReducer = injectReducer({ key: 'work-builder-detail-page', reducer });
const withSaga = injectSaga({ key: 'work-builder-detail-page', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WorkBuilderListPage);
