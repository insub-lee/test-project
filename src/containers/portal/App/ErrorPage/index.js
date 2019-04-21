import React from 'react';
import error404img from 'images/common/apple404page.png';

class ErrorPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  render() {
    return (
      <div
        style={{
          height: '100vh',
          width: '100vw',
          display: 'table-cell',
          textAlign: 'center',
          verticalAlign: 'middle',
          background: 'white',
          paddingBottom: '100px',
        }}
      >
        <img src={error404img} alt="404" /> <br />
        <a
          style={{
            width: '10%',
            background: 'white',
            border: '2px solid black',
            fontSize: '12pt',
            display: 'inline-block',
          }}
          href="/"
        >
        홈으로 이동
        </a>
      </div>
    );
  }
}

export default ErrorPage;
