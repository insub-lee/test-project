import React, { Component } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line react/prefer-stateless-function
export default class ModelCellRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    console.log(this.props.value);
    // const b = [];
    // const a = this.props.value[0].split(',');

    // for (let i = 0; i < a.length; i += 1) {
    //   b.push(a[i].replace(' ', ''));
    // }

    // console.log(b);
    return (
      <div className="myPicture">
        {/* {b.map(num => (
          <img
            src={`http://skynet.skhynix.com/portalWeb/uploadfile/pictures/${num}.jpg`}
            alt={num}
            onError={(e) => { e.target.src = '/no_img_pro.jpg'; }}
            style={{
              display: 'inline-block',
              width: '25px',
              height: '25px',
              marginRight: '8px',
              borderRadius: '15px',
          }}
          />
        ))} */}
        {/* <img
          src="http://skynet.skhynix.com/portalWeb/uploadfile/pictures/X0106067.jpg"
          alt="X0106067"
          onError={(e) => { e.target.src = '/no_img_pro.jpg'; }}
          style={{
            display: 'inline-block',
            width: '25px',
            height: '25px',
            marginRight: '8px',
            borderRadius: '15px',
          }}
        />
        <img
          src="http://skynet.skhynix.com/portalWeb/uploadfile/pictures/X0100947.jpg"
          alt="X0100947"
          onError={(e) => { e.target.src = '/no_img_pro.jpg'; }}
          style={{
            display: 'inline-block',
            width: '25px',
            height: '25px',
            marginRight: '8px',
            borderRadius: '15px',
          }}
        /> */}
      </div>
    );
  }
}

ModelCellRenderer.propTypes = {
  value: PropTypes.array.isRequired,
};
