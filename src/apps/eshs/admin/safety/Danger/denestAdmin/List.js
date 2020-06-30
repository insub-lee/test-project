import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import customList from 'apps/eshs/admin/environment/air/stack/List';
import moment from 'moment';

import { Input, message, Modal, Tabs } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import ContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledAntdModal from 'components/BizBuilder/styled//Modal/StyledAntdModal';
import View from './View';

const AntdSearchInput = StyledSearchInput(Input.Search);
const AntdModal = StyledAntdModal(Modal);

const { TabPane } = Tabs;

moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  search = () => {
    this.dangerData();
  };

  hazardModal = () => {
    const { isModal } = this.state;
    this.setState({ isModal: !isModal });
  };

  selectedModal = record => {
    const { sagaKey: id, changeFormData, getExtraApiData } = this.props;
    changeFormData(id, 'REG_NO', record.REG_NO);
    this.hazardModal();
    const apiAry = [
      {
        key: 'dangerInfo',
        type: 'POST',
        url: '/api/eshs/v1/common/eshsBuilderCustomSearch/10341',
        params: {
          PARAM: {
            whereString: [`AND TO_CHAR(W.REG_DTTM , 'YYYY') = '${moment(record.REG_DTTM).format('YYYY')}'`],
          },
        },
      },
      {
        key: 'dangerDanestAdmin',
        type: 'POST',
        url: '/api/eshs/v1/common/eshsBuilderCustomSearch/12981',
        params: {
          PARAM: {
            whereString: [`AND W.REG_NO = '${record.REG_NO}'`],
          },
        },
      },
    ];
    getExtraApiData(id, apiAry, this.dangerData);
  };

  dangerData = () => {
    const {
      extraApiData: { dangerInfo, dangerDanestAdmin },
    } = this.props;
    if (dangerDanestAdmin && dangerDanestAdmin.list && dangerDanestAdmin.list.length <= 0) {
      message.wanning('검색된 데이터가 없습니다.');
    } else {
      this.setState({ dangerInfo: dangerInfo && dangerInfo.list, dangerDanestAdmin: dangerDanestAdmin && dangerDanestAdmin.list });
    }
  };

  callback = key => {
    console.debug('key : ', key);
  };

  render() {
    const { isModal, dangerDanestAdmin, dangerInfo } = this.state;
    const { formData } = this.props;
    return (
      <>
        <ContentsWrapper>
          <StyledCustomSearchWrapper className="search-wrapper-inline">
            <div className="search-input-area">
              <span className="text-label">등록번호</span>
              <AntdSearchInput
                style={{ width: '150px' }}
                className="input-search-inline input-search-sm input-pointer mr5"
                value={formData.REG_NO}
                readOnly
                onClick={this.hazardModal}
                onChange={this.hazardModal}
              />
            </div>
            <StyledButtonWrapper className="btn-area">
              <StyledButton className="btn-gray btn-first btn-sm" onClick={this.search}>
                검색
              </StyledButton>
            </StyledButtonWrapper>
          </StyledCustomSearchWrapper>
          <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
            <StyledButton className="btn-primary btn-first btn-sm" onClick={() => message.info('개발중입니다.')}>
              저장/수정
            </StyledButton>
            <StyledButton className="btn-primary btn-first btn-sm" onClick={() => message.info('개발중입니다.')}>
              재평가
            </StyledButton>
            <StyledButton className="btn-primary btn-first btn-sm" onClick={() => message.info('개발중입니다.')}>
              완료
            </StyledButton>
            <StyledButton className="btn-gray btn-first btn-sm" onClick={() => message.info('개발중입니다.')}>
              재평가내역
            </StyledButton>
          </StyledButtonWrapper>
          {Array.isArray(dangerDanestAdmin) && dangerDanestAdmin[0] && (
            <Tabs defaultActiveKey={dangerDanestAdmin[0].DA_REG_NO} onChange={this.callback}>
              {dangerDanestAdmin.map(item => (
                <TabPane tab={item.DA_REG_NO} key={item.DA_REG_NO}>
                  <View formData={item} dangerInfo={dangerInfo} />
                </TabPane>
              ))}
            </Tabs>
          )}
        </ContentsWrapper>
        <AntdModal width={1000} visible={isModal} title="위험성 평가 검색" onCancel={this.hazardModal} destroyOnClose footer={null}>
          {isModal && (
            <BizBuilderBase sagaKey="hazardModal" workSeq={12061} CustomListPage={customList} viewType="LIST" customOnRowClick={this.selectedModal} />
          )}
        </AntdModal>
      </>
    );
  }
}

List.propTypes = {
  getExtraApiData: PropTypes.func,
  changeFormData: PropTypes.func,
  sagaKey: PropTypes.string,
  extraApiData: PropTypes.any,
  formData: PropTypes.any,
};

List.defaultProps = {
  getExtraApiData: () => {},
};

export default List;
