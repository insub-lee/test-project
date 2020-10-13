import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Icon } from 'antd';
import StyledSubTable from './StyledSubTable';
import StyledButton from '../../Button';
import FormView from '../../FormPreview/FormView';

const SubTable = ({ record, actionController, isReply, useReply, useModify, useRemove, isLoading }) => (
  <StyledSubTable className="sub_table">
    <Spin indicator={<Icon type="loading" />} spinning={isLoading}>
      <div className="sub_tit_bg">
        <span className="big">제목</span>
        <span className="line" />
        <span className="small">{record.title}</span>
        <div className="btn_wrap">
          {useReply && (
            <StyledButton color="gray" size="small" onClick={actionController.handleReplyModal}>
              답변
            </StyledButton>
          )}
          {useModify && (
            <StyledButton color="gray" size="small" onClick={actionController.handleEditModal}>
              수정
            </StyledButton>
          )}
          {useRemove && (
            <StyledButton color="gray" size="small" onClick={actionController.handleDeleteModal}>
              삭제
            </StyledButton>
          )}
          <StyledButton color="gray" size="small" onClick={actionController.handleDetailModal}>
            <i className="fas fa-external-link-alt" />
          </StyledButton>
        </div>
      </div>
      {isReply ? (
        <div className="">
          {/*           {record.parentContents && (
            <FormView datas={record.parentContents.filter(content => content.option.name !== 'title' && content.option.name !== 'year')} noBoarder smallView />
          )} */}
          <dl className="view_reply">
            <dt>답변내용</dt>
            <dd>
              {record.loaded && (
                <FormView
                  datas={record.contents.filter(
                    content =>
                      content.option.name.includes('textarea') ||
                      content.option.name === 'content' ||
                      content.option.name === 'reply' ||
                      content.option.name === 'status',
                  )}
                  noBoarder
                  smallView
                  withoutLabel
                />
              )}
            </dd>
          </dl>
        </div>
      ) : (
        <div className="">
          {record.loaded && (
            <FormView datas={record.contents.filter(content => content.option.name !== 'title' && content.option.name !== 'year')} noBoarder smallView />
          )}
        </div>
      )}
    </Spin>
  </StyledSubTable>
);

SubTable.propTypes = {
  record: PropTypes.shape({
    title: PropTypes.string,
    num: PropTypes.number,
    contents: PropTypes.arrayOf(PropTypes.object),
    parentContents: PropTypes.arrayOf(PropTypes.object),
  }),
  actionController: PropTypes.shape({
    handleReplyModal: PropTypes.func,
    handleEditModal: PropTypes.func,
    handleDeleteModal: PropTypes.func,
    handleDetailModal: PropTypes.func,
    editRecord: PropTypes.func,
    deleteRecord: PropTypes.func,
  }),
  isReply: PropTypes.bool,
  useReply: PropTypes.bool,
  useModify: PropTypes.bool,
  useRemove: PropTypes.bool,
  isLoading: PropTypes.bool,
};

SubTable.defaultProps = {
  record: {
    title: '',
    num: 0,
    contents: [],
    parentContents: [],
  },
  actionController: {
    handleReplyModal: () => false,
    handleEditModal: () => false,
    handleDeleteModal: () => false,
    handleDetailModal: () => false,
    editRecord: () => false,
    deleteRecord: () => false,
  },
  isReply: false,
  useReply: false,
  useModify: true,
  useRemove: true,
  isLoading: false,
};

export default SubTable;
