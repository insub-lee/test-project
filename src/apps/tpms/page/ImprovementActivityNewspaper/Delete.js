import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const DeleteBody = ({ formRef }) => (
  <Wrapper>
    <div className="pop_con">
      <form ref={formRef} autoComplete="off" onSubmit={e => e.preventDefault()}>
        <input type="password" placeholder="비밀번호를 입력해 주세요." name="pwd" />
      </form>
    </div>
  </Wrapper>
);

DeleteBody.propTypes = {};
DeleteBody.defaultProps = {};

const Wrapper = styled.div`
  .pop_con {
    padding: 10px 30px;
    position: relative;
    background-color: #ffffff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    form {
      input[type='text'],
      input[type='password'] {
        border: 0px;
        border-bottom: 1px solid #d9e0e7;
        font-size: 15px;
        height: 45px;
        line-height: 45px;
        color: #555;
        vertical-align: middle;
        margin-bottom: 20px !important;
      }
    }
  }
`;
