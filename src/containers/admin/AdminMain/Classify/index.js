import React, { Component } from 'react';
import { Input, Button, Form } from 'antd';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import Footer from 'containers/admin/App/Footer';
import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';

import MyAppTree from './Tree';
import StyleCategory from './StyleCategory';
import StyleCategoryForm from './StyleCategoryForm';

class Classify extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getClassifyList(this.props.match.params.GUBUN);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.GUBUN !== prevProps.match.params.GUBUN) {
      this.props.initClassifyData();
      this.props.getClassifyList(this.props.match.params.GUBUN);
    }
  }

  returnGateInfo = () => {};

  returnGateUpdate = () => {};

  returnGateDelete = () => {};

  moveMymenu = () => {};

  onOk = () => {};

  onSubmit = e => {
    e.preventDefault();
    // const data = new FormData(e.target);
    // const payload = {};
    // data.forEach((value, key) => {
    //   if (key === 'NODE_ID' || key === 'PARENT_NODE_ID' || key === 'LVL') {
    //     payload[key] = value !== '' ? Number(value) : -1;
    //   } else {
    //     payload[key] = value;
    //   }
    // });

    // this.props.updateClassifyInfo(payload);
    const payload = {
      ...this.props.selectedNode,
    };
    this.props.updateClassifyInfo(payload);
  };

  onChangeNode = e => {
    const targetName = e.target.name;
    const { selectedNode } = this.props;
    const changeNode = {
      ...selectedNode,
      NAME_KOR: targetName === 'NAME_KOR' ? e.target.value : selectedNode.NAME_KOR,
      NAME_ENG: targetName === 'NAME_ENG' ? e.target.value : selectedNode.NAME_ENG,
      NAME_CHN: targetName === 'NAME_CHN' ? e.target.value : selectedNode.NAME_CHN,
    };

    this.props.setSelectedNode(changeNode);
  };

  render() {
    const { getFieldDecorator } = this.props.form;  //eslint-disable-line
    const { classifyList, setClassifyList, selectedNode, setSelectedNode, addClassifyInfo, deleteClassifyInfo, updateClassifyList } = this.props;
    const { GUBUN } = this.props.match.params;
    const titleName = GUBUN === '1' ? '지식분류체계' : '업무빌더 카테고리';
    const fieldName = GUBUN === '1' ? '분류체계' : '카테고리';

    return (
      <div>
        <StyleCategory>
          <h3 className="pageTitle list">{titleName} 관리</h3>
          <div className="pageContent" style={{ display: 'inline-block', width: '100%', height: 'calc(100vh - 170px)' }}>
            <div className="categoryTreeWrapper">
              <div>
                {/* <Button type="default" style={{ width: 'calc(100% - 10px)' }}>
                  ROOT분류체계추가
                </Button> */}
                <MyAppTree
                  treeData={classifyList}
                  setClassifyList={setClassifyList}
                  selectedNode={selectedNode}
                  setSelectedNode={setSelectedNode}
                  addClassifyInfo={addClassifyInfo}
                  deleteClassifyInfo={deleteClassifyInfo}
                  updateClassifyList={updateClassifyList}
                />
              </div>
            </div>
            <form onSubmit={e => this.onSubmit(e)}>
              <div className="categoryContents">
                <h4>{fieldName} 정보</h4>
                <StyleCategoryForm>
                  <table className="adminTbl categoryTbl">
                    <tbody>
                      <tr>
                        <th className="required">
                          <label htmlFor="v2">{fieldName} 명(KOR)</label>
                        </th>
                        <td>
                          <Input name="NAME_KOR" value={selectedNode.NAME_KOR} onChange={this.onChangeNode} />
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <label htmlFor="v2">{fieldName} 명(ENG)</label>
                        </th>
                        <td>
                          <Input name="NAME_ENG" value={selectedNode.NAME_ENG} onChange={this.onChangeNode} />
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <label htmlFor="v2">{fieldName} 명(CHN)</label>
                        </th>
                        <td>
                          <Input name="NAME_CHN" value={selectedNode.NAME_CHN} onChange={this.onChangeNode} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* <Form onSubmit={e => this.onSubmit(e)}>
                    <Form.Item label={`${fileName} 명(KOR)`}>
                      {getFieldDecorator('NAME_KOR', { initialValue: selectedNode.NAME_KOR })(<Input key={`NAME_KOR_${GUBUN}`} name="NAME_KOR" />)}
                    </Form.Item>
                    <Form.Item label={`${fileName} 명(ENG)`}>
                      {getFieldDecorator('NAME_ENG', { initialValue: selectedNode.NAME_ENG })(<Input name="NAME_ENG" />)}
                    </Form.Item>
                    <Form.Item label={`${fileName} 명(CHN)`}>
                      {getFieldDecorator('NAME_CHN', { initialValue: selectedNode.NAME_CHN })(<Input name="NAME_CHN" />)}
                    </Form.Item>
                    {selectedNode.NODE_ID !== -1 && (
                      <React.Fragment>
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            저장
                          </Button>
                        </Form.Item>
                        <Form.Item>{getFieldDecorator('NODE_ID', { initialValue: selectedNode.NODE_ID })(<Input name="NODE_ID" type="hidden" />)}</Form.Item>
                        <Form.Item>
                          {getFieldDecorator('PARENT_NODE_ID', { initialValue: selectedNode.PARENT_NODE_ID })(<Input name="PARENT_NODE_ID" type="hidden" />)}
                        </Form.Item>
                        <Form.Item>{getFieldDecorator('LVL', { initialValue: selectedNode.LVL })(<Input name="LVL" type="hidden" />)}</Form.Item>
                        <Form.Item>
                          {getFieldDecorator('NODE_ORDINAL', { initialValue: selectedNode.NODE_ORDINAL })(<Input name="NODE_ORDINAL" type="hidden" />)}
                        </Form.Item>
                        <Form.Item>{getFieldDecorator('FULLPATH', { initialValue: selectedNode.FULLPATH })(<Input name="FULLPATH" type="hidden" />)}</Form.Item>
                        <Form.Item>{getFieldDecorator('GUBUN', { initialValue: selectedNode.GUBUN })(<Input name="GUBUN" type="hidden" />)}</Form.Item>
                      </React.Fragment>
                    )}
                  </Form> */}
                </StyleCategoryForm>
              </div>
              {selectedNode.NODE_ID !== -1 && (
                <div className="buttonWrapper">
                  <Button type="primary" htmlType="submit" size="large">
                    저장
                  </Button>
                </div>
              )}
            </form>
          </div>
          <Footer />
        </StyleCategory>
      </div>
    );
  }
}

