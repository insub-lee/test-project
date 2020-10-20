import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../../components/Button';
import FormView from '../../components/FormPreview/FormView';
import makeContent from '../../utils/makeContents';

export const InquiryBody = ({ formJson = [], content = {} }) => {
  const data = makeContent(formJson, content, true);

  const filteredData = data.filter(item => item?.option?.name !== 'title');

  return <FormView datas={filteredData} noBoarder smallView />;
};

export const InquiryTitle = ({ formJson = [], content = {}, openModal }) => {
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
            openModal('REP');
          }}
        >
          답변
        </Button>
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

InquiryTitle.propTypes = { formJson: PropTypes.array, content: PropTypes.object, openModal: PropTypes.func };
InquiryTitle.defaultProps = { formJson: [], content: {}, openModal: () => {} };

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
