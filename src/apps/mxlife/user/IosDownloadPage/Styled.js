import styled from 'styled-components';

const Styled = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 20px;

  max-width: 850px;
  margin: auto;

  .button {
    border-radius: 100px;
  }

  .header {
    text-align: center;
  }

  .logo {
    padding-top: 7rem;
  }

  .section {
    padding: 0 0 7rem 0;
    text-align: center;
  }
  .section-heading,
  .section-description {
    margin-bottom: 1.2rem;
  }

  .app-img {
    width: 60%;
  }

  .button.button-primary {
    color: #fff;
    background-color: #136191 !important;
    border-color: #136191 !important;
    padding: 10px;
  }

  .download-link {
    font-size: 20px;
  }

  .help-link {
    color: #136191;
    font-weight: 600;
    border-bottom: 1px solid #136191;
  }
`;

export default Styled;
