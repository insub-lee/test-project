import styled from 'styled-components';

const Styled = styled.div`
  .view_wrap {
    width: calc(100% - 2px);
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    background: white;
  }

  .view_con {
    padding: 30px;

    &.no_padding {
      padding: 0;
    }

    ul.sub_form {
      font-size: 0px;
      text-align: left;
      overflow: hidden;
    }

    li {
      position: relative;
      min-height: 48px;
      padding-left: 0;
      margin-bottom: 3px;
      font-size: 15px;
      clear: both;

      .title {
        position: relative;
        left: 0;
        top: 0;
        height: 48px;
        line-height: 48px;
      }

      > ul > li {
        display: inline-block;
        padding: 0;
      }
    }
  }

  .sub_form li.mb {
    margin-bottom: 0px;
  }

  .sub_form li.quater {
    clear: none;
    width: calc(25% - 20px);
    display: inline-block;

    &.mr {
      margin-right: 20px;
    }

    &.ml {
      margin-left: 20px;
    }
    &.mb {
      margin-bottom: 0px;
    }
  }

  .sub_form li.half {
    clear: none;
    width: calc(50% - 20px);
    display: inline-block;

    &.mr {
      margin-right: 20px;
    }

    &.ml {
      margin-left: 20px;
    }
    &.mb {
      margin-bottom: 0px;
    }

    &.half-end {
      margin-right: calc(50%);
    }
  }
  .sub_form li.half.fr {
    margin-left: 40px;
  }
  .sub_form li.half_mo {
    clear: none;
    width: calc(46% - 250px);
  }
  .sub_form .sub_form {
    padding-top: 10px;
  }

  .sub_form.small > li {
    padding-left: 150px;
  }
  .sub_form.small2 > li {
    padding-left: 120px;
  }
  .sub_form.small2 li.half {
    width: calc(50% - 60px);
  }
  .sub_form.small2 li.half.fr {
    width: calc(50% - 60px);
    margin-left: 40px;
  }

  .sub_form li.improve_form.std {
    min-height: 48px;
    display: inline-block;
    width: 100%;
    padding-left: 0px;
    & > div {
      display: inline-block;
      width: calc(100% - 200px);
    }
    & > .title2 {
      width: 200px;
    }
  }

  .sub_form li.improve_form.std.half {
    & > div {
      width: calc(65% - 200px);
    }
    & > .title2 {
      width: 200px;
    }
  }

  .sub_form li.improve_form.ex {
    min-height: 48px;
    display: inline-block;
    width: 100%;
    padding-left: 0;
    & > .title2 {
      width: 200px;
      display: inline-block;
    }
  }
`;

export default Styled;
