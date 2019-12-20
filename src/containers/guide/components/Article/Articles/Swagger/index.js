import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import SwaggerUI from './SwaggerUI';

class Swagger extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props = props;
  }

  getUrl = () => {
    const pathNmArr = window.location.pathname.split('/');
    const portalUrl = window.location.origin;
    return `${portalUrl}/files/Swagger_${pathNmArr[2]}.json`;
  };

  render() {
    const url = this.getUrl();
    return (
      <div
        style={{
          height: '100vh',
          // width: '1500px',
        }}
      >
        <Scrollbars
          className="custom-scrollbar"
          style={{ width: 'auto', height: '100vh' }}
          // overflow-x="auto"
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
        >
          <SwaggerUI url={url} />
        </Scrollbars>
      </div>
    );
  }
}

export default Swagger;
