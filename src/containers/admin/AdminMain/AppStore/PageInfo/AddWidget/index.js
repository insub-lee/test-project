import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styled from 'styled-components';
import newWidget from 'images/bizstore/icon-plus.png';

const StyleAddWidget = styled.div`  
  .addNewWidget {
    display: block;
    width: 70px;
    height: 70px;
    //margin-top: 10px;
    margin: 20px auto;
    border: none;
    background: #949595;
    border-radius: 35px;

    &:hover {
      background: #4a4a4a;
    }

    .iconPlus {
      display: block;
      height: 100%;
      background: url(${newWidget}) no-repeat 50% 50%;
    }

  }
`;

class AddWidget extends PureComponent {
  render() {
    const { item } = this.props;
    return (
      <StyleAddWidget>
        <Button onClick={item.openModal} className="addNewWidget">
          <span className="iconPlus" />
        </Button>
      </StyleAddWidget>
    );
  }
}

AddWidget.propTypes = {
  item: PropTypes.object.isRequired,
};
export default AddWidget;
