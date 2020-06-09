import styled from 'styled-components';
import iconDate from 'apps/wts/images/icon_date.png';

const StyledDatePicker = styled.div`
  .title {
    position: absolute;
    left: 0;
    top: 0;
    height: 48px;
    line-height: 48px;
  }

  .dates {
    display: inline-block;
    width: 100%;

    &.single_datepicker {
      .react-datepicker-wrapper {
        width: 100%;
      }
    }

    .react-datepicker-wrapper {
      min-width: 35%;
      width: calc(50% - 18px);

      & > .react-datepicker__input-container {
        width: 100%;
      }
    }

    .date_divider {
      display: inline-block;
      width: 35px;
      text-align: center;
    }

    input[type='text'] {
      width: calc(100% - 20px);
      border: 0;
      border-bottom: 1px solid #d9e0e7;
      font-size: 15px;
      height: 45px;
      line-height: 45px;
      color: #555;
      vertical-align: middle;
    }

    button.icon_date {
      width: 20px;
      height: 45px;
      background: url(${iconDate}) no-repeat center;
      border-bottom: 1px solid #d9e0e7;
      vertical-align: bottom;
      font-size: 0;
    }
  }

  @media screen and (max-width: 1260px) {
    .title {
      position: relative;
      display: block;
      line-height: 80px;
    }
  }
`;

export default StyledDatePicker;
