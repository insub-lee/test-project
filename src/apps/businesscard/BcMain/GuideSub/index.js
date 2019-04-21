import React, { PureComponent } from 'react';
import bcguide from 'apps/businesscard/images/bc_guide.PNG';

class BcGuid extends PureComponent {
  render() {
    console.log(this.props);
    return (
      <div align='center'>
        <img
          alt="명함이용안내"
          src={bcguide}
          style={{ width: 820, height:570,}}   
        />
      </div>
    );
  }
}

export default BcGuid;

