import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Row, Col, Table, Modal } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';
import RichTextEditor from 'components/FormStuff/RichTextEditor';
import { froalaEditorConfig } from 'components/FormStuff/config';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import StyledButton from 'apps/mdcs/styled/StyledButton';
import StyledModalWrapper from '../../styled/Modals/StyledModalWrapper';
import StyledContentField from '../../styled/Modals/StyledContentField';
import Styled from './Styled';

import View from './View';
import Input from './Input';
import Modify from './Modify';
const { Option } = Select;
const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledModalWrapper(Modal);
class FiledManageComponent extends Component {
  state = {
    isModalOpen: false,
    selectedIndex: undefined,
    viewType: 'List',
  };

  componentDidMount() {
    const { getCallDataHanlder, apiArray, id } = this.props;
    getCallDataHanlder(id, apiArray);
  }

  onClickField = record => {
    const { getCallDataHanlder, id } = this.props;
    const { FIELD_IDX, COL_GROUP_IDX, COL_TYPE_IDX } = record;
    const apiArr = [
      { key: 'typeList', url: `/api/builder/v1/work/FieldList`, type: 'POST', params: { key: 'typeList', COL_GROUP_IDX } },
      { key: 'compList', url: `/api/builder/v1/work/FieldList`, type: 'POST', params: { key: 'compList', COL_GROUP_IDX, COL_TYPE_IDX } },
    ];
    getCallDataHanlder(id, apiArr);
    this.setState({ isModalOpen: true, selectedIndex: FIELD_IDX, viewType: 'View' });
  };

  onCloseModal = () => {
    this.setState({ isModalOpen: false, viewType: 'List' });
  };

  onChangeViewType = viewType => {
    this.setState({ viewType });
  };

  render() {
    const columData = [
      {
        dataIndex: 'FIELD_IDX',
        title: '번호',
      },
      {
        dataIndex: 'FIELD_NAME',
        title: '필드명',
      },
    ];
    const {
      result: { fieldList },
    } = this.props;
    const { result, getCallDataHanlder, id, removeReduxStateByKey } = this.props;
    const { viewType } = this.state;
    return (
      <StyledContentField>
        <div>
          <Row>
            <div className="pop_tit">필드목록</div>
          </Row>
          <div className="pop_con">
            <div className="sub_form">
              <Row>
                <div className="w100Table">
                  <Col span={24}>
                    <AntdTable
                      columns={columData}
                      dataSource={(fieldList && fieldList.list) || []}
                      className="tableCustom"
                      onRow={record => ({
                        onClick: () => {
                          this.onClickField(record);
                        }, // click row
                      })}
                    />
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="btn-wrap">
                  <Col span={24}>
                    <StyledButton
                      className="btn-primary btn-sm"
                      onClick={() => {
                        this.onChangeViewType('Input');
                        this.setState({ isModalOpen: true });
                      }}
                    >
                      작성
                    </StyledButton>
                  </Col>
                </div>
              </Row>
            </div>
          </div>
        </div>

        <AntdModal
          closable={false}
          destroyOnClose
          style={{ top: '50px' }}
          width={1200}
          visible={this.state.isModalOpen}
          onCancel={() => this.onCloseModal()}
          footer={null}
        >
          {(viewType === 'View' && (
            <View
              result={result}
              getCallDataHanlder={getCallDataHanlder}
              id={id}
              selectedIndex={this.state.selectedIndex}
              onChangeViewType={this.onChangeViewType}
            ></View>
          )) ||
            (viewType === 'Input' && (
              <Input
                result={result}
                onCloseModal={this.onCloseModal}
                getCallDataHanlder={getCallDataHanlder}
                id={id}
                removeReduxStateByKey={removeReduxStateByKey}
              ></Input>
            )) ||
            (viewType === 'Modify' && (
              <Modify
                result={result}
                getCallDataHanlder={getCallDataHanlder}
                id={id}
                selectedIndex={this.state.selectedIndex}
                onChangeViewType={this.onChangeViewType}
                onCloseModal={this.onCloseModal}
                removeReduxStateByKey={removeReduxStateByKey}
              ></Modify>
            ))}
        </AntdModal>
      </StyledContentField>
    );
  }
}

FiledManageComponent.defaultProps = {
  apiArray: [
    { key: 'fieldList', url: `/api/builder/v1/work/FieldList`, type: 'POST', params: { key: 'fieldList' } },
    { key: 'groupList', url: `/api/builder/v1/work/FieldList`, type: 'POST', params: { key: 'groupList' } },
  ],
};

const FiledManage = () => <BizMicroDevBase id="fileManage" component={FiledManageComponent} />;
export default FiledManage;
