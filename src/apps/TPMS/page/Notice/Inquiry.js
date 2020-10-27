import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../../components/Button';
import FormView from '../../components/FormPreview/FormView';
import makeContent from '../../utils/makeContents';
import { usePost } from '../../hooks/usePost';

export const InquiryBody = ({ formJson = [], content = {}, brdid, selectedRecord }) => {
  const {
    action: { readPost },
  } = usePost({ brdid });

  useEffect(() => {
    readPost(selectedRecord);
  }, []);
  const data = makeContent(formJson, content, true);

  const filteredData = data.filter(item => item?.option?.name !== 'title');

  return (
    <>
      <FormView datas={filteredData} noBoarder smallView />
      <div className="ant-modal-footer">
        <Button color="primary" size="big" onClick={() => {}}>
          닫기
        </Button>
      </div>
    </>
  );
};
/**
 * 답변일 경우 답변 버튼 숨김 처리
 * 답변이 있을 경우 삭제버튼 숨김 처리
 * 답변인 경우 답변버튼 숨김
 * @param {*} param0
 */
export const InquiryTitle = ({ content = {}, openModal }) => {
  return (
    <TitleWrapper>
      <div className="header">
        <span className="title">제목</span>
        <span className="line" />
        <span className="text">{content?.title}</span>
      </div>
      <div className="btn_wrap">
        <Button
          color="gray"
          onClick={() => {
            openModal('MOD');
          }}
        >
          수정
        </Button>
        <Button color="gray" onClick={() => openModal('DEL')}>
          삭제
        </Button>
      </div>
    </TitleWrapper>
  );
};

InquiryBody.propTypes = { formJson: PropTypes.array, content: PropTypes.object };
InquiryBody.defaultProps = { formJson: [], content: {} };

InquiryTitle.propTypes = { content: PropTypes.object, openModal: PropTypes.func };
InquiryTitle.defaultProps = {
  content: {},
  openModal: () => {},
};

const TitleWrapper = styled.div`
  display: flex;

  .header {
    width: 66%;

    span {
      display: inline-block;
      vertical-align: middle;
    }
    .title {
      font-weight: 500;
      font-size: 17px;
    }

    .line {
      width: 1px;
      height: 16px;
      background: white;
      margin: 0px 20px;
    }

    .text {
      font-size: 15px;
    }
  }

  .btn_wrap {
    display: flex;
    width: 30%;
    justify-content: flex-end;
  }
`;
