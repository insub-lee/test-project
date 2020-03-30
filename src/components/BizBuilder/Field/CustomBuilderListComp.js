import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Button, Modal } from 'antd';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import BizBuilderBase from 'components/BizBuilderBase';

class CustomBuilderListComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      builderBase: [],
    };
  }

  builderBaseReload = () => {
    const {
      sagaKey: id,
      CONFIG: { property },
      CustomListPage,
    } = this.props;

    this.setState({
      builderBase: [
        <BizBuilderBase
          sagaKey={`searchbar_${id}`}
          baseSagaKey={id}
          CustomListPage={CustomList}
          workSeq={property.searchbarWorkSeq}
          taskSeq={-1}
          listMetaSeq={property.listMetaSeq || undefined}
          viewType="LIST"
          loadingComplete={this.props.loadingComplete}
          isModalChange={this.isModalChange}
        />,
      ],
    });
  };

  render() {
    return <div>aa</div>;
  }
}

CustomBuilderListComp.propTypes = {};

CustomBuilderListComp.defaultProps = {};

export default CustomBuilderListComp;