Classify.propTypes = {
  match: PropTypes.object.isRequired,
  classifyList: PropTypes.array.isRequired,
  getClassifyList: PropTypes.func.isRequired,
  setClassifyList: PropTypes.func.isRequired,
  addClassifyInfo: PropTypes.func.isRequired,
  updateClassifyInfo: PropTypes.func.isRequired,
  deleteClassifyInfo: PropTypes.func.isRequired,
  updateClassifyList: PropTypes.func.isRequired,
  selectedNode: PropTypes.object.isRequired,
  setSelectedNode: PropTypes.func.isRequired,
  initClassifyData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  classifyList: selectors.makeClassifyList(),
  selectedNode: selectors.makeSelectedNode(),
});

const mapDispatchToProps = dispatch => ({
  getClassifyList: gubun => dispatch(actions.getClassifyList(gubun)),
  setClassifyList: classifyList => dispatch(actions.setClassifyList(classifyList)),
  addClassifyInfo: classifyInfo => dispatch(actions.addClassifyInfo(classifyInfo)),
  updateClassifyInfo: classifyInfo => dispatch(actions.updateClassifyInfo(classifyInfo)),
  deleteClassifyInfo: classifyInfo => dispatch(actions.deleteClassifyInfo(classifyInfo)),
  updateClassifyList: updateData => dispatch(actions.updateClassifyList(updateData)),
  setSelectedNode: nodeInfo => dispatch(actions.setSelectedNode(nodeInfo)),
  initClassifyData: () => dispatch(actions.initClassifyData()),
});

const withReducer = injectReducer({ key: 'apps.admin.AdminMain.Classify', reducer });
const withSaga = injectSaga({ key: 'apps.admin.AdminMain.Classify', saga });
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
