import React, { Component } from 'react';
import { Input, Button, Form } from 'antd';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';

// import Footer from 'containers/admin/App/Footer';
import MyAppTree from './Tree';
import StyleCategory from './StyleCategory';
import StyleCategoryForm from './StyleCategoryForm';

class Classify extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getClassifyList();
  }

  handleTreeOnClick = node => {
    this.setState({
      // CATG_ID: node.CATG_ID,
      // APP_NAME: lang.get('NAME', node),
      // selectedIndex: node.CATG_ID,
      // PRNT_ID: node.PRNT_ID,
      // NAME_KOR: node.NAME_KOR,
      // NAME_ENG: node.NAME_ENG,
      // NAME_CHN: node.NAME_CHN,
      // DSCR_KOR: node.DSCR_KOR,
      // DSCR_ENG: node.DSCR_ENG,
      // DSCR_CHN: node.DSCR_CHN,
      // REG_USER_NAME: node.REG_USER_NAME,
      // REG_DTTM: node.REG_DTTM,
      // UPD_USER_NAME: node.UPD_USER_NAME,
      // UPD_DTTM: node.UPD_DTTM,
      // mode: 'D',
    });
  };

  returnGateInfo = () => {};

  returnGateUpdate = () => {};

  returnGateDelete = () => {};

  moveMymenu = () => {};

  onOk = () => {};

  onSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = {};
    data.forEach((value, key) => {
      if (key === 'NODE_ID' || key === 'PARENT_NODE_ID' || key === 'LVL') {
        payload[key] = value !== '' ? Number(value) : -1;
      } else {
        payload[key] = value;
      }
    });

    this.props.addClassifyInfo(payload);
  };

  render() {
    const { getFieldDecorator } = this.props.form;  //eslint-disable-line
    const { classifyList, selectedClassify, setClassifyList } = this.props;

    return (
      <div>
        <StyleCategory>
          <h3 className="pageTitle list">지식분류체계 관리</h3>
          <div className="pageContent" style={{ display: 'inline-block', width: '100%', height: 'calc(100vh - 170px)' }}>
            <div className="categoryTreeWrapper">
              <div>
                {/* <Button type="default" style={{ width: 'calc(100% - 10px)' }}>
                  ROOT분류체계추가
                </Button> */}
                <MyAppTree
                  type="bizgroup"
                  treeData={classifyList}
                  setClassifyList={setClassifyList}
                  onClick={this.handleTreeOnClick}
                  returnGateInfo={this.returnGateInfo}
                  returnGateUpdate={this.returnGateUpdate}
                  returnGateDelete={this.returnGateDelete}
                  history={this.props.history}
                  selectedIndex={this.state.selectedIndex}
                  canDrag
                  canDrop={false}
                  moveMymenu={this.moveMymenu}
                  onOk={this.onOk}
                />
              </div>
            </div>
            <div className="categoryContents">
              <h4>ROOT 분류체계 정보</h4>
              <StyleCategoryForm>
                <Form onSubmit={e => this.onSubmit(e)} colon={false}>
                  <Form.Item label="분류체계 명(KOR)">
                    <Input name="NAME_KOR" defaultValue={selectedClassify.NAME_KOR} />
                  </Form.Item>
                  <Form.Item label="분류체계 명(ENG)">
                    <Input name="NAME_ENG" defaultValue={selectedClassify.NAME_ENG} />
                  </Form.Item>
                  <Form.Item label="분류체계 명(CHN)">
                    <Input name="NAME_CHN" defaultValue={selectedClassify.NAME_CHN} />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      저장
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Input name="NODE_ID" defaultValue={selectedClassify.NODE_ID} type="hidden" />
                  </Form.Item>
                  <Form.Item>
                    <Input name="PARENT_NODE_ID" defaultValue={selectedClassify.PARENT_NODE_ID} type="hidden" />
                  </Form.Item>
                  <Form.Item>
                    <Input name="LVL" defaultValue={selectedClassify.LVL} type="hidden" />
                  </Form.Item>
                  <Form.Item>
                    <Input name="NODE_ORDINAL" defaultValue={selectedClassify.NODE_ORDINAL} type="hidden" />
                  </Form.Item>
                  <Form.Item>
                    <Input name="FULL_PATH" defaultValue={selectedClassify.FULL_PATH} type="hidden" />
                  </Form.Item>
                </Form>
              </StyleCategoryForm>
            </div>
          </div>
          {/* <Footer /> */}
        </StyleCategory>
      </div>
    );
  }
}

Classify.propTypes = {
  classifyList: PropTypes.array.isRequired,
  selectedClassify: PropTypes.object.isRequired,
  history: PropTypes.object,
  getClassifyList: PropTypes.func.isRequired,
  setClassifyList: PropTypes.func.isRequired,
  addClassifyInfo: PropTypes.func.isRequired,
};

Classify.defaultProps = {
  history: {},
};

const mapStateToProps = createStructuredSelector({
  classifyList: selectors.makeClassifyList(),
  selectedClassify: selectors.makeSelectedClassify(),
});

const mapDispatchToProps = dispatch => ({
  getClassifyList: () => dispatch(actions.getClassifyList()),
  setClassifyList: classifyList => dispatch(actions.setClassifyList(classifyList)),
  addClassifyInfo: classifyInfo => dispatch(actions.addClassifyInfo(classifyInfo)),
});

const withReducer = injectReducer({ key: 'apps.manual.admin.Classify', reducer });
const withSaga = injectSaga({ key: 'apps.manual.admin.Classify', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const ClassifyForm = Form.create({ name: 'frm' });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  ClassifyForm,
)(Classify);
