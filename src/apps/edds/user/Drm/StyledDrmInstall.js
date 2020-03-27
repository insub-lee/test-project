import styled from 'styled-components';

const StyledDrmInstall = styled.div`
  width: 100%;
  margin: 0px auto;
  padding: 40px 20px;
  
  .drm_wrap {
    overflow: hidden;

    .drm_con {
      width: 100%;
      padding: 30px 0px;
      overflow: hidden;

      &.drm_con01 {
        padding-bottom: 60px;
        margin-bottom: 30px;
        border-bottom: 1px solid rgb(174, 180, 190);
      }

      .drm_box {
        display: inline-block;
        vertical-align: middle;
        text-align: center;

        .drm_img {
          display: inline-block;
          vertical-align: middle;
          
          &.drm_img01 {
            width: 300px;

            img {
              vertical-align: top;
              border-width: 0px;
              border-style: initial;
              border-color: initial;
              border-image: initial;
              outline: none;
            }
          }

          &.drm_img02 {
            text-align: left;
            width: 200px;

            img {
              vertical-align: top;
              border-width: 0px;
              border-style: initial;
              border-color: initial;
              border-image: initial;
              outline: none;
            }
          }
        }

        &.drm_text {
          text-align: left;

          a {
            color: #1890ff;
            background-color: initial;
            text-decoration: none;
            outline: none;
            cursor: pointer;
            -webkit-transition: color .3s;
            transition: color .3s;
            -webkit-text-decoration-skip: objects;
          }

          .pointcolor {
            color: rgb(68, 145, 224);
          }
        }
      }
    }
  }
`;

export default StyledDrmInstall;