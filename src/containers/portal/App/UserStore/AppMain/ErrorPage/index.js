import React from 'react';
import error404img from 'images/common/404.gif';
import Footer from '../../Footer';

class ErrorPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <center>
          <img src={error404img} alt="404" />
        </center>
        <Footer />
      </div>
    );
  }
}

export default ErrorPage;
